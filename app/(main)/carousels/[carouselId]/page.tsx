"use client";

import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import CarouselIdNavbar from "./components/carousel-id-navbar";
import CarouselViewer from "./components/carousel-viewer";
import LoadingDisplay from "./components/loading-display";

interface CarouselIdPageProps {
  params: {
    carouselId: Id<"carousels">;
  };
}
const CarouselIdPage = ({ params: { carouselId } }: CarouselIdPageProps) => {
  const carousel = useQuery(api.carousels.getCarousel, { carouselId });
  const generateNarrationScript = useMutation(
    api.carousels.generateNarrationScript
  );
  const generateCarouselConfig = useMutation(
    api.carousels.generateCarouselConfig
  );

  const handleGenerateNarrationScript = () => {
    generateNarrationScript({ carouselId });
  };

  const handleGenerateCarousel = () => {
    generateCarouselConfig({ carouselId });
  };

  if (!carousel) {
    return (
      <div className="w-full h-full flex items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container w-full h-dvh flex flex-col">
      <CarouselIdNavbar />
      {carousel.status !== "completed" ? (
        <LoadingDisplay
          status={carousel.status}
          handleGenerateNarrationScript={handleGenerateNarrationScript}
          handleGenerateCarousel={handleGenerateCarousel}
        />
      ) : (
        <CarouselViewer carousel={carousel} />
      )}
    </div>
  );
};

export default CarouselIdPage;
