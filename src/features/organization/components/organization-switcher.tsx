import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/shared/components/ui/dropdown-menu";
import { Skeleton } from "@/features/shared/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

export const OrganizationSwitcher = ({ slug }: { slug?: string }) => {
  const organizations = authClient.useListOrganizations();

  if (organizations.isPending) {
    return <Skeleton className="w-24 h-8" />;
  }

  if (organizations.error) {
    return <div>Error loading organizations</div>;
  }

  if (!organizations.data) {
    return <div>No organizations found</div>;
  }

  const currentOrganization = organizations.data.find(
    (organization) => organization.slug === slug
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={"-mx-2 items-center"}
        render={<Button variant={"ghost"} className="items-center" />}
      >
        {currentOrganization?.name || "Organizations"}
        <ChevronDown className="size-4 text-muted-foreground mt-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {organizations.data.map((organization) => (
          <Link to="/app/$slug" params={{ slug: organization.slug }}>
            <DropdownMenuItem key={organization.id}>
              {organization.name}
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <Link to="/app">
          <DropdownMenuItem>Organizations</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
