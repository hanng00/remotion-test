"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CarouselIdNavbar = () => {
  return (
    <div className="py-2 grid grid-cols-3 row-span-1 w-full">
      <Button
        asChild
        variant="secondary"
        className="p-0 aspect-square rounded-full"
      >
        <Link href="/carousels">
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </Button>

      <h1 className="mx-auto text-sm font-bold text-foreground my-auto">
        New Carousel
      </h1>
    </div>
  );
};

export default CarouselIdNavbar;
