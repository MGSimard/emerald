import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/_components/ThemeToggle";
import { InfoButton } from "@/_components/InfoButton";
import { useLang } from "@/_components/LangContext";

export function Nav() {
  const { lang, toggleLang } = useLang();

  return (
    <nav className="noselect">
      <Link to="/" id="nav-logo">
        <img src="/metadata/icon.svg" alt="Logo" />
        <span>EMERALD</span>
      </Link>
      <div id="nav-controls">
        <button onClick={toggleLang}>{lang.toUpperCase()}</button>
        <InfoButton />
        <ThemeToggle />
      </div>
    </nav>
  );
}
