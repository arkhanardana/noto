"use client";

import Profile from "@/components/ui/profile";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export default function User() {
  const session = authClient.useSession();

  const user = session?.data?.user;
  return (
    <div className="flex items-center">
      <Profile />
      <DropdownMenuLabel className="text-sm sm:text-base ml-1 text-text">
        {user?.name}
      </DropdownMenuLabel>
    </div>
  );
}
