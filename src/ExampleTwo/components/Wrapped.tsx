import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Title } from "./Title";

const Container: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => {
  return (
    <div
      style={{
        padding: "80px 80px",
        display: "flex",
        flex: 1,
      }}
    >
      {children}
    </div>
  );
};

export const Wrapped: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });
  const scale = interpolate(progress, [0, 1], [0.7, 1]);

  const titleProgress = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 200,
    },
  });

  return (
    <Container>
      <div style={{ flex: 1, position: "relative" }}>
        <AbsoluteFill
          style={{
            background: "#fcedfb",
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            transform: `scale(${scale})`,
            opacity: progress,
          }}
        >
          <Title
            style={{
              fontSize: 90,
              fontWeight: "bold",
              textShadow: "",
              color: "#fc03e8",
              opacity: titleProgress,
            }}
          >
            2020 <br /> Wrapped
          </Title>
        </AbsoluteFill>
      </div>
    </Container>
  );
};
