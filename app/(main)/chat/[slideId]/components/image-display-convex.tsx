import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";

import Image from "next/image";
import useImageStatus from "../hooks/useImageStatus";

interface MediaCarouselDisplayProps {
  imageMessage: Doc<"imageMessages">;
}

const ImageDisplayConvex = ({ imageMessage }: MediaCarouselDisplayProps) => {
  const imageUrl = useQuery(api.imageMessages.getImageUrl, {
    messageId: imageMessage._id,
  });
  const { showSpinner, statusMessage, statusEffect } = useImageStatus({
    imageMessage,
  });

  if (imageUrl == undefined) {
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-56 w-full flex items-center justify-center">
      <Image
        className={cn(
          "rounded-xl shadow min-w-fit max-w-full max-h-full min-h-fit",
          statusEffect
        )}
        src={imageUrl}
        alt="Uploaded Image"
        sizes="33vh"
        width={0}
        height={0}
      />

      {/* OVERLAY */}
      <div className="text-white absolute flex flex-col items-center">
        {showSpinner && <Spinner color="primary" />}
        <p> {statusMessage}</p>
      </div>
    </div>
  );
};

export default ImageDisplayConvex;
