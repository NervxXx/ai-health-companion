import { Plus, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/hooks/use-language";

const getRecentScans = (t: (key: string) => string) => [
  { id: 1, type: t("scan.skinRash"), date: "Feb 9", color: "bg-warning/10" },
  { id: 2, type: t("scan.throat"), date: "Jan 30", color: "bg-primary/10" },
  { id: 3, type: t("scan.eyeCheck"), date: "Jan 22", color: "bg-success/10" },
];

const Lab = () => {
  const { t } = useLanguage();
  const recentScans = getRecentScans(t);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">{t("lab.title")}</h1>
          <p className="text-sm text-muted-foreground mt-2">{t("lab.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-[4/3] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-200 hover:border-primary/30 hover:bg-accent/30 bg-card"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
              <Plus size={28} strokeWidth={1.5} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">{t("lab.upload")}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{t("lab.skinEyeThroat")}</p>
            </div>
          </motion.button>

          <div className="space-y-6">
            <div>
              <h3 className="text-base font-display font-semibold text-foreground mb-4">{t("lab.recentScans")}</h3>
              <div className="space-y-3">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card card-shadow hover:card-shadow-md transition-shadow cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl ${scan.color} flex items-center justify-center`}>
                      <span className="text-xl">📷</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{scan.type}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{scan.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-warning/5 rounded-xl border border-warning/10">
              <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">{t("lab.disclaimer")}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Lab;
