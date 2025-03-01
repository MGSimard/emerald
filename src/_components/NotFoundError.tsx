import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <Link to="/" className="link">
        Retour
      </Link>
    </div>
  );
}

export function Error() {
  return (
    <div className="not-found">
      <h1>Erreur</h1>
      <Link to="/" className="link">
        Retour
      </Link>
    </div>
  );
}
