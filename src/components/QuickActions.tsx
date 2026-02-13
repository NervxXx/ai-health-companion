import { Stethoscope, Pill, FlaskConical, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: Stethoscope, label: "Check symptoms", description: "AI-powered analysis", path: "/chat", color: "from-primary/10 to-primary/5" },
  { icon: Pill, label: "Medicines", description: "Drug interactions", path: "/chat", color: "from-warning/10 to-warning/5" },
  { icon: FlaskConical, label: "Lab tests", description: "Upload & analyze", path: "/lab", color: "from-success/10 to-success/5" },
  { icon: HeartPulse, label: "Chronic care", description: "Track conditions", path: "/diagnoses", color: "from-destructive/10 to-destructive/5" },
];

const QuickActions = () => {
  const navigate = useNavigate();

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
