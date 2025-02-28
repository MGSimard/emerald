import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/_components/ThemeToggle";

export function Nav() {
  return (
    <nav>
      <Link to="/" id="nav-logo">
        <img src="/metadata/favicon.svg" alt="Logo" />
        <span>EMERALD</span>
      </Link>
      <ThemeToggle />
    </nav>
  );
}
