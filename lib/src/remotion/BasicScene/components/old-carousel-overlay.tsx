import { Video, useVideoConfig } from "remotion";

const START_TIME = 1.8;

export const OldCarouselOverlay = () => {
  const { fps } = useVideoConfig();

  var src =
    "https://d1lwpr1oyt2a5u.cloudfront.net" + "/BFX_CarouselWrapperRotated.mp4";

  return (
    <Video
      startFrom={START_TIME * fps}
      name="Old Carousel Overlay"
      style={{
        height: "110%",
        transform: "scale(1.2)",
        width: "fit-content",
        opacity: 0.25,
        position: "absolute",
      }}
      src={src}
    />
  );
};
