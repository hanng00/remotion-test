/* 
This scene replicates the original Japan video.

* Stock photo background:
* User photo
* Music API
* Text
  - Highlight text
  - Location text
  - Subtitles

*/

import { Sequence, useVideoConfig } from "remotion";

import { ShutterSFX } from "../components/shutter-sfx";
import { BackgroundMusicSFX } from "../components/background-music-sfx";
import { VoiceOverSFX } from "../components/voice-over-sfx";
import { ImageWithFadeIn } from "../components/image-with-fade-in";
import { MediaLayer } from "../types/types";
import { StockPhotageVideo } from "../components/stock-photage-video";

export interface MediaCompositionProps {
  user_photos: MediaLayer[];
  stock_video: MediaLayer;
  voice_over: MediaLayer;
  background_music: MediaLayer;
}
export const MediaComposition = ({
  user_photos,
  stock_video,
  voice_over,
  background_music,
}: MediaCompositionProps) => {
  const { fps } = useVideoConfig();

  return (
    <>
      <VoiceOverSFX start_time={voice_over.start_time} src={voice_over.src} />
      <BackgroundMusicSFX src={background_music.src} />
      <StockPhotageVideo src={stock_video.src} />

      {user_photos.map((user_photo) => {
        const key = user_photo.src;
        const start_time = user_photo.start_time || 0;
        const end_time = user_photo.end_time || Infinity;
        const from = fps * start_time;
        const durationInFrames = fps * (end_time - start_time);
        return (
          <Sequence key={key} from={from} durationInFrames={durationInFrames}>
            <ImageWithFadeIn
              key={user_photo.src}
              src={user_photo.src}
              start_time={user_photo.end_time}
            />
            <ShutterSFX start_time={0} />
          </Sequence>
        );
      })}
    </>
  );
};
