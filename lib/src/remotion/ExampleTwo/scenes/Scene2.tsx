import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Title } from "../components/Title";
import { Bar } from "../components/Bar";

const BAR_DATA = [
  {
    color: "white",
    endWidthOffset: 0,
    rank: 1,
    genre: "Pop",
  },
  {
    color: "yellow",
    endWidthOffset: 60,
    rank: 2,
    genre: "Hip Hop",
  },
  {
    color: "blue",
    endWidthOffset: 120,
    rank: 3,
    genre: "Rock",
  },
  {
    color: "black",
    endWidthOffset: 180,
    rank: 4,
    genre: "R&B",
  },
  {
    color: "white",
    endWidthOffset: 240,
    rank: 5,
    genre: "Country",
  },
];

const TITLE_OFFSET = 150;
const FONT_SIZE = 50;

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, fps } = useVideoConfig();

  const moveUp = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const translateY = interpolate(moveUp, [0, 1], [100, 0]);

  return (
    <AbsoluteFill style={{ flex: 1, backgroundColor: "#ff00a6" }}>
      <AbsoluteFill
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        <Title
          style={{
            fontSize: FONT_SIZE,
            top: TITLE_OFFSET,
          }}
        >
          Your top genres where
        </Title>
        <div style={{ height: 290 }} />
        {BAR_DATA.map((barData) => {
          return (
            <Bar
              key={barData.rank}
              color={barData.color}
              endWidth={width / 2 - barData.endWidthOffset}
              rank={barData.rank}
              genre={barData.genre}
            />
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
