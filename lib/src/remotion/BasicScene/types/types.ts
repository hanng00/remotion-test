import { GraphicsTypeSchema, GraphicsLayerSchema, MediaLayerSchema, MainCompositionSchema } from "./schema";

import { z } from "zod";

export type GraphicsType = z.infer<typeof GraphicsTypeSchema>;
export type GraphicsLayer = z.infer<typeof GraphicsLayerSchema>;
export type MediaLayer = z.infer<typeof MediaLayerSchema>;
export type MainComposition = z.infer<typeof MainCompositionSchema>;