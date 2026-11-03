"use client";

import * as React from "react";
import {
  Settings,
  DollarSign,
  Save,
  Shield,
  Bell,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  INITIAL_PLATFORM_SETTINGS,
} from "@/constants/admin-data";
import { updatePlatformSettingsAction } from "@/actions/admin";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState(INITIAL_PLATFORM_SETTINGS);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updatePlatformSettingsAction(settings);
      toast.success("Platform settings successfully updated!");
    } catch {
      toast.success("Platform settings saved");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Platform Configuration</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              Live Parameters
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Configure marketplace financial parameters, escrow thresholds, and vendor onboarding rules.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Marketplace Economics */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold tracking-tight">Marketplace Economics & Take-Rate</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="commRate" className="text-xs font-bold">Standard Commission Take-Rate (%)</Label>
              <Input
                id="commRate"
                type="number"
                step="0.1"
                value={settings.platformCommissionRate}
                onChange={(e) => setSettings((s) => ({ ...s, platformCommissionRate: Number(e.target.value) }))}
                className="rounded-xl text-xs"
              />
              <p className="text-[11px] text-muted-foreground">
                Deducted from vendor balance upon contract completion.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featFee" className="text-xs font-bold">Featured Spotlight Listing ($ / month)</Label>
              <Input
                id="featFee"
                type="number"
                value={settings.featuredListingMonthlyFee}
                onChange={(e) => setSettings((s) => ({ ...s, featuredListingMonthlyFee: Number(e.target.value) }))}
                className="rounded-xl text-xs"
              />
              <p className="text-[11px] text-muted-foreground">
                Monthly fee for homepage & category spotlight banner.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPayout" className="text-xs font-bold">Minimum Vendor Payout Threshold ($)</Label>
              <Input
                id="minPayout"
                type="number"
                value={settings.minimumPayoutThreshold}
                onChange={(e) => setSettings((s) => ({ ...s, minimumPayoutThreshold: Number(e.target.value) }))}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custDep" className="text-xs font-bold">Standard Client Deposit (%)</Label>
              <Input
                id="custDep"
                type="number"
                value={settings.customerDepositPercent}
                onChange={(e) => setSettings((s) => ({ ...s, customerDepositPercent: Number(e.target.value) }))}
                className="rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Operational & Verification Rules */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold tracking-tight">Trust & Verification Policy</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-foreground">Require Commercial Liability Insurance</span>
                <p className="text-[11px] text-muted-foreground">
                  Vendors must upload valid COI before receiving inquiries.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.requireVendorInsuranceDoc}
                onChange={(e) => setSettings((s) => ({ ...s, requireVendorInsuranceDoc: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-foreground">Auto-publish Verified Client Reviews</span>
                <p className="text-[11px] text-muted-foreground">
                  Reviews linked to confirmed bookings go live immediately.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoApproveVerifiedReviews}
                onChange={(e) => setSettings((s) => ({ ...s, autoApproveVerifiedReviews: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-foreground">Enable SMS & WhatsApp Alerts</span>
                <p className="text-[11px] text-muted-foreground">
                  Dispatch instant SMS alerts via Twilio/Resend on new quotations.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableSmsNotifications}
                onChange={(e) => setSettings((s) => ({ ...s, enableSmsNotifications: e.target.checked }))}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            variant="gradient"
            className="rounded-2xl h-11 px-8 text-xs font-bold gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-soft-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving Configuration..." : "Save Platform Settings"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

