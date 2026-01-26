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
import {
  useCancelAppointmentMutation,
  useDeleteAppointmentMutation,
} from "@/redux/api/appointment/appointment.api";
import Link from "next/link";
import React from "react";

interface DataTableRowActionsProps {
  row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [open, setOpen] = React.useState(false);
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [cancelAppointment] = useCancelAppointmentMutation();

  const handleDelete = async () => {
    const id = row.original._id;
    await deleteAppointment({
      id,
    });
  };

  const handleCancel = async () => {
    const id = row.original._id;
    await cancelAppointment({
      id,
    });
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
        <DropdownMenuItem>
          <Link href={`/appointment/edit/${row.original._id}`}>
            View & Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DeleteAlert
          title={"Cancel Appointment"}
          description={"Are you sure you want to cancel this appointment?"}
          actionName="Cancel"
          onConfirm={handleCancel}
        >
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            className="text-warning"
          >
            Cancel
          </DropdownMenuItem>
        </DeleteAlert>

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
