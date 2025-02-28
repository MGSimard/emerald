import { createContext, useContext, useState, useEffect } from "react";

type ThemeTypes = "light" | "dark";
interface ThemeContextTypes {
  theme: ThemeTypes;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);
const LOCAL_STORAGE_KEY = "theme";

// Disable animations for the transition period
function disableAnimations() {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force a reflow
    window.getComputedStyle(document.body);
    if (css.parentNode === document.head) {
      document.head.removeChild(css);
    }
  };
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeTypes>(() => {
    try {
      const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTheme === "dark" || storedTheme === "light") {
        return storedTheme;
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (error) {
      console.error("Error accessing theme preferences:", error);
      return "light";
    }
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const enable = disableAnimations();
    setThemeState(newTheme);

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error("Could not persist theme to localStorage:", error);
    }

    // requestAnimationFrame instead of an arbitrary setTimeout
    try {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          enable();
        });
      });
    } catch (error) {
      console.error("Error re-enabling animations:", error);
      setTimeout(enable, 100);
    }
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  // Synchronize theme across multiple tabs
  useEffect(() => {
    const syncTheme = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY) {
        // Validate the value before setting
        if (e.newValue === "dark" || e.newValue === "light") {
          setThemeState(e.newValue as ThemeTypes);
        }
      }
    };

    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      try {
        // Only change if the user hasn't explicitly set a theme
        const hasUserPreference = localStorage.getItem(LOCAL_STORAGE_KEY) !== null;
        if (!hasUserPreference) {
          setThemeState(mediaQuery.matches ? "dark" : "light");
        }
      } catch (error) {
        console.error("Error handling system theme change:", error);
      }
    };

    // Add event listener with appropriate method
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}
