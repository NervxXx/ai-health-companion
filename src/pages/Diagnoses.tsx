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
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Health history</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and review all your past consultations</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-3 card-shadow max-w-lg">
          <Search size={18} strokeWidth={1.5} className="text-muted-foreground" />
          <input
            placeholder="Search by symptom or date..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground card-shadow hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate("/chat")}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl card-shadow text-left hover:card-shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-0"
            >
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                d.status === "active" ? "bg-success" : "bg-muted-foreground/30"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground break-words">{d.condition}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{d.date}</p>
              </div>
              <span className="text-xs font-bold text-primary flex-shrink-0">{d.confidence}%</span>
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                d.status === "active"
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
              }`}>
                {d.status === "active" ? "Active" : "Resolved"}
              </span>
              <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Diagnoses;
