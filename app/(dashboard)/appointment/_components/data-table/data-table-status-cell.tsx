/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateAppointmentMutation } from "@/redux/api/appointment/appointment.api";
import {
  AppointmentStatus,
  IAppointment,
} from "@/types/api-response/api-response";

import { CircleChevronDown } from "lucide-react";

export default function StatusCell({ row }: any) {
  const status: AppointmentStatus = row.original.status;
  const id = row.original._id;

  const [update] = useUpdateAppointmentMutation();

  const handleChange = async (value: AppointmentStatus) => {
    const payload: Partial<IAppointment> = {
      status: value,
    };

    await update({ id, data: payload });
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
        <DropdownMenuItem onClick={() => handleChange("SCHEDULED")}>
          Scheduled
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange("IN_PROGRESS")}>
          In Progress
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleChange("COMPLETED")}>
          Completed
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleChange("CANCELLED")}>
          Cancelled
        </DropdownMenuItem>

        {/* Not Verified */}
        <DropdownMenuItem onClick={() => handleChange("NO_SHOW")}>
          No-Show
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
