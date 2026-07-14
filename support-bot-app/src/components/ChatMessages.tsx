import { useEffect, useRef } from "react";
import ReactMarkDown from "react-markdown";

export type Message = {
  content: string;
  role: "user" | "bot";
};

type Props = {
  messages: Message[];
};
const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();

    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <>
      {messages.map((message, index) => (
        <div
          onCopy={onCopyMessage}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          key={index}
          className={`px-3 py-1 max-w-md rounded-xl ${
            message.role === "user"
              ? "bg-[#d6d5d409] text-white self-end"
              : "text-white self-start"
          }`}
        >
          <ReactMarkDown>{message.content}</ReactMarkDown>
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
