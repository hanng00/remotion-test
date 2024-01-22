import { Suspense } from "react";
import CarouselClient from "./components/client";

const CarouselPage = () => {
  return (
    <Suspense>
      <CarouselClient />
    </Suspense>
  );
};

export default CarouselPage;
