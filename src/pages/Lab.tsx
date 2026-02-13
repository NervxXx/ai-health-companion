import { Plus, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";

const recentScans = [
  { id: 1, type: "Skin rash", date: "Feb 9", color: "from-warning/20 to-warning/5" },
  { id: 2, type: "Throat", date: "Jan 30", color: "from-primary/20 to-primary/5" },
  { id: 3, type: "Eye check", date: "Jan 22", color: "from-success/20 to-success/5" },
];

const Lab = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Visual check</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload a photo for AI-powered visual analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload area */}
          <motion.button
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-[4/3] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-200 hover:border-primary/40 hover:bg-accent/50 bg-card"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
              <Plus size={28} strokeWidth={1.5} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">Upload or take photo</p>
              <p className="text-xs text-muted-foreground mt-1">Skin, eye, throat, or wound</p>
            </div>
          </motion.button>

          <div className="space-y-5">
            {/* Recent scans */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Recent scans</h3>
              <div className="grid grid-cols-3 gap-3">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="rounded-2xl bg-card card-shadow p-4 flex flex-col items-center gap-2 hover:card-shadow-md transition-shadow cursor-pointer"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${scan.color} flex items-center justify-center`}>
                      <span className="text-xl">📷</span>
                    </div>
                    <p className="text-xs font-semibold text-foreground">{scan.type}</p>
                    <p className="text-[10px] text-muted-foreground">{scan.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 bg-warning/5 rounded-xl border border-warning/10">
              <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                AI analysis is not a definitive diagnosis. Always consult a qualified healthcare professional for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Lab;
