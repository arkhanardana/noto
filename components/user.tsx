"use client"

import Profile from "@/components/ui/profile";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export default function User() {

 const session = authClient.useSession();

 const user = session?.data?.user
  return (
      <div className="flex items-center">
        <Profile />
        <DropdownMenuLabel className="text-xl ml-1">{user?.name}</DropdownMenuLabel>
      </div>
  );
}
