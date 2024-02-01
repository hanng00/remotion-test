import { GraphicsLayer, MainComposition, MediaComposition, MediaLayer } from "@/lib/src/carousel/types";

export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 720;
export const VIDEO_HEIGHT = 1280;
export const DURATION_IN_FRAMES = VIDEO_FPS * 15;

/* MEDIA COMPOSITION DATA */

const STOCK_PHOTO_URL =
  "https://d1lwpr1oyt2a5u.cloudfront.net" + "/background_forest_video.mp4";

/// USER PHOTOS
const USER_PHOTO_URLS: MediaLayer[] = [
  {
    type: "image",
    start_time: 0,
    end_time: 8,
    media_access: {
      type: "url",
      data: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
  },
  {
    type: "image",
    start_time: 8,
    end_time: 11,
    media_access: {
      type: "url",
      data: "https://images.pexels.com/photos/5480687/pexels-photo-5480687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
  },
  {
    type: "image",

    start_time: 11,
    end_time: 13,
    media_access: {
      type: "url",
      data: "https://images.pexels.com/photos/5480688/pexels-photo-5480688.jpeg"
    },
  },
  {
    type: "image",
    start_time: 13,
    media_access: {
      type: "url",
      data: "https://images.pexels.com/photos/5480698/pexels-photo-5480698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
  },
];

const BACKGROUND_MUSIC_API_URL =
  "https://d1lwpr1oyt2a5u.cloudfront.net" + "ES_Calmar_Adios.mp3"

const VOICE_OVER_DELAY = VIDEO_FPS * 0.5; // 1 seconds
const VOICE_OVER_URL =
  "https://d1lwpr1oyt2a5u.cloudfront.net" + "/ttsmaker-file-2024-1-23-12-41-10.mp3";

const MEDIA_COMPOSITION_DATA: MediaComposition = {
  user_media: USER_PHOTO_URLS,
  stock_media: {
    type: "video",
    start_time: 0,
    media_access: {
      type: "url",
      data: STOCK_PHOTO_URL
    },
  },
  voice_over: {
    type: "video",
    start_time: VOICE_OVER_DELAY,
    media_access: {
      type: "url",
      data: VOICE_OVER_URL
    },
  },
  background_music: {
    type: "audio",
    media_access: {
      type: "url",
      data: BACKGROUND_MUSIC_API_URL
    },
  },
};

/* GRAPHICS COMPOSITION DATA */

const caption_chunks = [
  "And remember that day back in 2022, the year of the pandemic.",
  "We had a photoshoot right outside of the house.",
  "We were so happy to be able to see each other again.",
  "We had been apart for so long.",
];

const CAPTIONS: GraphicsLayer[] = [
  {
    type: "captions",
    content: caption_chunks[0],
    start_time: 0.5,
    end_time: 4,
  },
  {
    type: "captions",
    content: caption_chunks[1],
    start_time: 5,
    end_time: 7.5,
  },
  {
    type: "captions",
    content: caption_chunks[2],
    start_time: 8,
    end_time: 11,
  },
  {
    type: "captions",
    content: caption_chunks[3],
    start_time: 12,
    end_time: 18,
  },
];

const LOCATION_TEXT: GraphicsLayer = {
  type: "location",
  content: "Hälsingland, 2022",
  start_time: 1,
  end_time: 15,
};

const HIGHLIGHT_TEXT: GraphicsLayer = {
  type: "header",
  content: "Back in 2022",
  start_time: 1,
  end_time: 5.5,
};
const SUBHIGHLIGHT_TEXT: GraphicsLayer = {
  type: "subheader",
  content: "The year of the pandemic",
  start_time: 3,
  end_time: 5.5,
};

const GRAPHIC_COMPOSITION_DATA: GraphicsLayer[] = [
  LOCATION_TEXT,
  HIGHLIGHT_TEXT,
  SUBHIGHLIGHT_TEXT,
  ...CAPTIONS,
];

export const MainCompositionData: MainComposition = {
  graphics_composition: GRAPHIC_COMPOSITION_DATA,
  media_composition: MEDIA_COMPOSITION_DATA,
}