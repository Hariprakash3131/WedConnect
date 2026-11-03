"use client";

import * as React from "react";
import {
  KeyRound,
  ShieldCheck,
  Save,
  Check,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_ROLE_PERMISSIONS } from "@/constants/admin-data";
import toast from "react-hot-toast";

type StaffRole = "super_admin" | "admin" | "moderator" | "support_agent";

const ROLE_PRESETS: Record<StaffRole, string[]> = {
  super_admin: [
    "manage_users",
    "approve_vendors",
    "manage_bookings",
    "manage_disputes",
    "manage_taxonomy",
    "view_analytics",
    "manage_staff",
    "security_governance",
  ],
  admin: [
    "manage_users",
    "approve_vendors",
    "manage_bookings",
    "manage_disputes",
    "manage_taxonomy",
    "view_analytics",
  ],
  moderator: [
    "approve_vendors",
    "manage_disputes",
    "manage_taxonomy",
  ],
  support_agent: [
    "manage_users",
    "manage_disputes",
  ],
};

export default function SuperAdminRolesPage() {
  const [selectedRole, setSelectedRole] = React.useState<StaffRole>("admin");
  const [permissions, setPermissions] = React.useState<Record<StaffRole, string[]>>(ROLE_PRESETS);
  const [isSaving, setIsSaving] = React.useState(false);

  const togglePermission = (key: string) => {
    if (selectedRole === "super_admin") {
      toast.error("Super Admin role retains all root permissions by policy");
      return;
    }

    setPermissions((prev) => {
      const currentList = prev[selectedRole];
      const nextList = currentList.includes(key)
        ? currentList.filter((k) => k !== key)
        : [...currentList, key];

      return { ...prev, [selectedRole]: nextList };
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(`Permissions matrix updated for ${selectedRole}`);
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Role & Permission Matrix</h1>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none font-bold text-xs">
              RBAC Governance
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Configure granular access control privileges across administrative staff roles.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          variant="gradient"
          className="rounded-2xl h-11 px-6 text-xs font-bold gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-soft-sm"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Role Matrix"}</span>
        </Button>
      </div>

      {/* Role Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(["super_admin", "admin", "moderator", "support_agent"] as const).map((r) => {
          const isActive = selectedRole === r;
          return (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 capitalize ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-soft-sm shadow-amber-500/25"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.replace("_", " ")}
            </button>
          );
        })}
      </div>

      {/* Permissions Checkbox Grid */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="border-b border-border/60 pb-3 flex items-center justify-between">
          <h2 className="text-base font-bold tracking-tight">
            Configuring Privileges for: <span className="text-amber-600 capitalize">{selectedRole.replace("_", " ")}</span>
          </h2>
          <span className="text-xs text-muted-foreground">
            {permissions[selectedRole].length} of {INITIAL_ROLE_PERMISSIONS.length} privileges granted
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {INITIAL_ROLE_PERMISSIONS.map((perm) => {
            const isGranted = permissions[selectedRole].includes(perm.key);
            return (
              <div
                key={perm.key}
                onClick={() => togglePermission(perm.key)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isGranted
                    ? "bg-amber-500/5 border-amber-500/30"
                    : "bg-card border-border/70 hover:border-border"
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-foreground">{perm.name}</span>
                    <Badge variant="outline" className="font-mono text-[9px]">
                      {perm.key}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{perm.description}</p>
                </div>

                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 transition-colors ${
                    isGranted
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 border-transparent text-white"
                      : "border-border bg-background"
                  }`}
                >
                  {isGranted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

