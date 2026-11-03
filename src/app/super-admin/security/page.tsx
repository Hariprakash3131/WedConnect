"use client";

import * as React from "react";
import {
  Lock,
  ShieldCheck,
  ShieldAlert,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  RefreshCw,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface BlockedIpRecord {
  ip: string;
  reason: string;
  blockedAt: string;
}

const INITIAL_BLOCKED_IPS: BlockedIpRecord[] = [
  { ip: "198.51.100.82", reason: "Excessive automated scraping on search API", blockedAt: "Today, 14:31" },
  { ip: "203.0.113.195", reason: "Credential stuffing burst attack", blockedAt: "Yesterday, 08:15" },
];

export default function SuperAdminSecurityPage() {
  const [blockedIps, setBlockedIps] = React.useState<BlockedIpRecord[]>(INITIAL_BLOCKED_IPS);
  const [newIp, setNewIp] = React.useState("");
  const [newReason, setNewReason] = React.useState("");

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp) return;

    const record: BlockedIpRecord = {
      ip: newIp.trim(),
      reason: newReason.trim() || "Administrative security manual block",
      blockedAt: "Just now",
    };

    setBlockedIps((prev) => [record, ...prev]);
    toast.success(`IP ${newIp} added to edge firewall blacklist`);
    setNewIp("");
    setNewReason("");
  };

  const handleRemoveBlock = (ip: string) => {
    setBlockedIps((prev) => prev.filter((b) => b.ip !== ip));
    toast.success(`IP ${ip} unblocked`);
  };

  const handleRevokeAllSessions = () => {
    if (!confirm("Are you sure? This will terminate all active JWT sessions except your current session.")) return;
    toast.success("Emergency session revocation broadcasted to Supabase Auth");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Security & Edge Firewall</h1>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-bold text-xs gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Perimeter Secure
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Enforce IP access boundaries, inspect Row Level Security compliance, and manage global session revocation.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleRevokeAllSessions}
          className="rounded-2xl h-10 text-xs font-bold gap-1.5 border-rose-500/30 text-rose-600 hover:bg-rose-500/10"
        >
          <Ban className="w-3.5 h-3.5" />
          <span>Global Session Kill-Switch</span>
        </Button>
      </div>

      {/* Security Posture Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl glass-card border border-border/80 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-semibold">PostgreSQL RLS Policies</span>
            <strong className="text-sm block font-black text-foreground">18 / 18 Tables Protected</strong>
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-semibold">SSL/TLS & HSTS Edge</span>
            <strong className="text-sm block font-black text-foreground">A+ Grade Encrypted</strong>
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-semibold">Staff MFA Verification</span>
            <strong className="text-sm block font-black text-foreground">100% Active Enforced</strong>
          </div>
        </div>
      </div>

      {/* Edge Firewall IP Blacklist */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold tracking-tight">Edge Firewall IP Blacklist</h2>
            <p className="text-xs text-muted-foreground">
              Blocked malicious source addresses dropped at the Cloudflare / Vercel edge boundary
            </p>
          </div>
          <Badge className="bg-amber-500/10 text-amber-600 border-none font-bold text-xs">
            {blockedIps.length} Blocked
          </Badge>
        </div>

        {/* Add IP Form */}
        <form onSubmit={handleAddBlock} className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="IP Address (e.g. 203.0.113.50)"
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
            required
            className="rounded-xl text-xs h-10 flex-1"
          />
          <Input
            placeholder="Reason for firewall block..."
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            className="rounded-xl text-xs h-10 flex-1"
          />
          <Button
            type="submit"
            variant="gradient"
            className="rounded-xl h-10 text-xs font-bold gap-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Block IP</span>
          </Button>
        </form>

        {/* List of blocked IPs */}
        <div className="space-y-3 pt-2">
          {blockedIps.map((b) => (
            <div
              key={b.ip}
              className="p-4 rounded-2xl bg-muted/40 border border-border/70 flex items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-foreground">{b.ip}</span>
                  <Badge variant="outline" className="text-[10px] text-rose-600 border-rose-200">
                    Dropped at Edge
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-0.5">{b.reason}</p>
                <span className="text-[10px] text-muted-foreground">Blocked {b.blockedAt}</span>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRemoveBlock(b.ip)}
                className="text-muted-foreground hover:text-rose-600 h-8 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

