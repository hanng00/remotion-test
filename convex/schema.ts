import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { carouselConfigValidator, narrationScriptValidator } from "./validators/carousels";

export default defineSchema({
  slides: defineTable({
    userId: v.string(),
  })
    .index("byUser", ["userId"]),
  messages: defineTable({
    userId: v.string(),
    slideId: v.id("slides"),

    messageType: v.union(v.literal("text"), v.literal("image")),
    messageId: v.optional(
      v.union(
        v.id("textMessages"),
        v.id("imageMessages")
      )
    ),
  })
    .index("byUserSlide", ["userId", "slideId"]),

  textMessages: defineTable({
    messageId: v.id("messages"),

    role: v.string(),
    content: v.string(),
    name: v.optional(v.string()),
    function_call: v.optional(v.object(
      {
        name: v.string(),
        arguments: v.string()
      }
    ))
  }),
  imageMessages: defineTable({
    messageId: v.id("messages"),

    storageId: v.id("_storage"),
    mimetype: v.string(),
    status: v.optional(
      v.union(
        v.literal("loading"),
        v.literal("analysing"),
        v.literal("completed"),
      )),
    transcription: v.optional(v.string()),

  }),
  carousels: defineTable({
    userId: v.string(),
    slideId: v.id("slides"),
    status: v.union(
      v.literal("loading"),
      v.literal("writing"),
      v.literal("producing"),
      v.literal("completed")
    ),
    narrationScriptId: v.optional(v.id("narrationScripts")),
    carouselConfigId: v.optional(v.id("carouselConfigs"))
  })
    .index("byUserSlides", ["userId", "slideId"])
    .index("byUser", ["userId"])
    .index("bySlide", ["slideId"]),
  narrationScripts: defineTable({
    carouselId: v.id("carousels"),
    data: narrationScriptValidator,
  })
    .index("byCarousel", ["carouselId"]),
  carouselConfigs: defineTable({
    carouselId: v.id("carousels"),
    data: carouselConfigValidator,
  })
});