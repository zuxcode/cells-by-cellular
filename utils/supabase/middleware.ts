import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { Database } from "./db-type";
import { logger } from "@/utils/logger";

export const updateSession = async (request: NextRequest) => {
  try {
    // Validate environment configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase environment variables not configured");
    }

    // Clone the request to avoid mutating the original
    let response = NextResponse.next({
      request: {
        headers: new Headers(request.headers),
      },
    });

    // Configure Supabase client with proper cookie handling
    const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            return response.cookies.set(name, value, {
              ...options,
              httpOnly: true,
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            });
          });
        },
      },
    });

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data, error } = await supabase.auth.getUser();

    // Handle authentication redirects
    const isDashboardPath = request.nextUrl.pathname.startsWith("/dashboard");
    const isRootPath = request.nextUrl.pathname === "/";

    // protected routes
    if (isDashboardPath && error) {
      logger("warn", "middleware", "Unauthorized dashboard access attempt");
      return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin));
    }

    if (isRootPath && !error) {
      logger(
        "info",
        "middleware",
        "Redirecting authenticated user to dashboard"
      );
      return NextResponse.redirect(
        new URL("/dashboard", request.nextUrl.origin)
      );
    }

    return response;
  } catch (error) {
    logger("error", "middleware", "Session update failed", error);

    // Return error response in production, generic response otherwise
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Internal Server Error", { status: 500 });
    }

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
