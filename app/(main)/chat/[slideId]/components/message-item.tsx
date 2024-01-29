import { Spinner } from "@/components/spinner";
import { Doc } from "@/convex/_generated/dataModel";

interface MessageItemProps {
  message: Doc<"textMessages">;
}
const MessageItem = ({ message }: MessageItemProps) => {
  const shouldHideMessage = (message: Doc<"textMessages">) => {
    var shouldHide = false;
    if (message.role == "function") {
      shouldHide = true;
    }

    if (message.role == "assistant" && message.content.length == 0) {
      shouldHide = true;
    }

    return shouldHide;
  };

  if (shouldHideMessage(message)) {
    return null;
  }

  return (
    <div key={message._id} className="text-sm py-2 whitespace-pre-wrap">
      <span className="font-bold">
        {message.role === "user" ? "User: " : "Irja: "}
      </span>
      {message.content}
      {message.content.length == 0 && message.role == "assistant" && (
        <span>
          <Spinner size="lg" />
        </span>
      )}
    </div>
  );
};

export default MessageItem;
