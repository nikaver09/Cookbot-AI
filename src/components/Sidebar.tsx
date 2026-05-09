import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  PanelLeft,
  MessageSquarePlus,
  MoreHorizontal,
  Pin,
  Archive,
  Trash2,
} from "lucide-react";

type Chat = {
  id: number;
  title: string;

  pinned?: boolean;
  archived?: boolean;
};

type Props = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  chats: Chat[];
  activeChat: number | null;

  setActiveChat: (
    id: number
  ) => void;

  createChat: () => void;

  deleteChat: (
    id: number
  ) => void;

  pinChat: (
    id: number
  ) => void;

  archiveChat: (
    id: number
  ) => void;
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

  deleteChat,
  pinChat,
  archiveChat,
}: Props) {
  const isExpanded =
    isSidebarOpen;

  /* RELOAD WEBSITE */
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
            onClick={
              toggleSidebar
            }
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

              background:
                "#4a4a4a",

              color: "#fff",

              cursor: "pointer",

              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
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

          backgroundColor:
            isExpanded
              ? "#3d3d3d"
              : "transparent",

          borderRightColor:
            isExpanded
              ? "rgba(255,255,255,0.05)"
              : "transparent",
        }}
        transition={{
          duration: 0.25,
          ease: [
            0.4, 0, 0.2, 1,
          ],
        }}
        style={{
          display: "flex",
          flexDirection:
            "column",

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
            alignItems:
              "center",

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
                onClick={
                  handleLogoClick
                }
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

                  cursor:
                    "pointer",
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

                  cursor:
                    "pointer",

                  display: "flex",
                  alignItems:
                    "center",

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
                  onClick={
                    createChat
                  }
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
                  chats.map(
                    (chat) => {
                      const isActive =
                        activeChat ===
                        chat.id;

                      return (
                        <ChatItem
                          key={
                            chat.id
                          }
                          chat={chat}
                          isActive={
                            isActive
                          }
                          setActiveChat={
                            setActiveChat
                          }
                          deleteChat={
                            deleteChat
                          }
                          pinChat={
                            pinChat
                          }
                          archiveChat={
                            archiveChat
                          }
                        />
                      );
                    }
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
}

/* CHAT ITEM */
function ChatItem({
  chat,
  isActive,
  setActiveChat,

  deleteChat,
  pinChat,
  archiveChat,
}: any) {
  const [openMenu, setOpenMenu] =
    useState(false);

  return (
    <div
      style={{
        position: "relative",
        marginBottom: 8,
      }}
    >
      {/* CHAT BUTTON */}
      <motion.div
        onClick={() =>
          setActiveChat(chat.id)
        }
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        style={{
          padding: "12px 14px",

          borderRadius: 12,

          cursor: "pointer",

          display: "flex",
          alignItems: "center",

          justifyContent:
            "space-between",

          background: isActive
            ? "rgba(255,255,255,0.12)"
            : "transparent",

          color: "#fff",

          border: chat.pinned
            ? "1px solid rgba(255,255,255,0.14)"
            : "1px solid transparent",

          opacity:
            chat.archived
              ? 0.5
              : 1,

          transition:
            "0.2s ease",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            display: "flex",
            alignItems:
              "center",

            gap: 8,

            flex: 1,

            overflow: "hidden",
          }}
        >
          {chat.pinned && (
            <Pin size={14} />
          )}

          <span
            style={{
              overflow: "hidden",

              whiteSpace:
                "nowrap",

              textOverflow:
                "ellipsis",
            }}
          >
            {chat.title ||
              "Untitled"}
          </span>
        </div>

        {/* 3 DOT BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();

            setOpenMenu(
              !openMenu
            );
          }}
          style={{
            background:
              "transparent",

            border: "none",

            color: "#aaa",

            cursor: "pointer",

            width: 30,
            height: 30,

            borderRadius: 8,

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            flexShrink: 0,

            transition:
              "0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "transparent";
          }}
        >
          <MoreHorizontal
            size={18}
          />
        </button>
      </motion.div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{
              opacity: 0,
              y: -5,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -5,
              scale: 0.98,
            }}
            transition={{
              duration: 0.15,
            }}
            style={{
              position:
                "absolute",

              top: 50,
              right: 0,

              width: 190,

              background:
                "#2b2b2b",

              borderRadius: 18,

              padding: 8,

              zIndex: 1000,

              border:
                "1px solid rgba(255,255,255,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.45)",

              backdropFilter:
                "blur(10px)",
            }}
          >
            {/* PIN */}
            <MenuItem
              icon={
                <Pin size={16} />
              }
              text={
                chat.pinned
                  ? "Unpin chat"
                  : "Pin chat"
              }
              onClick={() => {
                pinChat(chat.id);

                setOpenMenu(
                  false
                );
              }}
            />

            {/* ARCHIVE */}
            <MenuItem
              icon={
                <Archive
                  size={16}
                />
              }
              text={
                chat.archived
                  ? "Unarchive"
                  : "Archive"
              }
              onClick={() => {
                archiveChat(
                  chat.id
                );

                setOpenMenu(
                  false
                );
              }}
            />

            {/* DELETE */}
            <MenuItem
              icon={
                <Trash2
                  size={16}
                />
              }
              text="Delete"
              danger
              onClick={() => {
                deleteChat(
                  chat.id
                );

                setOpenMenu(
                  false
                );
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* MENU ITEM */
function MenuItem({
  icon,
  text,
  danger,
  onClick,
}: any) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",

        display: "flex",
        alignItems: "center",

        gap: 12,

        padding: "12px 14px",

        borderRadius: 12,

        border: "none",

        background:
          "transparent",

        color: danger
          ? "#ff5b5b"
          : "#fff",

        cursor: "pointer",

        fontSize: 14,

        transition:
          "0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          "transparent";
      }}
    >
      {icon}
      {text}
    </button>
  );
}