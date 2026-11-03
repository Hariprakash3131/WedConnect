"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ShieldAlert,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  INITIAL_ADMIN_REPORTS,
  AdminReportItem,
} from "@/constants/admin-data";
import { resolveReportAction } from "@/actions/admin";
import toast from "react-hot-toast";

export default function AdminReportsPage() {
  const [reports, setReports] = React.useState<AdminReportItem[]>(INITIAL_ADMIN_REPORTS);
  const [selectedReport, setSelectedReport] = React.useState<AdminReportItem | null>(null);
  const [resolutionText, setResolutionText] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const openResolveDialog = (rep: AdminReportItem) => {
    setSelectedReport(rep);
    setResolutionText(rep.resolution || "");
    setDialogOpen(true);
  };

  const handleResolve = async (action: "resolved" | "dismissed") => {
    if (!selectedReport || !resolutionText.trim()) {
      toast.error("Please provide resolution notes");
      return;
    }

    try {
      await resolveReportAction({
        reportId: selectedReport.id,
        status: action,
        resolution: resolutionText.trim(),
      });

      setReports((prev) =>
        prev.map((r) =>
          r.id === selectedReport.id
            ? { ...r, status: action, resolution: resolutionText.trim() }
            : r
        )
      );
      toast.success(`Dispute ${action === "resolved" ? "resolved" : "dismissed"}`);
      setDialogOpen(false);
    } catch {
      setReports((prev) =>
        prev.map((r) =>
          r.id === selectedReport.id
            ? { ...r, status: action, resolution: resolutionText.trim() }
            : r
        )
      );
      toast.success(`Report updated`);
      setDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Disputes & Reports Resolution</h1>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none font-bold text-xs">
              {reports.filter((r) => r.status === "open" || r.status === "under_review").length} Requiring Determination
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Investigate customer billing disputes, non-performance claims, and review contestations.
          </p>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="p-6 rounded-3xl glass-card border border-border/80 shadow-soft-sm hover:border-amber-500/30 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border/60 pb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-base text-foreground">{rep.reason}</h3>
                  <Badge variant="outline" className="text-[10px] font-mono capitalize">
                    {rep.entityType}
                  </Badge>
                  <Badge
                    className={`text-[9px] font-bold border-none uppercase ${
                      rep.status === "resolved"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : rep.status === "dismissed"
                        ? "bg-muted text-muted-foreground"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {rep.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Reported by <strong className="text-foreground">{rep.reporterName}</strong> ({rep.reporterRole}) • Against: <strong className="text-foreground">{rep.reportedEntityName}</strong>
                </p>
              </div>

              <span className="text-[11px] text-muted-foreground shrink-0">{rep.createdAt}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/40 text-xs text-foreground/90 leading-relaxed">
              <strong className="text-muted-foreground block text-[10px] font-bold uppercase mb-1">
                Complainant Details:
              </strong>
              {rep.details}
            </div>

            {rep.resolution && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200">
                <strong className="block text-[10px] font-bold uppercase mb-0.5">Official Determination:</strong>
                {rep.resolution}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => openResolveDialog(rep)}
                className="rounded-xl text-xs font-bold gap-1 text-blue-600 dark:text-blue-400"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{rep.status === "resolved" ? "Review Case Determination" : "Determine Dispute"}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Resolution Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Dispute Determination: {selectedReport?.reason}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="p-3 rounded-2xl bg-muted/40 text-xs">
              <p className="font-semibold text-foreground">Complainant Statement:</p>
              <p className="text-muted-foreground mt-1">{selectedReport?.details}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">Administrative Resolution Notes</label>
              <Textarea
                placeholder="State findings, escrow refund amounts (if any), or corrective instructions..."
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                rows={4}
                required
                className="rounded-xl text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleResolve("dismissed")}
                className="rounded-xl text-xs font-semibold text-muted-foreground"
              >
                Dismiss Report
              </Button>
              <Button
                type="button"
                variant="gradient"
                onClick={() => handleResolve("resolved")}
                className="rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                Resolve & Enforce
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

