"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const session = authClient.useSession();

  const logout = async () => {
    try {
      return await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

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
        <Button onClick={logout} variant={"noBorder"} size={"sm"}>
          <LogOut />
          Log out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
