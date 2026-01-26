"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { navList } from "@/constant/nav-list";
import { AppSidebar } from "./_components/app-sidebar/app-sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar navList={navList} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
