"use server";

import { createClient } from "@/lib/supabase/server";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  LoginInput,
  RegisterInput,
} from "@/schemas/auth";
import { ROLE_ROUTES } from "@/constants";
import { slugify } from "@/lib/utils";
import { UserRole } from "@/types";

export interface AuthActionResult {
  success: boolean;
  error?: string;
  message?: string;
  redirectUrl?: string;
  requiresVerification?: boolean;
}

export async function loginAction(input: LoginInput): Promise<AuthActionResult> {
  try {
    const validated = loginSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0]?.message || "Invalid input data",
      };
    }

    const { email, password } = validated.data;
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return {
        success: false,
        error: authError?.message || "Invalid email or password",
      };
    }

    // Retrieve user role from profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, status, full_name")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile) {
      // Default to customer if profile sync is pending
      return {
        success: true,
        redirectUrl: ROLE_ROUTES.customer,
      };
    }

    if (profile.status === "suspended") {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Your account has been suspended. Please contact support.",
      };
    }

    const role = (profile.role as UserRole) || "customer";
    const redirectUrl = ROLE_ROUTES[role] || ROLE_ROUTES.customer;

    return {
      success: true,
      redirectUrl,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred during login",
    };
  }
}

export async function registerAction(input: RegisterInput): Promise<AuthActionResult> {
  try {
    const validated = registerSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0]?.message || "Invalid registration data",
      };
    }

    const { fullName, email, password, role, businessName } = validated.data;
    const supabase = await createClient();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    });

    if (authError || !authData.user) {
      return {
        success: false,
        error: authError?.message || "Failed to create account",
      };
    }

    // If user is a vendor, initialize the vendor_profiles row
    if (role === "vendor" && businessName) {
      const vendorSlug = `${slugify(businessName)}-${Math.random().toString(36).substring(2, 7)}`;
      
      const { error: vendorProfileError } = await supabase.from("vendor_profiles").insert({
        user_id: authData.user.id,
        business_name: businessName,
        slug: vendorSlug,
        city: "New York", // Default city placeholder, updated on onboarding
        country: "US",
        verification_status: "pending",
      });

      if (vendorProfileError) {
        console.error("Vendor profile initialization error:", vendorProfileError);
      }
    }

    // Check if email confirmation is required by Supabase settings
    const requiresVerification = authData.session === null;

    if (requiresVerification) {
      return {
        success: true,
        requiresVerification: true,
        message: "Registration successful! Please check your email to verify your account.",
        redirectUrl: `/auth/verify-email?email=${encodeURIComponent(email)}`,
      };
    }

    const redirectUrl = ROLE_ROUTES[role] || ROLE_ROUTES.customer;
    return {
      success: true,
      requiresVerification: false,
      redirectUrl,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred during registration",
    };
  }
}

export async function forgotPasswordAction(email: string): Promise<AuthActionResult> {
  try {
    const validated = forgotPasswordSchema.safeParse({ email });
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0]?.message || "Invalid email address",
      };
    }

    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const { error } = await supabase.auth.resetPasswordForEmail(validated.data.email, {
      redirectTo: `${siteUrl}/auth/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: "If an account exists with this email, a password reset link has been dispatched.",
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to initiate password reset",
    };
  }
}

export async function resetPasswordAction(password: string): Promise<AuthActionResult> {
  try {
    const validated = resetPasswordSchema.safeParse({
      password,
      confirmPassword: password,
    });
    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0]?.message || "Password criteria not met",
      };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: validated.data.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Your password has been successfully updated. You may now log in.",
      redirectUrl: "/auth/login",
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update password",
    };
  }
}

export async function getGoogleOAuthUrl(redirectTo?: string): Promise<{ url: string | null; error?: string }> {
  try {
    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const callbackUrl = `${siteUrl}/auth/callback${redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ""}`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { url: null, error: error.message };
    }

    return { url: data.url };
  } catch (err: unknown) {
    return {
      url: null,
      error: err instanceof Error ? err.message : "Failed to generate Google OAuth URL",
    };
  }
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

