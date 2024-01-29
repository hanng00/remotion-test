import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SlideCardProps {
  slide: Doc<"slides">;
}
const SlideCard = ({ slide }: SlideCardProps) => {
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

export default SlideCard;
