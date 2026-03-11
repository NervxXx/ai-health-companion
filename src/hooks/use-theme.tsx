import { useState, useEffect, createContext, useContext, ReactNode, useMemo, useCallback } from "react";

export type Theme = "light" | "dark" | "blue" | "pastel";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme, clickCoords?: { x: number; y: number }) => void;
  toggleTheme: (clickCoords?: { x: number; y: number }) => void;
  isInitialized: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  isInitialized: false,
});

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "dark";
const SUPPORTED_THEMES: Theme[] = ["light", "dark", "blue", "pastel"];

const getStorageTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    return SUPPORTED_THEMES.includes(stored as Theme) ? (stored as Theme) : DEFAULT_THEME;
  } catch (e) {
    return DEFAULT_THEME;
  }
};

const setStorageTheme = (theme: Theme): "localStorage" | "sessionStorage" | "runtime" => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
    return "localStorage";
  } catch (e) {
    try {
      sessionStorage.setItem(STORAGE_KEY, theme);
      return "sessionStorage";
    } catch (e2) {
      return "runtime";
    }
  }
};

const getThemeBgColor = (themeName: Theme): string => {
  switch (themeName) {
    case "light":
      return "#ffffff";
    case "blue":
      return "#1c3334";
    case "pastel":
      return "#fafafa";
    case "dark":
    default:
      return "#2d283e";
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [isInitialized, setIsInitialized] = useState(false);

  const applyThemeToDom = useCallback((themeName: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const isDark = themeName === "dark" || themeName === "blue";
    root.classList.toggle("dark", isDark);
    root.classList.toggle("theme-blue", themeName === "blue");
    root.classList.toggle("theme-pastel", themeName === "pastel");
  }, []);

  useEffect(() => {
    const storedTheme = getStorageTheme();
    applyThemeToDom(storedTheme);
    setThemeState(storedTheme);
    setIsInitialized(true);
  }, [applyThemeToDom]);

  const setTheme = useCallback((newTheme: Theme, clickCoords?: { x: number; y: number }) => {
    if (!SUPPORTED_THEMES.includes(newTheme)) return;
    if (newTheme === theme) return;

    if (clickCoords && clickCoords.x !== undefined && clickCoords.y !== undefined) {
      const { x, y } = clickCoords;

      const existingOverlay = document.getElementById("theme-transition-overlay");
      if (existingOverlay) {
        existingOverlay.remove();
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const distanceToCorners = [
        Math.sqrt(x ** 2 + y ** 2),
        Math.sqrt((viewportWidth - x) ** 2 + y ** 2),
        Math.sqrt(x ** 2 + (viewportHeight - y) ** 2),
        Math.sqrt((viewportWidth - x) ** 2 + (viewportHeight - y) ** 2),
      ];
      const maxRadius = Math.max(...distanceToCorners);

      setThemeState(newTheme);
      setStorageTheme(newTheme);
      applyThemeToDom(newTheme);

      const oldThemeBg = getThemeBgColor(theme);
      const finalRadius = maxRadius * 1.2;
      const overlay = document.createElement("div");
      overlay.id = "theme-transition-overlay";

      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100dvh;
        background: ${oldThemeBg};
        mask: radial-gradient(
          circle at ${x}px ${y}px,
          transparent 0px,
          black 0px
        );
        -webkit-mask: radial-gradient(
          circle at ${x}px ${y}px,
          transparent 0px,
          black 0px
        );
        will-change: mask, -webkit-mask;
        z-index: 999999;
        pointer-events: none;
        transform: translateZ(0);
        backface-visibility: hidden;
        contain: layout style paint;
      `;

      document.body.appendChild(overlay);

      const duration = 600;
      const startTime = performance.now();
      const maskTemplate = (radius: number) =>
        `radial-gradient(circle at ${x}px ${y}px, transparent ${radius}px, black ${radius}px)`;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;
        const radius = finalRadius * eased;

        const maskValue = maskTemplate(radius);
        overlay.style.mask = maskValue;
        overlay.style.webkitMask = maskValue;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          overlay.style.willChange = "auto";
          if (overlay.parentNode) {
            overlay.style.transition = "opacity 0.15s ease-out";
            overlay.style.opacity = "0";
            setTimeout(() => {
              if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
              }
            }, 150);
          }
        }
      };

      requestAnimationFrame(animate);
    } else {
      setThemeState(newTheme);
      setStorageTheme(newTheme);
      applyThemeToDom(newTheme);
    }
  }, [theme, applyThemeToDom]);

  const toggleTheme = useCallback((clickCoords?: { x: number; y: number }) => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme, clickCoords);
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isInitialized,
    }),
    [theme, setTheme, toggleTheme, isInitialized]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
