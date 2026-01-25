/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import BlueTick from "@/components/svgs/blue-tick/blue-tick";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import useAuth from "@/hooks/use-auth";
import { signOut } from "next-auth/react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session } = useAuth();

  const name = session?.user?.name?.trim() || "anonymous user";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word: any) => word[0]?.toUpperCase())
    .join("");

  const email = session?.user?.email ?? "";
  const avatar = session?.user?.profilePicture ?? "";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg border-2 border-border">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="truncate font-medium capitalize inline-flex gap-1.5 w-full">
                  {name} <BlueTick size={15} className="mt-0.5" />
                </div>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg border-2 border-border">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="truncate font-medium capitalize inline-flex gap-1.5 w-full">
                    {name} <BlueTick size={15} className="mt-0.5" />
                  </div>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => await signOut()}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
