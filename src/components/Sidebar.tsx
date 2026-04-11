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
      {/* HEADER */}
      <div className="sidebarTop">
        <h2>Cookbot AI</h2>

        <button className="newChat" onClick={createChat}>
          + New Chat
        </button>
      </div>

      {/* HISTORY */}
      <div className="chatList">
        {chats.length === 0 ? (
          <p className="emptyState">No history yet</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`chatItem ${
                activeChat === chat.id ? "active" : ""
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              <span className="chatTitle">{chat.title}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}