import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    from: "user" | "bot";
    text: string;
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { from: "user", text: inputValue }]);
        setInputValue("");

        //Bot auto reply
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "Thanks for your message" },
            ]);
        }, 500);
    };

    return (
        <>
            {/* Floating chat button */}
            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(true)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 right-6 z-50 bg-orange-800 text-white p-4 rounded-full shadow-xl hover:scale-110 duration-200"
                >
                    <MessageCircle size={22} />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
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
                            <button onClick={() => setIsOpen(false)}>
                                <X size={22} className=" text-orange-800" />
                            </button>
                        </div>

                        {/* Message area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`p-2 rounded-lg max-w-[75%] ${msg.from === "user"
                                            ? "bg-orange-800 text-white self-end ml-auto"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="border-t p-3 flex gap-2 items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Write your message..."
                                className="flex-grow rounded-md border p-2 outline-none border-orange-800"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="text-orange-800 font-semibold"
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
