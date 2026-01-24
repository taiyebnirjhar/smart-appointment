import { SERVICE_DURATIONS_STR } from "@/constant/service-duration.constant";
import { STAFF_TYPE_VALUES } from "@/constant/staff-types.constant";
import z from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, { message: "Service name is required" }),

  durationMinutes: z
    .enum(SERVICE_DURATIONS_STR, { message: "Invalid service duration" })
    .transform(Number),

  requiredStaffType: z.enum(STAFF_TYPE_VALUES as [string, ...string[]], {
    message: "Invalid staff type",
  }),
});

export const updateServiceSchema = z.object({
  name: z.string().min(1).optional(),

  durationMinutes: z.enum(SERVICE_DURATIONS_STR).transform(Number).optional(),

  requiredStaffType: z
    .enum(STAFF_TYPE_VALUES as [string, ...string[]])
    .optional(),
});
