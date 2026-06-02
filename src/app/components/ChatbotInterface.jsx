import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chatbotAPI } from '../services/api';

export default function ChatbotInterface({ onClose, searchFilters = {} }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm EduNova AI, your college recommendation assistant. I can help you find information about colleges, courses, fees, placements, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessageText = input.trim();
    const userMessage = {
      id: messages.length + 1,
      text: userMessageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Pass search context to the API
      const response = await chatbotAPI.sendMessage(
        userMessageText, 
        currentSessionId,
        searchFilters.state,
        searchFilters.location
      );
      
      if (response.data.success) {
        if (!currentSessionId && response.data.session_id) {
          setCurrentSessionId(response.data.session_id);
        }
        
        const botMessage = {
          id: messages.length + 2,
          text: response.data.answer,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = "I'm having trouble connecting to the AI service. Please make sure the backend is running and Ollama is running (`ollama serve`).";
      
      if (error.response?.status === 401) {
        errorMessage = "Your session has expired. Please refresh the page.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = "The request timed out. Please try asking a shorter question.";
      }
      
      const errorBotMessage = {
        id: messages.length + 2,
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-24 right-8 w-[560px] h-[600px] backdrop-blur-2xl rounded-2xl border border-[var(--border)] overflow-hidden z-50 flex flex-col"
      style={{
        background: 'rgba(10, 10, 31, 0.95)',
        boxShadow: '0 0 80px rgba(139, 92, 246, 0.3)'
      }}
    >
      {/* Header */}
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
              Powered by TinyLlama RAG
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

      {/* Messages */}
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
                  <Bot className="h-4 w-4 text-white" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
              </div>

              <div className={`max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={`px-4 py-3 rounded-2xl whitespace-pre-wrap break-words ${
                    message.sender === 'bot'
                      ? 'bg-[var(--muted)] text-[var(--foreground)]'
                      : 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: '1.5' }}
                >
                  {message.text}
                </div>
                <span className="text-xs text-[var(--muted-foreground)] mt-1">
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
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-[var(--muted)] px-4 py-3 rounded-2xl">
              <div className="flex gap-1 items-center">
                <Loader2 className="w-4 h-4 text-[var(--primary)] animate-spin" />
                <span className="text-sm text-[var(--muted-foreground)]">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border)]">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about colleges, courses, fees..."
            className="flex-1 px-4 py-3 rounded-xl bg-[var(--input-background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
            style={{ fontFamily: 'var(--font-body)', minHeight: '44px', maxHeight: '100px' }}
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-2 text-center">
          Powered by RAG with real college data • AI responses may take a few seconds
        </p>
      </div>
    </motion.div>
  );
}