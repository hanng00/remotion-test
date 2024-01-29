"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

interface useConvexImageUploadProps {
  slideId: Id<"slides">;
}

const useConvexImageUpload = ({
  slideId
}: useConvexImageUploadProps) => {
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.imageMessages.sendImage);

  const uploadMedia = async (mediaFile: File) => {

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": mediaFile!.type },
      body: mediaFile,
    });
    const { storageId } = await result.json();

    // Step 3: Save the newly allocated storage id to the database
    await sendImage({ storageId, slideId });
  }
  return ({ uploadMedia });
}

export default useConvexImageUpload;