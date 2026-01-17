import { NavBarApp } from "@/features/shared/components/nav-bar-app";
import { OrgWrapper } from "@/features/shared/components/org-wrapper";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <NavBarApp slug={slug} />
      </div>
      <div className="flex flex-1 flex-col pb-2 px-4">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <OrgWrapper orgSlug={slug}>
            <Outlet />
          </OrgWrapper>
        </div>
      </div>
    </>
  );
}
