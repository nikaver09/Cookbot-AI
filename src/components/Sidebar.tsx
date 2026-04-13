import { motion } from "framer-motion";

type Chat = {
  id: number;
  title: string;
};

type Props = {
  chats: Chat[];
  activeChat: number;
  setActiveChat: (id: number) => void;
  createChat: () => void;
};

export default function Sidebar({
  chats,
  activeChat,
  setActiveChat,
  createChat,
}: Props) {
  return (
    <div className="sidebar">
      <div className="mb-4">

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createChat}
        >
          New Chat
        </motion.button>
      </div>

      <div className="flex-1">
        {chats.length === 0 ? (
          <p>No history yet</p>
        ) : (
          chats.map((chat) => (
            <motion.div
              key={chat.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveChat(chat.id)}
              className={`chat-item ${
                activeChat === chat.id ? "active" : ""
              }`}
            >
              <span className="chat-title">{chat.title}</span>

              {activeChat === chat.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="active-indicator"
                />
              )}
            </motion.div>
          ))
        )}
      </div>

      <div className="footer"></div>
    </div>
  );
}