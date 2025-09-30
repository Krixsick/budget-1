import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/month")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/month"!</div>;
}
