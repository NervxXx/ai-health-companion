import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";

const filters = ["All", "Active", "Resolved", "Lab results"];

const diagnoses = [
  { id: 1, condition: "Tension headache", date: "Feb 10, 2026", confidence: 92, status: "active" as const },
  { id: 2, condition: "Acute sinusitis", date: "Feb 8, 2026", confidence: 87, status: "active" as const },
  { id: 3, condition: "Seasonal allergies", date: "Feb 5, 2026", confidence: 94, status: "resolved" as const },
  { id: 4, condition: "Lower back strain", date: "Feb 1, 2026", confidence: 78, status: "resolved" as const },
  { id: 5, condition: "Mild dehydration", date: "Jan 28, 2026", confidence: 90, status: "resolved" as const },
];

const Diagnoses = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = diagnoses.filter((d) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return d.status === "active";
    if (activeFilter === "Resolved") return d.status === "resolved";
    return false;
  });

  return (
    <AppLayout>
      <div className="px-5 md:px-8 pt-4 md:pt-8 pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">Your health history</h1>

        {/* Search */}
        <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2.5 mb-4 max-w-lg">
          <Search size={18} strokeWidth={1.5} className="text-muted-foreground" />
          <input
            placeholder="Search by symptom or date"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:space-y-0">
          {filtered.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate("/chat")}
              className="w-full flex items-center gap-3 p-4 bg-card rounded-2xl card-shadow text-left hover:card-shadow-md transition-shadow"
            >
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                d.status === "active" ? "bg-success" : "bg-muted-foreground/30"
              }`} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{d.condition}</p>
                <p className="text-xs text-muted-foreground">{d.date}</p>
              </div>
              <span className="text-xs font-semibold text-primary">{d.confidence}%</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                d.status === "active"
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
              }`}>
                {d.status === "active" ? "Active" : "Resolved"}
              </span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Diagnoses;
