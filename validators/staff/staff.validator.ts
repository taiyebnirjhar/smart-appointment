import { STAFF_AVAILABILITY } from "@/constant/staff-availability.constant";
import z from "zod";

export const createStaffSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),

  staffType: z.string().min(1, { message: "Staff type is required" }),

  dailyCapacity: z
    .number()
    .int()
    .min(1, { message: "Daily capacity must be at least 1" }),

  availabilityStatus: z.enum(STAFF_AVAILABILITY, {
    message: "Availability status is required",
  }),
});

export const updateStaffSchema = z.object({
  name: z.string().min(1).optional(),
  staffType: z.string().min(1).optional(),
  dailyCapacity: z.number().int().min(1).optional(),
  availabilityStatus: z.enum(STAFF_AVAILABILITY).optional(),
});
