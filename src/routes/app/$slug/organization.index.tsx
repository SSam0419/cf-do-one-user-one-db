import { MembersList } from "@/features/organization/components/members-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$slug/organization/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Members</h2>
      </div>
      <MembersList slug={slug} />
    </div>
  );
}
