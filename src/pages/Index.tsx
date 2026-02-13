import { Bell, ArrowRight, Mic, TrendingUp, Calendar, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import QuickActions from "@/components/QuickActions";
import ConsultationCard from "@/components/ConsultationCard";
import { useLanguage } from "@/hooks/use-language";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    { label: t("home.consultations"), value: "12", trend: t("home.thisMonth"), icon: Calendar },
    { label: t("home.conditionsTracked"), value: "3", trend: t("home.allStable"), icon: TrendingUp },
    { label: t("home.healthScore"), value: "87%", trend: t("home.upFromLastMonth"), icon: Shield },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{t("home.welcomeBack")}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Anna</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl bg-card card-shadow hover:card-shadow-md transition-shadow">
              <Bell size={20} strokeWidth={1.5} className="text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center md:hidden">
              <span className="text-sm font-semibold text-primary-foreground">A</span>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-5 card-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <stat.icon size={16} strokeWidth={1.5} className="text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-primary/5 via-card to-accent rounded-3xl p-6 md:p-8 card-shadow-md border border-primary/10"
        >
          <div className="max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">{t("home.howFeeling")}</h2>
            <p className="text-sm text-muted-foreground mb-5">{t("home.describeSymptoms")}</p>
            <button
              onClick={() => navigate("/chat")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
            >
              <Mic size={18} strokeWidth={1.5} />
              {t("home.startConsultation")}
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">{t("home.aiReady")}</span>
          </div>
        </motion.div>

        <div>
          <h3 className="text-base font-semibold text-foreground mb-3">{t("home.quickActions")}</h3>
          <QuickActions />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-foreground">{t("home.recentConsultations")}</h3>
            <button onClick={() => navigate("/diagnoses")} className="text-xs font-medium text-primary hover:underline">
              {t("home.viewAll")}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <ConsultationCard title="Tension headache" date={t("card.daysAgo")} status="active" icon="🧠" />
            <ConsultationCard title="Seasonal allergies" date={t("card.5daysAgo")} status="completed" icon="🤧" />
            <ConsultationCard title="Lower back pain" date={t("card.1weekAgo")} status="completed" icon="🦴" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
