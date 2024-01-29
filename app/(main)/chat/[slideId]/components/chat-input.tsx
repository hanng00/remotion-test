"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React from "react";

interface ChatInputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ChatInput = ({
  input,
  handleInputChange,
  handleSubmit,
}: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-row items-center space-x-2 w-full">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Write a message…"
          className="w-full p-2 border border-gray-300 rounded-full"
        />

        <Button
          variant="default"
          className="p-3 aspect-square h-full rounded-full"
          type="submit"
          disabled={!input}
        >
          <Send />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
