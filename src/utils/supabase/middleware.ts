import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If environment variables are missing (e.g., just deployed to Vercel without setting them),
  // simply return the response without crashing the entire application.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // refreshing the auth token
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If user is not authenticated and trying to access an /admin route
    // (excluding /admin/login and /admin/reset-password), redirect to login
    if (
      !user &&
      request.nextUrl.pathname.startsWith("/admin") &&
      !request.nextUrl.pathname.startsWith("/admin/login") &&
      !request.nextUrl.pathname.startsWith("/admin/reset-password")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    // If user is authenticated and trying to access /admin/login, redirect to /admin
    if (
      user &&
      request.nextUrl.pathname.startsWith("/admin/login")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    // If Supabase client fails to initialize, just proceed so the public site works.
    console.error("Supabase middleware error:", error);
  }

  return supabaseResponse;
}
