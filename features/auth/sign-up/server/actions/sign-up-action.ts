"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/features/auth/schemas/auth-schema";
import { z } from "zod";
// import { logger } from "@/utils/logger";

// Define a more robust response type
type SignUpResponse = {
  status: "success" | "error";
  message: string;
  fieldErrors?: z.typeToFlattenedError<SignUpSchemaType>["fieldErrors"];
};

/**
 * Transforms raw form data into a structured object with proper types.
 */
const transformFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  return {
    ...rawFormData,
  };
};

/**
 * Validates form data against the sign-up schema.
 */
const validateFormData = (data: unknown) => {
  const result = signUpSchema.safeParse(data);
  if (!result.success) {
    return {
      status: "error" as const,
      message: "Validation failed. Please check your inputs.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  return result.data;
};

/**
 * Handles the sign-up process with Supabase.
 */
const signUpWithSupabase = async (email: string, password: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    // logger.error("Supabase sign-up error:", error.message); // Structured logging
    throw new Error(error.message);
  }
};

/**
 * Server action for handling user sign-up.
 */
export const signUpAction = async (
  formData: FormData
): Promise<SignUpResponse> => {
  try {
    // Transform and validate form data
    const transformedData = transformFormData(formData);
    const validationResult = validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    // Attempt sign-up with Supabase
    await signUpWithSupabase(validationResult.email, validationResult.password);

    // Redirect on successful sign-up
    redirect("/dashboard");
  } catch (error) {
    // logger.error("Sign-up error:", error); // Structured logging

    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.",
    };
  }
};
