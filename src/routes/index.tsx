import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-lg mt-40 space-y-6 mx-auto">
      <h1 className="text-2xl font-bold">Hello world</h1>
      <p>This is a toy project to experiment with</p>
      <ul>
        <li>- CF Durable Objects</li>
        <li>- Better Auth</li>
        <li>- ORPC</li>
        <li>- ...</li>
      </ul>

      <Link to="/app">
        <Button>Start Now</Button>
      </Link>
    </div>
  );
}
