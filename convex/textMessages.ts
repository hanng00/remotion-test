import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";
import { internal } from "./_generated/api";

/* PUBLIC API */

export const insert = mutation({
  args: {
    slideId: v.id("slides"),
    content: v.string(),
  },
  handler: async (ctx, { slideId, content }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    // TWO-WAY RELATION : messages <-> textMessages
    // First, create new abstract message
    const messageId = await ctx.db
      .insert("messages", {
        userId,
        slideId,
        messageType: "text",
      })
    // Second, create new text message
    const textMessage = await ctx.db
      .insert("textMessages", {
        messageId,
        role: "user",
        content,
      })
    // Third, update abstract message with text message.
    await ctx.db.patch(messageId, { messageId: textMessage })

    // Let Irja Respond
    await ctx.scheduler.runAfter(0, internal.openai.chat, {
      userId,
      slideId,
      prompt: content,
    });
  }
})

/* INTERNAL */

export const internalInsert = internalMutation({
  args: {
    userId: v.string(),
    slideId: v.id("slides"),
    role: v.string(),
    content: v.string(),
    function_call: v.optional(v.object({
      name: v.string(),
      arguments: v.string()
    })),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { userId, slideId, role, content, function_call, name }) => {
    // TWO-WAY RELATION : messages <-> textMessages

    // First, create new abstract message
    const messageId = await ctx.db
      .insert("messages", {
        userId,
        slideId,
        messageType: "text",
      })

    // Second, create new text message
    const textMessage = await ctx.db
      .insert("textMessages", {
        messageId,

        content,
        role,
        function_call,
        name
      })

    // Third, update abstract message with text message.
    await ctx.db.patch(messageId, { messageId: textMessage })
  }
})