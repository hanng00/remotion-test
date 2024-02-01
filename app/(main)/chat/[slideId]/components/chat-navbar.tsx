"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChatNavbarProps {
  slideId: Id<"slides">;
}
const ChatNavbar = ({ slideId }: ChatNavbarProps) => {
  const createCarousel = useMutation(api.carousels.create);
  const router = useRouter();

  const handleCreateCarousel = () => {
    const promise = createCarousel({ slideId }).then((carouselId) => {
      router.push(`/carousels/${carouselId}`);
    });
    toast.promise(promise, {
      loading: "Creating Carousel...",
      success: "Carousel Created!",
      error: "Error Creating Carousel",
    });
  };

  return (
    <div className="py-2 grid grid-cols-3 row-span-1 w-full">
      <Button
        asChild
        variant="secondary"
        className="p-0 aspect-square rounded-full"
      >
        <Link href={`/slides`}>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </Button>

      <h1 className="mx-auto text-sm font-bold text-foreground my-auto">
        New Chat
      </h1>
      <Button
        variant="default"
        onClick={handleCreateCarousel}
        size="sm"
        className="w-fit ml-auto"
      >
        Carousel
      </Button>
    </div>
  );
};

export default ChatNavbar;
