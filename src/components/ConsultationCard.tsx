import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConsultationCardProps {
  title: string;
  date: string;
  status: "active" | "completed";
  icon: string;
}

const ConsultationCard = ({ title, date, status, icon }: ConsultationCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chat")}
      className="w-full flex items-center gap-3 p-4 bg-card rounded-2xl card-shadow transition-all hover:card-shadow-md"
    >
      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
        status === "active" ? "bg-success" : "bg-muted-foreground/30"
      }`} />
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-lg flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${
        status === "active"
          ? "bg-success/10 text-success"
          : "bg-muted text-muted-foreground"
      }`}>
        {status === "active" ? "Active treatment" : "Completed"}
      </span>
      <ChevronRight size={16} className="text-muted-foreground" />
    </button>
  );
};

export default ConsultationCard;
