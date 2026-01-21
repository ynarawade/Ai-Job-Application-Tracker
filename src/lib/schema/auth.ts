import z from "zod";

export const signInSchema = z.object({
  email: z.email("Enter a valid email"),
});

export const signUpSchema = z.object({
  email: z.email("Enter a valid email"),
});
