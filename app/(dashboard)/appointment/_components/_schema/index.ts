import { createAppointmentSchema } from "@/validators/appointment/appointment.validator";
import { z } from "zod";

export const formSchema = createAppointmentSchema;

export type FormValues = z.infer<typeof formSchema>;
