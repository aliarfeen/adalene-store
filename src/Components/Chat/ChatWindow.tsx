// ChatWindow.tsx
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ChatMessageList from "./ChatMessageList";
import { useChatbotLogic } from "../../hooks/useChatBot";
import useProducts from "../../hooks/useProducts";

interface Props {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: Props) {
  const { products } = useProducts();

  const { messages } = useChatbotLogic(products);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col z-50"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b shadow-sm">
        <h2 className="font-semibold text-orange-800">adalene.</h2>
        <button onClick={onClose}>
          <X size={22} className="text-orange-800" />
        </button>
      </div>

      {/* MESSAGES */}
      <ChatMessageList messages={messages} />
    </motion.div>
  );
}
