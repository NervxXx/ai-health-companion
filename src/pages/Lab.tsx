import { Plus, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";

const recentScans = [
  { id: 1, type: "Skin rash", date: "Feb 9", color: "bg-warning/20" },
  { id: 2, type: "Throat", date: "Jan 30", color: "bg-primary/10" },
  { id: 3, type: "Eye check", date: "Jan 22", color: "bg-success/10" },
];

const Lab = () => {
  return (
    <AppLayout>
      <div className="px-5 md:px-8 pt-4 md:pt-8 pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">Visual check</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Upload a photo of your skin, eye, throat or wound for AI analysis
        </p>

        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Upload area */}
          <motion.button
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-square max-h-[260px] md:max-h-[320px] border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center gap-3 mb-6 md:mb-0 transition-colors hover:border-primary/40"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
              <Plus size={28} strokeWidth={1.5} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Tap to upload or take photo
            </span>
          </motion.button>

          <div>
            {/* Recent scans */}
            <h3 className="text-base font-semibold text-foreground mb-3">Recent scans</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="min-w-[100px] rounded-2xl bg-card card-shadow p-3 flex flex-col items-center gap-2"
                >
                  <div className={`w-16 h-16 rounded-xl ${scan.color} flex items-center justify-center`}>
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-xs font-medium text-foreground">{scan.type}</p>
                  <p className="text-[10px] text-muted-foreground">{scan.date}</p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 mt-6 p-3 bg-warning/5 rounded-xl">
              <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
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
