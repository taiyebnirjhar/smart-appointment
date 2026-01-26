import { loginSchema } from "@/validators/auth/auth.validator";
import { z } from "zod";

export const formSchema = loginSchema;

export type FormValues = z.infer<typeof formSchema>;
