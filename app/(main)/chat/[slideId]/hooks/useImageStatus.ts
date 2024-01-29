import { Doc } from "@/convex/_generated/dataModel";

interface UseImageStatusProps {
  imageMessage: Doc<"imageMessages">;
}

const useImageStatus = ({ imageMessage }: UseImageStatusProps) => {
  const statusToEffect = (status: Doc<"imageMessages">["status"]) => {
    const map = {
      "loading": "brightness-50 grayscale",
      "analysing": "brightness-50",
      "completed": "",
    }

    if (!status) {
      return ""
    }

    if (status in map) {
      return map[status];
    }
  }

  const statusToMessage = (status: Doc<"imageMessages">["status"]) => {
    if (!status) {
      return ""
    }

    const map = {
      "loading": "Uploading...",
      "analysing": "Analysing...",
      "completed": "",
    }

    if (status in map) {
      return map[status];
    }
  }
  const statusEffect = statusToEffect(imageMessage.status);
  const statusMessage = statusToMessage(imageMessage.status);
  const showSpinner = imageMessage.status === "loading" || imageMessage.status === "analysing";

  return ({ showSpinner, statusMessage, statusEffect });
}

export default useImageStatus;