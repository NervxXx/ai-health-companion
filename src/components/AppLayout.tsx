import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Camera, User, Settings, Stethoscope } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ClipboardList, label: "Diagnoses", path: "/diagnoses" },
  { icon: Camera, label: "Lab", path: "/lab" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const AppLayout = ({ children, hideNav }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 overflow-y-auto">{children}</div>
        {!hideNav && (
          <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-6 pt-2">
            <div className="flex items-center justify-around">
              {navItems.map((item) => {
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
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      {!hideNav && (
        <aside className="w-64 border-r border-border bg-card flex flex-col fixed h-screen">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <Stethoscope size={20} strokeWidth={1.5} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">AI Doctor</h1>
              <p className="text-[10px] text-muted-foreground">Health Assistant</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Anna Smith</p>
                <p className="text-[10px] text-muted-foreground">anna.smith@email.com</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main content */}
      <main className={`flex-1 ${!hideNav ? "ml-64" : ""}`}>
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
