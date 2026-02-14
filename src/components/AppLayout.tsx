import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Camera, User, Settings, Stethoscope, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/use-language";
import { motion, AnimatePresence } from "framer-motion";

const navKeys = [
  { icon: Home, labelKey: "nav.dashboard", path: "/" },
  { icon: ClipboardList, labelKey: "nav.diagnoses", path: "/diagnoses" },
  { icon: Camera, labelKey: "nav.lab", path: "/lab" },
  { icon: User, labelKey: "nav.profile", path: "/profile" },
];

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const AppLayout = ({ children, hideNav }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  if (hideNav) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 md:px-8 h-16">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Stethoscope size={18} strokeWidth={1.5} className="text-primary-foreground" />
            </div>
            <span className="text-base font-display font-bold text-foreground tracking-tight">AI Doctor</span>
          </button>

          {/* Desktop nav */}
          {!isMobile && (
            <nav className="flex items-center gap-1">
              {navKeys.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                    {t(item.labelKey)}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isMobile && (
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-xl text-foreground hover:bg-muted transition-colors"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            )}
            {!isMobile && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ml-1">
                <span className="text-xs font-semibold text-primary">A</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-card border-l border-border p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-base font-display font-bold text-foreground">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-xl hover:bg-muted transition-colors">
                  <X size={20} strokeWidth={1.5} className="text-foreground" />
                </button>
              </div>
              <nav className="flex-1 space-y-1">
                {navKeys.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => { navigate(item.path); setMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                      {t(item.labelKey)}
                    </button>
                  );
                })}
              </nav>
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">A</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Anna Smith</p>
                  <p className="text-xs text-muted-foreground">{t("sidebar.premiumPlan")}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
