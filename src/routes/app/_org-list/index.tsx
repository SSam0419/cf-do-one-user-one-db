import { CreateOrganizationButton } from "@/features/organization/components/create-organization-button";
import { MyOrganizationsList } from "@/features/organization/components/my-organizations-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_org-list/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <CreateOrganizationButton />
      </div>
      <MyOrganizationsList />
    </div>
  );
}
