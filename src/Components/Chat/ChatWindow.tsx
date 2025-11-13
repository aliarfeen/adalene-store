import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ChatMessageList from "./ChatMessageList";
import { useChatbotLogic } from "../../hooks/useChatBot";
import useProducts from "../../hooks/useProducts";

interface Props {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: Props) {
  const {products} = useProducts();

  // chatbot logic hook
  const { messages, handleUserQuery } = useChatbotLogic(products);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    handleUserQuery(input); 
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b shadow-sm">
        <h2 className="font-semibold text-orange-800">adalene.</h2>
        <button onClick={onClose}>
          <X size={22} className="text-orange-800" />
        </button>
      </div>

      {/* Messages */}
      <ChatMessageList
        messages={messages.map((msg) => ({
          sender: msg.sender,
          content: msg.content,
          type: msg.type,
          id: msg.id,
        }))}
      />

      {/* Input */}
      <div className="border-t p-3 flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Write your message..."
          className="flex-grow rounded-md border p-2 outline-none border-orange-800"
        />
        <button
          onClick={handleSend}
          className="text-orange-800 font-semibold"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
