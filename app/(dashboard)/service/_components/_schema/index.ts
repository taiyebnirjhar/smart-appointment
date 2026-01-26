import { createServiceSchema } from "@/validators/service/service.validator";
import { z } from "zod";

export const formSchema = createServiceSchema;

export type FormValues = z.infer<typeof formSchema>;
