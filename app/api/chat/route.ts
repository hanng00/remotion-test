import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { instruction } from './instruction';
import { functions, runServerFunction } from './functions';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';


export async function POST(req: Request) {
  // 'data' contains the additional data that you have sent:
  const { messages: messageHistory, data } = await req.json();


  // Ask OpenAI for a streaming chat completion given the prompt
  const messages = getMessages(messageHistory, data)
  const response = await openai.chat.completions.create({
    // model: 'gpt-3.5-turbo-16k-0613',
    model: "gpt-4-1106-preview",
    stream: true,
    max_tokens: 150,
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
        const result = await runServerFunction(name, args);
        if (!result) return

        const newMessages = createFunctionCallMessages(
          result
        );
        console.log("newMessages", newMessages)
        return openai.chat.completions.create({
          messages: [...messages, ...newMessages],
          stream: true,
          model: "gpt-4-1106-preview",
          functions,
        });
      }
    });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

const getMessages = (messageHistory: any, data: any) => {
  const initialMessages = messageHistory.slice(0, -1);
  const currentMessage = messageHistory[messageHistory.length - 1];

  const messages = [
    {
      role: 'system',
      content: instruction,
    },
    ...initialMessages
  ]


  if (data?.imageUrl) {
    messages.push({
      ...currentMessage,
      content: [
        { type: 'text', text: currentMessage.content },

        {
          type: 'image_url',
          image_url: data.imageUrl,
        },
      ],
    },);
  } else {
    messages.push(currentMessage);
  }

  return messages;
}

