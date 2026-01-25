"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar/app-sidebar";
import { AdminNavList } from "./_constants/nav-list";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar navList={AdminNavList} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
