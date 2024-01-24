import { z } from "zod";

/* MEDIA COMPOSITION */
export const MediaLayerSchema = z.object({
  src: z.string(),
  start_time: z.number().optional(),
  end_time: z.number().optional(),
});

const MediaCompositionSchema = z.object({
  user_photos: z.array(MediaLayerSchema),
  stock_video: MediaLayerSchema,
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