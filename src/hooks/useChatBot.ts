import { useState, type ReactNode } from "react";
import type { Product } from "../Types";

export type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  type: "text" | "products";
  content: string | Product[] | ReactNode;
};

export const useChatbotLogic = (products: Product[]) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (msg: ChatMessage) => setMessages(prev => [...prev, msg]);

  const handleUserQuery = (query: string) => {
    addMessage({
      id: Date.now().toString(),
      sender: "user",
      type: "text",
      content: query
    });

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();

      // Example: basic filtering by title, category, or bestSeller
      const filtered = products.filter(p => {
        const matchesTitle = p.title.toLowerCase().includes(lowerQuery);
        const matchesCategory = p.category.toLowerCase().includes(lowerQuery);
        return matchesTitle || matchesCategory;
      });

      if (filtered.length > 0) {
        addMessage({
          id: (Date.now() + 1).toString(),
          sender: "bot",
          type: "products",
          content: filtered.slice(0, 2)
        });
      } else {
        addMessage({
          id: (Date.now() + 2).toString(),
          sender: "bot",
          type: "text",
          content: "Sorry, we couldn’t find anything matching your request. We will notify the team!"
        });
      }
    }, 800);
  };

  return { messages, handleUserQuery };
};
