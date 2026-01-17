import { authClient } from "@/lib/auth-client";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

export const useAcceptInvitationMutation = () =>
  useMutation({
    mutationFn: async ({ invitationId }: { invitationId: string }) => {
      const invitation = await authClient.organization.acceptInvitation({
        invitationId,
      });
      if (invitation.error) {
        throw new Error(invitation.error.message);
      }
      return invitation.data;
    },
    meta: {
      successMessage: "Invitation accepted",
      errorMessage: "Failed to accept invitation",
    },
  });

export const useRejectInvitationMutation = () =>
  useMutation({
    mutationFn: async ({ invitationId }: { invitationId: string }) => {
      const invitation = await authClient.organization.rejectInvitation({
        invitationId,
      });
      if (invitation.error) {
        throw new Error(invitation.error.message);
      }
      return invitation.data;
    },
    meta: {
      successMessage: "Invitation rejected",
      errorMessage: "Failed to reject invitation",
    },
  });

export const useMyInvitationsQuery = () =>
  useQuery({
    queryKey: ["my-invitations"],
    queryFn: async () => {
      const invitations = await authClient.organization.listUserInvitations();
      if (invitations.error) {
        throw new Error(invitations.error.message);
      }
      return invitations.data;
    },
  });

export const createOrganizationInvitationQueryOptions = ({
  orgId,
}: {
  orgId: string;
}) => {
  return queryOptions({
    queryKey: [orgId, "invitations"],
    queryFn: async () => {
      const invitations = await authClient.organization.listInvitations({
        query: {
          organizationId: orgId,
        },
      });
      if (invitations.error) {
        throw new Error(invitations.error.message);
      }
      return invitations.data;
    },
  });
};
export const useOrganizationInvitationsQuery = ({
  orgId,
}: {
  orgId: string;
}) => {
  return useQuery(createOrganizationInvitationQueryOptions({ orgId }));
};
