import { Doc } from "@/convex/_generated/dataModel";
import CarouselCard from "./carousel-card";
import { Spinner } from "@/components/spinner";

interface CarouselsFeedProps {
  carousels: Doc<"carousels">[] | undefined;
}

const CarouselsFeed = ({ carousels }: CarouselsFeedProps) => {
  if (!carousels) {
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="grid auto-rows-min grid-cols-2 md:grid-cols-3 gap-4 overflow-y-scroll scroll-smooth">
      {carousels.map((carousel) => {
        return <CarouselCard carousel={carousel} key={carousel._id} />;
      })}
    </div>
  );
};

export default CarouselsFeed;
