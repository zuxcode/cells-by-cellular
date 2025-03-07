"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/features/auth/schemas/auth-schema";
import { z } from "zod";
import { headers } from "next/headers";
import { c, S } from "framer-motion/dist/types.d-6pKw1mTI";
import { User } from "@supabase/supabase-js";
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
 * Handles the tenant creation process with Supabase.
 */
const createUserExtensionWithSupabase = async ({
  fullName,
  id,
}: Pick<SignUpSchemaType, "fullName"> & User) => {
  const supabase = await createClient();
  const [firstName, lastName] = fullName.split(" ");
  const { error } = await supabase.from("users").insert([
    {
      first_name: firstName,
      last_name: lastName,
      user_id: id,
    },
  ]);

  if (error) {
    console.log("error: ", error);
    // logger.error("Supabase sign-up error:", error.message); // Structured logging
    throw new Error(error.message);
  }
};

/**
 * Handles the sign-up process with Supabase.
 */
const signUpWithSupabase = async ({
  email,
  password,
  fullName,
}: SignUpSchemaType) => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const { error, data } = await supabase.auth.signUp({
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

  if (!data.user) {
    throw new Error("No user record found");
  }

  createUserExtensionWithSupabase({
    fullName,
    ...data.user,
  });
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
    await signUpWithSupabase(validationResult);
    return {
      status: "success",
      message: "Sign up successful",
    };
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
  // Redirect on successful sign-up
  // redirect("/dashboard");
};
