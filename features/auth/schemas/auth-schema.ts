import { basePasswordSchema } from "@/utils/zod-schema";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: basePasswordSchema,
  rememberMe: z.boolean().default(false),
});

export const signUpSchema = signInSchema.omit({ rememberMe: true }).merge(
  z.object({
    fullName: z
      .string()
      .nonempty("Fullname is required")
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .regex(
        /^[A-Za-z'-\s]+$/,
        "First name can Only contain letters, space, apostrophes, and hyphens"
      ),
  })
);

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
