import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { useEffect } from "react";

interface LoadingDisplayProps {
  status: Doc<"carousels">["status"];
  handleGenerateNarrationScript: () => void;
  handleGenerateCarousel: () => void;
}

const LoadingDisplay = ({
  status,
  handleGenerateNarrationScript,
  handleGenerateCarousel,
}: LoadingDisplayProps) => {
  const statusToSubheader = (status: Doc<"carousels">["status"]) => {
    const map = {
      loading: "We're loading the slide data",
      writing: "We are writing the narration script",
      producing: "Our producer is now tying the pieces together",
      completed: "You're Carousel is ready to watch",
    };
    if (!map[status]) return "Unknown status";
    return map[status];
  };

  const subheader = statusToSubheader(status);

  useEffect(() => {
    if (status == "loading") {
      handleGenerateNarrationScript();
    }
    if (status == "writing") {
      // Do nothing, the narration script is being written
    }
    if (status == "producing") {
      handleGenerateCarousel();
    }
    if (status == "completed") {
      // Do nothing, the carousel is ready
    }
  }, [status]);

  if (!status) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <div className="p-4">
        <Spinner size="lg" />
      </div>

      <div className="flex items-center flex-col">
        <h2 className="text-xl font-bold">Your Carousel is soon ready </h2>
        <p className="max-w-md text-center text-foreground/50 w-full">
          {subheader}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-sm pt-8">DEV BUTTONS BELOW, DONT TOUCH</p>
        <Button variant="secondary" onClick={handleGenerateNarrationScript}>
          Generate Narration Script
        </Button>
        <Button variant="secondary" onClick={handleGenerateCarousel}>
          Generate Carousel
        </Button>
      </div>
    </div>
  );
};

export default LoadingDisplay;
