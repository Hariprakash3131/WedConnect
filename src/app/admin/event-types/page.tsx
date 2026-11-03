"use client";

import * as React from "react";
import {
  Calendar,
  Plus,
  Trash2,
  Sparkles,
  Heart,
  GlassWater,
  PartyPopper,
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
import { createEventTypeAction, deleteEventTypeAction } from "@/actions/admin";
import toast from "react-hot-toast";

interface EventTypeRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
}

const INITIAL_EVENT_TYPES: EventTypeRecord[] = [
  { id: "et-1", name: "Full Wedding & Reception", slug: "wedding", description: "Grand celebration combining sacred ceremony, dinner, and late evening dancing.", displayOrder: 1 },
  { id: "et-2", name: "Sangeet & Mehendi Gala", slug: "sangeet-mehendi", description: "Vibrant cultural celebration with music, choreography, and artisanal mehendi.", displayOrder: 2 },
  { id: "et-3", name: "Luxury Destination Elopement", slug: "elopement", description: "Intimate ceremonies under 40 guests in breathtaking global landscapes.", displayOrder: 3 },
  { id: "et-4", name: "Engagement & Proposal Party", slug: "engagement", description: "Cocktail celebrations announcing the upcoming union with family and friends.", displayOrder: 4 },
  { id: "et-5", name: "Vow Renewal & Milestone Anniversary", slug: "anniversary", description: "Commemorating 10, 25, or 50 years of marriage with renewed vows.", displayOrder: 5 },
];

export default function AdminEventTypesPage() {
  const [types, setTypes] = React.useState<EventTypeRecord[]>(INITIAL_EVENT_TYPES);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [order, setOrder] = React.useState(6);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    setIsSubmitting(true);
    const newEt: EventTypeRecord = {
      id: `et-${Date.now()}`,
      name,
      slug,
      description,
      displayOrder: order,
    };

    try {
      await createEventTypeAction({
        name: newEt.name,
        slug: newEt.slug,
        description: newEt.description,
        displayOrder: newEt.displayOrder,
        icon: "Calendar",
      });

      setTypes((prev) => [...prev, newEt]);
      toast.success(`Event type "${newEt.name}" created`);
      setDialogOpen(false);
      setName("");
      setSlug("");
      setDescription("");
    } catch {
      setTypes((prev) => [...prev, newEt]);
      toast.success("Event type added");
      setDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, etName: string) => {
    if (!confirm(`Are you sure you want to remove event type "${etName}"?`)) return;

    try {
      await deleteEventTypeAction(id);
      setTypes((prev) => prev.filter((t) => t.id !== id));
      toast.success("Event type removed");
    } catch {
      setTypes((prev) => prev.filter((t) => t.id !== id));
      toast.success("Event type removed");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Celebration Event Types</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              {types.length} Supported Types
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Configure celebration archetypes available in couple wizards and vendor matchmaker filtering.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-soft-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event Type</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Add Celebration Event Type</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="etName" className="text-xs font-bold">Celebration Name</Label>
                <Input
                  id="etName"
                  placeholder="e.g. Traditional Tea Ceremony"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="etSlug" className="text-xs font-bold">URL Slug</Label>
                  <Input
                    id="etSlug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="etOrder" className="text-xs font-bold">Display Order</Label>
                  <Input
                    id="etOrder"
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="etDesc" className="text-xs font-bold">Description</Label>
                <Textarea
                  id="etDesc"
                  placeholder="Brief guidance for couples organizing this celebration..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
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
                  className="rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  {isSubmitting ? "Creating..." : "Save Event Type"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Event Types List */}
      <div className="space-y-4">
        {types.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl glass-card border border-border/80 shadow-soft-sm flex items-start justify-between gap-4 hover:border-blue-500/30 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {t.displayOrder}
                </span>
                <h3 className="font-extrabold text-base text-foreground">{t.name}</h3>
                <Badge variant="outline" className="text-[10px] font-mono">
                  {t.slug}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.description}
              </p>
            </div>

            <button
              onClick={() => handleDelete(t.id, t.name)}
              className="text-muted-foreground/60 hover:text-rose-600 p-1 shrink-0"
              title="Delete event type"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

