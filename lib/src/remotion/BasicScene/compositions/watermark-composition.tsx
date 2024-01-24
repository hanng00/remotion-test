import { AbsoluteFill } from "remotion";

import { loadFont } from "@remotion/google-fonts/WorkSans";

const { fontFamily } = loadFont();

export const WatermarkComposition = () => {
  return (
    <AbsoluteFill>
      <div
        style={{
          fontFamily,
          fontSize: 25,
          color: "white",
          opacity: 0.9,
          paddingTop: 20,
          paddingLeft: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        IRJA.CO
      </div>
    </AbsoluteFill>
  );
};
