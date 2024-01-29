import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    slideId: v.id("slides")
  },
  handler: async (ctx, {slideId}) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const carouselId = await ctx.db
      .insert("carousels", {
        userId,
        slideId,
        status: "loading",
      })

    return carouselId
  }
})