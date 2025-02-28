import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main>
      Main
      <button type="button" className="btn btn-primary">
        Button Primary
      </button>
      <button type="button" className="btn">
        Button Regular
      </button>
    </main>
  );
}
