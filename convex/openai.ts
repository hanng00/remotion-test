"use node"

import OpenAI from "openai"
import { action } from "./_generated/server"
import { v } from "convex/values"
import { internal } from "./_generated/api"
import { OpenAIStream } from "ai"
import { waitUntilReadableStreamFinishes } from "@/lib/openai"

const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey })

export const chat = action({
  args: {
    userId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, { userId, prompt }) => {
    const messageId = await ctx.runMutation(internal.messages.create, {
      userId,
      role: "assistant"
    })
    const response = await openai.chat.completions.create({
      // model: 'gpt-3.5-turbo-16k-0613',
      model: "gpt-4-1106-preview",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "Your name is Irja. Answer like it's a chat conversation. Keep sentences to 1-2. Don't be afraid to be silly",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Here we define a Promise, that only resolves when onCompletion is called.
    // Only then, do we return the action.


    var content = ""
    const stream = OpenAIStream(response,
      {
        onToken: async (token: string) => {
          console.log("onToken", token)
          content += token
          await ctx.runMutation(internal.messages.update, {
            messageId,
            content
          })
        },
      }
    )

    await waitUntilReadableStreamFinishes(stream)
  }
})
