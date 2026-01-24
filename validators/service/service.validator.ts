import z from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, { message: "Service name is required" }),

  durationMinutes: z.number().int().min(1, { message: "Duration is required" }),

  requiredStaffType: z.string().min(1, { message: "Staff type is required" }),
});

export const updateServiceSchema = z.object({
  name: z.string().min(1).optional(),

  durationMinutes: z.number().int().min(1).optional(),

  requiredStaffType: z.string().min(1).optional(),
});
