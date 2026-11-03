"use client";

import * as React from "react";
import {
  Settings,
  Server,
  Database,
  Lock,
  Save,
  CheckCircle2,
  Cpu,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function SuperAdminPlatformSettingsPage() {
  const [params, setParams] = React.useState({
    dbPoolSize: 20,
    redisCacheTtl: 3600,
    apiRateLimitPerMin: 120,
    sessionExpiryDays: 30,
    logRetentionDays: 90,
    maintenanceMode: false,
    strictSslOnly: true,
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Master infrastructure parameters updated across edge nodes");
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Master Platform Settings</h1>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none font-bold text-xs">
              Root Level
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Global infrastructure parameters, connection pool sizing, cache expirations, and edge security thresholds.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Infrastructure */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-bold tracking-tight">Database & Engine Runtime</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="poolSize" className="text-xs font-bold">PostgreSQL Pool Size</Label>
              <Input
                id="poolSize"
                type="number"
                value={params.dbPoolSize}
                onChange={(e) => setParams((p) => ({ ...p, dbPoolSize: Number(e.target.value) }))}
                className="rounded-xl text-xs"
              />
              <p className="text-[11px] text-muted-foreground">Max concurrent Supabase pgBouncer connections.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="redisTtl" className="text-xs font-bold">Edge Cache TTL (Seconds)</Label>
              <Input
                id="redisTtl"
                type="number"
                value={params.redisCacheTtl}
                onChange={(e) => setParams((p) => ({ ...p, redisCacheTtl: Number(e.target.value) }))}
                className="rounded-xl text-xs"
              />
              <p className="text-[11px] text-muted-foreground">Default response cache time for vendor directory searches.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rateLimit" className="text-xs font-bold">API Rate Limit (Req / Min / IP)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={params.apiRateLimitPerMin}
                onChange={(e) => setParams((p) => ({ ...p, apiRateLimitPerMin: Number(e.target.value) }))}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionExp" className="text-xs font-bold">Auth Session Lifetime (Days)</Label>
              <Input
                id="sessionExp"
                type="number"
                value={params.sessionExpiryDays}
                onChange={(e) => setParams((p) => ({ ...p, sessionExpiryDays: Number(e.target.value) }))}
                className="rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Global Security Toggles */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-bold tracking-tight">System State & SSL Controls</h2>
          </div>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 cursor-pointer">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-foreground">Enforce Strict HTTPS & HSTS Security Headers</span>
              <p className="text-[11px] text-muted-foreground">Reject any unencrypted HTTP requests at edge reverse proxy.</p>
            </div>
            <input
              type="checkbox"
              checked={params.strictSslOnly}
              onChange={(e) => setParams((p) => ({ ...p, strictSslOnly: e.target.checked }))}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 cursor-pointer">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-foreground">Platform Maintenance Mode</span>
              <p className="text-[11px] text-muted-foreground">Display graceful maintenance screen to visitors & couples.</p>
            </div>
            <input
              type="checkbox"
              checked={params.maintenanceMode}
              onChange={(e) => setParams((p) => ({ ...p, maintenanceMode: e.target.checked }))}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
            />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            variant="gradient"
            className="rounded-2xl h-11 px-8 text-xs font-bold gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-soft-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Apply Global Infrastructure Changes"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

