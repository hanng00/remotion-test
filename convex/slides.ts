// Create new slide

import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";


/* PUBLIC API */

export const get = internalQuery({
  args: {
    slideId: v.id("slides")
  },
  handler: async (ctx, { slideId }) => {
    return await ctx.db.get(slideId)
  }
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const slides = await ctx.db
      .query("slides")
      .withIndex("byUser", (q) =>
        q
          .eq("userId", userId)
      )
      .order("asc")
      .collect()

    return slides;
  }
})

export const create = mutation({
  args: {},
  handler: async (ctx, { }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const slideId = await ctx.db
      .insert("slides", {
        userId,
      })

    return slideId
  }

})