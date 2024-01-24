import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const BAR_HEIGHT = 150;

type BarProps = {
  color: string;
  endWidth: number;
};

type BarContainerProps = BarProps & {
  rank: number;
  genre: string;
};

export const BarContainer: React.FC<
  BarProps & React.HTMLProps<HTMLDivElement>
> = ({ color, endWidth, ...rest }) => {
  return (
    <div
      style={{
        width: endWidth + BAR_HEIGHT / 2,
        height: 150,
        backgroundColor: color,
        borderRadius: BAR_HEIGHT / 2,
        marginTop: 10,
        boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
        ...rest.style,
      }}
    ></div>
  );
};
export const Row: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "white",
        fontSize: 28,
        fontFamily: "--apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "bold",
        lineHeight: 1.7,
        textShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
};

const TOTAL_RANKS = 5; // TODO: Extract

export const Bar: React.FC<BarContainerProps> = ({
  color,
  endWidth,
  rank,
  genre,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const opacity = interpolate(
    frame - (TOTAL_RANKS - rank) * 3 - 10,
    [0, 8],
    [0, 1]
  );
  const animatedWidthProgress = spring({
    frame: frame - 80 - rank * 3,
    fps,
    config: {
      damping: 200,
    },
  });
  const animatedWidth = interpolate(
    animatedWidthProgress,
    [0, 1],
    [BAR_HEIGHT, endWidth + 100]
  );
  const leftStartingPosition = width / 2 - BAR_HEIGHT / 2;
  const left = interpolate(
    animatedWidthProgress,
    [0, 1],
    [leftStartingPosition, -BAR_HEIGHT / 2]
  );

  const labelProgress = spring({
    frame: frame - 120 - rank * 20,
    fps,
    config: {
      damping: 200,
      mass: 0.5,
    },
  });

  return (
    <Row style={{ width: 2000 }}>
      <BarContainer
        style={{
          opacity: opacity,
          width: animatedWidth,
          marginLeft: left,
        }}
        color={color}
        endWidth={endWidth}
      ></BarContainer>
      <div
        style={{
          width: 40,
        }}
      />
      <div
        style={{
          opacity: labelProgress,
          transform: `translateY(${interpolate(
            labelProgress,
            [0, 1],
            [100, 0]
          )}px)`,
        }}
      >
        #{rank}
        <br />
        {genre}
      </div>
    </Row>
  );
};
