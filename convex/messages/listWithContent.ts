import { GenericDatabaseReader } from "convex/server"
import { DataModel, Id } from "../_generated/dataModel"
import { asyncMap } from "./../helpers/asyncMap";

export const listMessagesWithContent = async (
  db: GenericDatabaseReader<DataModel>,
  slideId: Id<"slides">,
  userId: string,
) => {
  const messages = await db
    .query("messages")
    .withIndex("byUserSlide", (q) =>
      q
        .eq("userId", userId)
        .eq("slideId", slideId)
    )
    .order("asc")
    .collect()

  if (!messages) return []

  const messagesWithMaybeContent = await asyncMap(messages,
    async (message) => {
      if (!message.messageId) return {
        ...message,
        message: null,
      }
      const content = await db.get(message.messageId)
      return {
        ...message,
        message: content,
      }
    }
  )
  const messageWithContent = messagesWithMaybeContent.filter((msg) => msg.message !== null && msg.message !== undefined)
  return messageWithContent
}
