"use client";

import { Id } from "@/convex/_generated/dataModel";
import ChatFeed from "./components/chat-feed";
import ChatInput from "./components/chat-input";
import ChatNavbar from "./components/chat-navbar";
import MediaCarousel from "./components/media-carousel";
import UploadMediaButton from "./components/upload-media-button";
import { useConvexChat } from "./hooks/useConvexChat";
import { useFunctionCallHandler } from "./hooks/useFunctionCallHandler";
import { useMediaCarousel } from "./hooks/useMediaCarousel";

interface ChatPageProps {
  params: {
    slideId: Id<"slides">;
  };
}

const ChatPage = ({ params }: ChatPageProps) => {
  const { mediaIndex, handleMediaIndexChange } = useMediaCarousel();
  const { functionCallHandler } = useFunctionCallHandler({
    onMediaIndexChange: handleMediaIndexChange,
  });
  const {
    textMessages,
    imageMessages,
    input,
    handleInputChange,
    handleSubmit,
    uploadMedia,
  } = useConvexChat({
    slideId: params.slideId,
    onFunctionCall: functionCallHandler,
  });

  return (
    <div className="container max-w-2xl h-dvh flex flex-col space-y-2">
      <ChatNavbar slideId={params.slideId} />
      <div className="px-4 w-[90%] mx-auto h-1/3">
        <MediaCarousel
          mediaIndex={mediaIndex}
          onMediaIndexChange={handleMediaIndexChange}
          imageMessages={imageMessages}
        />
      </div>
      <div className="flex-grow w-full overflow-y-auto">
        {/* @ts-ignore */}
        <ChatFeed messages={textMessages} />
      </div>

      <div className="pb-4 w-full ">
        <UploadMediaButton uploadMedia={uploadMedia} />
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatPage;
