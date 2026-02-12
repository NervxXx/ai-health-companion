import { Edit3, ChevronRight, LogOut, Bell, Shield, Globe, FileText } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import BottomNav from "@/components/BottomNav";

const settingsItems = [
  { icon: Bell, label: "Notification settings" },
  { icon: Shield, label: "Privacy & security" },
  { icon: Globe, label: "Language" },
  { icon: FileText, label: "Terms of use" },
];

const Profile = () => {
  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 px-5 pt-4 pb-2">
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

          {/* Settings */}
          <div className="space-y-1">
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
          <p className="text-[10px] text-muted-foreground text-center mt-6 mb-2 px-4 leading-relaxed">
            AI Doctor is not a replacement for professional medical advice. Always consult a qualified healthcare provider.
          </p>

          {/* Logout */}
          <button className="w-full flex items-center justify-center gap-2 py-3 mt-2 text-destructive text-sm font-medium rounded-xl hover:bg-destructive/5 transition-colors">
            <LogOut size={18} strokeWidth={1.5} />
            Log out
          </button>
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Profile;
