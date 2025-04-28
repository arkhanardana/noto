"use client";

import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const session = authClient.useSession();
  const user = session.data?.user;
  const router = useRouter();

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

  return (
    <header className="border-b bg-background pt-8">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <div className="flex items-center space-x-2 gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="p-1 rounded-full h-fit">
                  <Image
                    src={user?.image || ""}
                    width={1000}
                    height={1000}
                    alt="profile"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Button onClick={logout} variant={"noBorder"} size={"sm"}>
                  <LogOut />
                  Log out
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Link>
      </div>
    </header>
  );
}
