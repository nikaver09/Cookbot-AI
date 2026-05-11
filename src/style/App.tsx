import { useState } from "react";
import CookbotUI from "../CookbotUI";

type Message = {
  role: "user" | "bot";
  text: string;
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];

  pinned?: boolean;
  archived?: boolean;
};

export default function App() {
  const [chats, setChats] =
    useState<Chat[]>([]);

  const [
    activeChat,
    setActiveChat,
  ] = useState<number | null>(
    null
  );

  const [input, setInput] =
    useState("");

  const [theme, setTheme] =
    useState<"dark" | "light">(
      "dark"
    );

  /* SIDEBAR */
  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(
      (prev) => !prev
    );
  };

  /* CURRENT CHAT */
  const currentChat = activeChat
    ? chats.find(
        (c) =>
          c.id === activeChat
      )
    : undefined;

  /* CREATE CHAT */
  const createChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [
      newChat,
      ...prev,
    ]);

    setActiveChat(newChat.id);
  };

  /* DELETE CHAT */
  const deleteChat = (
    id: number
  ) => {
    setChats((prevChats) =>
      prevChats.filter(
        (chat) =>
          chat.id !== id
      )
    );

    if (activeChat === id) {
      setActiveChat(null);
    }
  };

  /* PIN CHAT */
  const pinChat = (
    id: number
  ) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              pinned:
                !chat.pinned,
            }
          : chat
      )
    );
  };

  /* ARCHIVE CHAT */
  const archiveChat = (
    id: number
  ) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              archived:
                !chat.archived,
            }
          : chat
      )
    );
  };

  /* SEND MESSAGE */
  const handleSend =
    async () => {
      if (!input.trim())
        return;

      let chatId =
        activeChat;

      if (!chatId) {
        const newChat: Chat = {
          id: Date.now(),
          title:
            input.slice(0, 20),
          messages: [],
        };

        setChats((prev) => [
          newChat,
          ...prev,
        ]);

        setActiveChat(
          newChat.id
        );

        chatId = newChat.id;
      }

      const userMessage: Message =
        {
          role: "user",
          text: input,
        };

      const lowerInput =
        input.toLowerCase();

      const greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "h1",
        "h3llo",
        "h3y",
        "g00d m0rn1ng",
        "g00d 4ft3rn00n",
        "g00d 3v3n1ng",
        "tirada",
      ];

      const cookingKeywords =
        [
          "cook",
          "recipe",
          "dish",
          "ingredients",
          "food",
          "meal",
          "kitchen",
          "fried",
          "boil",
          "grill",
          "bake",
          "chicken",
          "pork",
          "beef",
          "fish",
          "egg",
          "rice",
          "garlic",
          "onion",
          "soy sauce",
          "vinegar",
          "vegetable",
          "soup",
          "adobo",
          "tinola",
          "sinigang",
          "pancit",
        ];

      /* GREETINGS */
      if (
        greetings.includes(
          lowerInput
        )
      ) {
        const greetingReply: Message =
          {
            role: "bot",
            text: `Hello! 👋 I'm Cookbot AI — your smart cooking assistant.

I help you discover delicious dishes based on the ingredients you already have at home.

🍽 Recipe recommendations
📖 Dish descriptions
👨‍🍳 Cooking instructions
⏱ Cooking time
🔥 Difficulty level

Just type the ingredients you have at home.

Example:
"chicken, garlic, soy sauce" 🍳`,
          };

        setChats((prev) =>
          prev.map((chat) =>
            chat.id ===
            chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    userMessage,
                    greetingReply,
                  ],
                }
              : chat
          )
        );

        setInput("");

        return;
      }

      /* NON COOKING */
      const isCookingRelated =
        cookingKeywords.some(
          (keyword) =>
            lowerInput.includes(
              keyword
            )
        );

      if (
        !isCookingRelated
      ) {
        const unrelatedReply: Message =
          {
            role: "bot",
            text: "Sorry 😅 I currently only assist with cooking, ingredients, and recipe recommendations.",
          };

        setChats((prev) =>
          prev.map((chat) =>
            chat.id ===
            chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    userMessage,
                    unrelatedReply,
                  ],
                }
              : chat
          )
        );

        setInput("");

        return;
      }

      /* ADD USER MESSAGE */
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,

                title:
                  chat.messages
                    .length ===
                  0
                    ? input.slice(
                        0,
                        20
                      )
                    : chat.title,

                messages: [
                  ...chat.messages,
                  userMessage,
                ],
              }
            : chat
        )
      );

      setInput("");

      try {
        const ingredients =
          input
            .split(",")
            .map((i) =>
              i.trim()
            );

        const response =
          await fetch(
            "https://cookbot-backend.onrender.com/recommend",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                {
                  ingredients:
                    ingredients,
                }
              ),
            }
          );

        const data =
          await response.json();

        const botMessage: Message =
          {
            role: "bot",

            text: `🍳 Based on the ingredients you provided, I recommend cooking:

🍽 ${data.dish}

📖 About this dish:
${data.description}

👨‍🍳 Cooking Guide:
${data.steps}

⏱ Estimated Cooking Time:
${
  data.time ||
  "30-45 minutes"
}

🔥 Difficulty:
${
  data.difficulty ||
  "Easy"
}

💡 Cooking Tip:
For better flavor, simmer properly and season gradually while tasting.

Enjoy your meal! 😋`,
          };

        setChats((prev) =>
          prev.map((chat) =>
            chat.id ===
            chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    botMessage,
                  ],
                }
              : chat
          )
        );
      } catch (error) {
        console.error(error);

        const errorMessage: Message =
          {
            role: "bot",
            text: "Error: Could not connect to AI backend.",
          };

        setChats((prev) =>
          prev.map((chat) =>
            chat.id ===
            chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    errorMessage,
                  ],
                }
              : chat
          )
        );
      }
    };

  return (
    <CookbotUI
      chats={chats}
      activeChat={
        activeChat ?? -1
      }
      setActiveChat={
        setActiveChat
      }
      createChat={createChat}

      deleteChat={
        deleteChat
      }

      pinChat={pinChat}

      archiveChat={
        archiveChat
      }

      messages={
        currentChat?.messages ||
        []
      }

      input={input}
      setInput={setInput}

      handleSend={
        handleSend
      }

      theme={theme}
      setTheme={setTheme}

      isSidebarOpen={
        isSidebarOpen
      }

      toggleSidebar={
        toggleSidebar
      }
    />
  );
}