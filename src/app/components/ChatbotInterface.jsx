import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User } from 'lucide-react';



export default function ChatbotInterface({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello I'm EduNova AI. I can help you find information about colleges, courses, fees, placements, and admission procedures. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponses = [
        "Based on your query, I found several excellent colleges that match your criteria. Would you like me to provide details about fees, placements, or course structure?",
        "The average placement rate for Computer Science programs is around 94%. Top colleges like Tech Institute of Excellence have placements as high as 97%.",
        "I can help you with that Let me retrieve the latest information from our college brochures using RAG technology.",
        "Great question The fee structure varies by institution, ranging from ₹2,50,000 to ₹3,20,000 per year for engineering programs."
      ];

      const botMessage = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-24 right-8 w-[560px] h-[400px] backdrop-blur-2xl rounded-2xl border border-[var(--border)] overflow-hidden z-50 flex flex-col"
      style={{
        background: 'rgba(10, 10, 31, 0.95)',
        boxShadow: '0 0 80px rgba(139, 92, 246, 0.3)'
      }}
    >
      <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
              EduNova AI
            </h3>
            <p className="text-xs text-white/80" style={{ fontFamily: 'var(--font-body)' }}>
              Powered by RAG
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'bot'
                  ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]'
                  : 'bg-[var(--accent)]'
              }`}>
                {message.sender === 'bot' ? (
                  <Bot className="h-5 w-5 text-white" />
                ) : (
                  <User className="h-5 w-5 text-white" />
                )}
              </div>

              <div className={`max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'bot'
                      ? 'bg-[var(--muted)] text-[var(--foreground)]'
                      : 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {message.text}
                </div>
                <span className="text-xs text-[var(--muted-foreground)] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="bg-[var(--muted)] px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[var(--secondary)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[var(--border)]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about colleges, courses, fees..."
            className="flex-1 px-4 py-3 rounded-xl bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            style={{ fontFamily: 'var(--font-body)' }}
          />
          <button
            onClick={handleSend}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-lg transition-all"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
