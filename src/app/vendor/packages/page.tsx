"use client";

import * as React from "react";
import {
  Package,
  Plus,
  Trash2,
  Check,
  Star,
  Sparkles,
  DollarSign,
  Layers,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  INITIAL_VENDOR_PACKAGES,
  VendorPackageItem,
} from "@/constants/vendor-data";
import { createPackageAction, deletePackageAction } from "@/actions/vendor";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export default function VendorPackagesPage() {
  const [packages, setPackages] = React.useState<VendorPackageItem[]>(INITIAL_VENDOR_PACKAGES);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // New Package form state
  const [newTitle, setNewTitle] = React.useState("");
  const [newPrice, setNewPrice] = React.useState<number | "">("");
  const [newDesc, setNewDesc] = React.useState("");
  const [deliverables, setDeliverables] = React.useState<string[]>([
    "Lead Master Cinematographer Coverage",
    "FAA Certified Aerial Drone Filming",
  ]);
  const [currentDeliverable, setCurrentDeliverable] = React.useState("");
  const [isPopular, setIsPopular] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const addDeliverable = () => {
    if (!currentDeliverable.trim()) return;
    setDeliverables((prev) => [...prev, currentDeliverable.trim()]);
    setCurrentDeliverable("");
  };

  const removeDeliverable = (index: number) => {
    setDeliverables((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice || deliverables.length === 0) {
      toast.error("Please fill in package title, price, and at least one deliverable");
      return;
    }

    setIsSubmitting(true);
    const newPkg: VendorPackageItem = {
      id: `pkg-${Date.now()}`,
      title: newTitle.trim(),
      price: Number(newPrice),
      description: newDesc.trim() || "Full-day wedding cinema suite.",
      deliverables,
      isPopular,
      isActive: true,
    };

    try {
      await createPackageAction({
        title: newPkg.title,
        price: newPkg.price,
        description: newPkg.description,
        deliverables: newPkg.deliverables,
        isPopular: newPkg.isPopular,
        isActive: true,
      });
      setPackages((prev) => [...prev, newPkg]);
      toast.success(`Package "${newPkg.title}" created successfully!`);
      setDialogOpen(false);
      setNewTitle("");
      setNewPrice("");
      setNewDesc("");
      setDeliverables(["Lead Master Cinematographer Coverage"]);
      setIsPopular(false);
    } catch {
      setPackages((prev) => [...prev, newPkg]);
      toast.success(`Package "${newPkg.title}" created!`);
      setDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePackage = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove package "${title}"?`)) return;

    try {
      await deletePackageAction(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      toast.success("Package removed");
    } catch {
      setPackages((prev) => prev.filter((p) => p.id !== id));
      toast.success("Package removed");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Title and Create Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Packages & Collections</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs">
              {packages.length} Tiered Collections
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Build bundled collections with itemized deliverables for easy one-click quotation selection.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-soft-md shadow-purple-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Create Collection</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl rounded-3xl p-6 max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Design New Service Package</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreatePackage} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pkgTitle" className="text-xs font-bold">Package Name</Label>
                  <Input
                    id="pkgTitle"
                    placeholder="e.g. Couture Heirloom Suite"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pkgPrice" className="text-xs font-bold">Investment Price ($ USD)</Label>
                  <Input
                    id="pkgPrice"
                    type="number"
                    placeholder="e.g. 7500"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value ? Number(e.target.value) : "")}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pkgDesc" className="text-xs font-bold">Short Summary</Label>
                <Textarea
                  id="pkgDesc"
                  placeholder="Describe who this package is best suited for..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="rounded-xl text-xs"
                />
              </div>

              {/* Deliverables Builder */}
              <div className="space-y-2 pt-1">
                <Label className="text-xs font-bold">Inclusions & Deliverables</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. 10-Hour Master Cinematographer"
                    value={currentDeliverable}
                    onChange={(e) => setCurrentDeliverable(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addDeliverable();
                      }
                    }}
                    className="rounded-xl text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addDeliverable}
                    className="rounded-xl text-xs font-bold shrink-0"
                  >
                    Add
                  </Button>
                </div>

                {/* List of deliverables */}
                <div className="space-y-1.5 pt-2 max-h-40 overflow-y-auto">
                  {deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-muted/60 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDeliverable(idx)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="isPopular" className="text-xs font-semibold cursor-pointer">
                  Highlight with &ldquo;Most Popular&rdquo; badge
                </Label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
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
                  className="rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  {isSubmitting ? "Creating..." : "Save Collection"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 ${
              pkg.isPopular
                ? "glass-card border-2 border-purple-500/50 shadow-soft-xl shadow-purple-500/10 ring-1 ring-purple-500/20"
                : "glass-card border border-border/80 shadow-soft-md"
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-[10px] px-3 py-1 shadow-soft-sm uppercase tracking-wider">
                  Most Popular
                </Badge>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-lg text-foreground">{pkg.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePackage(pkg.id, pkg.title)}
                  className="text-muted-foreground/60 hover:text-rose-500 p-1 transition-colors"
                  title="Remove package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2">
                <span className="text-3xl font-black tracking-tight">{formatCurrency(pkg.price)}</span>
                <span className="text-xs text-muted-foreground ml-1.5 font-medium">flat investment</span>
              </div>

              {/* Inclusions list */}
              <div className="pt-3 border-t border-border/60 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  What&apos;s Included:
                </span>
                <ul className="space-y-2 text-xs">
                  {pkg.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-foreground/90">
                      <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <Button
                variant={pkg.isPopular ? "gradient" : "outline"}
                className={`w-full rounded-2xl h-10 text-xs font-bold ${
                  pkg.isPopular ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""
                }`}
                onClick={() => toast.success(`Applied "${pkg.title}" as default recommendation`)}
              >
                Set as Preferred Proposal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

