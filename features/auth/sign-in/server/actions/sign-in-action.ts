"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  signInSchema,
  SignInSchemaType,
} from "@/features/auth/schemas/auth-schema";
import { z } from "zod";
// import { logger } from "@/utils/logger"; // Assuming a logger utility exists

// Define a more robust response type
type SignInResponse = {
  status: "success" | "error";
  message: string;
  fieldErrors?: z.typeToFlattenedError<SignInSchemaType>["fieldErrors"];
};

/**
 * Transforms raw form data into a structured object with proper types.
 */
const transformFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  return {
    ...rawFormData,
    rememberMe: rawFormData.rememberMe === "true", // Explicit boolean conversion
  };
};

/**
 * Validates form data against the sign-in schema.
 */
const validateFormData = (data: unknown) => {
  const result = signInSchema.safeParse(data);
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
 * Handles the sign-in process with Supabase.
 */
const signInWithSupabase = async (email: string, password: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // logger.error("Supabase sign-in error:", error.message); // Structured logging
    throw new Error(error.message);
  }
};

/**
 * Server action for handling user sign-in.
 */
export const signInAction = async (
  formData: FormData
): Promise<SignInResponse> => {
  try {
    // Transform and validate form data
    const transformedData = transformFormData(formData);
    const validationResult = validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    // Attempt sign-in with Supabase
    await signInWithSupabase(validationResult.email, validationResult.password);

    // Redirect on successful sign-in
    redirect("/dashboard");
  } catch (error) {
    console.log("error: ", error);
    // logger.error("Sign-in error:", error); // Structured logging

    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.",
    };
  }
};
