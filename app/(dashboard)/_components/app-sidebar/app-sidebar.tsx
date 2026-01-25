"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { INavList } from "../../_constants/nav-list";
import { DashboardLogo } from "../dashboard-logo/dashboard-logo";
import { NavMain } from "../nav-main/nav-main";
import { NavUser } from "../nav-user/nav-user";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navList: INavList[];
}

export function AppSidebar({ navList, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navList} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
