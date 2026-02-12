import { useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Camera, User, Settings } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ClipboardList, label: "Diagnoses", path: "/diagnoses" },
  { icon: Camera, label: "Lab", path: "/lab" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
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
  );
};

export default BottomNav;
