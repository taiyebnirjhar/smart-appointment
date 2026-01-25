"use client";

import { IStaff } from "@/types/api-response/api-response";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import AvailabilityStatusCell from "./data-table-status-cell";

export const columns: ColumnDef<IStaff>[] = [
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
    accessorKey: "staffType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff Type" />
    ),
    cell: ({ row }) => <p className="capitalize">{row.original.staffType}</p>,
    enableSorting: false,
  },

  {
    accessorKey: "dailyCapacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Daily Capacity" />
    ),
    cell: ({ row }) => (
      <p className="line-clamp-1 capitalize max-w-[120px]">
        {row.original.dailyCapacity || "N/A"}
      </p>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "availabilityStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Availability Status" />
    ),
    cell: ({ row }) => <AvailabilityStatusCell row={row} />,
    enableSorting: false,
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
        <>
          {formattedDate}
          <br />
          {formattedTime}
        </>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
