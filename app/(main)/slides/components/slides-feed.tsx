import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SlidesCardProps {
  slide: Doc<"slides">;
}
const SlidesCard = ({ slide }: SlidesCardProps) => {
  const msToDateAndTime = (ms: number) => {
    const date = new Date(ms);
    return date.toLocaleString();
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Untitled</CardTitle>
        <CardDescription>
          {slide._creationTime
            ? msToDateAndTime(slide._creationTime)
            : "No creation time"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-start">
        <Button
          asChild
          variant="secondary"
          className="p-0 aspect-square rounded-full"
        >
          <Link href={`/chat/${slide._id}`}>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface SlidesFeedProps {
  slides: Doc<"slides">[];
}

const SlidesFeed = ({ slides }: SlidesFeedProps) => {
  return (
    <div className="grid auto-rows-min grid-cols-2 md:grid-cols-3 gap-4 overflow-y-scroll scroll-smooth">
      {slides.map((slide) => {
        return <SlidesCard slide={slide} key={slide._id} />;
      })}
    </div>
  );
};

export default SlidesFeed;
