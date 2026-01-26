import { registerSchema } from "@/validators/auth/auth.validator";
import { z } from "zod";

export const formSchema = registerSchema;

export type FormValues = z.infer<typeof formSchema>;
