import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server"
import { listMessagesWithContent } from "./messages/listWithContent";

/* PUBLIC API */
export const listWithContent = query({
  args: {
    slideId: v.id("slides"),
  },
  handler: async (ctx, { slideId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const messagesWithContent = await listMessagesWithContent(
      ctx.db, slideId, userId
    )
    return messagesWithContent
  }
})

export const list = query({
  args: {
    slideId: v.id("slides"),
  },
  handler: async (ctx, { slideId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const messages = await ctx.db
      .query("messages")
      .withIndex("byUserSlide", (q) =>
        q
          .eq("userId", userId)
          .eq("slideId", slideId)
      )
      .order("asc")
      .collect()

    return messages;
  }
})

export const internalListWithContent = internalQuery({
  args: {
    userId: v.string(),
    slideId: v.id("slides"),
    last: v.number()
  },
  handler: async (ctx, { userId, slideId, last }) => {
    const messagesWithContent = await listMessagesWithContent(
      ctx.db, slideId, userId
    )
    return messagesWithContent.slice(messagesWithContent.length - last, messagesWithContent.length)
  }
})

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
