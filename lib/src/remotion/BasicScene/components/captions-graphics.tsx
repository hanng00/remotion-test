import { AbsoluteFill } from "remotion";
import { fontFamily } from "../font";
import { GraphicsLayer } from "../types/types";

export const CaptionsGraphics = ({
  type,
  content,
  start_time,
  end_time,
}: GraphicsLayer) => {
  return (
    <AbsoluteFill
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: 30,
          color: "white",
          fontFamily,
          textShadow: "0 0 10px rgba(0, 0, 0, 0.6)",

          lineHeight: "1.5em",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        {content}
      </p>
    </AbsoluteFill>
  );
};
