import { Doc } from "@/convex/_generated/dataModel";
import SlideCard from "./slide-card";

interface SlidesFeedProps {
  slides: Doc<"slides">[];
}

const SlidesFeed = ({ slides }: SlidesFeedProps) => {
  return (
    <div className="grid auto-rows-min grid-cols-2 md:grid-cols-3 gap-4 overflow-y-scroll scroll-smooth">
      {slides.map((slide) => {
        return <SlideCard slide={slide} key={slide._id} />;
      })}
    </div>
  );
};

export default SlidesFeed;
