"use client";

import { Player } from "@remotion/player";
import { Main } from "@/src/ExampleTwo/components/Main";
const { DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } = {
  DURATION_IN_FRAMES: 30 * (10 + 5),
  VIDEO_FPS: 30,
  VIDEO_HEIGHT: 1280,
  VIDEO_WIDTH: 720,
};

const ExampleTwoPage = () => {
  const player: React.CSSProperties = {
    width: "100%",
  };

  return (
    <div className="container flex flex-col h-screen">
      <div className="py-8">
        <h1 className="text-3xl font-serif">Example Two</h1>
        <p className="max-w-md text-sm">Text</p>
      </div>
      <div className="w-full h-full">
        <div className="h-fit w-full mx-auto shadow border rounded-2xl flex items-center justify-center">
          <Player
            component={Main}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            inputProps={{
              topSongName: "1989 (Taylor's Version)",
              topSongArtistName: "Taylor Swift",
            }}
            controls
            autoPlay
            loop
          />
        </div>
      </div>

      <div className="py-4 font-bold">Made with Legacy</div>
    </div>
  );
};

export default ExampleTwoPage;
