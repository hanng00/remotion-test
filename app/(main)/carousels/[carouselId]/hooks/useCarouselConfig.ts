import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel"
import { MainComposition } from "@/lib/src/carousel/types";
import { useQuery } from "convex/react";

interface UseCarouselConfigProps {
  carousel: Doc<"carousels">
}

export const useCarouselConfig = ({ carousel }: UseCarouselConfigProps) => {
  const carouselConfig = useQuery(api.carousels.getCarouselConfig, {
    carouselId: carousel._id,
  });

  const computeDuration = (carouselConfig: MainComposition | null) => {
    if (!carouselConfig) {
      return null
    }
    const captionLayers = carouselConfig.graphics_composition.flatMap((layer) => {
      if (layer.type === "captions") {
        return layer
      } else {
        return []
      }
    })

    const smallestStartTime = captionLayers.reduce((acc, layer) => {
      if (layer.start_time < acc) {
        return layer.start_time
      } else {
        return acc
      }
    }, Infinity)

    const largestEndTime = captionLayers.reduce((acc, layer) => {
      if (layer.end_time && layer.end_time > acc) {
        return layer.end_time
      } else {
        return acc
      }
    }, 0)

    return Math.floor(largestEndTime - smallestStartTime)

  }
  const duration = computeDuration(carouselConfig)

  return ({ carouselConfig, duration })
}