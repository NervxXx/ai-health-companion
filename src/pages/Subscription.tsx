import { Check, Crown, Sparkles, Zap, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";

type PlanId = "free" | "pro" | "premium";

const Subscription = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("free");

  const plans: {
    id: PlanId;
    icon: typeof Zap;
    popular?: boolean;
    price: string;
    period: string;
  }[] = [
    {
      id: "free",
      icon: Zap,
      price: "$0",
      period: t("sub.perMonth"),
    },
    {
      id: "pro",
      icon: Sparkles,
      popular: true,
      price: "$9.99",
      period: t("sub.perMonth"),
    },
    {
      id: "premium",
      icon: Crown,
      price: "$19.99",
      period: t("sub.perMonth"),
    },
  ];

  const features: Record<PlanId, string[]> = {
    free: [
      t("sub.free1"),
      t("sub.free2"),
      t("sub.free3"),
    ],
    pro: [
      t("sub.pro1"),
      t("sub.pro2"),
      t("sub.pro3"),
      t("sub.pro4"),
    ],
    premium: [
      t("sub.prem1"),
      t("sub.prem2"),
      t("sub.prem3"),
      t("sub.prem4"),
      t("sub.prem5"),
    ],
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-9 h-9 rounded-xl bg-card card-shadow flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
              {t("sub.title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">{t("sub.subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left rounded-2xl p-6 transition-all relative ${
                    isSelected
                      ? "bg-primary/5 border-2 border-primary card-shadow-md"
                      : "bg-card border-2 border-transparent card-shadow hover:card-shadow-md"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-1 rounded-full">
                      {t("sub.popular")}
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-primary/15" : "bg-accent"
                      }`}
                    >
                      <plan.icon
                        size={20}
                        className={isSelected ? "text-primary" : "text-muted-foreground"}
                      />
                    </div>
                    <h3 className="text-base font-display font-bold text-foreground">
                      {t(`sub.${plan.id}`)}
                    </h3>
                  </div>

                  <div className="mb-5">
                    <span className="text-3xl font-display font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      / {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {features[plan.id].map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          className={`mt-0.5 shrink-0 ${
                            isSelected ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-sm text-foreground leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card rounded-2xl p-6 card-shadow"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {t("sub.currentPlan")}: <span className="text-primary">{t(`sub.${selectedPlan}`)}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{t("sub.changePlan")}</p>
            </div>
            <button
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedPlan === "free"
                  ? "bg-muted text-muted-foreground cursor-default"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 card-shadow"
              }`}
              disabled={selectedPlan === "free"}
            >
              {selectedPlan === "free" ? t("sub.currentPlanBtn") : t("sub.upgrade")}
            </button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Subscription;
