import {
  motion,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { useCallback } from "react";
import { PanelLeft } from "lucide-react";

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
};

const SIDEBAR_WIDTH = {
  expanded: 260,
  collapsed: 72,
};

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  chats,
  activeChat,
  setActiveChat,
  createChat,
}: Props) {
  const logoControls = useAnimation();

  const handleLogoClick = useCallback(async () => {
    await logoControls.start({
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });

    // Reset rotation so animation is consistent every click
    logoControls.set({ rotate: 0 });

    window.location.reload();
  }, [logoControls]);

  const sidebarWidth = isSidebarOpen
    ? SIDEBAR_WIDTH.expanded
    : SIDEBAR_WIDTH.collapsed;

  return (
    <motion.aside
      layout="size"
      className="sidebar"
      initial={false}
      animate={{ width: sidebarWidth }}
      transition={{
        duration: 0.28,
        ease: "easeInOut",
      }}
      style={{
        flexShrink: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}

      <div className="sidebar-header">
        <motion.img
          src="/cookbot11.png"
          alt="Cookbot Logo"
          className="logo"
          onClick={handleLogoClick}
          animate={logoControls}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          draggable={false}
        />

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.button
              key="close-btn"
              className="close-btn"
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
            >
              <PanelLeft size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* CONTENT */}

      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            key="sidebar-content"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
             transition={{ duration: 0.25 }}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div className="mb-4">
              <motion.button
                className="new-chat-btn"
                onClick={createChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                New Chat
              </motion.button>
            </div>

            {/* CHAT LIST */}

            <div
              className="flex-1"
              style={{
                overflowY: "auto",
              }}
            >
              {chats.length === 0 ? (
                <motion.p
                  className="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No history yet
                </motion.p>
              ) : (
                chats.map((chat) => {
                  const isActive = activeChat === chat.id;

                  return (
                    <motion.div
                      key={chat.id}
                      layout
                      role="button"
                      tabIndex={0}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveChat(chat.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveChat(chat.id);
                        }
                      }}
                      className={`chat-item ${
                        isActive ? "active" : ""
                      }`}
                    >
                      <span className="chat-title">
                        {chat.title}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
