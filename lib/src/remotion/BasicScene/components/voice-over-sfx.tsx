import { Sequence } from "remotion";
import { Audio } from "remotion";
import { MediaLayer } from "../types/types";

export const VoiceOverSFX = ({ src, start_time }: MediaLayer) => {
  return (
    <Sequence
      name="Voice Over Seq."
      from={start_time}
      durationInFrames={Infinity}
    >
      <Audio name="Voice over" src={src} />
    </Sequence>
  );
};
