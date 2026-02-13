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
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
          {/* Left: Avatar + Medical ID */}
          <div className="space-y-4">
            {/* Avatar card */}
            <div className="bg-card rounded-2xl p-6 card-shadow text-center">
              <div className="relative inline-block mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
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
            <div className="bg-card rounded-2xl p-5 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Medical ID</h3>
                <button className="text-xs font-medium text-primary hover:underline">Edit</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-accent rounded-xl p-3 text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Blood type</p>
                  <p className="text-sm font-bold text-foreground">O+</p>
                </div>
                <div className="bg-accent rounded-xl p-3 text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Allergies</p>
                  <p className="text-sm font-bold text-foreground">Penicillin</p>
                </div>
                <div className="bg-accent rounded-xl p-3 text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Chronic</p>
                  <p className="text-sm font-bold text-foreground">None</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Settings */}
          <div className="bg-card rounded-2xl p-5 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-4">Settings</h3>
            <div className="space-y-0.5">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
              >
                {theme === "dark" ? (
                  <Sun size={18} strokeWidth={1.5} className="text-muted-foreground" />
                ) : (
                  <Moon size={18} strokeWidth={1.5} className="text-muted-foreground" />
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
                  <item.icon size={18} strokeWidth={1.5} className="text-muted-foreground" />
                  <span className="flex-1 text-sm text-foreground text-left">{item.label}</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>

            <div className="border-t border-border mt-4 pt-4">
              <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
                AI Doctor is not a replacement for professional medical advice. Always consult a qualified healthcare provider.
              </p>
              <button className="flex items-center gap-2 text-destructive text-sm font-medium rounded-xl hover:bg-destructive/5 transition-colors px-3 py-2">
                <LogOut size={16} strokeWidth={1.5} />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
