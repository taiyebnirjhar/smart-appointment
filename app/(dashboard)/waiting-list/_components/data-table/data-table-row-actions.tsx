/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { DeleteAlert } from "@/components/shared/alert/delete-alert";
import { useDeleteQueueItemMutation } from "@/redux/api/waiting-list/waiting-list.api";
import { useRouter } from "next/navigation";
import React from "react";

interface DataTableRowActionsProps {
  row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [deleteQueueItem] = useDeleteQueueItemMutation();

  const handleDelete = async () => {
    const id = row.original._id;
    await deleteQueueItem({
      id,
    });
  };

  const rowData = {
    id: row.original._id,
    serviceId: row.original.serviceId,
    customerName: row.original.customerName,
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-40">
        <DropdownMenuItem
          onSelect={() => {
            const params = new URLSearchParams({
              queueId: rowData.id,
              serviceId: rowData.serviceId,
              customerName: rowData.customerName,
            });
            router.push(`/appointment/create?${params.toString()}`);
          }}
        >
          Assign
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteAlert onConfirm={handleDelete}>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            className="text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DeleteAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
