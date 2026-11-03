"use client";

import * as React from "react";
import {
  History,
  Search,
  User,
  Shield,
  FileCode,
  Globe,
  Clock,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  INITIAL_ADMIN_AUDIT_LOGS,
  AdminAuditLogItem,
} from "@/constants/admin-data";

export default function AdminAuditLogsPage() {
  const [logs] = React.useState<AdminAuditLogItem[]>(INITIAL_ADMIN_AUDIT_LOGS);
  const [search, setSearch] = React.useState("");
  const [selectedLog, setSelectedLog] = React.useState<AdminAuditLogItem | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.actorName.toLowerCase().includes(search.toLowerCase()) ||
      l.entityType.toLowerCase().includes(search.toLowerCase()) ||
      l.ipAddress.includes(search)
  );

  const openInspector = (log: AdminAuditLogItem) => {
    setSelectedLog(log);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Immutable Audit Logs</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              Cryptographically Signed
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Complete compliance trail recording every administrative modification, verification change, and parameter update.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by action, actor, or IP address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-2xl text-xs h-10"
        />
      </div>

      {/* Logs Table / Cards */}
      <div className="space-y-3">
        {filtered.map((log) => (
          <div
            key={log.id}
            className="p-5 rounded-2xl glass-card border border-border/80 shadow-soft-sm hover:border-blue-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="font-mono text-[10px] font-bold">
                  {log.action}
                </Badge>
                <span className="text-muted-foreground">on</span>
                <span className="font-bold text-foreground">{log.entityType}</span>
                <span className="text-muted-foreground font-mono text-[11px]">({log.entityId})</span>
              </div>

              <p className="text-muted-foreground line-clamp-1">
                {log.details}
              </p>
            </div>

            <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
              <div className="text-left sm:text-right text-[11px]">
                <strong className="text-foreground block">{log.actorName} ({log.actorRole})</strong>
                <span className="text-muted-foreground flex items-center sm:justify-end gap-1 mt-0.5">
                  <Globe className="w-3 h-3" />
                  {log.ipAddress} • {log.timestamp}
                </span>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => openInspector(log)}
                className="rounded-xl h-8 text-xs font-bold text-blue-600 dark:text-blue-400"
              >
                Inspect
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspection Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Audit Entry Details: {selectedLog?.id}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-muted/40 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Action:</span>
                  <span className="font-mono font-bold text-foreground">{selectedLog.action}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Actor:</span>
                  <span className="font-semibold text-foreground">{selectedLog.actorName} ({selectedLog.actorEmail})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Address:</span>
                  <span className="font-mono text-foreground">{selectedLog.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span className="font-semibold text-foreground">{selectedLog.timestamp}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-foreground block">Event Payload & Description:</span>
                <p className="p-3 rounded-2xl bg-card border border-border/80 text-muted-foreground leading-relaxed">
                  {selectedLog.details}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="rounded-xl text-xs font-bold"
                >
                  Close Inspection
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

