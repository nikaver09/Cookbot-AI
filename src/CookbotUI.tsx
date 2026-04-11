import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";

type Message = {
  role: "user" | "bot";
  text: string;
};

type Chat = {
  id: number;
  title: string;
};

type Props = {
  chats: Chat[];
  activeChat: number;
  setActiveChat: (id: number) => void;
  createChat: () => void;

  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
};

export default function CookbotUI({
  chats,
  activeChat,
  setActiveChat,
  createChat,
  messages,
  input,
  setInput,
  handleSend,
}: Props) {
  return (
    <div className="appLayout">
      {/* LEFT SIDE */}
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createChat={createChat}
      />

      {/* RIGHT SIDE */}
      <Chatbot
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </div>
  );
}