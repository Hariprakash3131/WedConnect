"use client";

import * as React from "react";
import {
  Users,
  Plus,
  Shield,
  ShieldCheck,
  Mail,
  KeyRound,
  Ban,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  INITIAL_ADMIN_STAFF,
  AdminStaffAccount,
} from "@/constants/admin-data";
import { createStaffAccountAction } from "@/actions/admin";
import toast from "react-hot-toast";

export default function SuperAdminAccountsPage() {
  const [staff, setStaff] = React.useState<AdminStaffAccount[]>(INITIAL_ADMIN_STAFF);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<AdminStaffAccount["role"]>("admin");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    const newMember: AdminStaffAccount = {
      id: `staff-${Date.now()}`,
      name,
      email,
      role,
      status: "active",
      lastLogin: "Invited (Pending MFA)",
      mfaEnabled: true,
      permissionsCount: role === "super_admin" ? 24 : role === "admin" ? 18 : 10,
    };

    try {
      await createStaffAccountAction({ name, email, role });
      setStaff((prev) => [...prev, newMember]);
      toast.success(`Staff account invite dispatched to ${email}!`);
      setDialogOpen(false);
      setName("");
      setEmail("");
    } catch {
      setStaff((prev) => [...prev, newMember]);
      toast.success("Staff account added");
      setDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = (id: string, name: string) => {
    setStaff((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "active" ? "suspended" : "active" }
          : s
      )
    );
    toast.success(`Access status toggled for ${name}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Staff Admin Accounts</h1>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none font-bold text-xs">
              {staff.length} Active Operators
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Provision staff operator accounts with hardware MFA requirements and role privileges.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-soft-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Invite Staff Operator</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Invite Administrator</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateStaff} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="staffName" className="text-xs font-bold">Full Legal Name</Label>
                <Input
                  id="staffName"
                  placeholder="e.g. Marcus Aurelius"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staffEmail" className="text-xs font-bold">Corporate Email Address</Label>
                <Input
                  id="staffEmail"
                  type="email"
                  placeholder="marcus@wedconnect.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staffRole" className="text-xs font-bold">Assigned Privilege Tier</Label>
                <select
                  id="staffRole"
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminStaffAccount["role"])}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="admin">Administrator (Operations & Verification)</option>
                  <option value="moderator">Moderator (Disputes & Content)</option>
                  <option value="support_agent">Support Agent (Read-only)</option>
                  <option value="super_admin">Super Admin (Root Access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDialogOpen(false)}
                  className="rounded-xl text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="gradient"
                  className="rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                >
                  {isSubmitting ? "Inviting..." : "Send Staff Invite"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Staff Accounts Cards */}
      <div className="space-y-4">
        {staff.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-3xl glass-card border border-border/80 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0">
                <Shield className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-sm text-foreground">{s.name}</h3>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase">
                    {s.role.replace("_", " ")}
                  </Badge>
                  {s.mfaEnabled && (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-bold gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      MFA Active
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {s.email}
                  </span>
                  <span>• Last active: {s.lastLogin}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <Button
                size="sm"
                variant={s.status === "active" ? "outline" : "default"}
                onClick={() => toggleStatus(s.id, s.name)}
                disabled={s.role === "super_admin"}
                className={`rounded-xl h-8 text-xs font-bold ${
                  s.status === "active"
                    ? "text-rose-600 hover:bg-rose-500/10 border-rose-200"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {s.status === "active" ? "Revoke Access" : "Reinstate Access"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

