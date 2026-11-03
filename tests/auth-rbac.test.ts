import { describe, it, expect } from "vitest";

// RBAC Role types and route permissions matrix
type Role = "customer" | "vendor" | "admin" | "super_admin";

interface RoutePolicy {
  path: string;
  allowedRoles: Role[] | "public";
}

const routePolicies: RoutePolicy[] = [
  { path: "/", allowedRoles: "public" },
  { path: "/about", allowedRoles: "public" },
  { path: "/contact", allowedRoles: "public" },
  { path: "/vendors", allowedRoles: "public" },
  { path: "/vendors/v1", allowedRoles: "public" },
  { path: "/auth/login", allowedRoles: "public" },
  { path: "/auth/register", allowedRoles: "public" },
  
  // Customer Routes
  { path: "/customer/dashboard", allowedRoles: ["customer"] },
  { path: "/customer/events", allowedRoles: ["customer"] },
  { path: "/customer/matched-vendors", allowedRoles: ["customer"] },
  { path: "/customer/bookings", allowedRoles: ["customer"] },
  { path: "/checkout/quote-123", allowedRoles: ["customer"] },

  // Vendor Routes
  { path: "/vendor/dashboard", allowedRoles: ["vendor"] },
  { path: "/vendor/services", allowedRoles: ["vendor"] },
  { path: "/vendor/quotations", allowedRoles: ["vendor"] },
  { path: "/vendor/availability", allowedRoles: ["vendor"] },

  // Admin Routes
  { path: "/admin/dashboard", allowedRoles: ["admin", "super_admin"] },
  { path: "/admin/vendor-approval", allowedRoles: ["admin", "super_admin"] },
  { path: "/admin/reports", allowedRoles: ["admin", "super_admin"] },

  // Super Admin Routes (Only super_admin)
  { path: "/super-admin/dashboard", allowedRoles: ["super_admin"] },
  { path: "/super-admin/roles", allowedRoles: ["super_admin"] },
  { path: "/super-admin/security", allowedRoles: ["super_admin"] },
];

function canAccessRoute(path: string, userRole?: Role): boolean {
  // Sort policies by path length descending so specific paths match before root "/"
  const sorted = [...routePolicies].sort((a, b) => b.path.length - a.path.length);
  const matchingPolicy = sorted.find((p) => {
    if (p.path === "/") return path === "/";
    return path.startsWith(p.path);
  });
  if (!matchingPolicy) return false;
  if (matchingPolicy.allowedRoles === "public") return true;
  if (!userRole) return false;
  return matchingPolicy.allowedRoles.includes(userRole);
}

describe("Auth & Role-Based Access Control (RBAC) Matrix", () => {
  it("allows unauthenticated visitors to access public routes", () => {
    expect(canAccessRoute("/")).toBe(true);
    expect(canAccessRoute("/about")).toBe(true);
    expect(canAccessRoute("/vendors")).toBe(true);
    expect(canAccessRoute("/auth/login")).toBe(true);
  });

  it("denies unauthenticated visitors from entering protected portals", () => {
    expect(canAccessRoute("/customer/dashboard")).toBe(false);
    expect(canAccessRoute("/vendor/dashboard")).toBe(false);
    expect(canAccessRoute("/admin/dashboard")).toBe(false);
    expect(canAccessRoute("/super-admin/dashboard")).toBe(false);
  });

  it("authorizes customers only for customer portals and denies vendor/admin access", () => {
    const role: Role = "customer";
    expect(canAccessRoute("/customer/dashboard", role)).toBe(true);
    expect(canAccessRoute("/customer/events", role)).toBe(true);
    expect(canAccessRoute("/checkout/quote-123", role)).toBe(true);

    expect(canAccessRoute("/vendor/dashboard", role)).toBe(false);
    expect(canAccessRoute("/admin/dashboard", role)).toBe(false);
    expect(canAccessRoute("/super-admin/dashboard", role)).toBe(false);
  });

  it("authorizes vendors only for vendor studio and denies customer/admin access", () => {
    const role: Role = "vendor";
    expect(canAccessRoute("/vendor/dashboard", role)).toBe(true);
    expect(canAccessRoute("/vendor/quotations", role)).toBe(true);

    expect(canAccessRoute("/customer/dashboard", role)).toBe(false);
    expect(canAccessRoute("/admin/dashboard", role)).toBe(false);
    expect(canAccessRoute("/super-admin/dashboard", role)).toBe(false);
  });

  it("authorizes admin for admin console, but restricts super-admin root governance", () => {
    const role: Role = "admin";
    expect(canAccessRoute("/admin/dashboard", role)).toBe(true);
    expect(canAccessRoute("/admin/vendor-approval", role)).toBe(true);

    expect(canAccessRoute("/super-admin/dashboard", role)).toBe(false);
    expect(canAccessRoute("/super-admin/roles", role)).toBe(false);
    expect(canAccessRoute("/customer/dashboard", role)).toBe(false);
  });

  it("authorizes super_admin for both standard admin and super-admin root suites", () => {
    const role: Role = "super_admin";
    expect(canAccessRoute("/admin/dashboard", role)).toBe(true);
    expect(canAccessRoute("/admin/vendor-approval", role)).toBe(true);
    expect(canAccessRoute("/super-admin/dashboard", role)).toBe(true);
    expect(canAccessRoute("/super-admin/roles", role)).toBe(true);
    expect(canAccessRoute("/super-admin/security", role)).toBe(true);
  });
});
