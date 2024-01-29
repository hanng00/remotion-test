import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/* PUBLIC API */
export const list = query({
  args: {
  },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const carousels = await ctx.db
      .query("carousels")
      .withIndex("byUser", (q) =>
        q
          .eq("userId", userId)
      )
      .order("asc")
      .collect()

    return carousels;
  }

})

export const create = mutation({
  args: {
    slideId: v.id("slides")
  },
  handler: async (ctx, { slideId }) => {
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

export const getCarousel = query({
  args: {
    carouselId: v.id("carousels")
  },
  handler: async (ctx, { carouselId }) => {
    return await ctx.db.get(carouselId)
  }
})