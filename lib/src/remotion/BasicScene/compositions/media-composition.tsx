import { Sequence, useVideoConfig } from "remotion";

import { ShutterSFX } from "../components/shutter-sfx";
import { BackgroundMusicSFX } from "../components/background-music-sfx";
import { VoiceOverSFX } from "../components/voice-over-sfx";
import { ImageWithFadeIn } from "../components/image-with-fade-in";
import { StockPhotageVideo } from "../components/stock-photage-video";
import { MediaComposition as MediaCompositionType, MediaLayer } from "@/lib/src/carousel/types";

export const MediaComposition = ({
  user_media,
  stock_media,
  voice_over,
  background_music,
}: MediaCompositionType) => {
  const { fps } = useVideoConfig();
  console.log({ user_media, stock_media, voice_over, background_music });
  const extractMediaSource = (media: MediaLayer): string => {
    if (media.media_access?.type === "url") {
      return media.media_access.data;
    }
     
    console.error("Media source not found, returning empty string.");
    return "";
  }

  return (
    <>
      <VoiceOverSFX start_time={voice_over.start_time} src={extractMediaSource(voice_over)} />
      <BackgroundMusicSFX src={extractMediaSource(background_music)} />
      <StockPhotageVideo src={extractMediaSource(stock_media)} />
      
      {user_media.map((user_photo) => {
        const key = user_photo.media_access?.data || "";
        const start_time = user_photo.start_time || 0;
        const end_time = user_photo.end_time || Infinity;
        const from = fps * start_time;
        const durationInFrames = fps * (end_time - start_time);
        return (
          <Sequence key={key} from={from} durationInFrames={durationInFrames}>
            <ImageWithFadeIn
              key={user_photo + "@user-media"}
              src={extractMediaSource(user_photo)}
              start_time={user_photo.end_time}
            />
            <ShutterSFX start_time={0} />
          </Sequence>
        );
      })}
    </>
  );
};
