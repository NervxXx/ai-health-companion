import { Moon, Sun, Palette, Flower2 } from "lucide-react";
import { useTheme, type Theme } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: Theme) => {
    // Get button position for circular reveal animation
    const button = document.querySelector('[data-theme-toggle]') as HTMLElement;
    if (button) {
      const rect = button.getBoundingClientRect();
      setTheme(newTheme, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    } else {
      setTheme(newTheme);
    }
  };

  const currentTheme = themeConfig[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-theme-toggle
          className="p-2 rounded-xl hover:bg-accent transition-colors text-muted-foreground"
          aria-label="Select theme"
        >
          {currentTheme.icon}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {(Object.keys(themeConfig) as Theme[]).map((themeKey) => (
          <DropdownMenuItem
            key={themeKey}
            onClick={() => handleThemeChange(themeKey)}
            className={theme === themeKey ? "bg-accent" : ""}
          >
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {themeConfig[themeKey].icon}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {themeConfig[themeKey].label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {themeConfig[themeKey].description}
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
