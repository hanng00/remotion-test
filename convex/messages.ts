import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server"
import { internal } from "./_generated/api";


export const list = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const messages = await ctx.db
      .query("messages")
      .withIndex("byUser", (q) =>
        q.eq("userId", userId)
      )
      .order("asc")
      .collect()

    return messages;
  }
})

export const send = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, { content }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    await ctx.db
      .insert("messages", {
        userId,
        content,
        role: "user",
      })

    await ctx.scheduler.runAfter(0, internal.openai.chat, {
      userId,
      prompt: content,
    });
  }
})

export const internalSend = internalMutation({
  args: {
    userId: v.string(),
    role: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { userId, role, content }) => {
    await ctx.db
      .insert("messages", {
        userId,
        content,
        role,
      })
  }
})

// Creates a new message.
export const create = internalMutation({
  args: {
    userId: v.string(),
    role: v.string(),
  },
  handler: async (ctx, { userId, role }) => {
    const messageId = await ctx.db.insert("messages", { userId, role, content: "" });
    return messageId;
  },
})

// Updates a message with a new body.
export const update = internalMutation({
  args: {
    messageId: v.id("messages"),
    content: v.string(),
  },
  handler: async (ctx, { messageId, content }) => {
    await ctx.db.patch(messageId, { content });
  },
});