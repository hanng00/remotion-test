import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Gradient } from "../components/Gradient";
import { FourFaces } from "../components/FourFaces";
import { GradientCircle } from "../components/GradientCircle";
import { Wrapped } from "../components/Wrapped";
import { VIDEO_FPS } from "../types/constants";

export const Scene1: React.FC = () => {
  const { height } = useVideoConfig();

  const theWeekendImage =
    "https://www.mcanhealth.com/wp-content/uploads/2021/12/the-weeknd-plastic-surgeryjpeg-e1640760881802.jpeg";

  const taylorSwiftImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/220px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png";
  const samSmithImage =
    "https://i.guim.co.uk/img/media/a168e31dc7ac50567e174a68b3280a336de974d6/0_404_2400_1916/master/2400.jpg?width=465&dpr=1&s=none";
  const adeleImage =
    "https://images.lifestyleasia.com/wp-content/uploads/sites/5/2023/07/26134956/adele.jpg";

  return (
    <>
      <AbsoluteFill>
        <Gradient height={height} />
        <Sequence from={VIDEO_FPS * 0} durationInFrames={Infinity}>
          <FourFaces image={theWeekendImage} />
        </Sequence>
        <Sequence from={VIDEO_FPS * 1} durationInFrames={Infinity}>
          <FourFaces image={taylorSwiftImage} />
        </Sequence>
        <Sequence from={VIDEO_FPS * 2} durationInFrames={Infinity}>
          <FourFaces image={samSmithImage} />
        </Sequence>
        <Sequence from={VIDEO_FPS * 3} durationInFrames={Infinity}>
          <FourFaces image={adeleImage} />
        </Sequence>
        <Sequence from={VIDEO_FPS * 4} durationInFrames={Infinity}>
          <GradientCircle />
        </Sequence>
        <Sequence from={VIDEO_FPS * 5} durationInFrames={Infinity}>
          <Wrapped />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
