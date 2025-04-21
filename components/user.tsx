import getUser from "@/components/get-user";
import Profile from "@/components/ui/profile";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

export default async function User() {
  const user = await getUser();

  return (
      <div className="flex items-center">
        <Profile />
        <DropdownMenuLabel className="text-xl ml-1">{user?.name}</DropdownMenuLabel>
      </div>
  );
}
