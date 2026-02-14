import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Paperclip, Mic, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/hooks/use-language";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const Chat = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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

      if (!res.ok || !res.body) throw new Error(`Error: ${res.status}`);

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
            // partial JSON
          }
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: idCounter.current++, text: t("chat.error"), sender: "ai" },
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
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="sticky top-0 z-40 flex items-center justify-between px-5 md:px-8 h-16 border-b border-border bg-card/80 backdrop-blur-xl">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} strokeWidth={1.5} className="text-foreground" />
          </button>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-success" />
            <h2 className="text-sm font-display font-semibold text-foreground">{t("chat.aiDoctor")}</h2>
          </div>
          <div className="w-9" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <span className="text-xl font-display font-bold text-primary">AI</span>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">{t("chat.howCanIHelp")}</h3>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  {t("chat.describeSymptoms")}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i < 10 ? i * 0.03 : 0 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[85%] md:max-w-[65%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-primary">AI</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-md"
                        : "bg-muted text-foreground rounded-2xl rounded-tl-md"
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
        <div className="sticky bottom-0 px-5 md:px-8 pb-6 md:pb-5 pt-3 border-t border-border bg-card/80 backdrop-blur-xl">
          <div className="max-w-2xl mx-auto flex items-center gap-2 bg-muted rounded-2xl px-4 py-3">
            <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Paperclip size={20} strokeWidth={1.5} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.typeSymptoms")}
              className="flex-1 bg-transparent text-[16px] md:text-sm text-foreground placeholder:text-muted-foreground outline-none"
              disabled={isLoading}
            />
            <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Mic size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center disabled:opacity-40 transition-opacity"
            >
              {isLoading ? (
                <Loader2 size={15} className="animate-spin text-primary-foreground" />
              ) : (
                <Send size={15} strokeWidth={2} className="text-primary-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
