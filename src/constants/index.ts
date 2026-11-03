export const APP_CONFIG = {
  name: "WedConnect",
  tagline: "Every Event. Every Celebration. One Connection.",
  description:
    "The premier luxury event and wedding connection marketplace. Discover master photographers, exquisite venues, gourmet catering, bespoke decor, and verified wedding professionals in one seamless experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wedconnect.app",
  author: "WedConnect Team",
  keywords: [
    "wedding marketplace",
    "wedding planners",
    "event venues",
    "wedding photographers",
    "bridal makeup",
    "luxury weddings",
    "celebration vendors",
  ],
};

export const BRAND_COLORS = {
  primary: "#2563EB",
  secondary: "#7C3AED",
  accent: "#F59E0B",
  background: "#F8FAFC",
  success: "#22C55E",
  error: "#EF4444",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Vendors", href: "/vendors" },
  { label: "Categories", href: "/categories" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ROLE_ROUTES: Record<string, string> = {
  customer: "/customer/dashboard",
  vendor: "/vendor/dashboard",
  admin: "/admin/dashboard",
  super_admin: "/super-admin/dashboard",
};

