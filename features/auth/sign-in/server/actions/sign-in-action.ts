"use server";

import { createSupabaseServerClientWithCookies } from "@/utils/supabase/server";
import {
  signInSchema,
  SignInSchemaType,
} from "@/features/auth/schemas/auth-schema";
import { ServerResponse } from "@/types/global-type";
import { Database } from "@/utils/supabase/db-type";
type TenantRPCResponse = Database["public"]["Functions"]["get_tenant_and_related"]['Returns'];

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

const getTenantAndRelatedData = async () => {
  const supabase = await createSupabaseServerClientWithCookies();
  try {
    const { data, error } = await supabase.rpc("get_tenant_and_related");

    if (error || !data) {
      throw error || new Error("No organization found");
    }
    return data;
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      throw new Error(error.message);
    }

    throw new Error("Failed to get organization");
  }
};

const signInWithSupabase = async (email: string, password: string) => {
  const supabase = await createSupabaseServerClientWithCookies();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error?.message || "Sign in failed");
  }

  return { data: await getTenantAndRelatedData() };
};

/**
 * Server action for handling user sign-in.
 */
export const signInAction = async (
  formData: FormData
): Promise<ServerResponse<SignInSchemaType, TenantRPCResponse>> => {
  try {
    const transformedData = transformFormData(formData);
    const validationResult = validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    const { data } = await signInWithSupabase(
      validationResult.email,
      validationResult.password
    );

    return {
      status: "success",
      message: "Signed in successfully",
      data,
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
