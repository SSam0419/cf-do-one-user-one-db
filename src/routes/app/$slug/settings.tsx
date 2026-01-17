import { cn } from "@/features/shared/lib/utils";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$slug/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  return (
    <div className="flex gap-6 items-start w-full">
      <div className="flex flex-col border-r rounded-md min-h-64 px-2 py-4 gap-2 items-end w-32">
        <Link
          to="/app/$slug/organization"
          params={{ slug: slug }}
          activeOptions={{ exact: true }}
        >
          {({ isActive }) => (
            <div
              className={cn(
                "px-2 py-1",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Members
            </div>
          )}
        </Link>
        <Link to="/app/$slug/organization/invitations" params={{ slug: slug }}>
          {({ isActive }) => (
            <div
              className={cn(
                "px-2 py-1",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Invitations
            </div>
          )}
        </Link>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
