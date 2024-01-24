import { Sequence } from "remotion";
import { MediaComposition } from "./compositions/media-composition";
import { GraphicsComposition } from "./compositions/graphics-composition";
import { VIDEO_FPS } from "./types/constants";
import { WatermarkComposition } from "./compositions/watermark-composition";
import { MainComposition } from "./types/types";
import { OldCarouselOverlay } from "./components/old-carousel-overlay";

const CAROUSEL_LENGTH_IN_FPS = VIDEO_FPS * 15;

export const Main = ({
  media_composition,
  graphics_composition,
}: MainComposition) => {
  return (
    <>
      <Sequence
        name="Media Composition"
        from={0}
        durationInFrames={CAROUSEL_LENGTH_IN_FPS}
      >
        <MediaComposition
          user_photos={media_composition.user_photos}
          stock_video={media_composition.stock_video}
          voice_over={media_composition.voice_over}
          background_music={media_composition.background_music}
        />
      </Sequence>

      <Sequence
        name="Graphics Composition"
        style={{
          zIndex: 10,
        }}
        from={0}
        durationInFrames={CAROUSEL_LENGTH_IN_FPS}
      >
        <GraphicsComposition graphics={graphics_composition} />
      </Sequence>

      <Sequence
        name="VFX Overlay"
        style={{
          zIndex: 20,
        }}
        from={0}
        durationInFrames={Infinity}
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
