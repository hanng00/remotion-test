
import { z } from 'zod';

export const ExportedMessageSchema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  messageId: z.string(),
  slideId: z.string(),
  userId: z.string(),
});

export const ExportedTextMessageSchema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  messageId: z.string(),
  role: z.union([z.literal('user'), z.literal('assistant'), z.literal('function')]),
  content: z.string(),
  name: z.string().optional(),
  function_call: z.object({
    name: z.string(),
    arguments: z.string(),
  }).optional(),
});

export const ExportedImageMessageSchema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  messageId: z.string(),
  storageId: z.string(),
  mimetype: z.string(),
  transcription: z.string(),
  status: z.union([z.literal('completed'), z.literal('analysing'), z.literal('loading')]),
});

export const MessagesWithTextContentSchema = ExportedMessageSchema.extend({
  messageType: z.literal('text'),
  message: ExportedTextMessageSchema,
});

export const MessagesWithImageContentSchema = ExportedMessageSchema.extend({
  messageType: z.literal('image'),
  message: ExportedImageMessageSchema,
});

export const ChatLogItemSchema = z.union([MessagesWithTextContentSchema, MessagesWithImageContentSchema]);

export const ChatLogSchema = z.array(ChatLogItemSchema);
