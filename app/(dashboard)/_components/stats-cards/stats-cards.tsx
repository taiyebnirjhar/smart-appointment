"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Users,
} from "lucide-react";
import Link from "next/link";

interface StatsCardsProps {
  totalAppointmentsToday: number;
  completedToday: number;
  pendingToday: number;
  waitingQueueCount: number;
}

export function StatsCards({
  totalAppointmentsToday,
  completedToday,
  pendingToday,
  waitingQueueCount,
}: StatsCardsProps) {
  // const stats = [
  //   {
  //     title: "Total Today",
  //     value: totalAppointmentsToday,
  //     url: "/appointment",
  //     icon: CalendarRange,
  //     description: "Scheduled for today",
  //   },
  //   {
  //     title: "Pending Today",
  //     value: pendingToday,
  //     url: "/appointment",
  //     icon: CalendarClock,
  //     description: "Waiting for confirmation",
  //   },
  //   {
  //     title: "Completed Today",
  //     value: completedToday,
  //     url: "/appointment",
  //     icon: CalendarCheck,
  //     description: "Successfully served",
  //   },

  //   {
  //     title: "Waiting List",
  //     value: waitingQueueCount,
  //     url: "/waiting-list",
  //     icon: CalendarClock,
  //     description: "Customer in line",
  //   },
  // ];
  const stats = [
    {
      title: "Today's Schedule",
      value: totalAppointmentsToday,
      url: "/appointment",
      icon: CalendarDays,
      description: "Total bookings for today",
    },
    {
      title: "Pending Service",
      value: pendingToday,
      url: "/appointment",
      icon: CalendarClock,
      description: "Awaiting today's arrival",
    },
    {
      title: "Today's Served",
      value: completedToday,
      url: "/appointment",
      icon: CalendarCheck,
      description: "Successfully completed today",
    },
    {
      title: "Active Queue",
      value: waitingQueueCount,
      url: "/waiting-list",
      icon: Users, // Changed to Users to show physical presence
      description: "Customers currently in line",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Link key={idx} href={item.url}>
            <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer hover:shadow-md gap-0 justify-between gap-3">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base text-foreground">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {item.description}
                    </CardDescription>
                  </div>
                  <Icon className="w-5 h-5 text-primary ml-2 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold tracking-tight`}>
                  {item.value}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-primary text-sm font-medium">
                  Access
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
