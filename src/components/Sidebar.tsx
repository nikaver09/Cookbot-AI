import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  PanelLeft,
  MessageSquarePlus,
} from "lucide-react";

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
  collapsed: 82,
};

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,

  chats,
  activeChat,
  setActiveChat,

  createChat,
}: Props) {
  const isExpanded = isSidebarOpen;

  /* ✅ RELOAD WEBSITE */
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            className="floating-toggle"
            onClick={toggleSidebar}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.2,
            }}
            style={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1000,

              width: 42,
              height: 42,

              border: "none",
              borderRadius: 10,

              background: "#4a4a4a",
              color: "#fff",

              cursor: "pointer",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PanelLeft size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{
          width: isExpanded
            ? SIDEBAR_WIDTH.expanded
            : SIDEBAR_WIDTH.collapsed,

          backgroundColor: isExpanded
            ? "#3d3d3d"
            : "transparent",

          borderRightColor: isExpanded
            ? "rgba(255,255,255,0.05)"
            : "transparent",
        }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          display: "flex",
          flexDirection: "column",

          overflow: "hidden",

          flexShrink: 0,

          height: "100vh",

          borderRight:
            "1px solid transparent",

          position: "relative",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",

            padding: "16px",
            minHeight: "72px",
          }}
        >
          {/* LOGO */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.img
                src="/cookbot11.png"
                alt="Cookbot Logo"

                /* ✅ CLICK RELOAD */
                onClick={handleLogoClick}

                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.2,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                draggable={false}
                style={{
                  width: 42,
                  height: 42,

                  objectFit:
                    "contain",

                  cursor: "pointer",
                }}
              />
            )}
          </AnimatePresence>

          {/* CLOSE BUTTON */}
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                onClick={
                  toggleSidebar
                }
                initial={{
                  opacity: 0,
                  x: 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 10,
                }}
                transition={{
                  duration: 0.2,
                }}
                style={{
                  background:
                    "transparent",

                  border: "none",

                  color: "#fff",

                  width: 36,
                  height: 36,

                  borderRadius: 8,

                  cursor: "pointer",

                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                }}
              >
                <PanelLeft size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* CONTENT */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -10,
              }}
              transition={{
                duration: 0.15,
              }}
              style={{
                display: "flex",
                flexDirection:
                  "column",

                height: "100%",

                padding: "12px",
              }}
            >
              {/* NEW CHAT */}
              <div
                style={{
                  marginBottom: 16,
                }}
              >
                <motion.button
                  onClick={createChat}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  style={{
                    width: "100%",

                    display: "flex",
                    alignItems:
                      "center",

                    gap: 10,

                    padding:
                      "12px 14px",

                    borderRadius: 12,

                    border: "none",

                    background:
                      "rgba(255,255,255,0.08)",

                    color: "#fff",

                    cursor:
                      "pointer",
                  }}
                >
                  <MessageSquarePlus
                    size={18}
                  />

                  <span>
                    New Chat
                  </span>
                </motion.button>
              </div>

              {/* CHAT LIST */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                }}
              >
                {chats.length ===
                0 ? (
                  <p
                    style={{
                      color:
                        "rgba(255,255,255,0.5)",
                    }}
                  >
                    No history yet
                  </p>
                ) : (
                  chats.map((chat) => {
                    const isActive =
                      activeChat ===
                      chat.id;

                    return (
                      <motion.div
                        key={chat.id}
                        onClick={() =>
                          setActiveChat(
                            chat.id
                          )
                        }
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        style={{
                          padding:
                            "12px 14px",

                          borderRadius: 12,

                          marginBottom: 8,

                          cursor:
                            "pointer",

                          background:
                            isActive
                              ? "rgba(255,255,255,0.12)"
                              : "transparent",

                          color:
                            "#fff",
                        }}
                      >
                        {chat.title ||
                          "Untitled"}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
}