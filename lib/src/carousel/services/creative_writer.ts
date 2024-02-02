import OpenAI from "openai";

import { zu } from 'zod_utilz';

import { ReponseNarrationScriptSchema } from "../entites/narration-script";
import { NarrationScript } from "../types";
import { ChatLog, ExportedImageMessage, ExportedTextMessage } from "../types/chat-log";

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

class ImageIdEncoderDecoder {
  private imageIdToEncoding: Record<string, string>;
  private encodingToImageId: Record<string, string>;

  constructor() {
    this.imageIdToEncoding = {}
    this.encodingToImageId = {}
  }

  public generateEncoding = (imageId: string): string => {
    const imageIndex = Object.keys(this.imageIdToEncoding).length;

    // Retrieve a random letter from the alphabet
    const letterIndex = Math.floor(Math.random() * ALPHABET.length);
    const letter = ALPHABET[letterIndex];
    // Combine the index and the letter to create a unique encoding
    const encoding = `${imageIndex}${letter}`;
    return encoding
  }

  public encode = (imageId: string): string => {
    // Check if the imageId has been encoded before, 
    if (this.imageIdToEncoding[imageId]) {
      return this.imageIdToEncoding[imageId];
    }

    // If not, we'll encode the image by simply taking its index
    // in our imageIds hash
    const encoding = this.generateEncoding(imageId);
    this.imageIdToEncoding[imageId] = encoding;
    this.encodingToImageId[encoding] = imageId;

    return encoding;
  }

  public decode = (encoding: string): string => {
    // Check if the imageIndex has been decoded before
    if (!this.encodingToImageId[encoding]) {
      throw new Error('Image index has not been decoded before');
    }

    return this.encodingToImageId[encoding];
  }
}

const parseImageMessages = (message: ExportedImageMessage, encode: (imageId: string) => string) => {
  // The database IDs are typically very long. We'll encode them as shorter strings instead
  const encodedMessageId = encode(message._id);
  return {
    imageId: encodedMessageId,
    transcription: message.transcription
  }
}

const parseTextMessages = (textMessage: ExportedTextMessage) => {
  // What must be kept is role and content.
  // For now, we'll exclude information about function calls. Sufficient information should be available
  // in the image messages, at least for the LLM to reconstruct a story.

  const { role, content } = textMessage

  if (!["user", "assistant"].includes(role)) {
    return null
  }

  if (content.length == 0) {
    return null
  }

  return {
    role,
    content
  }
}

const parseMessages = (messages: ChatLog, encode: (imageId: string) => string) => {
  const parsedMessages = [];
  for (const message of messages) {
    let result
    if (message.messageType === 'image') {
      result = parseImageMessages(message.message, encode);
    } else if (message.messageType === 'text') {
      result = parseTextMessages(message.message);
    }
    if (!result) {
      continue;
    }

    parsedMessages.push(result);
  }

  return parsedMessages;
}

const getInstructionMessage = () => {
  const instruction = `
  # Task
  - Develop a presentation script reminiscing the memory from the user-assistant chat log interview. Never mention the actual chat log.
  - The media and narration will be shown side by side. Don't state what's obvious from the media in the narration.
  - Keep the response under 500 words. Hard limit. Even for long memories, keep it concise.

  # Rhetorical Style
  - Focus on the context details provided by the user in the chat. Mention names, people, places, traditions, jokes, from the user.
  - Mirror the user's tone, mood and writing style. Use specific words they used. It should feel like the user wrote the script.
  - Use a first-person narrative from the users perspective.

  # Media
  - You are allowed to use the media in any order. You can use the same media multiple times, but don't overdo it.
  - Use media genorously, but don't overdo it. The media should be used to support the narration, not the other way around.
  - First, show the media file. Then, narrate the memory.

  # Response JSON Schema:
  {
    "script": [
      // A media block
      {
        type: "media",
        id: string
      },
      // A narration block
      {
        "type": "narration"
        "content": string
      }, 

      ...
    ]
  }
  `
  return instruction;
}

const stringifyMessages = (messages: Record<string, string>[]): string => {
  return messages.map(message => JSON.stringify(message)).join('\n');
}

const generateNarrationScript = async (prompt: string, openai: OpenAI): Promise<string> => {
  const instructionsMessage = getInstructionMessage()

  const messages = [
    {
      role: "system" as const,
      content: instructionsMessage
    },
    {
      role: "system" as const,
      content: prompt
    }
  ]

  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages,
    max_tokens: 800,
    response_format: { type: "json_object" }
  })

  if (!response) {
    throw new Error("No response from OpenAI")
  }

  const narrationScript = response.choices[0].message.content
  if (!narrationScript) {
    throw new Error("No narration script generated, despite successful response")
  }

  return narrationScript
}

const parseAndTypeNarrationScript = (narrationScript: string): NarrationScript => {
  const schema = zu.stringToJSON()
  const maybeNarrationScript = schema.parse(narrationScript)
  const responseNarrationScript = ReponseNarrationScriptSchema.parse(maybeNarrationScript)
  return responseNarrationScript["script"]
}

const decodeNarrationScript = (narrationScript: NarrationScript, decode: (encoding: string) => string): NarrationScript => {
  const decodedNarrationScript = narrationScript.map(message => {
    if (message.type === "media") {
      return {
        ...message,
        id: decode(message.id)
      }
    } else {
      return message
    }
  })

  return decodedNarrationScript

}

interface WriteNarrationScriptArgs {
  chatLog: ChatLog
  openai: OpenAI
}
export const writeNarrationScript = async ({ chatLog, openai }: WriteNarrationScriptArgs) => {
  // 1. Convert the raw chat log into a format which the LLM can understand
  //    Essentially reducing noise, such as unintersting data points.

  const imageIdEncoderDecoder = new ImageIdEncoderDecoder();
  const encodeImageIds = imageIdEncoderDecoder.encode;

  const parsedMessages = parseMessages(chatLog, encodeImageIds);

  // 2. Once parsed, we'll join the messages into a single string
  //    and wrap our instructions around it.
  const prompt = stringifyMessages(parsedMessages);
  const narrationScriptString = await generateNarrationScript(prompt, openai);


  // 3. Given the narration script, we'll decode the image IDs
  //    and replace them with the original image IDs.
  const encodedNarrationScript = parseAndTypeNarrationScript(narrationScriptString);
  const narrationScript = decodeNarrationScript(encodedNarrationScript, imageIdEncoderDecoder.decode);

  return narrationScript;
}
