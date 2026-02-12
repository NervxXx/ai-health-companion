import { useState } from "react";
import { ArrowLeft, MoreVertical, Paperclip, Mic, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileFrame from "@/components/MobileFrame";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  card?: DiagnosisCardData;
}

interface DiagnosisCardData {
  condition: string;
  confidence: number;
  symptoms: string[];
  recommendation: string;
}

const initialMessages: Message[] = [
  { id: 1, text: "I've been having a headache for the past two days, mainly around my forehead and temples. It gets worse in the afternoon.", sender: "user" },
  { id: 2, text: "I understand you're experiencing headaches. Let me ask a few more questions. Do you feel any pressure behind your eyes or in your cheeks?", sender: "ai" },
  { id: 3, text: "Yes, there's pressure behind my eyes and my nose feels congested too.", sender: "user" },
  {
    id: 4,
    text: "Based on your symptoms, here's my assessment:",
    sender: "ai",
    card: {
      condition: "Acute sinusitis",
      confidence: 87,
      symptoms: ["Facial pressure", "Nasal congestion", "Frontal headache"],
      recommendation: "OTC decongestant (e.g., pseudoephedrine). Consult pharmacist if pregnant.",
    },
  },
];

const Chat = () => {
  const navigate = useNavigate();
  const [messages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft size={22} strokeWidth={1.5} className="text-foreground" />
          </button>
          <h2 className="text-base font-semibold text-foreground">AI Doctor</h2>
          <button className="p-1">
            <MoreVertical size={20} strokeWidth={1.5} className="text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                {msg.sender === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">AI</span>
                  </div>
                )}
                <div>
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-[20px] rounded-tr-md"
                        : "bg-muted text-foreground rounded-[20px] rounded-tl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.card && <DiagnosisCard data={msg.card} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 pb-8 pt-2 border-t border-border bg-card">
          <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2">
            <button className="p-1.5 text-muted-foreground">
              <Paperclip size={20} strokeWidth={1.5} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your symptoms..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="p-1.5 text-muted-foreground">
              <Mic size={20} strokeWidth={1.5} />
            </button>
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Send size={14} strokeWidth={2} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

const DiagnosisCard = ({ data }: { data: DiagnosisCardData }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="mt-2 bg-card rounded-3xl p-4 card-shadow-md border border-border"
  >
    <p className="text-xs font-medium text-muted-foreground mb-1">Likely condition</p>
    <h3 className="text-base font-bold text-foreground mb-3">{data.condition}</h3>

    {/* Confidence */}
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">Confidence</span>
        <span className="text-xs font-semibold text-primary">{data.confidence}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${data.confidence}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>

    {/* Symptoms */}
    <div className="mb-3">
      <p className="text-xs font-medium text-muted-foreground mb-1">Key symptoms</p>
      <ul className="space-y-1">
        {data.symptoms.map((s) => (
          <li key={s} className="text-xs text-foreground flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary" />
            {s}
          </li>
        ))}
      </ul>
    </div>

    {/* Recommendation */}
    <div className="bg-accent rounded-xl p-3 mb-3">
      <p className="text-xs text-muted-foreground mb-0.5">Recommended action</p>
      <p className="text-xs font-medium text-foreground">{data.recommendation}</p>
    </div>

    {/* Actions */}
    <div className="flex gap-2">
      <button className="flex-1 text-xs font-semibold py-2.5 bg-primary text-primary-foreground rounded-xl transition-transform active:scale-95">
        Add to medication log
      </button>
      <button className="flex-1 text-xs font-semibold py-2.5 border border-border text-foreground rounded-xl transition-transform active:scale-95">
        Book specialist
      </button>
    </div>
  </motion.div>
);

export default Chat;
