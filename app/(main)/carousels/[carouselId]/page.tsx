"use client";

interface CarouselIdPageProps {
  params: {
    carouselId: string;
  };
}
const CarouselIdPage = ({ params: { carouselId } }: CarouselIdPageProps) => {
  return <div>Carousel Id Page, {carouselId}</div>;
};

export default CarouselIdPage;
