import { Spinner } from "@/components/spinner";
import { Doc } from "@/convex/_generated/dataModel";

interface MessageItemProps {
  message: Doc<"messages">;
}
const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div key={message._id} className="text-sm py-2 whitespace-pre-wrap">
      <span className="font-bold">
        {message.role === "user" ? "User: " : "Irja: "}
      </span>
      {message.content}
      {message.content.length == 0 && message.role == "assistant" && (
        <span> <Spinner size="lg" /></span>
      )}
    </div>
  );
};

export default MessageItem;
