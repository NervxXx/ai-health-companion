import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/hooks/use-language";

const getDiagnoses = () => [
  { id: 1, condition: "condition.tensionHeadache", date: new Date(2026, 1, 10), confidence: 92, status: "active" as const },
  { id: 2, condition: "condition.acuteSinusitis", date: new Date(2026, 1, 8), confidence: 87, status: "active" as const },
  { id: 3, condition: "condition.seasonalAllergies", date: new Date(2026, 1, 5), confidence: 94, status: "resolved" as const },
  { id: 4, condition: "condition.lowerBackStrain", date: new Date(2026, 1, 1), confidence: 78, status: "resolved" as const },
  { id: 5, condition: "condition.mildDehydration", date: new Date(2026, 0, 28), confidence: 90, status: "resolved" as const },
];

const Diagnoses = () => {
  const navigate = useNavigate();
  const { t, formatDate } = useLanguage();
  const diagnoses = getDiagnoses();
  const filters = [t("diagnoses.all"), t("diagnoses.active"), t("diagnoses.resolved"), t("diagnoses.labResults")];
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const filtered = diagnoses.filter((d) => {
    if (activeFilter === filters[0]) return true;
    if (activeFilter === filters[1]) return d.status === "active";
    if (activeFilter === filters[2]) return d.status === "resolved";
    return false;
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">{t("diagnoses.title")}</h1>
          <p className="text-sm text-muted-foreground mt-2">{t("diagnoses.subtitle")}</p>
        </div>

        <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-3.5 card-shadow max-w-lg">
          <Search size={18} strokeWidth={1.5} className="text-muted-foreground" />
          <input
            placeholder={t("diagnoses.search")}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground card-shadow hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((d, i) => (
            <div key={d.id} className="group relative">
              {/* Tooltip above cursor */}
              <span className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap z-10
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                ${
                  d.status === "active"
                    ? "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground"
                }`}>
                {d.status === "active" ? t("diagnoses.active") : t("diagnoses.resolved")}
              </span>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => navigate("/chat")}
                className="w-full flex items-center gap-4 p-5 bg-card rounded-2xl card-shadow text-left hover:card-shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-0"
              >
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  d.status === "active" ? "bg-success" : "bg-muted-foreground/20"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground break-words">{t(d.condition)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(d.date, true)}</p>
                </div>
                <span className="text-sm font-bold text-primary flex-shrink-0">{d.confidence}%</span>
                <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Diagnoses;
