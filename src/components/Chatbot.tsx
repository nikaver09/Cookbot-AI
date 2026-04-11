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
};

export default function Chatbot({
  messages,
  input,
  setInput,
  handleSend,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ✅ Smooth scroll function (ChatGPT-style behavior)
  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  // ✅ Auto scroll when messages update
  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);

  // ✅ Send + scroll together (important for instant UX)
  const handleSendAndScroll = () => {
    handleSend();

    // ensures DOM updates first before scrolling
    requestAnimationFrame(() => {
      scrollToBottom(true);
    });
  };

  return (
    <div className="chatContainer">
      {/* MESSAGE AREA */}
      <div className="messages">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`msg ${m.role}`}
            >
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 👇 Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA */}
      <div className="promptBar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Chat in Cookbot"
          onKeyDown={(e) => e.key === "Enter" && handleSendAndScroll()}
        />

        <button onClick={handleSendAndScroll}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}