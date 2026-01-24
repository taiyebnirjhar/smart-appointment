import { AppointmentStatus } from "@/types/api-response/api-response";

export const APPOINTMENT_STATUS = [
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
] as const;

export const APPOINTMENT_STATUS_LABEL: Record<AppointmentStatus, string> = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No-Show",
};
