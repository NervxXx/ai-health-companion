import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Camera, User, Settings, Stethoscope, Activity } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/use-language";

const navKeys = [
  { icon: Home, labelKey: "nav.dashboard", path: "/" },
  { icon: ClipboardList, labelKey: "nav.diagnoses", path: "/diagnoses" },
  { icon: Camera, labelKey: "nav.lab", path: "/lab" },
  { icon: User, labelKey: "nav.profile", path: "/profile" },
  { icon: Settings, labelKey: "nav.settings", path: "/settings" },
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

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 overflow-y-auto">{children}</div>
        {!hideNav && (
          <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-6 pt-2">
            <div className="flex items-center justify-around">
              {navKeys.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon size={22} strokeWidth={isActive ? 2.2 : 1.5} />
                    <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {!hideNav && (
        <aside className="w-[260px] border-r border-border bg-card flex flex-col fixed h-screen">
          <div className="flex items-center gap-3 px-6 py-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
              <Stethoscope size={20} strokeWidth={1.5} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-foreground tracking-tight">AI Doctor</h1>
              <p className="text-[10px] text-muted-foreground">{t("sidebar.healthAssistant")}</p>
            </div>
          </div>

          <div className="mx-4 mb-4 p-3 rounded-xl bg-gradient-to-br from-primary/5 to-accent border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={14} strokeWidth={2} className="text-primary" />
              <span className="text-[11px] font-semibold text-foreground">{t("sidebar.healthScore")}</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-primary">87</span>
              <span className="text-[10px] text-muted-foreground mb-1">/100</span>
            </div>
          </div>

          <nav className="flex-1 px-3 space-y-0.5">
            {navKeys.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  {t(item.labelKey)}
                </button>
              );
            })}
          </nav>

          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-semibold text-primary-foreground">A</span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Anna Smith</p>
                  <p className="text-[10px] text-muted-foreground">{t("sidebar.premiumPlan")}</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </aside>
      )}

      <main className={`flex-1 ${!hideNav ? "ml-[260px]" : ""}`}>
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
