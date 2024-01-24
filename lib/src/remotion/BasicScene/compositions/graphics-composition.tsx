import { AbsoluteFill, Sequence } from "remotion";
import { VIDEO_FPS } from "../types/constants";
import { CaptionsGraphics } from "../components/captions-graphics";
import { HeaderGraphics } from "../components/header-graphics";
import { LocationGraphics } from "../components/location-graphics";
import { SubheaderGraphics } from "../components/subheader-graphics";
import { GraphicsLayer } from "../types/types";

interface GraphicsCompositionProps {
  graphics: GraphicsLayer[];
}

export const GraphicsComposition = ({ graphics }: GraphicsCompositionProps) => {
  const graphicsToComponent = (graphic: GraphicsLayer) => {
    switch (graphic.type) {
      case "header":
        return (
          <HeaderGraphics
            type={graphic.type}
            content={graphic.content}
            start_time={graphic.start_time}
            end_time={graphic.end_time}
          />
        );
      case "subheader":
        return (
          <SubheaderGraphics
            type={graphic.type}
            content={graphic.content}
            start_time={graphic.start_time}
            end_time={graphic.end_time}
          />
        );
      case "captions":
        return (
          <CaptionsGraphics
            type={graphic.type}
            content={graphic.content}
            start_time={graphic.start_time}
            end_time={graphic.end_time}
          />
        );
      case "location":
        return (
          <LocationGraphics
            type={graphic.type}
            content={graphic.content}
            start_time={graphic.start_time}
            end_time={graphic.end_time}
          />
        );
      default:
        return null;
    }
  };

  const getDurationInFrames = (
    start_time: number,
    end_time: number,
    video_fps: number
  ): number => {
    return (end_time - start_time) * video_fps;
  };

  return (
    <AbsoluteFill>
      {graphics.map((graphic) => {
        const key = graphic.type + "@" + graphic.content;
        const endTime = graphic.end_time || Infinity;
        return (
          <Sequence
            name={key}
            key={key}
            from={graphic.start_time * VIDEO_FPS}
            durationInFrames={getDurationInFrames(
              graphic.start_time,
              endTime,
              VIDEO_FPS
            )}
          >
            {graphicsToComponent(graphic)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
