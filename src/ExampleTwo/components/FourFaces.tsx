import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ScalingFace } from "./ScalingFace";

export const FourFaces: React.FC<{
  image: string;
}> = ({ image }) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const scalingFaceStyles = [
    {
      width: width / 2,
      height: height / 2,
      left: 0,
      top: 0,
    },
    {
      width: width / 2,
      height: height / 2,
      left: width / 2,
      top: 0,
      transform: "scaleX(-1)",
    },
    {
      width: width / 2,
      height: height / 2,
      left: 0,
      top: height / 2,
      transform: "scaleY(-1)",
    },
    {
      width: width / 2,
      height: height / 2,
      left: width / 2,
      top: height / 2,
      transform: "scaleY(-1) scaleX(-1)",
    },
  ];

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 200,
      mass: 3,
    },
  });

  const offsetX = interpolate(progress, [0, 1], [width / 3, -5]);
  const offsetY = interpolate(progress, [0, 1], [height / 3, -5]);
  const clipPath = `inset(${offsetY}px ${offsetX}px ${offsetY}px ${offsetX}px)`;
  const opacity = interpolate(progress, [0, 0.5], [0, 0.5]);

  return (
    <AbsoluteFill
      style={{
        clipPath,
        opacity,
      }}
    >
      {scalingFaceStyles.map((style, index) => (
        <AbsoluteFill
          key={index}
          style={{
            ...style,
            backgroundColor: "red",
            overflow: "hidden",
          }}
        >
          <ScalingFace image={image} />
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  );
};
