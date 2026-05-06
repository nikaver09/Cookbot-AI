import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

type Props = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  chats: Chat[];
  activeChat: number | null;
  setActiveChat: (id: number) => void;
  createChat: () => void;

  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;

  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
};

export default function CookbotUI({
  isSidebarOpen,
  toggleSidebar,

  chats,
  activeChat,
  setActiveChat,
  createChat,

  messages,
  input,
  setInput,
  handleSend,

  theme,
  setTheme,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <div
      className="appLayout"
      style={{
        display: "flex",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* =========================
          MOBILE MENU BUTTON
      ========================= */}
      {!(isMobile && isSidebarOpen) && (
        <button
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 40,

            width: 44,
            height: 44,

            border: "none",
            borderRadius: 12,

            background: "#4a4a4a",
            color: "white",

            display: isMobile ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",

            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      {/* =========================
          SIDEBAR
      ========================= */}
      <motion.div
        animate={{
          width: isSidebarOpen
            ? 260
            : isMobile
            ? 0
            : 80,
        }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          height: "100%",
          flexShrink: 0,
          overflow: "hidden",
          zIndex: 20,
        }}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          chats={chats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          createChat={createChat}
        />
      </motion.div>

      {/* =========================
          CHATBOT
      ========================= */}
      <motion.div
        layout
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          overflow: "hidden",

          display: "flex",
          flexDirection: "column",

          position: "relative",
        }}
      >
        <Chatbot
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          theme={theme}
          setTheme={setTheme}
        />
      </motion.div>
    </div>
  );
}