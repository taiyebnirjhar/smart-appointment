"use client";

import { IAppointment } from "@/types/api-response/api-response";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import StatusCell from "./data-table-status-cell";

export const columns: ColumnDef<IAppointment>[] = [
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
    accessorKey: "staff",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Staff" />
    ),
    cell: ({ row }) => {
      const staff = row.original.staff;
      return <p className="capitalize">{staff?.name || "N/A"}</p>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
    enableSorting: false,
  },

  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => {
      const date = row.original.startTime;
      const formattedDate = format(new Date(date), "dd-MM-yy");
      const formattedTime = format(new Date(date), "hh.mm a");
      return (
        <div>
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => {
      const date = row.original.endTime;
      const formattedDate = format(new Date(date), "dd-MM-yy");
      const formattedTime = format(new Date(date), "hh.mm a");
      return (
        <div>
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = format(new Date(date), "dd-MM-yy");
      const formattedTime = format(new Date(date), "hh.mm a");
      return (
        <div>
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
