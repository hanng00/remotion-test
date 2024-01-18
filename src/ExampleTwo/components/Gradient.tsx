import { useVideoConfig, AbsoluteFill, useCurrentFrame } from "remotion";

const GRADIENT_VALUE = `linear-gradient(to bottom, green, yellow, red, black, purple, blue, green)`;

interface GradientProps {
  height: number;
}

export const Gradient = ({ height }: GradientProps) => {
  const frame = useCurrentFrame();

  const duration = 4 * 30; // 4 Seconds * 30 FPS
  const offset = height * 1.5 * ((frame % duration) / duration);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateY(-${offset}px)`,
          height: height * 1.5,
          background: GRADIENT_VALUE,
        }}
      />
      <AbsoluteFill
        style={{
          transform: `translateY(-${offset}px)`,
          height: height * 1.5,
          top: height * 1.5 - 1,
          background: GRADIENT_VALUE,
        }}
      />
    </AbsoluteFill>
  );
};
