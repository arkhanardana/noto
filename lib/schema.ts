import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(2, { message: "Email must be at least 2 characters long" })
    .max(50, { message: "Email must not exceed 50 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must not exceed 50 characters" }),
});

export const signUpSchema = signInSchema.extend({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),
});
