import { cn } from "@/features/shared/lib/utils";
import { Link, type LinkProps } from "@tanstack/react-router";

type Props = LinkProps<"a"> & {
  children: React.ReactNode;
  active?: boolean;
};
export const NavBarLinkItem = ({
  children,
  active = false,
  ...props
}: Props) => {
  return (
    <Link {...props}>
      {({ isActive }) => {
        return (
          <div
            className={cn(
              "relative px-2 py-1",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {children}
            {(isActive || active) && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
            )}
          </div>
        );
      }}
    </Link>
  );
};
