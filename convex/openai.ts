"use node"

import { internalAction } from "./_generated/server"
import { v } from "convex/values"
import { internal } from "./_generated/api"
import { waitUntilReadableStreamFinishes } from "@/lib/openai"
import { ChatService } from "@/lib/services/ChatService/chat-service"
import { instruction } from "@/lib/services/ChatService/instructions"


export const chat = internalAction({
  args: {
    userId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, { userId, prompt }) => {
    const messageId = await ctx.runMutation(internal.messages.create, {
      userId,
      role: "assistant"
    })

    const messageHistory = [
      {
        role: "system",
        content: instruction,
      },
      {
        role: "user",
        content: prompt,
      },
    ]

    // TODO - Clean this up. It is an absolute, stressed mess.

    const onCompletion = async (completion: string) => {
      const isFunctionCall = isJSONString(completion)
      if (isFunctionCall) {
        const { name, arguments: funcArgs } = JSON.parse(completion)
        // TODO : Do something with the function call

        console.log("Action recieved", name, funcArgs)
        return
      }

      // No function call => Update the content of the message
      console.log("onCompletion", completion)
      await ctx.runMutation(internal.messages.update, {
        messageId,
        content: completion
      })
    }
    const stream = await ChatService({
      messages: messageHistory,
      model: 'gpt-4-1106-preview',
      max_tokens: 150,
      onCompletion: onCompletion
    })

    await waitUntilReadableStreamFinishes(stream)
  }
})

const isJSONString = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
