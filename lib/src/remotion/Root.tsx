import { Composition } from "remotion";

/* 
import { Gradient } from "./ExampleTwo/components/Gradient";
import { Scene3 } from "./ExampleTwo/scenes/Scene3";
import { Scene2 } from "./ExampleTwo/scenes/Scene2";
import { Scene1 } from "./ExampleTwo/scenes/Scene1";
import { Wrapped } from "./ExampleTwo/components/Wrapped"; 
*/

import { Main as BasicSceneMain } from "./BasicScene/main";
import {
  MainCompositionData as BasicSceneData,
  VIDEO_FPS,
  DURATION_IN_FRAMES,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./BasicScene/types/constants";
import { MainCompositionSchema as BasicSceneSchema } from "./BasicScene/types/schema";

export const RemotionRoot: React.FC = () => {
  // TODO : Figure out a smart way of importing compositions
  return (
    <>
      {/* <Composition
        id="Main"
        component={ExampleTwoMain}
        width={720}
        height={1280}
        durationInFrames={30 * (10 + 10 + 5)}
        fps={30}
        defaultProps={{
          topSongName: "1989 (Taylor's Version)",
          topSongArtistName: "Taylor Swift",
          topSongCover:
            "https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png?crop=0.502xw:1.00xh;0.498xw,0&resize=1200:*",
        }}
      /> */}
      <Composition
        id="BasicScene"
        component={BasicSceneMain}
        schema={BasicSceneSchema}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        defaultProps={BasicSceneData}
      />
    </>
  );
};
