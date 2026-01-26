"use client";

import { Badge } from "@/components/ui/badge";
import { IActivityLog } from "@/types/api-response/api-response";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";

const getActionStyles = (action: string) => {
  switch (action) {
    case "APPOINTMENT_CREATED":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    case "APPOINTMENT_CANCELLED":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
    case "QUEUE_ADDED":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
    case "STAFF_ASSIGNED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  }
};

export const columns: ColumnDef<IActivityLog>[] = [
  {
    accessorKey: "Time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;

      return (
        <div className="text-xs font-medium text-muted-foreground">
          {format(new Date(date), "MMM dd, hh:mm a")}
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "Action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`${getActionStyles(row.original.actionType)}  uppercase `}
      >
        {row.original.actionType.replace("_", " ")}
      </Badge>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Daily Capacity" />
    ),
    cell: ({ row }) => (
      <p className="text-sm font-medium">{row.original.message || "N/A"}</p>
    ),
    enableSorting: false,
  },
];
