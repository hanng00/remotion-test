import { GenericDatabaseReader } from "convex/server";
import { DataModel, Id } from "../_generated/dataModel";
import { listMessagesWithContent } from "./listWithContent";

interface listImageDescriptionsArgs {
  db: GenericDatabaseReader<DataModel>;
  userId: string;
  slideId: Id<"slides">;
}

export const listImageDescriptionsService = async ({
  db,
  userId,
  slideId
}: listImageDescriptionsArgs) => {
  const messagesWithImageContent = await listMessagesWithContent(
    db, slideId, userId
  )

  if (!messagesWithImageContent) return []

  // @ts-ignore
  const imageMessages: Doc<"imageMessages">[] = messagesWithImageContent
    .filter(message => message.messageType === "image" && !!message.message)
    .map((msg) => msg.message)

  return imageMessages
}