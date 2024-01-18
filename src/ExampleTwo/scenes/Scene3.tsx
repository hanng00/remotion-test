import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Gradient } from "../components/Gradient";
import { Album, COVER_SIZE } from "../components/AlbumComponent";
import { Title } from "../components/Title";
import { Circle } from "../components/Circle";

const CIRCLE_SIZE = 500;

interface Scene3Props {
  topSongName: string;
  topSongArtistName: string;
  topSongCover: string;
}
export const Scene3: React.FC<Scene3Props> = ({
  topSongName,
  topSongArtistName,
  topSongCover,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const progress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const scale = interpolate(progress, [0, 1], [4, 1]);

  const coverOpacity = interpolate(progress, [0.7, 1], [0, 1]);
  const coverScale = interpolate(progress, [0.6, 1], [0.7, 1]);

  const UPSTART = 60;
  const upAnimation = spring({
    frame: frame - UPSTART,
    fps,
    config: {
      damping: 200,
      mass: 1.3,
    },
  });

  const contentTranslation = interpolate(upAnimation, [0, 1], [0, -150]);

  const textOpacity = (() => {
    if (frame < UPSTART) {
      return interpolate(progress, [0.7, 1], [0, 1]);
    }
    return interpolate(upAnimation, [0, 1], [1, 0]);
  })();

  const bottomTextOpacity = spring({
    frame: frame - UPSTART - 15,
    fps,
    config: {
      mass: 0.45,
    },
  });

  const artistTextOpacity = spring({
    frame: frame - UPSTART - 33,
    fps,
    config: {
      mass: 0.45,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: "blue",
      }}
    >
      <AbsoluteFill
        style={{
          transform: `translateY(${contentTranslation}px)`,
        }}
      >
        <Title style={{ top: 200, opacity: textOpacity }}>
          One song helped you get <br /> through it all
        </Title>
        <Title
          style={{
            top: 930,
            fontSize: 25,
            opacity: artistTextOpacity,
          }}
        >
          {topSongArtistName}
        </Title>

        <Title
          style={{ top: 1020, fontSize: "40px", opacity: bottomTextOpacity }}
        >
          Your top song of the year is {topSongName}
        </Title>
        <Circle
          style={{
            opacity: progress,
            left: width / 2 - CIRCLE_SIZE / 2,
            top: height / 2 - CIRCLE_SIZE / 2,
            transform: `scale(${scale})`,
          }}
          size={CIRCLE_SIZE}
        >
          <Gradient height={500} />
        </Circle>
        <div
          style={{
            left: width / 2 - COVER_SIZE / 2,
            top: height / 2 - COVER_SIZE / 2,
            position: "absolute",
            opacity: coverOpacity,
            transform: `scale(${coverScale})`,
          }}
        >
          <Album 
            imageSrc={topSongCover}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
