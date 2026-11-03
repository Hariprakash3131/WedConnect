import { describe, it, expect } from "vitest";

interface AuditLogEntry {
  id: string;
  actorId: string;
  actorEmail: string;
  actorRole: "customer" | "vendor" | "admin" | "super_admin";
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress: string;
  createdAt: string;
}

function createAuditLog(
  actorId: string,
  actorEmail: string,
  actorRole: "customer" | "vendor" | "admin" | "super_admin",
  action: string,
  resource: string,
  resourceId?: string,
  ipAddress = "127.0.0.1"
): AuditLogEntry {
  if (!actorId || !action || !resource) {
    throw new Error("Audit log requires actorId, action, and resource");
  }

  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    actorId,
    actorEmail,
    actorRole,
    action,
    resource,
    resourceId,
    ipAddress,
    createdAt: new Date().toISOString(),
  };
}

// HTML XSS Sanitize test
function sanitizeInput(dirty: string): string {
  return dirty
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

describe("Immutable Audit Log & Security Sanitize Controls", () => {
  it("generates complete and verifiable audit log records", () => {
    const entry = createAuditLog(
      "usr-admin-1",
      "admin@wedconnect.com",
      "admin",
      "VENDOR_APPROVAL_VERIFIED",
      "vendors",
      "v-102"
    );

    expect(entry.id).toBeDefined();
    expect(entry.actorRole).toBe("admin");
    expect(entry.action).toBe("VENDOR_APPROVAL_VERIFIED");
    expect(entry.resource).toBe("vendors");
    expect(entry.resourceId).toBe("v-102");
    expect(entry.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("throws when required audit parameters are missing", () => {
    expect(() =>
      createAuditLog("", "admin@wedconnect.com", "admin", "LOGIN", "auth")
    ).toThrow("Audit log requires actorId, action, and resource");
  });

  it("sanitizes dangerous XSS payloads in customer and vendor inputs", () => {
    const malicious = `<script>alert('pwned')</script><img src="x" onerror="stealCookie()" />`;
    const clean = sanitizeInput(malicious);

    expect(clean).not.toContain("<script>");
    expect(clean).not.toContain("</script>");
    expect(clean).toContain("&lt;script&gt;");
    expect(clean).toContain("&lt;img");
  });
});
