import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from "remotion";
import { fontFamily, semibold } from "../font";
import { GraphicsLayer } from "../types/types";

export const SubheaderGraphics = ({
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
    <AbsoluteFill
      style={{
        top: "73%",
      }}
    >
      <h1
        style={{
          opacity: contentProgress,
          transform: `translateY(${contentTranslation}px)`,

          fontSize: 40,
          color: "white",
          fontFamily,
          fontWeight: semibold,
          textShadow: "0 0 10px rgba(0, 0, 0, 0.6)",

          textAlign: "center",
        }}
      >
        {content}
      </h1>
    </AbsoluteFill>
  );
};
