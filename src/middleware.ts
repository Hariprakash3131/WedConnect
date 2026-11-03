import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { ROLE_ROUTES } from "@/constants";
import { UserRole } from "@/types";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Retrieve user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/forgot-password");

  const isCustomerRoute = pathname.startsWith("/customer");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");
  const isSuperAdminRoute = pathname.startsWith("/super-admin");

  const isProtectedRoute = isCustomerRoute || isVendorRoute || isAdminRoute || isSuperAdminRoute;

  // Unauthenticated user attempting to access protected route
  if (!user && isProtectedRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated, check role-based permissions
  if (user) {
    // If authenticated user visits auth pages, redirect to their dashboard
    let userRole: UserRole = "customer";

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role) {
      userRole = profile.role as UserRole;
    }

    const defaultDashboard = ROLE_ROUTES[userRole] || ROLE_ROUTES.customer;

    if (isAuthPage) {
      return NextResponse.redirect(new URL(defaultDashboard, request.url));
    }

    // RBAC: Check route permissions
    if (isCustomerRoute && userRole !== "customer" && userRole !== "admin" && userRole !== "super_admin") {
      return NextResponse.redirect(new URL(defaultDashboard, request.url));
    }

    if (isVendorRoute && userRole !== "vendor" && userRole !== "admin" && userRole !== "super_admin") {
      return NextResponse.redirect(new URL(defaultDashboard, request.url));
    }

    if (isAdminRoute && userRole !== "admin" && userRole !== "super_admin") {
      return NextResponse.redirect(new URL(defaultDashboard, request.url));
    }

    if (isSuperAdminRoute && userRole !== "super_admin") {
      return NextResponse.redirect(new URL(defaultDashboard, request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
