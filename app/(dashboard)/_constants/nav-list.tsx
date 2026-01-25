import {
  BadgeCheck,
  FileUser,
  LayoutDashboard,
  LucideIcon,
  Newspaper,
} from "lucide-react";
export interface INavList {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export const AdminNavList: INavList[] = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Verification",
    url: "/dashboard/admin/verification",
    icon: BadgeCheck,
  },
  {
    title: "Contact Us",
    url: "/dashboard/admin/contact-us",
    icon: FileUser,
  },
  {
    title: "Blogs",
    url: "/dashboard/admin/blogs",
    icon: Newspaper,
  },
];

export const quickNavItems = [
  {
    title: "Profile",
    url: "/dashboard/admin/profile",
    icon: LayoutDashboard,
    description: "View profile and overview",
  },
  {
    title: "Verification",
    url: "/dashboard/admin/verification",
    icon: BadgeCheck,
    description: "Manage seller and buyer verifications",
  },
  {
    title: "Contact Us",
    url: "/dashboard/admin/contact-us",
    icon: FileUser,
    description: "Review and respond to inquiries",
  },
  {
    title: "Blogs",
    url: "/dashboard/admin/blogs",
    icon: Newspaper,
    description: "Manage blog content and publications",
  },
];
