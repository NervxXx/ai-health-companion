import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Camera, User, Stethoscope } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/use-language";

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
            {!isMobile && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ml-1">
                <span className="text-xs font-semibold text-primary">A</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className={`max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-12 ${isMobile ? "pb-24" : ""}`}>
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border">
          <div className="flex items-center justify-around px-2 pb-safe pt-2 pb-4">
            {navKeys.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.2 : 1.5} />
                  <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppLayout;
