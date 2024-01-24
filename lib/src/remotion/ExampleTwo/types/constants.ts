import { z } from "zod";

export const VIDEO_FPS = 30;

export const SCENE_1_DURATION = 9 * VIDEO_FPS;
export const SCENE_2_DURATION = 9 * VIDEO_FPS;
export const SCENE_3_DURATION = 7 * VIDEO_FPS;

export const Scene2Props = z.object({})
export const defaultScene2Props: z.infer<typeof Scene2Props> = {}

export const Scene3Props = z.object({
  topSongName: z.string(),
  topSongArtistName: z.string(),
  topSongCover: z.string(),
});
export const defaultScene3Props: z.infer<typeof Scene3Props> = {
  topSongName: "1989 (Taylor's Version)",
  topSongArtistName: "Taylor Swift",
  topSongCover:
    "https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_800x.png?v=1691644764",
};

export const MainProps = Scene2Props.merge(Scene3Props);
export const defaultMainProps: z.infer<typeof MainProps> = {
  ...defaultScene2Props,
  ...defaultScene3Props,
};


export const VIDEO_WIDTH = 720;
export const VIDEO_HEIGHT = 1280;
export const DURATION_IN_FRAMES = SCENE_1_DURATION + SCENE_2_DURATION + SCENE_3_DURATION
