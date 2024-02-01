import { z } from "zod";

/* STORAGE ID */
export const StorageIDSchema = z.string();

/* MEDIA ACCESS OBJECT */
export const PublicSrcAccessSchema = z.object({
  type: z.literal("url"),
  data: z.string()
})
export const StorageIDAccessSchema = z.object({
  type: z.literal("storageId"),
  data: z.string()
})
export const MediaAccessSchema = z.union([PublicSrcAccessSchema, StorageIDAccessSchema])

/* MEDIA COMPOSITION */
export const MediaTypeSchema = z.union([
  z.literal("image"),
  z.literal("video"),
  z.literal("audio"),
]);

export const MediaLayerSchema = z.object({
  type: MediaTypeSchema,
  // src: z.string(),
  start_time: z.number().optional(),
  end_time: z.number().optional(),
  media_access: MediaAccessSchema.optional(),
});

export const MediaCompositionSchema = z.object({
  user_media: z.array(MediaLayerSchema),
  stock_media: MediaLayerSchema,
  voice_over: MediaLayerSchema,
  background_music: MediaLayerSchema,
});

/* GRAPHICS COMPOSITION */
export const GraphicsTypeSchema = z.union([
  z.literal("header"),
  z.literal("subheader"),
  z.literal("captions"),
  z.literal("location"),
]);

export const GraphicsLayerSchema = z.object({
  type: GraphicsTypeSchema,
  content: z.string(),
  start_time: z.number(),
  end_time: z.number().optional(),
});

const GraphicsCompositionSchema = z.array(GraphicsLayerSchema);

/* MAIN COMPOSITION SCHEMA */
export const MainCompositionSchema = z.object({
  media_composition: MediaCompositionSchema,
  graphics_composition: GraphicsCompositionSchema,
});