import { NavBarLinkItem } from "@/features/shared/components/nav-bar-link-item";
import { UserButton } from "@/features/shared/components/user-button";

export const NavBarOrg = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <NavBarLinkItem to="/app" activeOptions={{ exact: true }}>
          Organizations
        </NavBarLinkItem>
        <NavBarLinkItem to="/app/invitations" activeOptions={{ exact: true }}>
          Invitations
        </NavBarLinkItem>
      </div>
      <UserButton />
    </>
  );
};
