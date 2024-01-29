"use node"

import { internalAction } from "./_generated/server"
import { v } from "convex/values"
import { api, internal } from "./_generated/api"
import { CreateMessage } from "ai"
import { ConvexChatService } from "@/lib/services/ChatService/convex-chat-service"
import { accumulateAndDecodeChunks } from "@/lib/services/ChatService/utils"
import { ImageAnalysisService } from "@/lib/services/ImageAnalysisService/image-analysis-service"
import { Doc } from "./_generated/dataModel"
import { OpenAIFunctionCallManager } from "./openai_functions/runServerFunction"

export const chat = internalAction({
  args: {
    userId: v.string(),
    slideId: v.id("slides"),
    prompt: v.string(),
  },
  handler: async (ctx, { userId, slideId, prompt }) => {
    // 1. Fetch last N messages
    const messagesWithContent = await ctx.runQuery(internal.messages.internalListWithContent, {
      userId,
      slideId,
      last: 15
    })

    // @ts-ignore
    const messageHistory: Doc<"textMessages">[] = messagesWithContent
      .filter((msg) => (msg.messageType == "text"))
      .map(({ message, ...rest }) => message)
      .filter(Boolean)

    // 2. Define our onMessageSave function. It ensures that all function calls
    //    are sent to the DB. That data may be used when creating carousels.
    const onMessageSave = async (message: CreateMessage) => {
      const convexMessage = {
        slideId,
        userId,
        name: message?.name,
        function_call: message?.function_call,
        role: message.role,
        content: message.content,
      }
      // @ts-ignore
      await ctx.runMutation(internal.textMessages.internalInsert, convexMessage)
    }

    // 3. Run the chat service
    const functionCallManager = new OpenAIFunctionCallManager(slideId, userId, ctx)
    const runServerFunction = functionCallManager.getRunServerFunction()

    const stream = await ConvexChatService({
      messages: messageHistory,
      prompt,
      slideId,
      runServerFunction,
      onMessageSave: onMessageSave
    })

    // 4. Wait until the stream finishes. This is a blocking operation.
    const content = await accumulateAndDecodeChunks(stream)
    if (!content) return

    const messageObject = {
      role: "assistant" as const,
      content
    }
    await onMessageSave(messageObject)
  }
})

export const imageAnalysis = internalAction({
  args: {
    userId: v.string(),
    slideId: v.id("slides"),
    imageMessageId: v.id("imageMessages"),
  },
  handler: async (ctx, { userId, slideId, imageMessageId }) => {
    // 0. Update the status of the image message to "analysing"
    await ctx.runMutation(internal.imageMessages.internalPatch, {
      messageId: imageMessageId,
      status: "analysing",
    })

    // 1. Extract the image URL from the imageMessageId
    const imageUrl = await ctx.runQuery(api.imageMessages.getImageUrl, {
      messageId: imageMessageId,
    })

    if (!imageUrl) {
      // TODO - Set the status to failed
      throw new Error("No image URL found")
    }

    // 2. Retrieve the transcription from OpenAI
    const transcription = await ImageAnalysisService({ imageUrl })

    // 3. Update the message with the transcription
    await ctx.runMutation(internal.imageMessages.internalPatch, {
      messageId: imageMessageId,
      status: "completed",
      transcription,
    })
  }
})