import { z } from "zod"

export const NarrationScriptTextItemSchema = z.object({
  type: z.literal("narration"),
  content: z.string()
})

export const NarrationScriptMediaItemSchema = z.object({
  type: z.literal("media"),
  id: z.string()
})

export const NarrationScriptSchema = z.array(z.union([NarrationScriptTextItemSchema, NarrationScriptMediaItemSchema]))

export const ReponseNarrationScriptSchema = z.object({
  script: NarrationScriptSchema
})