import { useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface ImageWithFadeInProps {
  src: string;
  start_time?: number;
  end_time?: number;
}

export const ImageWithFadeIn = ({
  src,
  start_time = 0,
  end_time = Infinity,
}: ImageWithFadeInProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const upAnimation = spring({
    frame: frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const contentTranslation = interpolate(upAnimation, [0, 1], [200, 0]);

  const randomScale = useMemo(() => {
    const [minScale, maxScale] = [0.9, 1.1];
    return random(null) * (maxScale - minScale) + minScale;
  }, []);
  const fadeInScale = (() => {
    if (frame < 20) {
      return 0.1;
    }
    return 0.0;
  })();


  return (
    <AbsoluteFill
      style={{
        transform: `translateY(${contentTranslation}px)`,
        opacity: upAnimation,
        zIndex: 1,
      }}
    >
      <Img
        about="User Photo"
        style={{
          width: "100%",
          maxWidth: "90%",
          height: "auto",
          margin: "auto",
          transform: `scale(${randomScale + fadeInScale})`,
        }}
        src={src}
      />
    </AbsoluteFill>
  );
};
