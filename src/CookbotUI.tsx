import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";
import { motion } from "framer-motion";


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
  return (
    <div
      className="appLayout"
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* =========================
          SIDEBAR
      ========================= */}
      <motion.div
        layout
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          height: "100%",
          flexShrink: 0,
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