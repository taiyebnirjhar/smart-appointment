"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { quickNavItems } from "@/constant/nav-list";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { HeaderBar } from "./_components/header-bar/header-bar";

export default function AdminDashboardPage() {
  return (
    <>
      <HeaderBar breadcrumbs={[{ name: "Dashboard" }]} />
      <div className="p-4 pt-0">
        <div className="min-h-screen bg-background p-6 md:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to Smart Appointment Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage the platform, monitor activities, and oversee operations
            </p>
          </div>

          {/* Quick Navigation Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickNavItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link key={idx} href={item.url}>
                    <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer hover:shadow-md gap-0 justify-between">
                      <CardHeader className="pb-3">
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
                      <CardContent className="pb-3">
                        <div className="flex items-center text-primary text-sm font-medium">
                          Access
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Admin Responsibilities */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Admin Responsibilities
                </CardTitle>
                <CardDescription>
                  Key tasks to maintain platform health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Review Verifications
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Approve or reject pending seller and buyer verifications
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Monitor User Activity
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Track user behavior and identify suspicious activities
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Manage Content
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Create, edit, and publish blog posts and announcements
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Handle Support Inquiries
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Respond to user support requests and resolve issues
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Admin Best Practices</CardTitle>
                <CardDescription>
                  Guidelines for effective platform management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    Act Promptly on Verifications
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Review verification requests within 24 hours to maintain
                    user satisfaction.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    Maintain Clear Communication
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Provide detailed reasons when rejecting verifications or
                    addressing concerns.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    Regular Content Updates
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Keep blog and announcements fresh to improve user engagement
                    and SEO.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
