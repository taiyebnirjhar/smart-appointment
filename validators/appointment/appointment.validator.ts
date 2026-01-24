import { APPOINTMENT_STATUS } from "@/constant/appointment-status.constant";
import z from "zod";

export const createAppointmentSchema = z.object({
  customerName: z.string().min(1, { message: "Customer name is required" }),

  serviceId: z.string().min(1, { message: "Service is required" }),

  staffId: z.string().nullable().optional(),

  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time",
  }),

  status: z.enum(APPOINTMENT_STATUS).optional(),
});

export const updateAppointmentSchema = z.object({
  customerName: z.string().min(1).optional(),
  serviceId: z.string().min(1).optional(),
  staffId: z.string().nullable().optional(),
  startTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid start time" })
    .optional(),
  status: z.enum(APPOINTMENT_STATUS).optional(),
});
