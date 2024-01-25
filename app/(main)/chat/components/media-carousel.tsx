"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface MediaCarouselProps {
  currentIndex: number;
  images: string[];
  onIndexChange: (index: number) => void;
}
const MediaCarousel = ({
  currentIndex,
  images,
  onIndexChange,
}: MediaCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    currentIndex;
    if (!api) {
      return;
    }

    api.on("select", () => {
      onIndexChange(api.selectedScrollSnap());
    });

    if (api.selectedScrollSnap() !== currentIndex) {
      api.scrollTo(currentIndex);
    }
  }, [api, currentIndex, onIndexChange]);

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((url, index) => (
            <CarouselItem key={index}>
              <div>
                <img
                  className="rounded-xl overflow-hidden shadow mx-auto"
                  src={url}
                  alt="Uploaded Image"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {currentIndex + 1} of {images.length}
      </div>
    </div>
  );
};

export default MediaCarousel;
