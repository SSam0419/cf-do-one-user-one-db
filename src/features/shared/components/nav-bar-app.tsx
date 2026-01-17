import { OrganizationSwitcher } from "@/features/organization/components/organization-switcher";
import { NavBarLinkItem } from "@/features/shared/components/nav-bar-link-item";
import { UserButton } from "@/features/shared/components/user-button";
import { useLocation } from "@tanstack/react-router";

export const NavBarApp = ({ slug }: { slug: string }) => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="flex items-center gap-4">
        <OrganizationSwitcher slug={slug} />
        <NavBarLinkItem
          to="/app/$slug"
          params={{ slug: slug }}
          activeOptions={{ exact: true }}
          active={pathname === `/app/${slug}/items`}
        >
          Items
        </NavBarLinkItem>
        <NavBarLinkItem to="/app/$slug/organization" params={{ slug: slug }}>
          Organizations
        </NavBarLinkItem>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <UserButton />
      </div>
    </>
  );
};
