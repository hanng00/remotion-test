"use client";

import { Player } from "@remotion/player";
import { Main } from "@/src/ExampleTwo/Main";
import { useState } from "react";
const { DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } = {
  DURATION_IN_FRAMES: 30 * (10 + 5),
  VIDEO_FPS: 30,
  VIDEO_HEIGHT: 1280,
  VIDEO_WIDTH: 720,
};

const ExampleTwoPage = () => {
  const [wrapperData, setWrapperData] = useState({
    topSongName: "1989 (Taylor's Version)",
    topSongArtistName: "Taylor Swift",
    topSongCover:
      "https://i.scdn.co/image/ab67616d0000b273e4b6b5e2b7b6b7b6b7b6b7b6",
  });

  return (
    <div className="container flex flex-col h-screen">
      <div className="py-8">
        <h1 className="text-3xl font-serif">Example Two</h1>
        <p className="max-w-md text-sm">Text</p>
      </div>
      <div className="w-full h-full">
        <div className="h-full w-full mx-auto shadow border rounded-2xl flex items-center justify-center">
          <Player
            component={Main}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              width: "100%",
            }}
            inputProps={wrapperData}
            controls
            autoPlay
            loop
          />
        </div>
      </div>
      <div>
        Input song title:
        <input
          onChange={(e) => {
            setWrapperData({
              ...wrapperData,
              topSongName: e.target.value,
            });
          }}
        />
      </div>

      <div className="py-4 font-bold">Made with Legacy</div>
    </div>
  );
};

export default ExampleTwoPage;
