"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { Main } from "@/src/ExampleOne/Main";
import {
  CompositionProps,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/src/ExampleOne/types/constants";
import { z } from "zod";
import { RenderControls } from "./components/RenderControls";

const player: React.CSSProperties = {
  width: "100%",
};

const Home: NextPage = () => {
  const [text, setText] = useState<string>(defaultMyCompProps.title);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  return (
    <div>
      <div className="container">
        <div className="py-8">
          <h1 className="text-3xl font-serif">Example One</h1>
          <p className="max-w-md text-sm">
            This example shows how to use the <code>Player</code> component to
            render a video.
          </p>
        </div>

        <div className="overflow-hidden mb-10 mt-15 shadow border rounded-2xl">
          <Player
            component={Main}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            controls
            autoPlay
            loop
          />
        </div>
        <RenderControls
          text={text}
          setText={setText}
          inputProps={inputProps}
        ></RenderControls>
      </div>
    </div>
  );
};

export default Home;
