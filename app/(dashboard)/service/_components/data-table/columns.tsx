"use client";

import { SERVICE_DURATION_LABEL_MAP } from "@/constant/service-duration.constant";
import { IService } from "@/types/api-response/api-response";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<IService>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Name" />
    ),
    cell: ({ row }) => {
      const name = row.original.name;
      return <p className="capitalize">{name ?? "N/A"}</p>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "requiredStaffType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Needed Stuff" />
    ),
    cell: ({ row }) => (
      <p className="line-clamp-1 capitalize max-w-[120px]">
        {row.original.requiredStaffType || "N/A"}
      </p>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "durationMinutes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration (Minutes)" />
    ),
    cell: ({ row }) => (
      <p className="capitalize">
        {SERVICE_DURATION_LABEL_MAP[row.original.durationMinutes] ??
          `${row.original.durationMinutes} min`}
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
