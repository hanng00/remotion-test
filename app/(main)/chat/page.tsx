"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";

import MediaCarousel from "./components/media-carousel";
import MessageItem from "./components/message-item";
import ChatNavbar from "./components/chat-navbar";

const TEMP_IMAGES = [
  "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400",
];
const ChatPage = () => {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const [newMessageText, setNewMessageText] = useState("");

  const chatFeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat feed when messages change
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage({ content: newMessageText });
    setNewMessageText("");
  };

  /* MEDIA INDEX */
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container max-w-2xl h-dvh flex flex-col space-y-2">
      <ChatNavbar />
      {/* Image Display */}
      <div className="px-4 py-2 w-[90%] mx-auto">
        <MediaCarousel
          currentIndex={currentIndex}
          onIndexChange={handleIndexChange}
          images={TEMP_IMAGES}
        />
      </div>
      <div ref={chatFeedRef} className="flex-1 overflow-y-auto">
        {messages?.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
      </div>

      <div className="py-4 w-full ">
        <form onSubmit={handleSubmit} className="flex flex-row space-x-2">
          <input
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Write a message…"
            className="w-full p-2 border border-gray-300 rounded shadow-xl"
          />
          <Button type="submit" disabled={!newMessageText}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
