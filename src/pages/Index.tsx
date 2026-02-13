import { Bell, ArrowRight, Mic, TrendingUp, Calendar, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import QuickActions from "@/components/QuickActions";
import ConsultationCard from "@/components/ConsultationCard";

const stats = [
  { label: "Consultations", value: "12", trend: "+3 this month", icon: Calendar },
  { label: "Conditions tracked", value: "3", trend: "All stable", icon: TrendingUp },
  { label: "Health score", value: "87%", trend: "↑ 5% from last month", icon: Shield },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
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

        {/* Stats row - desktop */}
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

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-primary/5 via-card to-accent rounded-3xl p-6 md:p-8 card-shadow-md border border-primary/10"
        >
          <div className="max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              How are you feeling today?
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Describe your symptoms to get instant AI-powered health insights and personalized recommendations.
            </p>
            <button
              onClick={() => navigate("/chat")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
            >
              <Mic size={18} strokeWidth={1.5} />
              Start consultation
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">
              AI ready · Average response under 3 seconds
            </span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-3">Quick actions</h3>
          <QuickActions />
        </div>

        {/* Recent Consultations */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-foreground">Recent consultations</h3>
            <button
              onClick={() => navigate("/diagnoses")}
              className="text-xs font-medium text-primary hover:underline"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <ConsultationCard
              title="Tension headache"
              date="2 days ago"
              status="active"
              icon="🧠"
            />
            <ConsultationCard
              title="Seasonal allergies"
              date="5 days ago"
              status="completed"
              icon="🤧"
            />
            <ConsultationCard
              title="Lower back pain"
              date="1 week ago"
              status="completed"
              icon="🦴"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
