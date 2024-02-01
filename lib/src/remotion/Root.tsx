import { Composition } from "remotion";

import { Main as BasicSceneMain } from "./BasicScene/main";
import {
  MainCompositionData as BasicSceneData,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./BasicScene/types/constants";
import { MainCompositionSchema as BasicSceneSchema } from "./BasicScene/types/schema";

export const RemotionRoot: React.FC = () => {
  // TODO : Figure out a smart way of importing compositions
  return (
    <>
      <Composition
        id="BasicScene"
        component={BasicSceneMain}
        schema={BasicSceneSchema}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        /* @ts-ignore */
        defaultProps={BasicSceneData}
      />
    </>
  );
};
