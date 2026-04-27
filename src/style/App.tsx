import { useState } from "react";
import CookbotUI from "../CookbotUI";

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
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  /* FIX — Add these */
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const currentChat = activeChat
    ? chats.find((c) => c.id === activeChat)
    : undefined;

  const createChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    let chatId = activeChat;

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
    <CookbotUI
      chats={chats}
      activeChat={activeChat ?? -1}
      setActiveChat={setActiveChat}
      createChat={createChat}
      messages={currentChat?.messages || []}
      input={input}
      setInput={setInput}
      handleSend={handleSend}
      theme={theme}
      setTheme={setTheme}

      /* PASS THEM HERE */
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
    />
  );
}