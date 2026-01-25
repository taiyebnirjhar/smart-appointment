import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";

export interface UserMenuProps {
  email: string;
  profilePicture: string;
  name: string;
}

export function UserMenu(user: UserMenuProps) {
  // Create full name from firstName and lastName
  const name = user.name?.trim() || "anonymous user";

  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3  px-1.5 py-0.5 outline-none   text-[#1E3A8A] rounded-sm  transition-colors cursor-pointer ">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10  bg-transparent cursor-pointer border-2 border-[#87D0EA] opacity-100">
            <AvatarImage
              src={user.profilePicture ?? "./placeholder.svg"}
              alt={name}
            />
            <AvatarFallback className="font-bold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 dark:bg-background dark:border-white/60"
      >
        <DropdownMenuItem
          onClick={async () => await signOut()}
          className="text-red-600 focus:text-red-600  w-full text-end dark:hover:bg-white/10 cursor-pointer"
        >
          <LogOut className="mr-1 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
