"use server";

import { headers } from "next/headers";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { SeverResponse } from "@/types/global-type";
import {
  SignUpSchemaType,
  signUpSchema,
} from "@/features/auth/schemas/auth-schema";
import { createAdminClient } from "@/utils/supabase/server-admin";

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

/**
 * Atomic tenant creation using PostgreSQL transaction
 */
const createTenant = async ({
  fullName,
  id,
}: Pick<SignUpSchemaType, "fullName"> & User) => {
  const supabase = await createClient();
  const [firstName] = fullName.split(" ");
  const tenantName = `${firstName}'s Organization`;

  const { error } = await supabase.rpc("create_tenant_and_related", {
    p_user_id: id,
    p_first_name: firstName,
    p_last_name: fullName.split(" ").slice(1).join(" ") || "", // Handle multi-word last names
    p_tenant_name: tenantName,
  });

  if (error) {
    const supabaseAdmin = await createAdminClient();
    await supabaseAdmin.auth.admin.deleteUser(id);
    throw new Error("Failed to create account and related data");
  }
};

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

  if (error || !data.user) {
    throw new Error("Failed to create account");
  }

  // Ensure we await the tenant creation
  await createTenant({ fullName, ...data.user });
};

export const signUpAction = async (
  formData: FormData
): Promise<SeverResponse<SignUpSchemaType>> => {
  try {
    const transformedData = transformFormData(formData);
    const validationResult = validateFormData(transformedData);

    if ("fieldErrors" in validationResult) {
      return validationResult;
    }

    await signUpWithSupabase(validationResult);
    return {
      status: "success",
      message: "Account created successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.",
    };
  }
};
