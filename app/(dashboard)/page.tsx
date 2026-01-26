"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboard/dashboard.api";

import { CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

import { ActivityLog } from "./_components/activity-log-table/activity-log";
import { HeaderBar } from "./_components/header-bar/header-bar";
import { StatsCards } from "./_components/stats-cards/stats-cards";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  return (
    <>
      <HeaderBar breadcrumbs={[{ name: "Dashboard" }]} />
      <div className="p-4 pt-0">
        <div className="min-h-screen bg-background p-6 md:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground text-lg">
              Real-time insights into your organization&apos;s daily operations.
            </p>
          </div>

          <div className="mb-8">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-46 w-full rounded-xl shadow-sm"
                  />
                ))}
              </div>
            ) : (
              <StatsCards
                totalAppointmentsToday={stats?.totalAppointmentsToday || 0}
                completedToday={stats?.completedToday || 0}
                pendingToday={stats?.pendingToday || 0}
                waitingQueueCount={stats?.waitingQueueCount || 0}
              />
            )}
          </div>

          <div className="pt-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-48 rounded-md" />

                <div className="border rounded-xl p-1 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full mb-1 last:mb-0" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-2xl font-bold text-foreground mb-2 inline-flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-bold">
                    Recent Activities
                  </CardTitle>
                </div>
                <div className="">
                  <ActivityLog
                    isLoading={isLoading}
                    activities={stats?.recentActivities || []}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
