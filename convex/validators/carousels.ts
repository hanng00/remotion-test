import { v } from "convex/values"

/* NARRATION SCRIPT */
export const NarrationScriptTextItemSchema = v.object({
  type: v.literal("narration"),
  content: v.string()
})

export const NarrationScriptMediaItemSchema = v.object({
  type: v.literal("media"),
  id: v.string()
})

export const narrationScriptValidator = v.array(v.union(NarrationScriptTextItemSchema, NarrationScriptMediaItemSchema)) 


/* CAROUSEL CONFIG */

export const carouselConfigValidator = v.any()