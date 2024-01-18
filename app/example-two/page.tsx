"use client";

import { Player } from "@remotion/player";
import { Main } from "@/src/ExampleTwo/Main";
import { useState, useMemo } from "react";
import {
  MainProps,
  defaultMainProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/src/ExampleTwo/types/constants";
import { z } from "zod";

const ExampleTwoPage = () => {
  const [wrapperData, setWrapperData] = useState(defaultMainProps);

  const inputProps: z.infer<typeof MainProps> = useMemo(() => {
    return wrapperData;
  }, [wrapperData]);

  return (
    <div className="container flex flex-col h-screen">
      <div className="py-8">
        <h1 className="text-3xl font-serif">Example Two</h1>
        <p className="max-w-md text-sm">Text</p>
      </div>
      <div className="flex-grow w-full">
        <div className="mx-auto h-full w-fit shadow border rounded-2xl overflow-hidden">
          <Player
            component={Main}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              height: "100%",
              maxHeight: "100%",
            }}
            inputProps={inputProps}
            controls
            autoPlay
            loop
          />
        </div>
      </div>
      <div className="py-4">
        <div>
          Input artist name:
          <input
            value={wrapperData.topSongArtistName}
            onChange={(e) => {
              setWrapperData({
                ...wrapperData,
                topSongArtistName: e.target.value,
              });
            }}
          />
        </div>
        <div>
          Input song:
          <input
            value={wrapperData.topSongName}
            onChange={(e) => {
              setWrapperData({
                ...wrapperData,
                topSongName: e.target.value,
              });
            }}
          />
        </div>
        <div>
          Input album source:
          <input
            value={wrapperData.topSongCover}
            onChange={(e) => {
              setWrapperData({
                ...wrapperData,
                topSongCover: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExampleTwoPage;
