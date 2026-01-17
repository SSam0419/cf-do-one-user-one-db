import { MyInvitationsList } from "@/features/organization/components/my-invitations-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_org-list/invitations")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MyInvitationsList />
    </div>
  );
}
