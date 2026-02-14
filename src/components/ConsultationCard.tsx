import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

interface ConsultationCardProps {
  title: string;
  date: string;
  status: "active" | "completed";
  icon: string;
}

const ConsultationCard = ({ title, date, status, icon }: ConsultationCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <button
      onClick={() => navigate("/chat")}
      className="w-full flex items-center gap-4 p-5 bg-card rounded-2xl card-shadow transition-all duration-200 hover:card-shadow-md hover:-translate-y-0.5 min-w-0"
    >
      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-semibold text-foreground break-words leading-snug">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{date}</p>
      </div>
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <span className={`text-[11px] font-medium px-3 py-1.5 rounded-full ${
          status === "active"
            ? "bg-success/10 text-success"
            : "bg-muted text-muted-foreground"
        }`}>
          {status === "active" ? t("card.active") : t("card.done")}
        </span>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </button>
  );
};

export default ConsultationCard;
