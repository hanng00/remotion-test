"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChatNavbar = () => {
  const router = useRouter();

  const handleCreateCarousel = () => {
    router.push(`/carousels/1234TEST`);
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
