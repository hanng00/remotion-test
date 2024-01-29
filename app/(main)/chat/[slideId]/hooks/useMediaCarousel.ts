import { useState } from "react";

export const useMediaCarousel = () => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const handleMediaIndexChange = (index: number) => {
    setMediaIndex(index);
  };

  return {
    mediaIndex,
    handleMediaIndexChange
  }
}