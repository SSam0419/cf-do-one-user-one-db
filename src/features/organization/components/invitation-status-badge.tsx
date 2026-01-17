import { Badge } from "@/features/shared/components/ui/badge";
import type { InvitationStatus } from "better-auth/plugins";

export const InvitationStatusBadge = ({
  status,
}: {
  status: InvitationStatus;
}) => {
  switch (status) {
    case "pending":
      return <Badge variant="default">Pending</Badge>;
    case "accepted":
      return <Badge variant="success">Accepted</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    case "canceled":
      return <Badge variant="destructive">Canceled</Badge>;
  }
};
