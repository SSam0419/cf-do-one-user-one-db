import { SignInForm } from "@/features/auth/component/sign-in-form";
import { NavBarOrg } from "@/features/shared/components/nav-bar-org";
import { Badge } from "@/features/shared/components/ui/badge";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_org-list")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = authClient.useSession();

  if (auth.isPending) {
    return (
      <div>
        <Spinner />
        Loading...
      </div>
    );
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (!auth.data) {
    return (
      <div className="w-lg mt-40 space-y-6 mx-auto">
        <Badge variant="warning">You have to sign in first.</Badge>
        <SignInForm onSuccess={() => auth.refetch()} />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between w-full p-4">
        <NavBarOrg />
      </div>
      <div className="flex flex-1 flex-col pb-2 px-4">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
