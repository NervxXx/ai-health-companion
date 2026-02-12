import { Bell, ArrowRight, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileFrame from "@/components/MobileFrame";
import BottomNav from "@/components/BottomNav";
import QuickActions from "@/components/QuickActions";
import ConsultationCard from "@/components/ConsultationCard";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 pb-2">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div>
              <p className="text-xs text-muted-foreground">Welcome back,</p>
              <h1 className="text-xl font-bold text-foreground">Anna</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2">
                <Bell size={22} strokeWidth={1.5} className="text-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">A</span>
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div className="px-5 pt-2 pb-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-card to-accent rounded-3xl p-5 card-shadow-md animate-pulse-glow"
            >
              <h2 className="text-lg font-bold text-foreground mb-1">
                How are you feeling today?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Describe your symptoms to get instant AI insights
              </p>
              <button
                onClick={() => navigate("/chat")}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm transition-transform active:scale-95"
              >
                <Mic size={18} strokeWidth={1.5} />
                Describe your symptoms
                <ArrowRight size={16} />
              </button>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[11px] text-muted-foreground">
                  AI ready · 99% accuracy
                </span>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Consultations */}
          <div className="px-5 pt-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">Recent consultations</h3>
              <button
                onClick={() => navigate("/diagnoses")}
                className="text-xs font-medium text-primary"
              >
                See all
              </button>
            </div>
            <div className="flex flex-col gap-3">
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

        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Index;
