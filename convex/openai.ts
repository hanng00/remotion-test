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
import { openai } from "@/lib/openai"
import { writeNarrationScript } from "@/lib/src/carousel/services/creative_writer"
import { ChatLogItemSchema } from "@/lib/src/carousel/entites/chat-log"
import { StorageID } from "@/lib/src/carousel/types"
import { produceCarouselConfig } from "@/lib/src/carousel/services/carousel_producer"

/* SLIDES CONVERSATION */
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


/* CAROUSEL GENERATION */
export const generateNarrationScript = internalAction({
  args: {
    userId: v.string(),
    carouselId: v.id("carousels"),
  },
  handler: async (ctx, { userId, carouselId }) => {
    // 0. Update the carousel status to "writing"
    await ctx.runMutation(internal.carousels.internalPatch, {
      carouselId,
      status: "writing",
    })

    // 1. Fetch the carousel
    const carousel = await ctx.runQuery(api.carousels.getCarousel, {
      carouselId,
    })

    if (!carousel) {
      throw new Error("Carousel not found")
    }

    // 2. Extract out the chat log from the slide
    const messagesWithContent = await ctx.runQuery(internal.messages.internalListWithContent, {
      userId,
      slideId: carousel.slideId,
    })

    // Convert Convex types into the domain model types
    const chatLog = messagesWithContent.flatMap((message) => {
      const result = ChatLogItemSchema.safeParse(message);
      if (!result.success) {
        // handle error then return
        return []
      } else {
        // do something
        return result.data;
      }
    })

    if (!chatLog || chatLog.length === 0) {
      console.log("The resulting chat log is empty")
      return
    }

    const narrationScript = await writeNarrationScript({
      chatLog,
      openai,
    })

    // 4. Update the carousel with the narration script
    await ctx.runMutation(internal.carousels.insertNarrationScript, {
      carouselId,
      narrationScript,
    })

    // 5. Pathc the carousel status to "producing"
    await ctx.runMutation(internal.carousels.internalPatch, {
      carouselId,
      status: "producing",
    })
  }
})

export const generateCarouselConfig = internalAction({
  args: {
    userId: v.string(),
    carouselId: v.id("carousels"),
  },
  handler: async (ctx, { userId, carouselId }) => {
    // 0. Update the carousel status to "writing"
    await ctx.runMutation(internal.carousels.internalPatch, {
      carouselId,
      status: "producing",
    })

    // 1. Fetch the carousel
    const carousel = await ctx.runQuery(api.carousels.getCarousel, {
      carouselId,
    })

    if (!carousel) {
      throw new Error("Carousel not found")
    }

    const narrationScript = await ctx.runQuery(internal.carousels.internalGetNarrationScript, {
      carouselId,
    })
    const onStoreMedia = async (file: Blob, mimetype: string) => {
      console.log(`Storing media file with mimetype ${mimetype}`)
      const storageId: StorageID = await ctx.storage.store(file)
      return storageId
    }

    const carouselConfig = await produceCarouselConfig({
      narrationScript: narrationScript,
      openai,
      onStoreMedia
    })

    // 4. Update the carousel with the narration script
    await ctx.runMutation(internal.carousels.insertCarouselConfig, {
      carouselId,
      carouselConfig,
    })

    // 5. Update the carousel status to "producing"
    await ctx.runMutation(internal.carousels.internalPatch, {
      carouselId,
      status: "completed",
    })
  }
})

