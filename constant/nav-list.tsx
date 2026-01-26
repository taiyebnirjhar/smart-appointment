import {
  CalendarClock,
  CalendarRange,
  HandPlatter,
  LayoutDashboard,
  LucideIcon,
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
    title: "Staff",
    url: "/staff",
    icon: UserRound,
    description: "Manage staff",
  },
  {
    title: "Service",
    url: "/service",
    icon: HandPlatter,
    description: "Manage services",
  },
  {
    title: "Appointment",
    url: "/appointment",
    icon: CalendarRange,
    description: "Manage appointments",
  },
  {
    title: "Waiting List",
    url: "/waiting-list",
    icon: CalendarClock,
    description: "Manage waiting list",
  },
];

export const PERMISSION_PATHS: string[] = navList.map((item) =>
  item.url === "/" ? "/" : item.url.replace(/\/$/, ""),
);
