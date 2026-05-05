import {
  motion,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { useCallback, useState, useEffect } from "react";
import { PanelLeft, MessageSquarePlus } from "lucide-react";

type Chat = {
  id: number;
  title: string;
};

type Props = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  chats: Chat[];
  activeChat: number | null;
  setActiveChat: (id: number) => void;
  createChat: () => void;
};

const SIDEBAR_WIDTH = {
  expanded: 260,
  collapsed: 72,
};

/* ✅ TOOLTIP COMPONENT */
function TooltipItem({
  children,
  label,
  isExpanded,
}: {
  children: React.ReactNode;
  label: string;
  isExpanded: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let t: any;
    if (hovered) {
      t = setTimeout(() => setShow(true), 120);
    } else {
      setShow(false);
    }
    return () => clearTimeout(t);
  }, [hovered]);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      <AnimatePresence>
        {!isExpanded && show && (
          <motion.div
            className="tooltip"
            initial={{ opacity: 0, x: -12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  chats,
  activeChat,
  setActiveChat,
  createChat,
}: Props) {
  const logoControls = useAnimation();

  const [isHovered, setIsHovered] = useState(false);

  /* ✅ COMBINED LOGIC */
  const isExpanded = isSidebarOpen || isHovered;

  const handleLogoClick = useCallback(async () => {
    await logoControls.start({
      rotate: 360,
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    logoControls.set({ rotate: 0 });
    window.location.reload();
  }, [logoControls]);

  return (
    <>
      {/* FLOATING BUTTON */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.button
            className="floating-toggle"
            onClick={toggleSidebar}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <PanelLeft size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.aside
        className="sidebar"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{
          width: isExpanded
            ? SIDEBAR_WIDTH.expanded
            : SIDEBAR_WIDTH.collapsed,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "visible", // ✅ IMPORTANT for tooltip
          flexShrink: 0,
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
            {isExpanded && (
              <motion.button
                className="close-btn"
                onClick={toggleSidebar}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <PanelLeft size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* CONTENT */}
        <motion.div
          animate={{
            opacity: isExpanded ? 1 : 0,
            x: isExpanded ? 0 : -10,
          }}
          transition={{ duration: 0.15 }}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            pointerEvents: isExpanded ? "auto" : "none",
          }}
        >
          {/* NEW CHAT */}
          <div className="mb-4">
            <TooltipItem label="New Chat" isExpanded={isExpanded}>
              <motion.button
                className="new-chat-btn"
                onClick={createChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquarePlus size={18} className="icon" />
                {isExpanded && <span>New Chat</span>}
              </motion.button>
            </TooltipItem>
          </div>

          {/* CHAT LIST */}
          <div className="flex-1 overflow-y-auto">
            {chats.length === 0 ? (
              <motion.p className="empty">
                No history yet
              </motion.p>
            ) : (
              chats.map((chat) => {
                const isActive = activeChat === chat.id;

                return (
                  <TooltipItem
                    key={chat.id}
                    label={chat.title || "Untitled"}
                    isExpanded={isExpanded}
                  >
                    <motion.div
                      className={`chat-item ${isActive ? "active" : ""}`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <span className="chat-title">
                        {isExpanded
                          ? chat.title || "Untitled"
                          : (chat.title?.charAt(0) || "?")}
                      </span>
                    </motion.div>
                  </TooltipItem>
                );
              })
            )}
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
}

