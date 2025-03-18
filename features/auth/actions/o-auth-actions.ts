"use server";

import { ServerResponse } from "@/types/global-type";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Handles OAuth sign-in for a given provider.
 * @param provider - The OAuth provider (e.g., "google", "facebook").
 * @returns A `ServerResponse` object or redirects to the dashboard on success.
 */
async function handleOAuthSignIn(provider: Provider): Promise<ServerResponse> {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  if (!origin) {
    return { status: "error", message: "Origin header is missing" };
  }

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return { status: "error", message: error.message };
    }

    // Redirect to dashboard on success
    redirect("/dashboard");
  } catch (error) {
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }

  // This return statement is necessary to satisfy TypeScript, but it will never be reached
  return { status: "success", message: "Sign-in successful" };
}

/**
 * Handles Google OAuth sign-in.
 * @returns A `ServerResponse` object // "google" | "facebook" or redirects to the dashboard on success.
 */
export async function signinWithGoogle(): Promise<ServerResponse> {
  return handleOAuthSignIn("google");
}

/**
 * Handles Facebook OAuth sign-in.
 * @returns A `ServerResponse` object or redirects to the dashboard on success.
 */
export async function signinWithFacebook(): Promise<ServerResponse> {
  return handleOAuthSignIn("facebook");
}
