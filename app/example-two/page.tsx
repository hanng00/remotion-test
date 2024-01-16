import { Player } from "@remotion/player";
import { Main } from "@/remotion/ExampleTwo/Main";

const ExampleTwoPage = () => {
  const { DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } = {
    DURATION_IN_FRAMES: 30 * 5,
    VIDEO_FPS: 30,
    VIDEO_HEIGHT: 140,
    VIDEO_WIDTH: 140,
  };

  return (
    <div className="container">
      <div className="py-8">
        <h1 className="text-3xl font-serif">Example Two</h1>
        <p className="max-w-md text-sm">Text</p>
      </div>

      <div className="overflow-hidden mb-10 mt-15 shadow border rounded-2xl">
        <Player
          className="w-full h-full"
          component={Main}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          compositionHeight={VIDEO_HEIGHT}
          compositionWidth={VIDEO_WIDTH}
          autoPlay
          loop
        />
      </div>
    </div>
  );
};

export default ExampleTwoPage;
