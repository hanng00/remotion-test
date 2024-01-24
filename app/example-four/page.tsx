"use client";

import { Player } from "@remotion/player";
import { Main } from "@/lib/src/remotion/BasicScene/main";
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  MainCompositionData,
} from "@/lib/src/remotion/BasicScene/types/constants";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

const ExampleFourPage = () => {
  const handleButtonClick = () => {
    toast("The requested functionality is not implemented yet.", {
      position: "top-center",
      duration: 3000,
    });
  };
  return (
    <div className="container flex flex-col h-screen">
      <div className="py-8">
        <h1 className="text-3xl font-serif font-bold">Basic Carousel</h1>
        <p className="max-w-md text-sm">Below is an example carousel</p>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <div className="sm:w-[40vh] w-full max-h-full aspect-[9/16] mx-auto shadow border rounded-2xl overflow-hidden">
          <Player
            component={Main}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              width: "100%",
            }}
            inputProps={MainCompositionData}
            controls
            loop
          />
        </div>
      </div>

      <div className="flex flex-row space-x-4 items-center my-4 w-full">
        <Button variant="outline" onClick={handleButtonClick}>
          <UserPlus className="mr-2" /> Add
        </Button>
        <Button className="flex-1" onClick={handleButtonClick}>
          Send to Melvin
        </Button>
      </div>
    </div>
  );
};

export default ExampleFourPage;
