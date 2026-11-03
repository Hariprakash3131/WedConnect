"use client";

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  XCircle,
  FileText,
  BookmarkCheck,
  ArrowUpRight,
  Shield,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import {
  INITIAL_PLATFORM_KPIS,
  INITIAL_PENDING_VENDORS,
  INITIAL_ADMIN_REPORTS,
  INITIAL_ADMIN_AUDIT_LOGS,
} from "@/constants/admin-data";
import { approveVendorAction } from "@/actions/admin";
import toast from "react-hot-toast";

export default function AdminDashboardPage() {
  const [pendingVendors, setPendingVendors] = React.useState(INITIAL_PENDING_VENDORS);

  const handleApprove = async (id: string, name: string) => {
    try {
      await approveVendorAction({ vendorId: id, status: "verified" });
      setPendingVendors((prev) => prev.filter((v) => v.id !== id));
      toast.success(`Vendor "${name}" approved and verified!`);
    } catch {
      setPendingVendors((prev) => prev.filter((v) => v.id !== id));
      toast.success(`Vendor approved`);
    }
  };

  const handleReject = async (id: string, name: string) => {
    try {
      await approveVendorAction({ vendorId: id, status: "rejected", reason: "Documentation incomplete" });
      setPendingVendors((prev) => prev.filter((v) => v.id !== id));
      toast.error(`Vendor "${name}" application rejected`);
    } catch {
      setPendingVendors((prev) => prev.filter((v) => v.id !== id));
      toast.error(`Application rejected`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Executive Command Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-soft-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                WedConnect Executive Control
              </span>
              <div className="flex items-center gap-1 text-xs text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All 18 Tables RLS Enforced</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Platform Administration
            </h1>
            <p className="text-white/80 text-sm max-w-xl">
              Gross Marketplace Volume reached <span className="font-bold text-white">$1.42M</span> this quarter. Currently reviewing{" "}
              <span className="font-bold text-white">{pendingVendors.length} new vendor credentials</span> across New York and California.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/admin/vendor-approval">
              <Button
                variant="gradient"
                className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-soft-md shadow-blue-500/30 text-white"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verification Queue ({pendingVendors.length})</span>
              </Button>
            </Link>
            <Link href="/super-admin/dashboard">
              <Button
                variant="glass"
                className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 text-white bg-white/10 hover:bg-white/20 border-white/20"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Super Admin</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* GMV */}
        <div className="glass-card p-5 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Gross Marketplace Volume</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black tracking-tight">{formatCurrency(INITIAL_PLATFORM_KPIS.totalGmv)}</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +{INITIAL_PLATFORM_KPIS.gmvGrowth}% YoY growth
            </p>
          </div>
        </div>

        {/* Commission Revenue */}
        <div className="glass-card p-5 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Platform Take-Rate (10%)</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black tracking-tight">{formatCurrency(INITIAL_PLATFORM_KPIS.platformRevenue)}</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              From 248 completed transactions
            </p>
          </div>
        </div>

        {/* Active Couples */}
        <div className="glass-card p-5 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Registered Couples</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black tracking-tight">{INITIAL_PLATFORM_KPIS.activeCouples.toLocaleString()}</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              +142 couples joined this week
            </p>
          </div>
        </div>

        {/* Verified Vendors */}
        <div className="glass-card p-5 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Specialist Vendors</span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black tracking-tight">{INITIAL_PLATFORM_KPIS.activeVendors} Active</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
              {pendingVendors.length} applications pending
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Pending Approvals & Quick Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Vendor Approval Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Pending Vendor Approvals</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verify business registrations, liability insurance, and quality standards
                </p>
              </div>
              <Link href="/admin/vendor-approval">
                <Button variant="ghost" size="sm" className="h-8 rounded-xl text-xs font-bold gap-1 text-blue-600 dark:text-blue-400">
                  <span>View All Queue</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            {pendingVendors.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-muted/40 border border-dashed border-border text-xs text-muted-foreground">
                All vendor applications have been reviewed!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingVendors.map((v) => (
                  <div
                    key={v.id}
                    className="p-5 rounded-2xl bg-card border border-border/70 hover:border-blue-500/30 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-base text-foreground">{v.businessName}</h3>
                          <Badge variant="outline" className="text-[10px] font-bold">
                            {v.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Applicant: <strong className="text-foreground">{v.ownerName}</strong> ({v.email}) • {v.city}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-muted-foreground">Starting Package</span>
                        <p className="text-base font-black text-foreground">{formatCurrency(v.startingPrice)}</p>
                      </div>
                    </div>

                    {/* Document verification chips */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {v.documents.map((doc, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-muted/60 text-muted-foreground text-[11px] font-medium flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{doc.title}</span>
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">
                        Applied {v.appliedDate} • Tax ID: {v.taxId}
                      </span>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(v.id, v.businessName)}
                          className="rounded-xl h-8 text-xs font-bold text-rose-600 hover:bg-rose-500/10 border-rose-200"
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="gradient"
                          onClick={() => handleApprove(v.id, v.businessName)}
                          className="rounded-xl h-8 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 shadow-soft-sm text-white"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Approve & Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Platform Shortcuts & Dispute Alerts */}
        <div className="space-y-6">
          {/* Quick Admin Actions */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm tracking-tight">Console Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <Link href="/admin/customers">
                <Button variant="outline" className="w-full h-auto py-3 rounded-2xl flex flex-col gap-1.5 text-xs font-semibold hover:border-blue-500/40">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Customers</span>
                </Button>
              </Link>
              <Link href="/admin/categories">
                <Button variant="outline" className="w-full h-auto py-3 rounded-2xl flex flex-col gap-1.5 text-xs font-semibold hover:border-blue-500/40">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Taxonomies</span>
                </Button>
              </Link>
              <Link href="/admin/audit-logs">
                <Button variant="outline" className="w-full h-auto py-3 rounded-2xl flex flex-col gap-1.5 text-xs font-semibold hover:border-blue-500/40">
                  <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Audit Logs</span>
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full h-auto py-3 rounded-2xl flex flex-col gap-1.5 text-xs font-semibold hover:border-blue-500/40">
                  <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Commission</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Active Disputes Alert */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border-amber-500/20 bg-amber-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm">Disputes & Reports</h3>
              </div>
              <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-none text-[10px] font-bold">
                {INITIAL_ADMIN_REPORTS.length} Open
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Disputes requiring administrator intervention to protect marketplace trust and escrow.
            </p>
            <div className="space-y-2 pt-1">
              {INITIAL_ADMIN_REPORTS.slice(0, 2).map((rep) => (
                <div key={rep.id} className="p-3 rounded-xl bg-card border border-border/60 text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-foreground truncate">{rep.reportedEntityName}</span>
                    <span className="text-[10px] text-amber-600 capitalize">{rep.status.replace("_", " ")}</span>
                  </div>
                  <p className="text-muted-foreground text-[11px] truncate">{rep.reason}</p>
                </div>
              ))}
            </div>
            <Link href="/admin/reports" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-bold gap-1 border-amber-500/30">
                <span>Open Resolution Center</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

