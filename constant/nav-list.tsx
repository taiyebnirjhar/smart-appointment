import {
  BadgeCheck,
  CalendarClock,
  CalendarRange,
  FileUser,
  HandPlatter,
  LayoutDashboard,
  LucideIcon,
  Newspaper,
  UserRound,
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

export const navList: INavList[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Staff",
    url: "/staff",
    icon: UserRound,
  },
  {
    title: "Service",
    url: "/service",
    icon: HandPlatter,
  },
  {
    title: "Appointment",
    url: "/appointment",
    icon: CalendarRange,
  },
  {
    title: "Waiting List",
    url: "/waiting-list",
    icon: CalendarClock,
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

export const PERMISSION_PATHS: string[] = navList.map((item) =>
  item.url === "/" ? "/" : item.url.replace(/\/$/, ""),
);
