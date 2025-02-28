import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="not-found">
      <h1>Not Found</h1>
      <Link to="/" className="link">
        RETURN HOME
      </Link>
    </main>
  );
}

export function Error() {
  return (
    <main className="not-found">
      <h1>Error</h1>
      <Link to="/" className="link">
        RETURN HOME
      </Link>
    </main>
  );
}
