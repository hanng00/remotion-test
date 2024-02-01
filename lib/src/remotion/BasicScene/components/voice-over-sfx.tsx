import { Sequence } from "remotion";
import { Audio } from "remotion";

interface VoiceOverSFXProps {
  src: string;
  start_time?: number;
}

export const VoiceOverSFX = ({ src, start_time }: VoiceOverSFXProps) => {
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
