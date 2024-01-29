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

interface CarouselCardProps {
  carousel: Doc<"carousels">;
}
const CarouselCard = ({ carousel }: CarouselCardProps) => {
  const msToDateAndTime = (ms: number) => {
    const date = new Date(ms);
    return date.toLocaleString();
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Untitled</CardTitle>
        <CardDescription>
          {carousel._creationTime
            ? msToDateAndTime(carousel._creationTime)
            : "No creation time"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-start">
        <Button
          asChild
          variant="secondary"
          className="p-0 aspect-square rounded-full"
        >
          <Link href={`/carousels/${carousel._id}`}>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarouselCard;
