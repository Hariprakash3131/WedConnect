import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ROLE_ROUTES } from "@/constants";
import { UserRole } from "@/types";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (next) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      // Check user role to navigate to appropriate dashboard
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        const role = (profile?.role as UserRole) || "customer";
        const targetRoute = ROLE_ROUTES[role] || ROLE_ROUTES.customer;
        return NextResponse.redirect(`${origin}${targetRoute}`);
      }

      return NextResponse.redirect(`${origin}/`);
    }
  }

  // Return user to an error page or login with an alert
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`);
}

