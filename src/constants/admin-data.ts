export interface PlatformKPIs {
  totalGmv: number;
  gmvGrowth: number;
  activeCouples: number;
  activeVendors: number;
  pendingApprovals: number;
  platformRevenue: number;
  totalBookings: number;
  avgOrderValue: number;
}

export interface AdminVendorApprovalItem {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  yearsOfExperience: number;
  startingPrice: number;
  taxId: string;
  licenseNumber: string;
  portfolioCount: number;
  appliedDate: string;
  status: "pending" | "verified" | "rejected";
  documents: Array<{ title: string; type: string; url: string }>;
}

export interface AdminCustomerItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  city: string;
  eventsCount: number;
  totalSpend: number;
  status: "active" | "suspended";
  joinedDate: string;
  lastActive: string;
}

export interface AdminReportItem {
  id: string;
  reporterName: string;
  reporterRole: "customer" | "vendor";
  reportedEntityName: string;
  entityType: "vendor" | "customer" | "review" | "booking";
  reason: string;
  details: string;
  createdAt: string;
  status: "open" | "under_review" | "resolved" | "dismissed";
  resolution?: string;
}

export interface AdminAuditLogItem {
  id: string;
  actorName: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface AdminStaffAccount {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "moderator" | "support_agent";
  status: "active" | "suspended";
  lastLogin: string;
  mfaEnabled: boolean;
  permissionsCount: number;
}

export interface AdminSecurityEvent {
  id: string;
  eventType: "mfa_challenge" | "suspicious_ip" | "rate_limit_exceeded" | "failed_login_burst" | "rls_policy_check";
  severity: "low" | "medium" | "high" | "critical";
  sourceIp: string;
  location: string;
  description: string;
  timestamp: string;
  status: "blocked" | "investigating" | "resolved";
}

export const INITIAL_PLATFORM_KPIS: PlatformKPIs = {
  totalGmv: 1420800,
  gmvGrowth: 28.4,
  activeCouples: 1840,
  activeVendors: 320,
  pendingApprovals: 8,
  platformRevenue: 142080, // 10% take-rate
  totalBookings: 248,
  avgOrderValue: 5728,
};

export const INITIAL_PENDING_VENDORS: AdminVendorApprovalItem[] = [
  {
    id: "v-app-1",
    businessName: "Lumière Grand Orchestra",
    ownerName: "Antoine Moreau",
    email: "antoine@lumiereorchestra.com",
    phone: "+1 (555) 234-9812",
    category: "Music & Live Bands",
    city: "New York, NY",
    yearsOfExperience: 14,
    startingPrice: 5500,
    taxId: "XX-XXX4910",
    licenseNumber: "NY-ENT-2026-881",
    portfolioCount: 12,
    appliedDate: "Today, 9:20 AM",
    status: "pending",
    documents: [
      { title: "Certificate of Liability Insurance", type: "PDF", url: "#" },
      { title: "Manhattan Business Entity Registration", type: "PDF", url: "#" },
      { title: "Orchestra Roster & Performance Reel", type: "MP4/Link", url: "#" },
    ],
  },
  {
    id: "v-app-2",
    businessName: "Palazzo Bella Vista Floral",
    ownerName: "Giulia Rossi",
    email: "giulia@bellavistafloral.com",
    phone: "+1 (555) 432-8765",
    category: "Floral & Decor Design",
    city: "Los Angeles, CA",
    yearsOfExperience: 8,
    startingPrice: 4200,
    taxId: "XX-XXX7219",
    licenseNumber: "CA-CORP-2024-912",
    portfolioCount: 24,
    appliedDate: "Yesterday, 4:15 PM",
    status: "pending",
    documents: [
      { title: "Commercial General Liability", type: "PDF", url: "#" },
      { title: "California Resale Floral Certificate", type: "PDF", url: "#" },
    ],
  },
  {
    id: "v-app-3",
    businessName: "Bel Air Haute Cuisine Catering",
    ownerName: "Chef Henri Laurent",
    email: "henri@belairhaute.com",
    phone: "+1 (555) 876-1234",
    category: "Catering & Private Chefs",
    city: "Beverly Hills, CA",
    yearsOfExperience: 20,
    startingPrice: 12000,
    taxId: "XX-XXX3388",
    licenseNumber: "LA-FOOD-HEALTH-A99",
    portfolioCount: 18,
    appliedDate: "Oct 28, 2026",
    status: "pending",
    documents: [
      { title: "Grade A Health Department Permit", type: "PDF", url: "#" },
      { title: "ServSafe Master Executive Certification", type: "PDF", url: "#" },
    ],
  },
];

export const INITIAL_ADMIN_CUSTOMERS: AdminCustomerItem[] = [
  {
    id: "cust-1",
    fullName: "Audrey Hepburn",
    email: "audrey@example.com",
    phone: "+1 (555) 234-5678",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    city: "New York, NY",
    eventsCount: 1,
    totalSpend: 10669.75,
    status: "active",
    joinedDate: "Sep 12, 2026",
    lastActive: "10 mins ago",
  },
  {
    id: "cust-2",
    fullName: "Sophia Van Der Bilt",
    email: "sophia@example.com",
    phone: "+1 (555) 345-6789",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    city: "Huntington, NY",
    eventsCount: 2,
    totalSpend: 17746.63,
    status: "active",
    joinedDate: "Aug 04, 2026",
    lastActive: "Yesterday",
  },
  {
    id: "cust-3",
    fullName: "Elena Rostova",
    email: "elena@example.com",
    phone: "+1 (555) 456-7890",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    city: "New York, NY",
    eventsCount: 1,
    totalSpend: 7076.88,
    status: "active",
    joinedDate: "Oct 01, 2026",
    lastActive: "2 hours ago",
  },
  {
    id: "cust-4",
    fullName: "Julian & Clara Thorne",
    email: "julian@example.com",
    phone: "+1 (555) 567-8901",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    city: "Greenwich, CT",
    eventsCount: 1,
    totalSpend: 4500.00,
    status: "active",
    joinedDate: "Oct 15, 2026",
    lastActive: "3 days ago",
  },
];

export const INITIAL_ADMIN_REPORTS: AdminReportItem[] = [
  {
    id: "rep-101",
    reporterName: "Charlotte Montgomery",
    reporterRole: "customer",
    reportedEntityName: "Grand Vista Ballroom",
    entityType: "vendor",
    reason: "Discrepancy in overtime venue fee rate",
    details: "The vendor quoted $450/hr overtime in chat but billed $750/hr on invoice.",
    createdAt: "Yesterday, 2:30 PM",
    status: "under_review",
  },
  {
    id: "rep-102",
    reporterName: "Aura Cinematic Stories",
    reporterRole: "vendor",
    reportedEntityName: "Review by Anonymous Guest",
    entityType: "review",
    reason: "Review submitted by non-contracted third-party attendee",
    details: "The review contains defamatory allegations from someone who was not the contracting bride or groom.",
    createdAt: "3 days ago",
    status: "open",
  },
];

export const INITIAL_ADMIN_AUDIT_LOGS: AdminAuditLogItem[] = [
  {
    id: "aud-001",
    actorName: "Alexander Vance",
    actorEmail: "admin@wedconnect.app",
    actorRole: "super_admin",
    action: "VENDOR_VERIFICATION_APPROVED",
    entityType: "vendor_profile",
    entityId: "v2-aura-cinema",
    details: "Approved verification badge and KYC license for Aura Cinematic Stories.",
    ipAddress: "192.0.2.45",
    timestamp: "2026-11-03 10:14:02",
  },
  {
    id: "aud-002",
    actorName: "Sarah Jenkins",
    actorEmail: "sarah.j@wedconnect.app",
    actorRole: "moderator",
    action: "CATEGORY_UPDATED",
    entityType: "category",
    entityId: "cat-floral-01",
    details: "Updated display order and SEO metadata for Haute Floral & Decor.",
    ipAddress: "192.0.2.110",
    timestamp: "2026-11-03 09:30:15",
  },
  {
    id: "aud-003",
    actorName: "Alexander Vance",
    actorEmail: "admin@wedconnect.app",
    actorRole: "super_admin",
    action: "SECURITY_SETTING_MODIFIED",
    entityType: "platform_settings",
    entityId: "sec-rate-limit",
    details: "Updated API rate limits for /api/vendors/search to 120 req/min.",
    ipAddress: "192.0.2.45",
    timestamp: "2026-11-02 18:22:50",
  },
];

export const INITIAL_ADMIN_STAFF: AdminStaffAccount[] = [
  {
    id: "staff-1",
    name: "Alexander Vance",
    email: "alexander@wedconnect.app",
    role: "super_admin",
    status: "active",
    lastLogin: "Active now",
    mfaEnabled: true,
    permissionsCount: 24,
  },
  {
    id: "staff-2",
    name: "Elena Rostova",
    email: "elena.ops@wedconnect.app",
    role: "admin",
    status: "active",
    lastLogin: "45 mins ago",
    mfaEnabled: true,
    permissionsCount: 18,
  },
  {
    id: "staff-3",
    name: "Sarah Jenkins",
    email: "sarah.j@wedconnect.app",
    role: "moderator",
    status: "active",
    lastLogin: "3 hours ago",
    mfaEnabled: true,
    permissionsCount: 10,
  },
];

export const INITIAL_SECURITY_EVENTS: AdminSecurityEvent[] = [
  {
    id: "sec-ev-1",
    eventType: "rate_limit_exceeded",
    severity: "medium",
    sourceIp: "198.51.100.82",
    location: "Frankfurt, Germany",
    description: "420 requests in 60s against /api/vendors search endpoint. Blocked by edge shield.",
    timestamp: "12 mins ago",
    status: "blocked",
  },
  {
    id: "sec-ev-2",
    eventType: "failed_login_burst",
    severity: "high",
    sourceIp: "203.0.113.195",
    location: "Unknown / Proxy",
    description: "8 failed password attempts on staff admin login within 30s. IP temporarily banned.",
    timestamp: "1 hour ago",
    status: "blocked",
  },
  {
    id: "sec-ev-3",
    eventType: "rls_policy_check",
    severity: "low",
    sourceIp: "Internal System",
    location: "Supabase US-East",
    description: "Automated scan of all 18 PostgreSQL tables verified 100% RLS enforcement.",
    timestamp: "3 hours ago",
    status: "resolved",
  },
];

export const INITIAL_PLATFORM_SETTINGS = {
  platformCommissionRate: 10.0, // 10%
  featuredListingMonthlyFee: 299.0, // $299/mo
  minimumPayoutThreshold: 100.0, // $100
  customerDepositPercent: 50.0, // 50%
  enableInstantBooking: false,
  enableSmsNotifications: true,
  requireVendorInsuranceDoc: true,
  autoApproveVerifiedReviews: true,
};

export const INITIAL_ROLE_PERMISSIONS = [
  { key: "manage_users", name: "Manage Customers & Profiles", description: "View, edit, or suspend customer accounts" },
  { key: "approve_vendors", name: "Approve & Reject Vendors", description: "Verify licenses, approve applications" },
  { key: "manage_bookings", name: "Manage Global Transactions", description: "Review and mediate booking contracts" },
  { key: "manage_disputes", name: "Resolve Disputes & Reports", description: "Access customer disputes and issue determinations" },
  { key: "manage_taxonomy", name: "Categories & Event Types", description: "Edit platform taxonomies and navigation" },
  { key: "view_analytics", name: "Access Executive BI & Revenue", description: "View GMV, commissions, and growth charts" },
  { key: "manage_staff", name: "Admin Accounts & RBAC", description: "Super Admin only: Create admin accounts" },
  { key: "security_governance", name: "Security & Firewall Control", description: "Super Admin only: System logs and RLS policies" },
];

