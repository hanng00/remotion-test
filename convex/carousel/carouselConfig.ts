import { MediaAccess, PublicSrcAccess } from "@/lib/src/carousel/types"
import { GenericQueryCtx } from "convex/server"
import { DataModel, Id, } from "../_generated/dataModel"

export const processCarouselConfigMediaAccess = async (ctx: GenericQueryCtx<DataModel>, carouselConfig: any) => {
  const getMediaUrl = async (imageMessageIdOrStorageId: string) => {
    // Here is another techniqal idiotic way I've implemented things.
    // The ID here can be EITHER an imageMessageId or a storageId (for the voice over).
    // Let's ugly fix it for now. Later, we must abstract a specific media table or similar.

    try {
      const imageMessageDoc = await ctx.db.get(imageMessageIdOrStorageId as Id<"imageMessages">)
      if (!imageMessageDoc) {
        throw new Error("Image message not found")
      }
      var storageId = imageMessageDoc.storageId
    } catch (e) {
      console.log("Not an image message id, attempting to get storage id")
      var storageId = imageMessageIdOrStorageId as Id<"_storage">
    }

    let storageItem
    try {
      storageItem = await ctx.storage.getUrl(storageId)
    } catch (e) {
      console.error("Storage item not found. The input was not an image message id nor a storage id.")
      storageItem = null
    }
    return storageItem
  }

  const processFunction = async (mediaAccess: MediaAccess) => {
    return fetchAndReplaceMediaAccess(mediaAccess, getMediaUrl)
  }

  const processedCarouselConfig = await traverseObjectAndProcessKeys(carouselConfig, "media_access", processFunction)
  return processedCarouselConfig
}

export const fetchAndReplaceMediaAccess = async (mediaAccess: MediaAccess, getMediaUrl: (imageMessageId: string) => Promise<string | null>): Promise<PublicSrcAccess> => {
  if (mediaAccess.type === 'url') {
    return mediaAccess
  }
  const imageMessageId = mediaAccess.data as Id<"imageMessages">

  const storageItem = await getMediaUrl(imageMessageId)
  if (!storageItem) {
    throw new Error("Storage item not found")
  }
  return { type: 'url', data: storageItem }
}

type AnyObject = {
  [key: string]: any;
};

export const traverseObjectAndProcessKeys = async <T extends AnyObject>(
  obj: T,
  processKey: string,
  processFunction: (value: any) => Promise<any>
): Promise<T> => {
  if (typeof obj === 'object') {
    for (const objKey in obj) {
      if (obj.hasOwnProperty(objKey)) {
        obj[objKey] = await traverseObjectAndProcessKeys(obj[objKey], processKey, processFunction);
      }
    }

    if (obj.hasOwnProperty(processKey)) {
      obj[processKey as Extract<keyof T, string>] = await processFunction(obj.media_access);
    }
  }

  return obj;
};
