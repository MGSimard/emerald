import { createFileRoute } from "@tanstack/react-router";
import { TargetList } from "@/_components/TargetList";

export const Route = createFileRoute("/")({
  component: PageHome,
});

function PageHome() {
  console.log("PageHome");
  return (
    <>
      <main>
        <TargetList />
      </main>
    </>
  );
}
