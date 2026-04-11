import { useState } from "react";
import Chatbot from "../components/Chatbot";
import Sidebar from "../components/Sidebar";

type Message = {
  role: "user" | "bot";
  text: string;
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

export default function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [input, setInput] = useState("");

  const currentChat = chats.find((c) => c.id === activeChat);

  // CREATE CHAT
  const createChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  // SEND MESSAGE
  const handleSend = () => {
    if (!input.trim()) return;

    let chatId = activeChat;

    // create chat if none exists
    if (!chatId) {
      const newChat: Chat = {
        id: Date.now(),
        title: input.slice(0, 20),
        messages: [],
      };

      setChats((prev) => [newChat, ...prev]);
      setActiveChat(newChat.id);
      chatId = newChat.id;
    }

    const userMessage: Message = {
      role: "user",
      text: input,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title:
                chat.messages.length === 0
                  ? input.slice(0, 20)
                  : chat.title,
              messages: [...chat.messages, userMessage],
            }
          : chat
      )
    );

    setInput("");
  };

  return (
    <div className="appContainer">
      <Sidebar
        chats={chats}
        activeChat={activeChat ?? 0}
        setActiveChat={setActiveChat}
        createChat={createChat}
      />

      <Chatbot
        messages={currentChat?.messages || []}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </div>
  );
}