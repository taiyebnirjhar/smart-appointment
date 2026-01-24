import z from "zod";

export const assignFromWaitingQueueSchema = z.object({
  staffId: z.string().min(1, { message: "Staff ID is required" }),
});
