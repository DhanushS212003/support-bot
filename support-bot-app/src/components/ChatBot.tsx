import { useState } from "react";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import ChatInput, { type ChatFormData } from "./ChatInput";
import popSound from "../assets/sounds/pop.mp3";
import notificationSound from "../assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState("");
  const TESTING = true;

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setError("");
      setIsBotTyping(true);
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      popAudio.play();

      const { data } = await axios.post("http://localhost:8000/api/chat/", {
        prompt,
        testing: TESTING,
      });

      setMessages((prev) => [...prev, { content: data.reply, role: "bot" }]);
      notificationAudio.play();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.error;

        if (err) setError(err);
        else setError("Something went wrong, try again!");
      } else {
        setError("Something went wrong, try again!");
      }
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-xl font-bold text-white my-4 text-center">
        Hi! I'm your WonderWorld Support Agent
      </h1>
      <div className="flex flex-col flex-1 gap-3 p-4 mb-10 overflow-y-scroll scrollbar-thin [scrollbar-color:#525252_transparent]">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default ChatBot;
