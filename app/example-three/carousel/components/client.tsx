"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BASIC_NARRATION_SCRIPT } from "./../constants";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ConversationClient = ({ messages }: { messages: string | null }) => {
  return (
    <div className="h-full py-4">
      <h2 className="font-bold">Here is the raw conversation data</h2>
      <div className="h-96 overflow-auto p-2">{messages}</div>
    </div>
  );
};

interface NarrationClientProps {
  narrationScript: string;
  handleGenerateNarration: (narrationStyle: string) => void;
  isGeneratingNarration: boolean;
}
const NarrationClient = ({
  narrationScript,
  handleGenerateNarration,
  isGeneratingNarration,
}: NarrationClientProps) => {
  const [narrationStyle, setNarrationStyle] = useState(BASIC_NARRATION_SCRIPT);

  const onGenerateNarration = () => {
    handleGenerateNarration(narrationStyle);
  };
  return (
    <div className="h-full flex flex-col ">
      <h2 className="font-bold py-2">Choose a Narration Style</h2>
      <div className="w-full">
        <Textarea
          value={narrationStyle}
          onChange={(e) => setNarrationStyle(e.target.value)}
          className="bg-white h-64"
        />
        <Button
          disabled={isGeneratingNarration}
          className="my-2"
          size="sm"
          onClick={onGenerateNarration}
        >
          Generate Narration
        </Button>
      </div>
      <h2 className="font-bold py-2">See the Narration Script result</h2>
      <div className="rounded-md bg-white h-fit p-2">{narrationScript}</div>
    </div>
  );
};

const CarouselClient = () => {
  const searchParams = useSearchParams();
  const messages = searchParams.get("messages");

  /* NARRATION GENERATION LOGIC */
  const [narrationScript, setNarrationScript] = useState("");
  const [isGeneratingNarration, setIsGeneratingNarration] = useState(false);
  const handleGenerateNarration = (narrationStyle: string) => {
    setIsGeneratingNarration(true);

    const params = new URLSearchParams(searchParams.toString());
    params.set("narrationStyle", JSON.stringify(narrationStyle));

    // After 3 sec, set isGeneratingNarration to false and display a toast
    const requestData = {
      narrationStyle: narrationStyle,
      conversation: messages,
    };

    fetch("/api/carousel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setNarrationScript(data);
        setIsGeneratingNarration(false);
        toast("Narration generated!");
      })
      .catch((err) => {
        console.log(err);
        setIsGeneratingNarration(false);
        toast("Error generating narration");
      });
  };

  return (
    <div className="container  w-full">
      <h1 className="font-serif text-2xl py-4">Carousel</h1>

      <Tabs defaultValue="conversation" className=" w-full">
        <TabsList className="mx-auto w-full">
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="narration">Narration</TabsTrigger>
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
        </TabsList>
        <TabsContent value="conversation">
          <ConversationClient messages={messages} />
        </TabsContent>
        <TabsContent value="narration">
          <NarrationClient
            narrationScript={narrationScript}
            isGeneratingNarration={isGeneratingNarration}
            handleGenerateNarration={handleGenerateNarration}
          />
        </TabsContent>
        <TabsContent value="carousel">Carousel content</TabsContent>
      </Tabs>
    </div>
  );
};

export default CarouselClient;
