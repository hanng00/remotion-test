import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { listImageDescriptionsService } from "./messages/listImageDescriptions";

/* PUBLIC API */
export const listImageDescriptions = query({
  args: {
    slideId: v.id("slides"),
  },
  handler: async (ctx, { slideId }) => {
    // TODO - Add Auth
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const imageDescriptions = await listImageDescriptionsService({
      db: ctx.db,
      userId,
      slideId
    })

    const returnObject = imageDescriptions.map(({ _id, _creationTime, transcription }) => {
      return {
        _id,
        _creationTime,
        transcription
      }
    })
    return returnObject
  }
})

export const sendImage = mutation({
  args: {
    storageId: v.id("_storage"),
    slideId: v.id("slides"),
  },
  handler: async (ctx, { storageId, slideId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // TWO-WAY RELATION : messages <-> textMessages

    // First, create new abstract message
    const messageId = await ctx.db.insert("messages", {
      userId: userId,
      slideId: slideId,
      messageType: "image",
    });

    // Second, create new image message
    const imageMessage = await ctx.db.insert("imageMessages", {
      messageId: messageId,
      storageId: storageId,
      mimetype: "image",
      status: "loading",
    });

    // Third, update abstract message with image message.
    await ctx.db.patch(messageId, { messageId: imageMessage });

    // Trigger the image analysis backend
    await ctx.scheduler.runAfter(0, internal.openai.imageAnalysis, {
      userId,
      slideId,
      imageMessageId: imageMessage,
    });
  },
});

export const getImageUrl = query({
  args: {
    messageId: v.id("imageMessages"),
  },
  handler: async (ctx, { messageId }) => {
    // TODO - Add Auth

    const imageMessage = await ctx.db.get(messageId);
    if (!imageMessage) return null

    const imageMessagesWithUrl = await ctx.storage.getUrl(imageMessage.storageId);

    return imageMessagesWithUrl;
  }
})


/* INTERNAL */

export const internalPatch = internalMutation({
  args: {
    messageId: v.id("imageMessages"),
    status: v.optional(v.string()),   // TODO - Add enum
    transcription: v.optional(v.string()),
  },
  handler: async (ctx, { messageId, status, transcription }) => {
    // TODO FIX - Super ugly solution
    const patchObject = Object.create(null);
    if (status) patchObject["status"] = status
    if (transcription) patchObject["transcription"] = transcription

    await ctx.db.patch(messageId, patchObject);
  }
})

export const internalListImageDescriptions = internalQuery({
  args: {
    userId: v.string(),
    slideId: v.id("slides"),
  },
  handler: async (ctx, { userId, slideId }) => {
    const imageDescriptions = await listImageDescriptionsService({
      db: ctx.db,
      userId,
      slideId
    })

    return imageDescriptions
  }
})