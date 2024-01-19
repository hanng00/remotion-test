import { Message } from "ai";

interface MessageItemProps {
  message: Message;
}
const MessageItem = ({ message }: MessageItemProps) => {
  if (message.function_call) {
    // Intermediate Function Call message. Dont render
    return null;
  }
  if (message.role === "function") {
    // Custom Display for Function outputs
    return (
      <div
        key={message.id}
        className="py-2 whitespace-pre-wrap w-full text-green-400 font-bold text-center p-1"
      >
        {message.content}
      </div>
    );
  }

  return (
    <div key={message.id} className="py-2 whitespace-pre-wrap">
      <span className="font-bold">
        {message.role === "user" ? "User: " : "Irja: "}
      </span>
      {message.content}
    </div>
  );
};

export default MessageItem;
