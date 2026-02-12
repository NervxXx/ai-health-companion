import { Stethoscope, Pill, FlaskConical, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: Stethoscope, label: "Check\nsymptoms", path: "/chat" },
  { icon: Pill, label: "Medicines", path: "/chat" },
  { icon: FlaskConical, label: "Lab tests", path: "/lab" },
  { icon: HeartPulse, label: "Chronic\nconditions", path: "/diagnoses" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 overflow-x-auto px-5 py-3 scrollbar-hide">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className="flex flex-col items-center gap-2 min-w-[68px]"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-accent flex items-center justify-center">
            <action.icon size={24} strokeWidth={1.5} className="text-primary" />
          </div>
          <span className="text-[11px] font-medium text-foreground text-center whitespace-pre-line leading-tight">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
