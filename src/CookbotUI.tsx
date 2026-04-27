import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";
import { PanelLeftOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "bot";
  text: string;
};

type Chat = {
  id: number;
  title: string;
};

type Props = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  chats: Chat[];
  activeChat: number;
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
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* OPEN BUTTON */}

      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.button
            key="open-btn"
            className="open-sidebar-btn"
            onClick={toggleSidebar}
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <PanelLeftOpen size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* SIDEBAR */}

      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{
              x: -260,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -260,
              opacity: 0,
            }}
            transition={{
              duration: 0.28,
              ease: "easeInOut",
            }}
            style={{
              height: "100%",
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
        )}
      </AnimatePresence>

      {/* CHATBOT */}

      <motion.div
        layout
        style={{
          flex: 1,
          overflow: "hidden",
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