"use client";

import FooterNavbar from "@/components/footer-navbar";
import CarouselsFeed from "./components/carousels-feed";
import HeaderNavbar from "./components/header-navbar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const CarouselsPage = () => {
  const carousels = useQuery(api.carousels.list);

  const handleCreateNewCarousel = () => {
    console.log("TO BE IMPLEMENTED");
  };
  return (
    <div className="container flex flex-col h-dvh">
      <HeaderNavbar />
      <div className="w-full flex-grow overflow-y-scroll">
        <CarouselsFeed carousels={carousels} />
      </div>
      <FooterNavbar onCreateNew={handleCreateNewCarousel} />
    </div>
  );
};

export default CarouselsPage;
