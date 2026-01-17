import { Skeleton } from "@/features/shared/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";

export const MembersList = ({ slug }: { slug: string }) => {
  const membersQuery = useQuery({
    queryKey: [slug, "members"],
    queryFn: async () => {
      const members = await authClient.organization.listMembers({
        query: { organizationSlug: slug },
      });
      if (members.error) {
        throw new Error(members.error.message || members.error.statusText);
      }
      return members.data;
    },
  });

  if (membersQuery.isPending) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map(() => (
          <Skeleton className="w-full h-10" />
        ))}
      </div>
    );
  }

  if (membersQuery.isError) {
    return <div>Error: {membersQuery.error.message}</div>;
  }

  return (
    <div className="space-y-2">
      {membersQuery.data.total === 0 && (
        <div>No members for this organization yet.</div>
      )}
      {membersQuery.data.members.map((member) => {
        return (
          <div
            key={member.id}
            className="px-4 py-2 rounded-md dark:bg-zinc-800 block"
          >
            <div className="font-medium">{member.user.name}</div>
            <div className="flex items-center gap-2">
              <Mail className="size-4" /> {member.user.email}
            </div>
          </div>
        );
      })}
    </div>
  );
};
