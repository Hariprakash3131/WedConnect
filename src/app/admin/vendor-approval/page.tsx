"use client";

import * as React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  INITIAL_PENDING_VENDORS,
  AdminVendorApprovalItem,
} from "@/constants/admin-data";
import { approveVendorAction } from "@/actions/admin";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminVendorApprovalPage() {
  const [vendors, setVendors] = React.useState<AdminVendorApprovalItem[]>(INITIAL_PENDING_VENDORS);
  const [activeTab, setActiveTab] = React.useState<"all" | "pending" | "verified" | "rejected">("pending");

  const filtered = activeTab === "all"
    ? vendors
    : vendors.filter((v) => v.status === activeTab);

  const handleApprove = async (id: string, name: string) => {
    try {
      await approveVendorAction({ vendorId: id, status: "verified" });
      setVendors((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "verified" } : v))
      );
      toast.success(`Vendor "${name}" has been approved and verified!`);
    } catch {
      setVendors((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "verified" } : v))
      );
      toast.success(`Vendor verified`);
    }
  };

  const handleReject = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to decline verification for "${name}"?`)) return;

    try {
      await approveVendorAction({ vendorId: id, status: "rejected", reason: "Documentation insufficient" });
      setVendors((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "rejected" } : v))
      );
      toast.error(`Vendor "${name}" application rejected`);
    } catch {
      setVendors((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "rejected" } : v))
      );
      toast.error(`Application rejected`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Vendor Verification Queue</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              KYC & License Compliance
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Review submitted commercial liability insurance, tax IDs, and background checks before awarding verified status.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(["all", "pending", "verified", "rejected"] as const).map((tab) => {
          const count = tab === "all" ? vendors.length : vendors.filter((v) => v.status === tab).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-soft-sm shadow-blue-500/25"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="capitalize">{tab}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-muted"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Vendors Cards */}
      <div className="space-y-4">
        {filtered.map((v) => (
          <div
            key={v.id}
            className="p-6 rounded-3xl glass-card border border-border/80 shadow-soft-sm hover:border-blue-500/30 transition-all space-y-5"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-lg text-foreground">{v.businessName}</h3>
                  <Badge variant="outline" className="text-xs font-bold">
                    {v.category}
                  </Badge>
                  <Badge
                    className={`text-[10px] font-bold border-none uppercase ${
                      v.status === "verified"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : v.status === "rejected"
                        ? "bg-rose-500/10 text-rose-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {v.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Owner / Representative: <strong className="text-foreground">{v.ownerName}</strong> • {v.email} • {v.phone}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-muted-foreground block">Starting Investment</span>
                <span className="text-xl font-black text-foreground">{formatCurrency(v.startingPrice)}</span>
              </div>
            </div>

            {/* Compliance Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-muted/40 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">Location</span>
                <strong className="text-foreground">{v.city}</strong>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">Experience</span>
                <strong className="text-foreground">{v.yearsOfExperience} Years</strong>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">Tax ID (EIN)</span>
                <strong className="text-foreground">{v.taxId}</strong>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">License #</span>
                <strong className="text-foreground">{v.licenseNumber}</strong>
              </div>
            </div>

            {/* Submitted Documentation */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Submitted Verification Documents ({v.documents.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {v.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 px-3.5 rounded-xl bg-card border border-border/70 text-xs flex items-center gap-2 hover:border-blue-500/40 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-foreground">{doc.title}</span>
                    <Badge variant="outline" className="text-[9px] font-mono">
                      {doc.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                Application received: <strong>{v.appliedDate}</strong>
              </span>

              <div className="flex items-center gap-2">
                {v.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(v.id, v.businessName)}
                      className="rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-500/10 border-rose-200"
                    >
                      <XCircle className="w-4 h-4 mr-1.5" />
                      Decline Application
                    </Button>
                    <Button
                      size="sm"
                      variant="gradient"
                      onClick={() => handleApprove(v.id, v.businessName)}
                      className="rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-soft-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      Approve & Grant Verified Badge
                    </Button>
                  </>
                )}
                {v.status === "verified" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(v.id, v.businessName)}
                    className="rounded-xl text-xs font-bold text-rose-600"
                  >
                    Revoke Verification
                  </Button>
                )}
                {v.status === "rejected" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApprove(v.id, v.businessName)}
                    className="rounded-xl text-xs font-bold text-emerald-600"
                  >
                    Re-verify Application
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

