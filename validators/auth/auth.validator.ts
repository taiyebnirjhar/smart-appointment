import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  orgName: z.string().min(1, { message: "Organization name is required" }),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
