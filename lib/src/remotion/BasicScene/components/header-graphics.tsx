import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { primary, bold, black, fontFamily } from "../font";
import { GraphicsLayer } from "../types/types";

export const HeaderGraphics = ({
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
        top: "60%",
      }}
    >
      <h1
        style={{
          opacity: contentProgress,
          transform: `translateY(${contentTranslation}px)`,

          fontSize: 80,
          color: primary,
          fontWeight: bold,
          backgroundColor: black,
          fontFamily,
          textShadow: "0 0 10px rgba(0, 0, 0, 0.6)",

          width: "fit-content",
          maxWidth: "80%",
          padding: "5px 20px",
          marginLeft: "auto",
          marginRight: "auto",

          paddingBottom: "20px",
        }}
      >
        {content}
      </h1>
    </AbsoluteFill>
  );
};
