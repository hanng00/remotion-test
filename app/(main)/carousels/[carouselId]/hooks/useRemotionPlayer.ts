import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/lib/src/remotion/ExampleTwo/types/constants";
import { MainComposition } from "@/lib/src/carousel/types";

interface UseRemotionPlayerProps {
  carouselConfig: MainComposition
}

export const useRemotionPlayer = ({ carouselConfig }: UseRemotionPlayerProps) => {
  return {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    fps: VIDEO_FPS,
    durationInFrames: DURATION_IN_FRAMES,
  }
}