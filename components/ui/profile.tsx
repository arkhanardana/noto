"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";

const Profile = () => {
  const session = authClient.useSession();

  const user = session?.data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span>
          <Button className="p-1 rounded-full h-fit">
            <Image
              src={user?.image || ""}
              width={1000}
              height={1000}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </Button>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
