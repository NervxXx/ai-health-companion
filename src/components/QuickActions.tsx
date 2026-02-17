import { Stethoscope, Pill, FlaskConical, HeartPulse, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const actions = [
    { icon: Stethoscope, label: t("action.checkSymptoms"), description: t("action.aiAnalysis"), path: "/chat", color: "bg-primary/8" },
    { icon: Pill, label: t("action.medicines"), description: t("action.drugInteractions"), path: "/chat", color: "bg-warning/8" },
    { icon: FlaskConical, label: t("action.labTests"), description: t("action.uploadAnalyze"), path: "/lab", color: "bg-success/8" },
    { icon: HeartPulse, label: t("action.chronicCare"), description: t("action.trackConditions"), path: "/diagnoses", color: "bg-destructive/8" },
    { icon: ClipboardList, label: t("action.visitPrep"), description: t("action.visitPrepDesc"), path: "/visit-prep", color: "bg-accent" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className="group flex flex-col items-start gap-4 p-5 bg-card rounded-2xl card-shadow hover:card-shadow-md transition-all duration-200 hover:-translate-y-0.5 text-left"
        >
          <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
            <action.icon size={22} strokeWidth={1.5} className="text-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{action.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
