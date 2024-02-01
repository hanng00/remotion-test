import { z } from "zod";
import { NarrationScriptMediaItemSchema, NarrationScriptSchema, NarrationScriptTextItemSchema } from "./entites/narration-script";
import { GraphicsLayerSchema, MainCompositionSchema, MediaAccessSchema, MediaCompositionSchema, MediaLayerSchema, PublicSrcAccessSchema, StorageIDAccessSchema, StorageIDSchema } from "./entites/carousel-config";

export type PublicSrcAccess = z.infer<typeof PublicSrcAccessSchema>
export type StorageIDAccess = z.infer<typeof StorageIDAccessSchema>
export type MediaAccess = z.infer<typeof MediaAccessSchema>
/* STORAGE ID */
export type StorageID = z.infer<typeof StorageIDSchema>

/* NARRATION SCRIPT TYPES & SCHEMAS */
export type NarrationScriptTextItem = z.infer<typeof NarrationScriptTextItemSchema>
export type NarrationScriptMediaItem = z.infer<typeof NarrationScriptMediaItemSchema>
export type NarrationScript = z.infer<typeof NarrationScriptSchema>


/* CAROUSEL GENERATION TYPES */
export type GraphicsLayer = z.infer<typeof GraphicsLayerSchema>

export type MediaLayer = z.infer<typeof MediaLayerSchema>
export type MediaComposition = z.infer<typeof MediaCompositionSchema>
export type MainComposition = z.infer<typeof MainCompositionSchema>
