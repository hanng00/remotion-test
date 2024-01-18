import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const ScalingFace: React.FC<{
  image: string;
}> = ({ image }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 120], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(progress, [0, 1], [1.3, 1.4]);
  const translateX = interpolate(progress, [0, 1], [-28, -30]);

  return (
    <AbsoluteFill
      style={{
        border: "10px solid black",
      }}
    >
      <img
        src={image}
        style={{
          position: "absolute",
          height: "100%",
          transform: `scale(${scale}) translateX(${translateX}%)`,
        }}
      />
    </AbsoluteFill>
  );
};
