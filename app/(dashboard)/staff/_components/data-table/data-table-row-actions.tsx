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
import useAuth from "@/hooks/use-auth";
import { useDeleteStaffMutation } from "@/redux/api/staff/staff.api";
import Link from "next/link";

interface DataTableRowActionsProps {
  row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [deleteStaff] = useDeleteStaffMutation();
  const { data: session } = useAuth();

  const userId = session?.user.userId;

  const handleDelete = async () => {
    const id = row.original._id;
    await deleteStaff({
      id,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            href={`/dashboard/admin/verification/details/${row.original._id}`}
          >
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteAlert onConfirm={handleDelete}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-destructive"
            disabled={userId === row.original._id}
          >
            Delete
          </DropdownMenuItem>
        </DeleteAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
