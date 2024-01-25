"use client";

import { useChat } from "ai/react";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageItem from "./message-item";
import MediaCarousel from "./media-carousel";
import useFunctionCallHandler from "../hooks/useFunctionCallHandler";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const TEMP_IMAGES = [
  "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400",
];

export default function Chat() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleIndexChange = useCallback((index: number) => {
    console.log("Index", index);
    setCurrentIndex(index);
  }, []);

  const { functionCallHandler } = useFunctionCallHandler({
    onIndexChange: handleIndexChange,
  });
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    experimental_onFunctionCall: functionCallHandler,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    var chatRequestOptions = {
      data: {
        currentIndex: currentIndex.toString(),
      },
    };
    handleSubmit(e, chatRequestOptions);
  };

  /* MESSAGE SCROLL FUNCTIONALITY */
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  /* HEADER LOGIC */
  const router = useRouter();
  const REQUIRED_MESSAGE_COUNT = 10;
  const userSentMessageCount = messages.filter((m) => m.role == "user").length;
  const canGenerateCarousel = userSentMessageCount >= REQUIRED_MESSAGE_COUNT;
  const handleCarouselGeneration = () => {
    toast("Generating carousel..");
    const messages_json = JSON.stringify(messages);
    router.push(`/example-three/carousel?messages=${messages_json}`);
  };

  return (
    <div className="flex flex-col h-full max-h-full w-full max-w-md mx-auto py-2">
      {/* Header */}
      <div className="flex flex-rows justify-between w-full">
        <Button
          size="sm"
          variant="default"
          disabled={
            // !canGenerateCarousel
            false
          }
          onClick={handleCarouselGeneration}
        >
          <Sparkles size={16} className="mr-2" />
          {canGenerateCarousel
            ? "Generate Carousel"
            : `Sent ${userSentMessageCount} / ${REQUIRED_MESSAGE_COUNT} Messages`}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            console.log(messages);
          }}
        >
          Log Chat
        </Button>
      </div>
      {/* Image Display */}
      <div className="py-8 px-4 w-full max-h-1/3">
        <MediaCarousel
          currentIndex={currentIndex}
          onIndexChange={handleIndexChange}
          images={TEMP_IMAGES}
        />
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto" ref={messagesContainerRef}>
        {messages.length > 0
          ? messages.map((m) => <MessageItem key={m.id} message={m} />)
          : null}
      </div>

      {/* Input */}
      <div className="py-4">
        <form onSubmit={onSubmit}>
          <input
            className="w-full p-2 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="What's on your mind..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
