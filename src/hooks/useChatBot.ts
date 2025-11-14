// useChatBot.ts
import { useState, useEffect } from "react";
import type { Product } from "../Types";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  type: "text" | "products" | "options";
  content: any;
  onSelect: (choice: string) => void;
}

export function useChatbotLogic(products: Product[]) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const OPTIONS = ["Belts", "Phone Cases", "Leather Handles", "Wallets"];

  const sendMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  useEffect(() => {
    if (messages.length > 0) return; 
    // Greeting
    sendMessage({
      id: "greeting",
      sender: "bot",
      type: "text",
      content: "Hi! 👋 What can I help you find today?",
      onSelect: () => {}
    });

    // Options
    sendMessage({
      id: "initial_options",
      sender: "bot",
      type: "options",
      content: OPTIONS,
      onSelect: handleUserChoice,
    });
  }, [messages.length==0]);

  const handleUserChoice = (choice: string) => {
    // Add user's choice message
    sendMessage({
      id: Date.now() + "_user",
      sender: "user",
      type: "text",
      content: choice,
      onSelect: () => {}
    });

    // Filter products
    const recommended = products
      .filter((p) => p.category.toLowerCase() === choice.toLowerCase())
      .slice(0, 3);

    if (recommended.length === 0) {
      sendMessage({
        id: Date.now() + "_no_match",
        sender: "bot",
        type: "text",
        content: "Sorry! We don’t have items in this category right now.",
        onSelect: () => {}
      });

      sendMessage({
        id: Date.now() + "_retry",
        sender: "bot",
        type: "options",
        content: OPTIONS,
        onSelect: handleUserChoice,
      });

      return;
    }

    // Send product recommendations
    sendMessage({
      id: Date.now() + "_products",
      sender: "bot",
      type: "products",
      content: recommended,
      onSelect: () => {}
    });

    // Next step options
    sendMessage({
      id: Date.now() + "_next_options",
      sender: "bot",
      type: "options",
      content: ["Browse More", "Show Best Sellers", "Restart"],
      onSelect: handleUserChoice,
    });
  };

  return {
    messages,
    handleUserChoice,
  };
}
