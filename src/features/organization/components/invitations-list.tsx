import { InvitationStatusBadge } from "@/features/organization/components/invitation-status-badge";
import { useOrganizationInvitationsQuery } from "@/features/organization/hooks/invitations";
import { Skeleton } from "@/features/shared/components/ui/skeleton";
import { Mail } from "lucide-react";

export const InvitationsList = ({ orgId }: { orgId: string }) => {
  const invitationsQuery = useOrganizationInvitationsQuery({ orgId });

  if (invitationsQuery.isPending) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map(() => (
          <Skeleton className="w-full h-10" />
        ))}
      </div>
    );
  }

  if (invitationsQuery.isError) {
    return <div>Error: {invitationsQuery.error.message}</div>;
  }

  return (
    <div className="space-y-2">
      {invitationsQuery.data.length === 0 && (
        <div>No invitations for this organization yet.</div>
      )}
      {invitationsQuery.data.map((invitation) => {
        return (
          <div key={invitation.id} className="flex items-center gap-4">
            <div className="min-w-20">
              <InvitationStatusBadge status={invitation.status} />
            </div>
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              {invitation.email}
            </div>
          </div>
        );
      })}
    </div>
  );
};
