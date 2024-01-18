import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Gradient } from "./Gradient";

export const GradientCircle: React.FC = () => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = spring({
    frame,
    fps,
    config: {
      mass: 4,
      damping: 1000,
    },
  });
  const size = height * 1.5;
  return (
    <AbsoluteFill>
      <div
        style={{
          height: size,
          width: size,
          borderRadius: size / 2,
          left: -(size - width) / 2,
          top: -(size - height) / 2,
          transform: `scale(${progress})`,
          position: "absolute",
          background: "white",
          overflow: "hidden",
          opacity: progress,
        }}
      >
        <Gradient height={height} />
      </div>
    </AbsoluteFill>
  );
};

/* export const GradientCircle: React.FC = () => {
  const { width, height } = useVideoConfig();
  const CIRCLE_SIZE = 500;
  return (
    <AbsoluteFill>
      <Circle
        style={{
          left: width / 2 - CIRCLE_SIZE / 2,
          top: height / 2 - CIRCLE_SIZE / 2,
        }}
        size={CIRCLE_SIZE}
      >
        <Gradient height={500} />
      </Circle>
    </AbsoluteFill>
  );
}; */
