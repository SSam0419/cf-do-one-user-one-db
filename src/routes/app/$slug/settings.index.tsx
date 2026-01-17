import { MembersList } from "@/features/organization/components/members-list";
import { useOrgWrapper } from "@/features/shared/components/org-wrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$slug/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orgId } = useOrgWrapper();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Members</h2>
      </div>
      <MembersList orgId={orgId} />
    </div>
  );
}
