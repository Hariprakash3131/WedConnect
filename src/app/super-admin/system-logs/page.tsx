"use client";

import * as React from "react";
import {
  Terminal,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface SystemLogEntry {
  id: string;
  level: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  source: string;
  message: string;
  latencyMs: number;
  timestamp: string;
}

const INITIAL_SYSTEM_LOGS: SystemLogEntry[] = [
  { id: "sys-01", level: "INFO", source: "api/vendors/search", message: "Cache HIT for query: category=venues&city=New York", latencyMs: 14, timestamp: "14:32:01.402" },
  { id: "sys-02", level: "WARN", source: "edge/rate-limiter", message: "Client IP 198.51.100.82 exceeded 120 req/min threshold. Cooldown enacted.", latencyMs: 2, timestamp: "14:31:45.109" },
  { id: "sys-03", level: "INFO", source: "supabase/realtime", message: "WebSocket channel established for conversation conv-1", latencyMs: 28, timestamp: "14:30:12.871" },
  { id: "sys-04", level: "ERROR", source: "auth/token-refresh", message: "Invalid refresh token presented from user-agent Mozilla/5.0. Handshake rejected.", latencyMs: 45, timestamp: "14:28:50.003" },
  { id: "sys-05", level: "INFO", source: "resend/webhook", message: "Quotation email dispatch event ID 8841 delivered to audrey@example.com", latencyMs: 110, timestamp: "14:25:33.210" },
  { id: "sys-06", level: "INFO", source: "postgres/rls-check", message: "Query on table 'vendor_portfolios' passed RLS tenant barrier.", latencyMs: 8, timestamp: "14:24:19.498" },
];

export default function SuperAdminSystemLogsPage() {
  const [logs, setLogs] = React.useState<SystemLogEntry[]>(INITIAL_SYSTEM_LOGS);
  const [search, setSearch] = React.useState("");
  const [levelFilter, setLevelFilter] = React.useState<string>("ALL");

  const filtered = logs.filter((l) => {
    const matchesSearch =
      l.source.toLowerCase().includes(search.toLowerCase()) ||
      l.message.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "ALL" || l.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">System & Network Event Logs</h1>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none font-bold text-xs">
              Live Edge Stream
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Raw event telemetry from Vercel edge functions, Supabase pgBouncer, and Resend delivery webhooks.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Logs re-synchronized with edge telemetry")}
          className="rounded-xl text-xs font-bold gap-1.5 h-9"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Stream</span>
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search source or message payload..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-2xl text-xs h-10"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {["ALL", "INFO", "WARN", "ERROR"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                levelFilter === lvl
                  ? "bg-amber-500 text-white shadow-soft-sm"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal View */}
      <div className="rounded-3xl bg-slate-950 text-slate-100 p-6 border border-slate-800 shadow-soft-xl font-mono text-xs space-y-2.5 overflow-x-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400 text-[11px]">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            STREAM_BUFFER_CONNECTED: us-east-1.wedconnect-core
          </span>
          <span>{filtered.length} entries matching</span>
        </div>

        <div className="space-y-2 pt-2">
          {filtered.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 py-1.5 px-2.5 rounded-lg hover:bg-slate-900/60 transition-colors"
            >
              <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>
              <span
                className={`font-bold shrink-0 text-[10px] px-1.5 py-0.2 rounded uppercase ${
                  log.level === "ERROR"
                    ? "bg-rose-950 text-rose-400 border border-rose-800"
                    : log.level === "WARN"
                    ? "bg-amber-950 text-amber-400 border border-amber-800"
                    : "bg-blue-950 text-blue-400 border border-blue-800"
                }`}
              >
                {log.level}
              </span>
              <span className="text-purple-400 shrink-0 font-semibold">{log.source}</span>
              <span className="text-slate-300 flex-1">{log.message}</span>
              <span className="text-slate-500 text-[10px] shrink-0">{log.latencyMs}ms</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

