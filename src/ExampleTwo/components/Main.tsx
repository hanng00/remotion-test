import { Sequence } from "remotion";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene1 } from "./Scene1";

export const Main: React.FC<{
  topSongName: string;
  topSongArtistName: string;
  topSongCover: string;
}> = ({ topSongName, topSongArtistName, topSongCover }) => {
  return (
    <>
      <Sequence from={0} durationInFrames={300}>
        <Scene1 />
      </Sequence>
      <Sequence from={300} durationInFrames={300}>
        <Scene2 />
      </Sequence>
      <Sequence from={600} durationInFrames={150}>
        <Scene3
          topSongName={topSongName}
          topSongArtistName={topSongArtistName}
          topSongCover={topSongCover}
        />
      </Sequence>
    </>
  );
};
