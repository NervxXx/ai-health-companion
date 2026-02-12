import { Edit3, ChevronRight, LogOut, Bell, Shield, Globe, FileText, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import AppLayout from "@/components/AppLayout";

const settingsItems = [
  { icon: Bell, label: "Notification settings" },
  { icon: Shield, label: "Privacy & security" },
  { icon: Globe, label: "Language" },
  { icon: FileText, label: "Terms of use" },
];

const Profile = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppLayout>
      <div className="px-5 md:px-8 pt-4 md:pt-8 pb-4">
        <div className="md:grid md:grid-cols-[280px_1fr] md:gap-8">
          {/* Left: Avatar + Medical ID */}
          <div>
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">AS</span>
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-card card-shadow flex items-center justify-center border border-border">
                  <Edit3 size={12} className="text-foreground" />
                </button>
              </div>
              <h2 className="text-lg font-bold text-foreground">Anna Smith</h2>
              <p className="text-xs text-muted-foreground">anna.smith@email.com</p>
            </div>

            {/* Medical ID */}
            <div className="bg-card rounded-2xl p-4 card-shadow mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Medical ID</h3>
                <button className="text-xs font-medium text-primary">Edit</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-accent rounded-xl p-3 text-center">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Blood type</p>
                  <p className="text-sm font-bold text-foreground">O+</p>
                </div>
                <div className="bg-accent rounded-xl p-3 text-center">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Allergies</p>
                  <p className="text-sm font-bold text-foreground">Penicillin</p>
                </div>
                <div className="bg-accent rounded-xl p-3 text-center">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Chronic</p>
                  <p className="text-sm font-bold text-foreground">None</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Settings */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 hidden md:block">Settings</h3>
            <div className="space-y-1">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
              >
                {theme === "dark" ? (
                  <Sun size={20} strokeWidth={1.5} className="text-muted-foreground" />
                ) : (
                  <Moon size={20} strokeWidth={1.5} className="text-muted-foreground" />
                )}
                <span className="flex-1 text-sm text-foreground text-left">
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
              {settingsItems.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
                >
                  <item.icon size={20} strokeWidth={1.5} className="text-muted-foreground" />
                  <span className="flex-1 text-sm text-foreground text-left">{item.label}</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-muted-foreground text-center md:text-left mt-6 mb-2 px-4 md:px-0 leading-relaxed">
              AI Doctor is not a replacement for professional medical advice. Always consult a qualified healthcare provider.
            </p>

            {/* Logout */}
            <button className="w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6 mt-2 text-destructive text-sm font-medium rounded-xl hover:bg-destructive/5 transition-colors">
              <LogOut size={18} strokeWidth={1.5} />
              Log out
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
