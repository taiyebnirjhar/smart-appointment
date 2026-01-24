import { AppointmentStatus } from "@/types/static-types/static-types";

export const APPOINTMENT_STATUS: { label: string; value: AppointmentStatus }[] =
  [
    { label: "Scheduled", value: "Scheduled" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "No-Show", value: "No-Show" },
    { label: "Queued", value: "Queued" },
  ];
