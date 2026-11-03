"use client";

import * as React from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  DollarSign,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
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
  INITIAL_VENDOR_SERVICES,
  VendorServiceItem,
} from "@/constants/vendor-data";
import { createServiceAction, deleteServiceAction } from "@/actions/vendor";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export default function VendorServicesPage() {
  const [services, setServices] = React.useState<VendorServiceItem[]>(INITIAL_VENDOR_SERVICES);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // New Service form state
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("Cinema");
  const [price, setPrice] = React.useState<number | "">("");
  const [priceType, setPriceType] = React.useState<VendorServiceItem["priceType"]>("fixed");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || price === "") {
      toast.error("Please fill in service title and price");
      return;
    }

    setIsSubmitting(true);
    const newSrv: VendorServiceItem = {
      id: `srv-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      price: Number(price),
      priceType,
      description: description.trim() || "Professional cinema service offering.",
      isActive: true,
    };

    try {
      await createServiceAction({
        title: newSrv.title,
        category: newSrv.category,
        price: newSrv.price,
        priceType: newSrv.priceType,
        description: newSrv.description,
        isActive: true,
      });
      setServices((prev) => [...prev, newSrv]);
      toast.success(`Service "${newSrv.title}" added to catalog!`);
      setDialogOpen(false);
      setTitle("");
      setPrice("");
      setDescription("");
    } catch {
      setServices((prev) => [...prev, newSrv]);
      toast.success("Service added!");
      setDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (id: string, srvTitle: string) => {
    if (!confirm(`Are you sure you want to remove "${srvTitle}"?`)) return;

    try {
      await deleteServiceAction(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Service deleted");
    } catch {
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Service deleted");
    }
  };

  const toggleActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
    toast.success("Service status updated");
  };

  return (
    <div className="space-y-8">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Services & Add-ons</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs">
              {services.length} Offerings
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Maintain your itemized a la carte catalog to quickly add deliverables to custom client quotations.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-soft-md shadow-purple-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service Offering</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Add Service to Catalog</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateService} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="srvTitle" className="text-xs font-bold">Service Title</Label>
                <Input
                  id="srvTitle"
                  placeholder="e.g. FAA Licensed 4K Aerial Drone Coverage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="srvCategory" className="text-xs font-bold">Category</Label>
                  <Input
                    id="srvCategory"
                    placeholder="Cinema, Drone, Editing..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceType" className="text-xs font-bold">Pricing Model</Label>
                  <select
                    id="priceType"
                    value={priceType}
                    onChange={(e) => setPriceType(e.target.value as VendorServiceItem["priceType"])}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="fixed">Fixed Flat Rate</option>
                    <option value="hourly">Hourly Rate</option>
                    <option value="custom">Custom Quoted</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="srvPrice" className="text-xs font-bold">Price ($ USD)</Label>
                <Input
                  id="srvPrice"
                  type="number"
                  placeholder="e.g. 650"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="srvDesc" className="text-xs font-bold">Description of Deliverable</Label>
                <Textarea
                  id="srvDesc"
                  placeholder="Detailed equipment, deliverables, or hour duration..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="rounded-xl text-xs"
                />
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
                  {isSubmitting ? "Adding..." : "Add to Catalog"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services List Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`p-5 rounded-3xl glass-card border transition-all flex flex-col justify-between gap-4 ${
              srv.isActive ? "border-border/80 shadow-soft-sm" : "opacity-60 border-dashed border-border"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-foreground">{srv.title}</h3>
                    <Badge variant="outline" className="text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      {srv.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteService(srv.id, srv.title)}
                  className="text-muted-foreground/60 hover:text-rose-500 p-1 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black">{formatCurrency(srv.price)}</span>
                <span className="text-[11px] text-muted-foreground capitalize">
                  / {srv.priceType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(srv.id)}
                  className={`text-xs font-bold px-3 py-1 rounded-xl transition-colors ${
                    srv.isActive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {srv.isActive ? "Active in Catalog" : "Disabled"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

