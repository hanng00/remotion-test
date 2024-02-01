import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useMemo, useState } from "react";
import { FunctionCallHandlerProps } from "./useFunctionCallHandler";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useConvexImageUpload from "./useConvexImageUpload";

interface useConvexChatProps {
  slideId: Id<"slides">;
  onFunctionCall?: (functionCall: FunctionCallHandlerProps) => void;
}

export const useConvexChat = ({
  slideId,
  onFunctionCall
}: useConvexChatProps) => {
  const messages = useQuery(api.messages.listWithContent, { slideId });
  const insertTextMessage = useMutation(api.textMessages.insert);
  const [input, setInput] = useState("");

  const { uploadMedia } = useConvexImageUpload({ slideId });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.length === 0) return;

    await insertTextMessage({ slideId, content: input });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  /* @ts-ignore */
  const textMessages: Doc<"textMessages">[] = useMemo(() => {
    if (messages === undefined) {
      return [];
    }
    return messages
      .filter(
        (msg) =>
          msg.messageType === "text" &&
          msg.message !== undefined &&
          msg.message !== null
      )
      .map((msg) => msg.message);
  }, [messages]);

  /* @ts-ignore */
  const imageMessages: Doc<"imageMessages">[] = useMemo(() => {
    if (messages === undefined) {
      return [];
    }
    return messages
      .filter(
        (msg) =>
          msg.messageType === "image" &&
          msg.message !== undefined &&
          msg.message !== null
      )
      .map((msg) => msg.message);
  }, [messages]);



  return {
    messages,
    textMessages,
    imageMessages,
    input,
    handleInputChange,
    handleSubmit,
    uploadMedia
  }
}
