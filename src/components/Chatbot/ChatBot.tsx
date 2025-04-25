import  { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";
import { SendHorizonal, X } from "lucide-react";
import Robot from "../../assets/chaBotImage/robot.png"; // Update path if needed
import { useLocation } from "react-router-dom";

interface Message {
  text: string;
  fromBot: boolean;
}

const socket: Socket = io("https://intellecta-server-stqv.onrender.com");

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Track bot response time
  const location = useLocation();

  useEffect(() => {
    const handleReply = (response: string) => {
      setLoading(false); // Hide loading animation when response comes
      setMessages((prev) => [...prev, { text: response, fromBot: true }]);
    };

    socket.on("reply", handleReply);
    return () => {
      socket.off("reply", handleReply);
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, fromBot: false }]);
    setInput("");

    setLoading(true); // Show loading indicator while waiting for response
    socket.emit("message", input);
  };

  
  if(location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/" || location.pathname === "/profile" || location.pathname === "/assessment" || location.pathname === "/assessment-results" || location.pathname.includes("game") ||location.pathname.includes("/admin")){
    return <></>
  }

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-80 md:w-96 h-[450px] flex flex-col bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between bg-[#395e71] text-white p-4 rounded-t-xl">
            <h2 className="text-lg font-semibold">Intellecta AI 🤖</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex flex-col gap-3 px-4 py-3 overflow-y-auto flex-grow scrollbar-hidden">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.fromBot ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`p-2 rounded-lg shadow ${
                  msg.fromBot
                    ? "bg-white text-black self-start max-w-[80%]"
                    : "bg-[#395e71] text-white self-end min-w-16"
                }`}
              >
                <h1 className="text-xs font-semibold">
                  {msg.fromBot ? "Intellecta" : "You"}
                </h1>
                <p
                  className="text-sm leading-relaxed break-words max-w-[90%] whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                      .replace(/\*(.*?)\*/g, "<i>$1</i>"),
                  }}
                />
              </motion.div>
            ))}

            {/* 🔄 Loading Indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="flex items-center gap-1 self-start"
              >
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></span>
              </motion.div>
            )}
          </div>

          {/* Input Field */}
          <div className="flex items-center gap-2 p-3 border-t border-white/20 bg-white/20 backdrop-blur-lg">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
            />
            <button
              className="p-2 bg-[#395e71] text-white rounded-lg hover:bg-[#133343] transition"
              onClick={sendMessage}
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Chatbot Icon */}
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={Robot}
          alt="robot-chat"
          className={`w-16 h-20 ${!isOpen && "animate-bounce"}`}
        />
      </motion.div>
    </div>
  );
};

export default ChatBot;
