import { AbsoluteFill, Video } from "remotion";
import { MediaLayer } from "@/lib/src/remotion/BasicScene/types/types";



export const StockPhotageVideo = ({ src }: MediaLayer) => {

  return (
    <AbsoluteFill
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center", 
      }}
    >
      <Video
        name="Stock Photo"
        loop
        style={{
          minHeight: "100%",
          maxHeight: "fit-content",
          minWidth: "100%",
          maxWidth: "fit-content"
        }}
        src={src}
      />
    </AbsoluteFill>
  );
};
