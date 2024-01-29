import { openai } from "@/lib/openai";
import { functions, runServerFunction } from "./functions/functions";
import { OpenAIStream } from "ai";

interface ChatServiceProps {
  messages: any[];
  model?: string;
  max_tokens?: number;
  onToken?: (token: string) => void;
  onCompletion?: (completion: string) => void;
}

export const ChatService = async ({
  messages,
  model = "gpt-4-1106-preview",
  max_tokens = 150,
  onToken = () => { },
  onCompletion = () => { }
}: ChatServiceProps): Promise<ReadableStream<any>> => {
  const response = await openai.chat.completions.create({
    model,
    stream: true,
    max_tokens,
    messages,
    functions
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response,
    {
      experimental_onFunctionCall: async (
        { name, arguments: args },
        createFunctionCallMessages,
      ) => {
        console.log("onFunctionCall", name, args)
        const result = await runServerFunction(name, args);
        if (!result) return

        const newMessages = createFunctionCallMessages(
          result
        );
        console.log("newMessages", newMessages)
        return openai.chat.completions.create({
          messages: [...messages, ...newMessages],
          stream: true,
          model,
          functions,
        });
      },
      onToken,
      onCompletion
    });

  return stream
}