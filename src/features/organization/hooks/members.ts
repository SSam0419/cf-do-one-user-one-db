import { queryOptions, useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const createMemberQueryOptions = ({ orgId }: { orgId: string }) => {
  return queryOptions({
    queryKey: [orgId, "members"],
    queryFn: async () => {
      const members = await authClient.organization.listMembers({
        query: { organizationId: orgId },
      });
      if (members.error) {
        throw new Error(members.error.message || members.error.statusText);
      }
      return members.data;
    },
  });
};
export const useMembers = ({ orgId }: { orgId: string }) => {
  return useQuery(createMemberQueryOptions({ orgId }));
};
