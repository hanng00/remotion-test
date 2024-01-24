import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GraphicsLayer } from "../types/types";
import { black, fontFamily, bold } from "../font";

export const LocationGraphics = ({
  type,
  content,
  start_time,
  end_time,
}: GraphicsLayer) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contentProgress = spring({
    frame: frame,
    fps: fps,
    config: {
      damping: 200,
    },
  });

  const contentTranslation = interpolate(contentProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill>
      <h1
        style={{
          opacity: contentProgress,
          transform: `translateY(${contentTranslation}px)`,

          fontSize: 25,
          color: "white",
          backgroundColor: black,
          padding: "5px 20px",
          width: "fit-content",

          marginLeft: 20,
          textAlign: "left",
          fontFamily,
          fontWeight: bold,
        }}
      >
        {content}
      </h1>
    </AbsoluteFill>
  );
};
