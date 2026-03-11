import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthBackground } from "@/components/auth/AuthBackground";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";
import { User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setError("");
    setEmailError("");
    setPasswordError("");

    // Local validation
    if (!formData.email || !formData.email.trim()) {
      setEmailError(language === "ru" ? "Пожалуйста, введите email" : "Please enter your email");
      return;
    }

    if (!formData.password || !formData.password.trim()) {
      setPasswordError(language === "ru" ? "Пожалуйста, введите пароль" : "Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual authentication logic
      // For now, simulate successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(language === "ru" ? "Успешный вход!" : "Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t("auth.login.error");
      setError(errorMessage);
      
      if (language === "ru") {
        setEmailError("Email не зарегистрирован");
        setPasswordError("Пароль неверный");
      } else {
        setEmailError("Email is not registered");
        setPasswordError("Incorrect password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError("");
    setEmailError("");
    setPasswordError("");

    try {
      // TODO: Implement guest login logic
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(language === "ru" ? "Вход как гость выполнен!" : "Guest login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 
        (language === "ru" ? "Ошибка входа как гость" : "Guest login failed");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="dark-theme-locked"
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        paddingTop: 'max(1rem, var(--safe-area-inset-top))',
        paddingBottom: 'max(1rem, var(--safe-area-inset-bottom))',
      }}
    >
      <AuthBackground />

      {/* Glass Panel */}
      <section className="relative z-10 w-full max-w-[400px] flex items-center justify-center perspective-1000">
        <div className="relative backdrop-blur-2xl bg-card/30 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 [@media(max-height:629px)]:p-3 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5),0_-4px_24px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] w-full animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out ring-1 ring-white/5 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none">
          {/* Logo */}
          <header className="text-center mb-4 sm:mb-5 [@media(max-height:629px)]:mb-3">
            <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 backdrop-blur-xl border border-primary/30 mb-3 [@media(max-height:629px)]:mb-2 [@media(max-height:629px)]:hidden shadow-[0_8px_24px_-4px_rgba(var(--primary),0.4)] transition-all duration-500 group">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-primary transition-transform duration-500 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground bg-gradient-to-b from-foreground via-foreground to-foreground/80 bg-clip-text tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              {t("auth.login.title")}
            </h1>
          </header>

          {/* Error message */}
          {error && (
            <div className="mb-3 [@media(max-height:629px)]:mb-2 p-3 [@media(max-height:629px)]:p-2 bg-destructive/10 backdrop-blur-sm border border-destructive/30 rounded-xl shadow-[0_4px_12px_-2px_rgba(239,68,68,0.2)] animate-in slide-in-from-top-2 duration-300 ring-1 ring-destructive/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <p className="text-sm font-medium text-destructive flex-1">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 [@media(max-height:629px)]:space-y-2.5">
            <div className="space-y-3 [@media(max-height:629px)]:space-y-2">
              <div className="group relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("auth.login.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className="transition-all duration-300 hover:bg-input/70 hover:border-primary/30 focus:bg-input/80 focus:scale-[1.01] focus:shadow-[0_0_0_4px_rgba(var(--primary),0.15),0_2px_12px_rgba(var(--primary),0.2)] focus:border-primary/50 group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="group relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("auth.login.passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="transition-all duration-300 hover:bg-input/70 hover:border-primary/30 focus:bg-input/80 focus:scale-[1.01] focus:shadow-[0_0_0_4px_rgba(var(--primary),0.15),0_2px_12px_rgba(var(--primary),0.2)] focus:border-primary/50 group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground/80 leading-relaxed text-balance tracking-wide">
              {t("auth.login.legalDisclaimerPrefix")}{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/90 underline-offset-4 hover:underline decoration-primary/60 transition-all duration-300 hover:drop-shadow-[0_1px_4px_rgba(var(--primary),0.3)]"
              >
                {t("auth.login.termsLink")}
              </a>{" "}
              {t("auth.login.legalDisclaimerConnector")}{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/90 underline-offset-4 hover:underline decoration-primary/60 transition-all duration-300 hover:drop-shadow-[0_1px_4px_rgba(var(--primary),0.3)]"
              >
                {t("auth.login.privacyLink")}
              </a>{" "}
              {t("auth.login.legalDisclaimerSuffix")}
            </p>

            <Button
              type="submit"
              variant="neomorphic"
              size="lg"
              className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_-3px_20px_rgba(255,255,255,0.08),0_0_20px_rgba(var(--primary),0.3)] active:scale-[0.98] hover:before:opacity-100"
              disabled={isLoading}
            >
              {isLoading ? t("auth.login.signingIn") : t("auth.login.signIn")}
            </Button>

            <div className="flex items-center justify-between text-sm text-primary font-medium">
              <a
                href="/forgot-password"
                className="hover:text-primary transition-all duration-300 hover:underline decoration-primary/60 underline-offset-4 hover:-translate-y-0.5 inline-block hover:drop-shadow-[0_2px_8px_rgba(var(--primary),0.3)]"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password");
                }}
              >
                {t("auth.login.forgotPassword")}
              </a>
              <a
                href="/register"
                className="text-primary hover:text-primary/90 transition-all duration-300 hover:underline decoration-primary/60 underline-offset-4 hover:-translate-y-0.5 inline-block hover:drop-shadow-[0_2px_8px_rgba(var(--primary),0.3)]"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                {t("auth.login.registerCTA")}
              </a>
            </div>

            {/* Guest Login */}
            <div className="relative my-4 [@media(max-height:629px)]:my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10 bg-gradient-to-r from-transparent via-white/20 to-transparent h-px"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground/70 font-semibold">
                <span className="px-4 [@media(max-height:629px)]:px-2 bg-card/50 backdrop-blur-md rounded-full border border-white/5 shadow-sm">
                  {language === "ru" ? "или" : "or"}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="glass"
              size="lg"
              className="w-full transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98]"
              disabled={isLoading}
              onClick={handleGuestLogin}
            >
              <User className="w-4 h-4 mr-2" />
              {language === "ru" ? "Войти как гость" : "Login as Guest"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
