"use client";

import { useEffect, useRef } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import MessageItem from "./message-item";

interface ChatFeedProps {
  messages: Doc<"textMessages">[] | undefined;
}
const ChatFeed = ({ messages }: ChatFeedProps) => {
  const chatFeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatFeedRef.current) {
      // Scroll to the bottom of the div. Using smooth scrolling.
      chatFeedRef.current.scrollTo({
        top: chatFeedRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={chatFeedRef} className="h-full w-full overflow-y-scroll">
      {messages?.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatFeed;
