import {
  CalendarCheck,
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
    title: "Total Appointments",
    url: "/appointment",
    icon: CalendarRange,
    description: "Scheduled for today",
  },
  {
    title: "Pending Appointments",
    url: "/appointment?status=pending",
    icon: CalendarClock,
    description: "Waiting for confirmation",
  },
  {
    title: "Completed Appointments",
    url: "/appointment?status=completed",
    icon: CalendarCheck,
    description: "Successfully served",
  },

  {
    title: "Waiting List",
    url: "/waiting-list",
    icon: CalendarClock,
    description: "Customer in line",
  },
];

export const PERMISSION_PATHS: string[] = navList.map((item) =>
  item.url === "/" ? "/" : item.url.replace(/\/$/, ""),
);
