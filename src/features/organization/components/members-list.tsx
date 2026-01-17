import { useMembers } from "@/features/organization/hooks/members";
import { Skeleton } from "@/features/shared/components/ui/skeleton";
import { Mail } from "lucide-react";

export const MembersList = ({ orgId }: { orgId: string }) => {
  const membersQuery = useMembers({ orgId });

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
