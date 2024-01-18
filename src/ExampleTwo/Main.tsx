import { Sequence } from "remotion";

import {
  SCENE_1_DURATION,
  SCENE_2_DURATION,
  SCENE_3_DURATION,
} from "./types/constants";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";

export const Main: React.FC<{
  topSongName: string;
  topSongArtistName: string;
  topSongCover: string;
}> = ({ topSongName, topSongArtistName, topSongCover }) => {
  const scene_1_config = {
    from: 0,
    duration: SCENE_1_DURATION,
  };
  const scene_2_config = {
    from: SCENE_1_DURATION,
    duration: SCENE_2_DURATION,
  };
  const scene_3_config = {
    from: SCENE_1_DURATION + SCENE_2_DURATION,
    duration: SCENE_3_DURATION,
  };

  return (
    <>
      <Sequence
        from={scene_1_config.from}
        durationInFrames={scene_1_config.duration}
      >
        <Scene1 />
      </Sequence>
      <Sequence
        from={scene_2_config.from}
        durationInFrames={scene_2_config.duration}
      >
        <Scene2 />
      </Sequence>
      <Sequence
        from={scene_3_config.from}
        durationInFrames={scene_3_config.duration}
      >
        <Scene3
          topSongName={topSongName}
          topSongArtistName={topSongArtistName}
          topSongCover={topSongCover}
        />
      </Sequence>
    </>
  );
};
