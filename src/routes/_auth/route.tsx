import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = authClient.useSession();

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (auth.data) {
    return <Navigate to="/app" />;
  }

  return (
    <div className="flex justify-center items-center mt-20 mx-auto max-w-xl">
      <Outlet />
    </div>
  );
}
