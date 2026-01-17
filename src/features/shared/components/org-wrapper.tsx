import { useOrganizations } from "@/features/organization/hooks/organizations";
import { Skeleton } from "@/features/shared/components/ui/skeleton";
import { createContext, useContext } from "react";

type OrgWrapperContext = {
  orgId: string;
};

const OrgWrapperContext = createContext<OrgWrapperContext | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useOrgWrapper = () => {
  const context = useContext(OrgWrapperContext);
  if (!context) {
    throw new Error("useOrgWrapper must be used within an OrgWrapper");
  }
  return context;
};

export const OrgWrapper = ({
  orgSlug,
  children,
}: {
  orgSlug: string;
  children: React.ReactNode;
}) => {
  const org = useOrganizations();

  if (org.isPending) {
    return <Skeleton className="w-full h-64" />;
  }

  if (org.error) {
    return <div>Error loading organization</div>;
  }

  const orgId = org.data?.find((org) => org.slug === orgSlug)?.id;
  if (!orgId) {
    return <div>Organization not found</div>;
  }

  return (
    <OrgWrapperContext.Provider value={{ orgId }}>
      {children}
    </OrgWrapperContext.Provider>
  );
};
