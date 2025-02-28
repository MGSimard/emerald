import { useTheme } from "@/_components/ThemeContext";
import { IconMoon, IconSun } from "@/_components/Icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const title = `Toggle ${theme === "dark" ? "Light" : "Dark"} Mode`;

  return (
    <button type="button" aria-label={title} title={title} className="theme-toggle" onClick={toggleTheme}>
      {theme === "dark" ? <IconMoon /> : <IconSun />}
    </button>
  );
}
