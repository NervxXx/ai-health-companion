import { Edit3, ChevronRight, LogOut, Bell, Shield, Globe, FileText, Moon, Sun, Check, CreditCard, Palette, Flower2, User, Key, Trash2, AlertTriangle, Monitor, ClipboardList } from "lucide-react";
import { useTheme, type Theme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

const themeConfig: Record<Theme, { label: string; icon: React.ReactNode; description: string }> = {
  dark: {
    label: "Dark (Purple)",
    icon: <Moon size={16} strokeWidth={1.5} />,
    description: "Deep purple dark theme",
  },
  light: {
    label: "Light (Turquoise)",
    icon: <Sun size={16} strokeWidth={1.5} />,
    description: "Clean white with turquoise accents",
  },
  blue: {
    label: "Dark (Rose)",
    icon: <Palette size={16} strokeWidth={1.5} />,
    description: "Dark teal with rose accents",
  },
  pastel: {
    label: "Light (Pastel)",
    icon: <Flower2 size={16} strokeWidth={1.5} />,
    description: "Soft mint and peach tones",
  },
};

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [showDeleteDataConfirm, setShowDeleteDataConfirm] = useState(false);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);

  const settingsItems = [
    { icon: Bell, label: t("profile.notifications") },
    { icon: Shield, label: t("profile.privacy") },
    { icon: FileText, label: t("profile.terms") },
  ];

  const handleSaveUsername = () => {
    // TODO: Implement API call to update username
    console.log("Saving username:", newUsername);
    setNewUsername("");
  };

  const handleResetPassword = () => {
    navigate("/forgot-password");
  };

  const handleDeleteAllData = () => {
    // TODO: Implement API call to delete all data
    console.log("Deleting all data");
    setShowDeleteDataConfirm(false);
  };

  const handleDeleteAccount = () => {
    // TODO: Implement API call to delete account
    console.log("Deleting account");
    setShowDeleteAccountConfirm(false);
  };

  const handleLogoutAllDevices = () => {
    // TODO: Implement API call to logout from all devices
    console.log("Logging out from all devices");
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic (clear tokens, etc.)
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">{t("profile.title")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6">
          {/* Left column */}
          <div className="space-y-5">
            <div className="bg-card rounded-2xl p-7 card-shadow text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-primary">AS</span>
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-card card-shadow flex items-center justify-center border border-border">
                  <Edit3 size={12} className="text-foreground" />
                </button>
              </div>
              <h2 className="text-lg font-display font-bold text-foreground">Anna Smith</h2>
              <p className="text-sm text-muted-foreground mt-0.5">anna.smith@email.com</p>
            </div>

            <div className="bg-card rounded-2xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-foreground">{t("profile.medicalId")}</h3>
                <button className="text-xs font-medium text-primary hover:underline">{t("profile.edit")}</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t("profile.bloodType"), value: "O+" },
                  { label: t("profile.allergies"), value: "Penicillin" },
                  { label: t("profile.chronic"), value: t("profile.none") },
                ].map(item => (
                  <div key={item.label} className="bg-accent rounded-xl p-3.5 text-center">
                    <p className="text-[11px] text-muted-foreground mb-1.5">{item.label}</p>
                    <p className="text-sm font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/health-card")}
              className="w-full bg-card rounded-2xl p-4 card-shadow flex items-center gap-3 hover:bg-accent transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ClipboardList size={18} className="text-primary" strokeWidth={1.5} />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground text-left">{t("profile.medicalCard")}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Right column */}
          <div className="bg-card rounded-2xl p-6 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-5">{t("profile.settings")}</h3>
            <div className="space-y-1">
              {/* Edit Profile */}
              <div>
                <button
                  onClick={() => setShowEditProfile(!showEditProfile)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-accent transition-colors"
                >
                  <User size={18} strokeWidth={1.5} className="text-muted-foreground" />
                  <span className="flex-1 text-sm text-foreground text-left">{t("profile.editProfile")}</span>
                  <ChevronRight size={16} className={`text-muted-foreground transition-transform ${showEditProfile ? "rotate-90" : ""}`} />
                </button>
                {showEditProfile && (
                  <div className="ml-10 mt-1 mb-2 space-y-0.5">
                    {/* Update Username */}
                    <div className="p-3 rounded-xl bg-accent/50">
                      <p className="text-sm text-foreground mb-2">{t("profile.updateUsername")}</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          placeholder={t("profile.enterNewUsername")}
                          className="flex-1 px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          onClick={handleSaveUsername}
                          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          {t("profile.save")}
                        </button>
                      </div>
                    </div>
                    {/* Reset Password */}
                    <button
                      onClick={handleResetPassword}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                    >
                      <Key size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{t("profile.resetPassword")}</span>
                    </button>
                    {/* Delete All Data */}
                    <button
                      onClick={() => setShowDeleteDataConfirm(true)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                    >
                      <Trash2 size={16} className="text-destructive" />
                      <span className="text-sm text-destructive">{t("profile.deleteAllData")}</span>
                    </button>
                    {/* Delete Account */}
                    <button
                      onClick={() => setShowDeleteAccountConfirm(true)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                    >
                      <AlertTriangle size={16} className="text-destructive" />
                      <span className="text-sm text-destructive">{t("profile.deleteAccount")}</span>
                    </button>
                    {/* Logout All Devices */}
                    <button
                      onClick={handleLogoutAllDevices}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                    >
                      <Monitor size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{t("profile.logoutAllDevices")}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Subscription */}
              <button
                onClick={() => navigate("/subscription")}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-accent transition-colors"
              >
                <CreditCard size={18} strokeWidth={1.5} className="text-muted-foreground" />
                <span className="flex-1 text-sm text-foreground text-left">{t("profile.subscription")}</span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>

              {/* Theme */}
              <div>
                <button
                  onClick={() => setShowThemePicker(!showThemePicker)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-accent transition-colors"
                >
                  <span className="text-muted-foreground">
                    {themeConfig[theme].icon}
                  </span>
                  <span className="flex-1 text-sm text-foreground text-left">
                    {t("profile.theme")}
                  </span>
                  <span className="text-xs text-muted-foreground mr-1">{themeConfig[theme].label}</span>
                  <ChevronRight size={16} className={`text-muted-foreground transition-transform ${showThemePicker ? "rotate-90" : ""}`} />
                </button>
                {showThemePicker && (
                  <div className="ml-10 mt-1 mb-2 space-y-0.5">
                    {(Object.keys(themeConfig) as Theme[]).map((themeKey) => (
                      <button
                        key={themeKey}
                        onClick={() => {
                          const button = document.querySelector(`[data-theme-item="${themeKey}"]`) as HTMLElement;
                          if (button) {
                            const rect = button.getBoundingClientRect();
                            setTheme(themeKey, {
                              x: rect.left + rect.width / 2,
                              y: rect.top + rect.height / 2,
                            });
                          } else {
                            setTheme(themeKey);
                          }
                        }}
                        data-theme-item={themeKey}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                      >
                        <span className="text-muted-foreground">
                          {themeConfig[themeKey].icon}
                        </span>
                        <div className="flex flex-col flex-1">
                          <span className="text-sm text-foreground">{themeConfig[themeKey].label}</span>
                          <span className="text-xs text-muted-foreground">{themeConfig[themeKey].description}</span>
                        </div>
                        {theme === themeKey && <Check size={16} className="text-primary" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language */}
              <div>
                <button
                  onClick={() => setShowLangPicker(!showLangPicker)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-accent transition-colors"
                >
                  <Globe size={18} strokeWidth={1.5} className="text-muted-foreground" />
                  <span className="flex-1 text-sm text-foreground text-left">{t("profile.language")}</span>
                  <span className="text-xs text-muted-foreground mr-1">{language === "en" ? "English" : "Русский"}</span>
                  <ChevronRight size={16} className={`text-muted-foreground transition-transform ${showLangPicker ? "rotate-90" : ""}`} />
                </button>
                {showLangPicker && (
                  <div className="ml-10 mt-1 mb-2 space-y-0.5">
                    <button
                      onClick={() => { setLanguage("en"); setShowLangPicker(false); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                    >
                      <span className="text-sm text-foreground flex-1">🇬🇧 English</span>
                      {language === "en" && <Check size={16} className="text-primary" />}
                    </button>
                    <button
                      onClick={() => { setLanguage("ru"); setShowLangPicker(false); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
                    >
                      <span className="text-sm text-foreground flex-1">🇷🇺 Русский</span>
                      {language === "ru" && <Check size={16} className="text-primary" />}
                    </button>
                  </div>
                )}
              </div>

              {settingsItems.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl hover:bg-accent transition-colors"
                >
                  <item.icon size={18} strokeWidth={1.5} className="text-muted-foreground" />
                  <span className="flex-1 text-sm text-foreground text-left">{item.label}</span>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>

            <div className="border-t border-border mt-5 pt-5">
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {t("profile.disclaimer")}
              </p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-destructive text-sm font-medium rounded-xl hover:bg-destructive/5 transition-colors px-3 py-2.5"
              >
                <LogOut size={16} strokeWidth={1.5} />
                {t("profile.logout")}
              </button>
            </div>

            {/* Delete All Data Confirmation Modal */}
            {showDeleteDataConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card rounded-2xl p-6 max-w-sm w-full card-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Trash2 size={20} className="text-destructive" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{t("profile.deleteAllData")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{t("profile.deleteAllDataConfirm")}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteDataConfirm(false)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-accent transition-colors"
                    >
                      {t("profile.cancel")}
                    </button>
                    <button
                      onClick={handleDeleteAllData}
                      className="flex-1 px-4 py-2.5 text-sm font-medium bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 transition-colors"
                    >
                      {t("profile.delete")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Account Confirmation Modal */}
            {showDeleteAccountConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card rounded-2xl p-6 max-w-sm w-full card-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle size={20} className="text-destructive" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{t("profile.deleteAccount")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{t("profile.deleteAccountConfirm")}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteAccountConfirm(false)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-accent transition-colors"
                    >
                      {t("profile.cancel")}
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex-1 px-4 py-2.5 text-sm font-medium bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 transition-colors"
                    >
                      {t("profile.delete")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
