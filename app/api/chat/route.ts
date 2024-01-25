import { StreamingTextResponse } from 'ai';
import { ChatService } from '@/lib/services/ChatService/chat-service';
import { instruction } from '@/lib/services/ChatService/instructions';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // 'data' contains the additional data that you have sent:
  const { messages: messageHistory, data } = await req.json();


  // Ask OpenAI for a streaming chat completion given the prompt
  const messages = getMessages(messageHistory, data)
  const stream = await ChatService({
    messages,
    model: 'gpt-4-1106-preview',
    max_tokens: 150,
  })
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

