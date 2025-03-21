import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/utils/supabase/db-type";

/**
 * Creates a Supabase server client with cookie-based authentication
 * Handles Next.js server component cookie management
 */
export const createSupabaseServerClientWithCookies = async (): Promise<
  ReturnType<typeof createServerClient<Database>>
> => {
  const cookieStore = await cookies();

  // TODO: Add proper environment variable validation
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      /**
       * Retrieves all cookies from the request
       */
      getAll: () => cookieStore.getAll(),

      /**
       * Sets cookies in the response headers
       * Handles server component cookie setting limitations
       */
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...options });
          });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
          if (process.env.NODE_ENV === "development") {
            console.debug(
              "[Supabase Middleware] Cookie set error - Expected in Server Components:",
              error
            );
          }
        }
      },
    },
  });
};
