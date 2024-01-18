import { Composition } from "remotion";

/* 
import { Gradient } from "./ExampleTwo/components/Gradient";
import { Scene3 } from "./ExampleTwo/scenes/Scene3";
import { Scene2 } from "./ExampleTwo/scenes/Scene2";
import { Scene1 } from "./ExampleTwo/scenes/Scene1";
import { Wrapped } from "./ExampleTwo/components/Wrapped"; 
*/

import { Main } from "./ExampleTwo/Main";

export const RemotionRoot: React.FC = () => {
  // TODO : Figure out a smart way of importing compositions
  return (
    <>
      {/* <Composition
        id="Gradient"
        component={Gradient}
        width={720}
        height={1280}
        durationInFrames={120}
        fps={30}
      />
      <Composition
        id="Scene1"
        component={Scene1}
        width={720}
        height={1280}
        durationInFrames={30 * 5}
        fps={30}
      />
      <Composition
        id="Wrapped"
        component={Wrapped}
        width={720}
        height={1280}
        durationInFrames={30 * 5}
        fps={30}
      />
      <Composition
        id="Scene2"
        component={Scene2}
        width={720}
        height={1280}
        durationInFrames={30 * 10}
        fps={30}
      />
      <Composition
        id="Scene3"
        component={Scene3}
        width={720}
        height={1280}
        durationInFrames={30 * 5}
        fps={30}
        defaultProps={{
          topSongName: "1989 (Taylor's Version)",
          topSongArtistName: "Taylor Swift",
        }}
      /> */}
      <Composition
        id="Main"
        component={Main}
        width={720}
        height={1280}
        durationInFrames={30 * (10 + 10 + 5)}
        fps={30}
        defaultProps={{
          topSongName: "1989 (Taylor's Version)",
          topSongArtistName: "Taylor Swift",
          topSongCover: "https://hips.hearstapps.com/hmg-prod/images/7-64ecb1c909b78.png?crop=0.502xw:1.00xh;0.498xw,0&resize=1200:*"
        }}
      />
    </>
  );
};
