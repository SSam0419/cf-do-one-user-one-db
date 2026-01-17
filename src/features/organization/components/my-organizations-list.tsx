import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";

export const MyOrganizationsList = () => {
  const organizations = authClient.useListOrganizations();

  if (organizations.isPending) {
    return <div>Loading...</div>;
  }
  if (organizations.error) {
    return <div>Error: {organizations.error.message}</div>;
  }

  return (
    <div className="space-y-1">
      {organizations.data?.length === 0 && <div>No organizations yet.</div>}
      {organizations.data?.map((organization) => (
        <Link
          key={organization.id}
          to="/app/$slug"
          params={{ slug: organization.slug }}
          className="block p-2 border shadow bg-muted rounded-md hover:bg-muted/50"
        >
          {organization.name}
        </Link>
      ))}
    </div>
  );
};
