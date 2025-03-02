import { createFileRoute } from "@tanstack/react-router";
import { TargetTool } from "@/_components/TargetTool";

export const Route = createFileRoute("/")({
  component: PageIndex,
});

function PageIndex() {
  return <TargetTool />;
}
