import { Doc, Id } from "@/convex/_generated/dataModel";
import { IRJA_INSTRUCTION } from "./instructions";
import { functions } from "./functions/functions";
import { openai } from "@/lib/openai";
import { CreateMessage, JSONValue, OpenAIStream } from "ai";


interface ConvexChatServiceProps {
  messages: Doc<"textMessages">[];
  prompt: string;
  slideId: Id<"slides">;
  onMessageSave: (message: CreateMessage) => void;
  runServerFunction: (name: string, args: any) => Promise<JSONValue>;
}

/* 
This could probably be merged with the other chat service. But for now,
I'm keeping it separate to make it easier to understand.
Solve the specific problem before generalizing.

*/
export const ConvexChatService = async ({ messages, prompt, runServerFunction, onMessageSave }: ConvexChatServiceProps) => {
  // 1. Construct the chat message object
  const newestMessagesFirst = messages
    .sort((a, b) => a._creationTime - b._creationTime)
    .map(m => ({
      role: m.role,
      content: m.content,
      function_call: m?.function_call,
      name: m?.name
    }))
  const irjaInstruction = {
    role: "system" as const,
    content: IRJA_INSTRUCTION
  }
  const chatMessages = [
    irjaInstruction,
    ...newestMessagesFirst,
    {
      role: "user" as const,
      content: prompt,
    },
  ]

  console.log("Chat messages", chatMessages)

  var model = "gpt-4-1106-preview"
  var max_tokens = 150
  // 2. Make an API call to OpenAI
  const response = await openai.chat.completions.create({
    model,
    stream: true,
    max_tokens,
    // @ts-ignore
    messages: chatMessages,
    functions
  });

  // 3. Handle function calls
  const stream = OpenAIStream(response,
    {
      experimental_onFunctionCall: async (
        { name, arguments: args },
        createFunctionCallMessages,
      ) => {
        // Handle the function call
        const result = await runServerFunction(name, args);
        if (!result) return

        // Save the new messages to the database
        const newMessages = createFunctionCallMessages(
          result
        );
        newMessages.forEach((m) => onMessageSave(m))

        return openai.chat.completions.create({
          messages: [...chatMessages as any[], ...newMessages],
          stream: true,
          model,
          functions,
        });
      },
    });

  return stream
}
