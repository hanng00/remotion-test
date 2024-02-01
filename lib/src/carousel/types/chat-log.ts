/* 
export type ExportedMessage = {
  _id: string;
  _creationTime: number;
  messageId: string;
  slideId: string;
  userId: string;
}
export type ExportedTextMessage = {
  _id: string;
  _creationTime: number;
  messageId: string;

  role: "user" | "assistant" | "function";
  content: string;
  name?: string;
  function_call?: {
    name: string;
    arguments: string;
  }
}
export type ExportedImageMessage = {
  _id: string;
  _creationTime: number;
  messageId: string;

  storageId: string;
  mimetype: string;
  transcription: string;
  status: "completed" | "analysing" | "loading";
}

export type MessagesWithTextContent = ExportedMessage & {
  messageType: "text"
  message: ExportedTextMessage
}
export type MessagesWithImageContent = ExportedMessage & {
  messageType: "image"
  message: ExportedImageMessage
}

export type ChatLogItem = MessagesWithTextContent | MessagesWithImageContent
export type ChatLog = ChatLogItem[]
 */

import { z } from 'zod';
import {
  ChatLogItemSchema,
  ExportedImageMessageSchema,
  ExportedMessageSchema,
  ExportedTextMessageSchema,
  MessagesWithImageContentSchema,
  MessagesWithTextContentSchema
} from '../entites/chat-log';

export type ExportedMessage = z.infer<typeof ExportedMessageSchema>;
export type ExportedTextMessage = z.infer<typeof ExportedTextMessageSchema>;
export type ExportedImageMessage = z.infer<typeof ExportedImageMessageSchema>;

export type MessagesWithTextContent = z.infer<typeof MessagesWithTextContentSchema>;
export type MessagesWithImageContent = z.infer<typeof MessagesWithImageContentSchema>;

export type ChatLogItem = z.infer<typeof ChatLogItemSchema>;
export type ChatLog = ChatLogItem[];
