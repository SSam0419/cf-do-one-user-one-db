import { authClient } from "@/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/features/shared/components/ui/avatar";
import { Button } from "@/features/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/shared/components/ui/dropdown-menu";
import { Skeleton } from "@/features/shared/components/ui/skeleton";
import { ChevronsUpDown } from "lucide-react";

export const UserButton = () => {
  const auth = authClient.useSession();
  const navigate = useNavigate();

  const logout = () => {
    authClient.signOut(
      {},
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" className="justify-between" />}
      >
        {auth.isPending && <Skeleton className="w-10 h-10 rounded-full" />}
        {auth.data && (
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              {auth.data.user.image && (
                <AvatarImage
                  src={auth.data.user.image}
                  alt={auth.data.user.name}
                />
              )}
              <AvatarFallback>{auth.data.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {auth.data.user.name}
            <ChevronsUpDown className="size-4" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
