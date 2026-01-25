"use client";

import { IService } from "@/types/api-response/api-response";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<IService>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.original.name;
      return <p className="capitalize">{name ?? "N/A"}</p>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "durationMinutes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration (Minutes)" />
    ),
    cell: ({ row }) => (
      <p className="capitalize">{row.original.durationMinutes}</p>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "requiredStaffType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Required Staff Type" />
    ),
    cell: ({ row }) => (
      <p className="line-clamp-1 capitalize max-w-[120px]">
        {row.original.requiredStaffType || "N/A"}
      </p>
    ),
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
