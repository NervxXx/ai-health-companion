import { useState } from "react";
import { ArrowLeft, ClipboardList, Loader2, Sparkles, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/hooks/use-language";

interface QuestionCategory {
  category: string;
  items: string[];
}

interface PrepResult {
  summary: string;
  questions: QuestionCategory[];
  tips: string[];
}

const VisitPrep = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [symptoms, setSymptoms] = useState("");
  const [conditions, setConditions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PrepResult | null>(null);
  const [error, setError] = useState("");
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});

  const toggleCategory = (idx: number) => {
    setOpenCategories((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const generate = async () => {
    if (!symptoms.trim() && !conditions.trim()) return;
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/visit-prep`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ symptoms, conditions, language }),
        }
      );

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setResult(data);
      // Open all categories by default
      const open: Record<number, boolean> = {};
      data.questions?.forEach((_: QuestionCategory, i: number) => { open[i] = true; });
      setOpenCategories(open);
    } catch (err) {
      console.error(err);
      setError(t("visitPrep.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout hideNav>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-40 flex items-center justify-between px-5 md:px-8 h-16 border-b border-border bg-card/80 backdrop-blur-xl">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} strokeWidth={1.5} className="text-foreground" />
          </button>
          <div className="flex items-center gap-2.5">
            <ClipboardList size={18} strokeWidth={1.5} className="text-primary" />
            <h2 className="text-sm font-display font-semibold text-foreground">{t("visitPrep.title")}</h2>
          </div>
          <div className="w-9" />
        </div>

        <div className="flex-1 overflow-y-auto px-5 md:px-8 py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Sparkles size={28} strokeWidth={1.5} className="text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                {t("visitPrep.heading")}
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {t("visitPrep.description")}
              </p>
            </motion.div>

            {/* Form */}
            {!result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("visitPrep.symptomsLabel")}
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder={t("visitPrep.symptomsPlaceholder")}
                    className="w-full bg-muted rounded-xl px-4 py-3 text-[16px] md:text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none min-h-[100px] border border-border focus:border-primary transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("visitPrep.conditionsLabel")}
                  </label>
                  <textarea
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                    placeholder={t("visitPrep.conditionsPlaceholder")}
                    className="w-full bg-muted rounded-xl px-4 py-3 text-[16px] md:text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none min-h-[80px] border border-border focus:border-primary transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={generate}
                  disabled={isLoading || (!symptoms.trim() && !conditions.trim())}
                  className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:opacity-40"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t("visitPrep.generating")}
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      {t("visitPrep.generate")}
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-destructive/10 text-destructive rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Summary */}
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5">
                  <p className="text-sm text-foreground leading-relaxed">{result.summary}</p>
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  <h3 className="text-base font-display font-semibold text-foreground">
                    {t("visitPrep.questionsTitle")}
                  </h3>
                  {result.questions?.map((cat, idx) => (
                    <div key={idx} className="bg-card rounded-2xl border border-border overflow-hidden">
                      <button
                        onClick={() => toggleCategory(idx)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="text-sm font-semibold text-foreground">{cat.category}</span>
                        {openCategories[idx] ? (
                          <ChevronUp size={16} className="text-muted-foreground" />
                        ) : (
                          <ChevronDown size={16} className="text-muted-foreground" />
                        )}
                      </button>
                      <AnimatePresence>
                        {openCategories[idx] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <ul className="px-5 pb-4 space-y-2.5">
                              {cat.items?.map((q, qi) => (
                                <li key={qi} className="flex gap-3 text-sm text-foreground leading-relaxed">
                                  <span className="text-primary font-bold mt-0.5 shrink-0">•</span>
                                  {q}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                {result.tips && result.tips.length > 0 && (
                  <div className="bg-warning/5 border border-warning/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb size={16} className="text-warning" />
                      <h4 className="text-sm font-semibold text-foreground">{t("visitPrep.tipsTitle")}</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.tips.map((tip, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                          <span className="text-warning font-bold mt-0.5 shrink-0">💡</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reset */}
                <button
                  onClick={() => { setResult(null); setSymptoms(""); setConditions(""); }}
                  className="w-full py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {t("visitPrep.newPrep")}
                </button>

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {t("visitPrep.disclaimer")}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VisitPrep;
