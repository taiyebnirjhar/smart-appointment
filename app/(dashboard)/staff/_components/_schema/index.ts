import { createStaffSchema } from "@/validators/staff/staff.validator";
import { z } from "zod";

export const formSchema = createStaffSchema;

export type FormValues = z.infer<typeof formSchema>;
