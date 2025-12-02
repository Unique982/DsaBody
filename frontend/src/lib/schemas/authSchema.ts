import { z } from "zod";

export const loginSchame = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(18, "Password must be at most 18 characters"),
});

export const registerSchame = z
  .object({
    email: z.string().email("Invalid email address"),
    firstname: z.string().min(1, "First name must be at leat 6 characters"),
    lastname: z.string().min(1, "Last name is requred"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(18, "Password must be at most 18 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type loginSchameType = z.infer<typeof loginSchame>;
export type registerSchameType = z.infer<typeof registerSchame>;
