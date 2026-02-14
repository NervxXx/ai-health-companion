import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="text-center">
        <p className="text-6xl font-display font-bold text-primary mb-4">404</p>
        <p className="text-lg text-muted-foreground mb-6">
          {language === "ru" ? "Страница не найдена" : "Page not found"}
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-medium text-sm transition-opacity hover:opacity-90"
        >
          {language === "ru" ? "На главную" : "Go home"}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
