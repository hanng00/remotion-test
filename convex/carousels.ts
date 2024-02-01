import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { carouselConfigValidator, narrationScriptValidator } from "./validators/carousels";
import { processCarouselConfigMediaAccess } from "./carousel/carouselConfig";

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

export const getCarouselConfig = query({
  args: {
    carouselId: v.id("carousels"),
  },
  handler: async (ctx, { carouselId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const carousel = await ctx.db.get(carouselId)

    if (!carousel) {
      throw new Error("Carousel not found")
    }

    if (!carousel.carouselConfigId) {
      throw new Error("No carousel config found")
    }

    const carouselConfig = await ctx.db.get(carousel.carouselConfigId)

    if (!carouselConfig) {
      throw new Error("Carousel config not found")
    }
    const processedCarouselConfig = await processCarouselConfigMediaAccess(ctx, carouselConfig.data)
    return processedCarouselConfig
  }
})

export const getMedia = query({
  args: {
    storageId: v.id("_storage")
  },
  handler: async (ctx, { storageId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const storageItem = await ctx.storage.getUrl(storageId)

    if (!storageItem) {
      throw new Error("Storage item not found")
    }

    return storageItem
  }
})


export const generateNarrationScript = mutation({
  args: {
    carouselId: v.id("carousels")
  },
  handler: async (ctx, { carouselId }) => {
    // Authenticate
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Authenticate the user access to carousel
    const carousel = await ctx.db.get(carouselId)

    if (!carousel) {
      throw new Error("Carousel not found")
    }

    if (carousel.userId !== userId) {
      throw new Error("Unauthorized")
    }

    // Ensure that the carousel is in the correct state
    if (carousel.status !== "loading") {
      return
    }
    
    await ctx.db.patch(carouselId, { status: "writing" })
    // Generate the narration script
    await ctx.scheduler.runAfter(0, internal.openai.generateNarrationScript, {
      userId,
      carouselId
    });
  }
})

export const generateCarouselConfig = mutation({
  args: {
    carouselId: v.id("carousels")
  },
  handler: async (ctx, { carouselId }) => {
    // Authenticate
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Authenticate the user access to carousel
    const carousel = await ctx.db.get(carouselId)

    if (!carousel) {
      throw new Error("Carousel not found")
    }

    if (carousel.userId !== userId) {
      throw new Error("Unauthorized")
    }

    if (carousel.status !== "producing") {
      return
    }

    // Generate the carousel config
    await ctx.scheduler.runAfter(0, internal.openai.generateCarouselConfig, {
      userId,
      carouselId
    });

  }
})

/* INTERNAL MUTATIONS */

export const internalGetNarrationScript = internalQuery({
  args: {
    carouselId: v.id("carousels")
  },
  handler: async (ctx, { carouselId }) => {
    const carousel = await ctx.db.get(carouselId)

    if (!carousel) {
      throw new Error("Carousel not found")
    }

    if (!carousel.narrationScriptId) {
      throw new Error("No narration script found")
    }

    const narrationScript = await ctx.db.get(carousel.narrationScriptId)

    if (!narrationScript) {
      throw new Error("Narration script not found")
    }

    return narrationScript.data
  }
})

export const internalPatch = internalMutation({
  args: {
    carouselId: v.id("carousels"),
    status: v.optional(v.string()),   // TODO - Add enum
  },
  handler: async (ctx, { carouselId, status }) => {
    // TODO FIX - Super ugly solution
    const patchObject = Object.create(null);
    if (status) patchObject["status"] = status

    await ctx.db.patch(carouselId, patchObject);
  }
})


export const insertNarrationScript = internalMutation({
  args: {
    carouselId: v.id("carousels"),
    narrationScript: narrationScriptValidator,
  },
  handler: async (ctx, { carouselId, narrationScript }) => {
    // TWO-WAY RELATION : carousel <-> narrationScript
    const narrationScriptId = await ctx.db.insert("narrationScripts", {
      carouselId,
      data: narrationScript,
    })

    await ctx.db.patch(carouselId, { narrationScriptId })
  }
})

export const insertCarouselConfig = internalMutation({
  args: {
    carouselId: v.id("carousels"),
    carouselConfig: carouselConfigValidator,
  },
  handler: async (ctx, { carouselId, carouselConfig }) => {
    // TWO-WAY RELATION : carousel <-> narrationScript
    const carouselConfigId = await ctx.db.insert("carouselConfigs", {
      carouselId,
      data: carouselConfig,
    })

    await ctx.db.patch(carouselId, { carouselConfigId })
  }
})