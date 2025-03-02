import { createContext, useContext, useState, useEffect } from "react";

type LangTypes = "fr" | "en";
interface LangContextTypes {
  lang: LangTypes;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextTypes | undefined>(undefined);
const LOCAL_STORAGE_KEY = "lang";

export function LanguageContextProvider({ children }: { children: React.ReactNode }) {
  // Set default to localStorage -> system preference -> French default
  const [lang, setLangState] = useState<LangTypes>(() => {
    try {
      const storedLang = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedLang === "fr" || storedLang === "en") {
        return storedLang;
      }

      return navigator.language.toLowerCase().startsWith("en") ? "en" : "fr";
    } catch (error) {
      console.error("Error accessing language preferences:", error);
      return "fr";
    }
  });

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    setLangState(newLang);

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newLang);
    } catch (error) {
      console.error("Could not persist language to localStorage:", error);
    }
  };

  // Synchronize language across multiple tabs
  useEffect(() => {
    const syncLang = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY) {
        if (e.newValue === "fr" || e.newValue === "en") {
          setLangState(e.newValue as LangTypes);
        }
      }
    };

    window.addEventListener("storage", syncLang);
    return () => window.removeEventListener("storage", syncLang);
  }, []);

  return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangContextProvider");
  }
  return context;
}
