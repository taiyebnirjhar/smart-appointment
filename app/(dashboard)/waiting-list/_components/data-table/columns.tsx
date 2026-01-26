"use client";

import { WAITING_QUEUE_STATUS_LABEL } from "@/constant/waiting-queue-status";
import { IWaitingQueueItem } from "@/types/api-response/api-response";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<IWaitingQueueItem>[] = [
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      const name = row.original.customerName;
      return <p className="capitalize">{name ?? "N/A"}</p>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => {
      const service = row.original.service;

      return <p className="capitalize">{service?.name || "N/A"}</p>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested Date" />
    ),
    cell: ({ row }) => {
      const date = row.original.startTime;
      return format(new Date(date), "dd-MM-yy, hh.mm a");
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <p className="capitalize">
          {WAITING_QUEUE_STATUS_LABEL[status] || "N/A"}
        </p>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return format(new Date(date), "dd-MM-yy, hh.mm a");
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
