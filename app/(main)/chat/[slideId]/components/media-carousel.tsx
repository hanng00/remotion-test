"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Doc } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import ImageDisplayConvex from "./image-display-convex";

interface MediaCarouselProps {
  mediaIndex: number;
  onMediaIndexChange: (index: number) => void;

  imageMessages: Doc<"imageMessages">[];
}
const MediaCarousel = ({
  mediaIndex,
  onMediaIndexChange,
  imageMessages,
}: MediaCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      onMediaIndexChange(api.selectedScrollSnap());
    });

    api.on("slidesChanged", () => {
      // When a new slide is added, scroll to that
      onMediaIndexChange(imageMessages.length)
    })

    if (api.selectedScrollSnap() !== mediaIndex) {
      api.scrollTo(mediaIndex);
    }
  }, [api, mediaIndex, onMediaIndexChange, imageMessages.length]);

  if (imageMessages.length == 0) {
    return (
      <div className="w-full h-full flex items-center flex-col justify-center space-y-2 rounded-2xl p-2">
        <h1 className="font-bold text-2xl">No images</h1>
        <p className="text-sm text-foreground/50">
          Upload an image to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      <Carousel setApi={setApi} className="h-full">
        <CarouselContent>
          {imageMessages &&
            imageMessages.map((msg, index) => (
              <CarouselItem key={index} className="h-full w-full">
                <ImageDisplayConvex key={index} imageMessage={msg} />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {mediaIndex + 1} of {imageMessages.length}
        </div>
      </Carousel>
    </>
  );
};

export default MediaCarousel;
