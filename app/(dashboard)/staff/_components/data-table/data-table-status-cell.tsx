/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateStaffMutation } from "@/redux/api/staff/staff.api";
import { IStaff, StaffAvailability } from "@/types/api-response/api-response";

import { CircleChevronDown } from "lucide-react";

export default function AvailabilityStatusCell({ row }: any) {
  const status: StaffAvailability = row.original.availabilityStatus;
  const id = row.original._id;

  const [updateStaff] = useUpdateStaffMutation();

  const handleChange = async (value: StaffAvailability) => {
    const payload: Partial<IStaff> = {
      availabilityStatus: value,
    };

    await updateStaff({ id, data: payload });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="capitalize w-[140px] py-1 px-3 rounded-sm border shadow-xs hover:bg-accent hover:text-accent-foreground flex justify-between gap-2 items-center">
          {status.replace("_", " ")}
          <CircleChevronDown size={12} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[150px]">
        {/* Verified */}
        <DropdownMenuItem onClick={() => handleChange("AVAILABLE")}>
          Available
        </DropdownMenuItem>

        {/* Not Verified */}
        <DropdownMenuItem onClick={() => handleChange("ON_LEAVE")}>
          On Leave
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
