"use client";

import * as React from "react";
import Link from "next/link";
import {
  Shield,
  KeyRound,
  Users,
  Settings,
  Terminal,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  ArrowUpRight,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  INITIAL_SECURITY_EVENTS,
  INITIAL_ADMIN_STAFF,
} from "@/constants/admin-data";

export default function SuperAdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Super Admin Root Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950 via-stone-900 to-black text-white shadow-soft-xl border border-amber-500/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Root Security & Governance
              </span>
              <div className="flex items-center gap-1 text-xs text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Vulnerabilities Detected</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Super Admin Control Plane
            </h1>
            <p className="text-white/80 text-sm max-w-xl">
              Elevated root access governing administrative accounts, database RLS boundary integrity, global parameters, and API rate-limiting firewalls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/super-admin/roles">
              <Button
                variant="gradient"
                className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-soft-md shadow-amber-500/25"
              >
                <KeyRound className="w-4 h-4" />
                <span>RBAC Permissions</span>
              </Button>
            </Link>
            <Link href="/super-admin/security">
              <Button
                variant="glass"
                className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 text-white bg-white/10 hover:bg-white/20 border-white/20"
              >
                <Lock className="w-4 h-4" />
                <span>Firewall</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Infrastructure Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Admin Accounts</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black mt-2 text-foreground">{INITIAL_ADMIN_STAFF.length} Staff</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% MFA Enforced
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Database RLS Shield</span>
            <Database className="w-4 h-4 text-blue-500" />
          </div>
          <h3 className="text-2xl font-black mt-2 text-foreground">18 / 18 Tables</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Active Tenant Isolation
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Threat Shield</span>
            <Shield className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black mt-2 text-foreground">0 Active Breaches</h3>
          <p className="text-xs text-muted-foreground font-semibold mt-1">
            Edge rate limiter active
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">System Health</span>
            <Server className="w-4 h-4 text-purple-500" />
          </div>
          <h3 className="text-2xl font-black mt-2 text-foreground">99.99% Uptime</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Vercel + Supabase US-East
          </p>
        </div>
      </div>

      {/* Main Grid: Security Events & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Live Threat Activity */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Real-Time Threat & Firewall Activity</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Automated perimeter defenses protecting authentication and quotation endpoints
              </p>
            </div>
            <Link href="/super-admin/system-logs">
              <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-amber-600 dark:text-amber-400">
                View System Logs &rarr;
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {INITIAL_SECURITY_EVENTS.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-card border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={`text-[9px] font-mono border-none uppercase ${
                        ev.severity === "high"
                          ? "bg-rose-500/10 text-rose-600"
                          : ev.severity === "medium"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-blue-500/10 text-blue-600"
                      }`}
                    >
                      {ev.severity}
                    </Badge>
                    <span className="font-extrabold text-foreground">{ev.eventType.replace(/_/g, " ")}</span>
                    <span className="text-muted-foreground font-mono">({ev.sourceIp})</span>
                  </div>
                  <p className="text-muted-foreground">{ev.description}</p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-none capitalize text-[10px]">
                    {ev.status}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{ev.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Super Admin Controls */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 space-y-4 border-amber-500/20">
            <h3 className="font-bold text-sm tracking-tight text-foreground">Governance Modules</h3>
            <div className="space-y-2">
              <Link href="/super-admin/roles" className="block">
                <div className="p-3.5 rounded-2xl bg-muted/40 hover:bg-muted transition-all flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <KeyRound className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold text-foreground block">Role & Permission Matrix</span>
                      <p className="text-[10px] text-muted-foreground">Configure 8 granular privileges</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>

              <Link href="/super-admin/admin-accounts" className="block">
                <div className="p-3.5 rounded-2xl bg-muted/40 hover:bg-muted transition-all flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold text-foreground block">Staff Admin Accounts</span>
                      <p className="text-[10px] text-muted-foreground">Manage 3 team members</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>

              <Link href="/super-admin/platform-settings" className="block">
                <div className="p-3.5 rounded-2xl bg-muted/40 hover:bg-muted transition-all flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold text-foreground block">Master Platform Parameters</span>
                      <p className="text-[10px] text-muted-foreground">Global environment settings</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>

              <Link href="/super-admin/security" className="block">
                <div className="p-3.5 rounded-2xl bg-muted/40 hover:bg-muted transition-all flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold text-foreground block">Security & Edge Firewall</span>
                      <p className="text-[10px] text-muted-foreground">IP blacklists & session kill-switch</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

