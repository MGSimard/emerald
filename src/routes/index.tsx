import { createFileRoute } from "@tanstack/react-router";
import { TestDexie } from "@/_components/TestDexie";
import { TargetCard } from "@/_components/TargetCard";

export const Route = createFileRoute("/")({
  component: PageHome,
});

//UseLiveQuery

function PageHome() {
  return (
    <main>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <h4>H4</h4>
      <h5>H5</h5>
      <h6>H6</h6>
      <button type="button" className="btn btn-primary">
        Button Primary
      </button>
      <button type="button" className="btn">
        Button Regular
      </button>
      <ul>
        <TargetCard />
      </ul>

      <TestDexie />
    </main>
  );
}
