import { AbsoluteFill, Video } from "remotion";

interface StockPhoageVideoProps {
  src: string;
}
export const StockPhotageVideo = ({ src }: StockPhoageVideoProps) => {
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
          maxWidth: "fit-content",
        }}
        src={src}
      />
    </AbsoluteFill>
  );
};
