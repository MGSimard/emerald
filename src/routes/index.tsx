import { createFileRoute } from "@tanstack/react-router";
import { TargetList } from "@/_components/TargetList";

export const Route = createFileRoute("/")({
  component: PageHome,
});

function PageHome() {
  return <TargetList />;
}
