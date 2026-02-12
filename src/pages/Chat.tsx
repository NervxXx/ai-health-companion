import { useState, useRef, useEffect } from "react";
import { ArrowLeft, MoreVertical, Paperclip, Mic, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: idCounter.current++, text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const history = [...messages, userMsg].map((m) => ({
      role: m.sender === "user" ? "user" : ("assistant" as const),
      content: m.text,
    }));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: history }),
        }
      );

      if (!res.ok || !res.body) {
        throw new Error(`Error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      const aiId = idCounter.current++;

      setMessages((prev) => [...prev, { id: aiId, text: "", sender: "ai" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantText += content;
              const currentText = assistantText;
              setMessages((prev) =>
                prev.map((m) => (m.id === aiId ? { ...m, text: currentText } : m))
              );
            }
          } catch {
            // partial JSON, wait for more
          }
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: idCounter.current++, text: "Sorry, something went wrong. Please try again.", sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AppLayout hideNav>
      <div className="flex flex-col h-screen md:h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-border bg-card">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft size={22} strokeWidth={1.5} className="text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <h2 className="text-base font-semibold text-foreground">AI Doctor</h2>
          </div>
          <button className="p-1">
            <MoreVertical size={20} strokeWidth={1.5} className="text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 space-y-3">
          <div className="max-w-2xl mx-auto space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">AI</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">How can I help you?</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Describe your symptoms and I'll provide an assessment with recommendations.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i < 10 ? i * 0.05 : 0 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[85%] md:max-w-[60%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs md:text-sm font-bold text-primary">AI</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-[20px] rounded-tr-md"
                        : "bg-muted text-foreground rounded-[20px] rounded-tl-md"
                    }`}
                  >
                    {msg.text}
                    {msg.sender === "ai" && msg.text === "" && (
                      <Loader2 size={16} className="animate-spin text-primary" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="px-4 md:px-8 pb-6 md:pb-4 pt-2 border-t border-border bg-card">
          <div className="max-w-2xl mx-auto flex items-center gap-2 bg-muted rounded-2xl px-3 py-2">
            <button className="p-1.5 text-muted-foreground">
              <Paperclip size={20} strokeWidth={1.5} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your symptoms..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              disabled={isLoading}
            />
            <button className="p-1.5 text-muted-foreground">
              <Mic size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center disabled:opacity-50 transition-opacity"
            >
              {isLoading ? (
                <Loader2 size={14} className="animate-spin text-primary-foreground" />
              ) : (
                <Send size={14} strokeWidth={2} className="text-primary-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
