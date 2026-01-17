import { InvitationsList } from "@/features/organization/components/invitations-list";
import { InviteMemberButton } from "@/features/organization/components/invite-member-dialog";
import { useOrgWrapper } from "@/features/shared/components/org-wrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$slug/organization/invitations")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orgId } = useOrgWrapper();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-medium">Invitations</h2>
        <InviteMemberButton orgId={orgId} />
      </div>
      <InvitationsList orgId={orgId} />
    </div>
  );
}
