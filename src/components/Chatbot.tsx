import { useEffect, useRef, useState } from "react";
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
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* ================= AUTO SCROLL ================= */

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom(true);
    });
  }, [messages]);

  const handleSendAndScroll = () => {
    handleSend();

    requestAnimationFrame(() => {
      scrollToBottom(true);
    });
  };

  /* ================= DYNAMIC PLACEHOLDER ================= */

  const placeholders = [
    "Ask for a recipe...",
    "What can I cook today?",
    "Plan a healthy meal...",
    "Suggest a dinner idea...", 
    "How do I make pasta?",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (input) return;

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) =>
        (prev + 1) % placeholders.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [input]);

  /* ================= UI ================= */

  return (
    <div className={`chatContainer ${theme}`}>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="logo">Cookbot</div>

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
  <div className="inputWrapper">

    {/* Smooth animated placeholder */}
    {!input && (
      <AnimatePresence mode="wait">
        <motion.span
          key={placeholderIndex}
          className="animatedPlaceholder"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          {placeholders[placeholderIndex]}
        </motion.span>
      </AnimatePresence>
    )}

    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSendAndScroll();
        }
    }}
    />

  </div>

        <button
          onClick={handleSendAndScroll}
          className="sendButton"
          disabled={!input.trim()}
        >
          <img
            src="/icon/right-arrow.png"
            alt="send"
            width="18"
            height="18"
          />
        </button>
      </div>
    </div>
  );
}