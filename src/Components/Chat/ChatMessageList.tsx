import { motion } from "framer-motion";
import type { ChatMessage } from "../../hooks/useChatBot";
import ChatProductCard from "./ChatProductCard";

interface Props {
  messages: ChatMessage[];
}

export default function ChatMessageList({ messages }: Props) {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`p-1 rounded-lg max-w-full ${
            msg.sender === "user" ? "self-end ml-auto" : "self-start"
          }`}
        >
          {/* --- Text Messages --- */}
          {msg.type === "text" && typeof msg.content === "string" && (
            <div
              className={`p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-orange-800 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {msg.content}
            </div>
          )}

          {msg.type === "products" && Array.isArray(msg.content) && (
            <div className="flex flex-col gap-2 overflow-x-auto py-1">
                <p className=" font-semibold"> Here's some recommendations for you</p>
              {msg.content.map((product) => (
                <ChatProductCard product={product}/>
                
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
