"use server";

import { headers } from "next/headers";
import { User } from "@supabase/supabase-js";
import { createSupabaseServerClientWithCookies } from "@/utils/supabase/server";
import { ServerResponse } from "@/types/global-type";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/features/auth/schemas/auth-schema";
import { createAdminClient } from "@/utils/supabase/server-admin";

interface TenantRPCResponse {
  staff_id: string;
  role_id: string;
  tenant_id: string;
  service_id: string;
}

const transformFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  return {
    ...rawFormData,
  };
};

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

// Utility function for proper name parsing
const parseFullName = (fullName: string) => {
  const names = fullName.trim().split(/\s+/).filter(Boolean);

  if (names.length < 2) {
    throw new Error("Full name must contain at least first and last name");
  }

  return {
    firstName: names[0],
    middleName: names.slice(1, -1).join(" ") || "",
    lastName: names[names.length - 1],
  };
};

/**
 * Atomic tenant creation using PostgreSQL transaction
 */
const createTenant = async ({
  fullName,
  id,
}: Pick<SignUpSchemaType, "fullName"> & User): Promise<TenantRPCResponse> => {
  try {
    const supabase = await createSupabaseServerClientWithCookies();
    const { firstName, middleName, lastName } = parseFullName(fullName);
    const tenantName = `${firstName}'s Organization`;
    const { error, data } = await supabase
      .rpc("create_tenant_and_related", {
        p_first_name: firstName,
        p_middle_name: middleName,
        p_last_name: lastName,
        p_tenant_name: tenantName,
      })
      .single();
    if (error || !data) {
      throw error || new Error("Failed to create organization");
    }
    return data;
  } catch (error) {
    const supabaseAdmin = await createAdminClient();
    await supabaseAdmin.auth.admin.deleteUser(id);

    if (
      typeof error === "object" &&
      error &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      const message = error.message.includes("Super Admin role")
        ? "System configuration error - please contact support"
        : `Account setup failed: ${error.message}`;

      throw new Error(message);
    }

    throw new Error("Failed to create organization");
  }
};

const signUpWithSupabase = async ({
  email,
  password,
  fullName,
}: SignUpSchemaType) => {
  const supabase = await createSupabaseServerClientWithCookies();
  const origin = (await headers()).get("origin");
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        signup_status: "pending_tenant",
      },
    },
  });

  if (error || !data.user) {
    throw new Error(
      error?.message || "Failed to create authentication account"
    );
  }

  return { data: await createTenant({ fullName, ...data.user }) };
};

export const signUpAction = async (
  formData: FormData
): Promise<ServerResponse<SignUpSchemaType, TenantRPCResponse>> => {
  try {
    const transformedData = transformFormData(formData);
    const validationResult = validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    const { data } = await signUpWithSupabase(validationResult);
    return {
      status: "success",
      data,
      message:
        "Account created successfully. Please check your email to confirm.",
    };
  } catch (error) {

      console.log(error);
      return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.",
    };
  }
};
