import { InvitationStatusBadge } from "@/features/organization/components/invitation-status-badge";
import {
  useAcceptInvitationMutation,
  useMyInvitationsQuery,
  useRejectInvitationMutation,
} from "@/features/organization/hooks/invitations";
import { Button } from "@/features/shared/components/ui/button";
import { ButtonGroup } from "@/features/shared/components/ui/button-group";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function MyInvitationsList() {
  const myInvitationsQuery = useMyInvitationsQuery();
  const acceptInvitationMutation = useAcceptInvitationMutation();
  const rejectInvitationMutation = useRejectInvitationMutation();

  if (myInvitationsQuery.isPending) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map(() => (
          <Skeleton className="w-full h-10" />
        ))}
      </div>
    );
  }

  if (myInvitationsQuery.isError) {
    return <div></div>;
  }

  return (
    <div className="space-y-2">
      {myInvitationsQuery.data.length === 0 && (
        <div>No invitations at the moment.</div>
      )}
      {myInvitationsQuery.data.map((invitation) => {
        return (
          <div key={invitation.id} className="flex items-center gap-4">
            <InvitationStatusBadge status={invitation.status} />
            <div>{invitation.organizationName}</div>

            <ButtonGroup className="ml-auto">
              <Button
                variant="success"
                isLoading={acceptInvitationMutation.isPending}
                disabled={
                  acceptInvitationMutation.isPending ||
                  rejectInvitationMutation.isPending
                }
                onClick={() =>
                  acceptInvitationMutation.mutate({
                    invitationId: invitation.id,
                  })
                }
              >
                Accept
              </Button>
              <Button
                variant="destructive"
                isLoading={rejectInvitationMutation.isPending}
                disabled={
                  acceptInvitationMutation.isPending ||
                  rejectInvitationMutation.isPending
                }
                onClick={() =>
                  rejectInvitationMutation.mutate({
                    invitationId: invitation.id,
                  })
                }
              >
                Reject
              </Button>
            </ButtonGroup>
          </div>
        );
      })}
    </div>
  );
}
