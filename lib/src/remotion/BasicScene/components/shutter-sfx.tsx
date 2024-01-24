import { Sequence, useVideoConfig } from "remotion";
import { Audio } from "remotion";

interface ShutterSFXProps {
  start_time: number;
}

const UNEDITED_START_TIME = 15;
const UNEDITED_END_TIME = 17;
export const ShutterSFX = ({ start_time }: ShutterSFXProps) => {
  const { fps } = useVideoConfig();

  var src = "https://d1lwpr1oyt2a5u.cloudfront.net" + "/SFX_Analog_Shutter.mp3"

  return (
    <Sequence
      from={fps * start_time}
      durationInFrames={fps * (UNEDITED_END_TIME - UNEDITED_START_TIME)}
    >
      <Audio
        name="Shutter Sound Effect"
        src={src}
        volume={0.7}
        startFrom={fps * UNEDITED_START_TIME}
        endAt={fps * UNEDITED_END_TIME}
      />
    </Sequence>
  );
};
