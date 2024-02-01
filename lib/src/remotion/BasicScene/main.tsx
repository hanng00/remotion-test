import { MainComposition } from "@/lib/src/carousel/types";
import { Sequence } from "remotion";
import { OldCarouselOverlay } from "./components/old-carousel-overlay";
import { GraphicsComposition } from "./compositions/graphics-composition";
import { MediaComposition } from "./compositions/media-composition";
import { WatermarkComposition } from "./compositions/watermark-composition";

export const Main = ({
  media_composition,
  graphics_composition,
}: MainComposition) => {
  return (
    <>
      <Sequence name="Media Composition">
        <MediaComposition
          user_media={media_composition.user_media}
          stock_media={media_composition.stock_media}
          voice_over={media_composition.voice_over}
          background_music={media_composition.background_music}
        />
      </Sequence>

      <Sequence
        name="Graphics Composition"
        style={{
          zIndex: 10,
        }}
      >
        <GraphicsComposition graphics={graphics_composition} />
      </Sequence>

      <Sequence
        name="VFX Overlay"
        style={{
          zIndex: 20,
        }}
      >
        <OldCarouselOverlay />
      </Sequence>

      <Sequence
        name="Watermark Composition"
        style={{
          zIndex: 30,
        }}
      >
        <WatermarkComposition />
      </Sequence>
    </>
  );
};
