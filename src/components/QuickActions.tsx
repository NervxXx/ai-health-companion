import { Stethoscope, Pill, FlaskConical, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const actions = [
    { icon: Stethoscope, label: t("action.checkSymptoms"), description: t("action.aiAnalysis"), path: "/chat", color: "from-primary/10 to-primary/5" },
    { icon: Pill, label: t("action.medicines"), description: t("action.drugInteractions"), path: "/chat", color: "from-warning/10 to-warning/5" },
    { icon: FlaskConical, label: t("action.labTests"), description: t("action.uploadAnalyze"), path: "/lab", color: "from-success/10 to-success/5" },
    { icon: HeartPulse, label: t("action.chronicCare"), description: t("action.trackConditions"), path: "/diagnoses", color: "from-destructive/10 to-destructive/5" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className="group flex flex-col items-start gap-3 p-4 bg-card rounded-2xl card-shadow hover:card-shadow-md transition-all duration-200 hover:-translate-y-0.5 text-left"
        >
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
            <action.icon size={20} strokeWidth={1.5} className="text-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{action.label}</p>
            <p className="text-[11px] text-muted-foreground">{action.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
