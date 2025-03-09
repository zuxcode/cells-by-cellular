"use server";

import { createClient } from "@/utils/supabase/server";
import {
  signInSchema,
  SignInSchemaType,
} from "@/features/auth/schemas/auth-schema";
import { ServerResponse } from "@/types/global-type";

const transformFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  return {
    ...rawFormData,
    rememberMe: rawFormData.rememberMe === "true",
  };
};

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

const signInWithSupabase = async (email: string, password: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error?.message || "Sign in failed");
  }
};

/**
 * Server action for handling user sign-in.
 */
export const signInAction = async (
  formData: FormData
): Promise<ServerResponse<SignInSchemaType>> => {
  try {
    const transformedData = transformFormData(formData);
    const validationResult = validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    await signInWithSupabase(validationResult.email, validationResult.password);

    return {
      status: "success",
      message: "Signed in successfully",
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.",
    };
  }
};
