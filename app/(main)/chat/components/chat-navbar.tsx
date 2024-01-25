"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ChatNavbar = () => {
  const router = useRouter();

  return (
    <div className="py-2 flex flex-row items-center justify-between">
      <div className="w-20 h-8" />
      <h1 className="text-md font-bold text-foreground">Chat View</h1>
      <Button
        variant="outline"
        onClick={() => router.push("/legacy")}
        size="sm"
      >
        Old Pages
      </Button>
    </div>
  );
};

export default ChatNavbar;
