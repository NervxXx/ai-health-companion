import { Bell, ArrowRight, Mic, TrendingUp, Calendar, Shield, Sparkles } from "lucide-react";
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
      <div className="space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("home.welcomeBack")}</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">Anna</h1>
          </div>
          <button className="relative p-2.5 rounded-xl bg-card card-shadow hover:card-shadow-md transition-shadow mt-1">
            <Bell size={20} strokeWidth={1.5} className="text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-5 card-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                  <stat.icon size={16} strokeWidth={1.5} className="text-primary" />
                </div>
              </div>
              <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{stat.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Hero CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative bg-card rounded-2xl p-7 md:p-10 card-shadow-md border border-border overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI-Powered</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 leading-snug">{t("home.howFeeling")}</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-md">{t("home.describeSymptoms")}</p>
            <button
              onClick={() => navigate("/chat")}
              className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            >
              <Mic size={18} strokeWidth={1.5} />
              {t("home.startConsultation")}
              <ArrowRight size={16} />
            </button>
            <div className="mt-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">{t("home.aiReady")}</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">{t("home.quickActions")}</h3>
          <QuickActions />
        </section>

        {/* Recent Consultations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold text-foreground">{t("home.recentConsultations")}</h3>
            <button onClick={() => navigate("/diagnoses")} className="text-sm font-medium text-primary hover:underline">
              {t("home.viewAll")}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <ConsultationCard title="Tension headache" date={t("card.daysAgo")} status="active" icon="🧠" />
            <ConsultationCard title="Seasonal allergies" date={t("card.5daysAgo")} status="completed" icon="🤧" />
            <ConsultationCard title="Lower back pain" date={t("card.1weekAgo")} status="completed" icon="🦴" />
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
