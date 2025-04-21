import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import getUser from "../get-user";

const Profile = async () => {
  const user = await getUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-1 rounded-full h-fit">
          <Image
            src={user?.image}
            width={1000}
            height={1000}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="">
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
