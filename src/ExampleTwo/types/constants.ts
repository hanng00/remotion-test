import { z } from "zod";

export const VIDEO_FPS = 30;

export const SCENE_1_DURATION = 9 * VIDEO_FPS;
export const SCENE_2_DURATION = 9 * VIDEO_FPS;
export const SCENE_3_DURATION = 7 * VIDEO_FPS;

export const Scene3Props = z.object({
  topSongName: z.string(),
  topSongArtistName: z.string(),
  topSongCover: z.string(),
});

export const defaultScene3Props: z.infer<typeof Scene3Props> = {
  topSongName: "1989 (Taylor's Version)",
  topSongArtistName: "Taylor Swift",
  topSongCover:
    "https://i.scdn.co/image/ab67616d0000b273e4b6b5e2b7b6b7b6b7b6b7b6",
};

export const VIDEO_WIDTH = 720;
export const VIDEO_HEIGHT = 1280;
export const DURATION_IN_FRAMES = SCENE_1_DURATION + SCENE_2_DURATION + SCENE_3_DURATION
