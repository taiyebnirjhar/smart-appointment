import { StaffAvailability } from "@/types/api-response/api-response";

export const STAFF_AVAILABILITY = ["AVAILABLE", "ON_LEAVE"] as const;

export const STAFF_AVAILABILITY_LABEL: Record<StaffAvailability, string> = {
  AVAILABLE: "Available",
  ON_LEAVE: "On Leave",
};
