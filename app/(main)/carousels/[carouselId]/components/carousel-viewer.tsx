"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { Main } from "@/lib/src/remotion/BasicScene/main";

import { Player } from "@remotion/player";
import { useCarouselConfig } from "../hooks/useCarouselConfig";
import { useRemotionPlayer } from "../hooks/useRemotionPlayer";

interface CarouselViewerProps {
  carousel: Doc<"carousels">;
}

const CarouselViewer = ({ carousel }: CarouselViewerProps) => {
  const { carouselConfig, duration } = useCarouselConfig({ carousel });
  const { width, height, fps } = useRemotionPlayer({ carouselConfig });

  if (!carouselConfig || !duration) {
    return null;
  }

  return (
    <div className="h-dvh flex flex-col">
      <h1 className="font-bold text-2xl py-4">Your Carousel</h1>
      <div className="h-full w-full">
        <div className="h-full w-auto mx-auto shadow border rounded-2xl overflow-hidden">
          <Player
            component={Main}
            durationInFrames={(duration + 2) * fps}
            fps={fps}
            compositionHeight={height}
            compositionWidth={width}
            style={{
              height: "100%",
              width: "auto",
            }}
            inputProps={carouselConfig}
            controls
            loop
          />
        </div>
      </div>
      <div className="h-16 py-4" />
    </div>
  );
};

export default CarouselViewer;
