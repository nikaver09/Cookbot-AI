import { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "bot";
  text: string;
};

type Props = {
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
};

export default function Chatbot({
  messages,
  input,
  setInput,
  handleSend,
  theme,
  setTheme,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom(true);
    });
  }, [messages]);

  // Send message + ensure scroll after DOM update
  const handleSendAndScroll = () => {
    handleSend();

    requestAnimationFrame(() => {
      scrollToBottom(true);
    });
  };

  return (
    <div className={`chatContainer ${theme}`}>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="logo">Cookbot</div>

        <button
          className="toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <div className={`knob ${theme}`} />
        </button>
      </div>

      {/* MESSAGES */}
      <div className="messages">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`msg ${m.role}`}
            >
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="promptBar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Chat in Cookbot"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendAndScroll();
          }}
        />

        <button onClick={handleSendAndScroll}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}