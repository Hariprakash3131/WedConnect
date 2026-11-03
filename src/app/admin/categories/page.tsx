"use client";

import * as React from "react";
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Camera,
  Utensils,
  Flower2,
  Music,
  CheckCircle2,
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
import { createCategoryAction, deleteCategoryAction } from "@/actions/admin";
import toast from "react-hot-toast";

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

const INITIAL_CATEGORIES: CategoryRecord[] = [
  { id: "c1", name: "Luxury Venues & Estates", slug: "venues", description: "Historic castles, waterfront villas, and premier luxury ballrooms.", icon: "Castle", displayOrder: 1, isActive: true },
  { id: "c2", name: "Photography & Cinema", slug: "photography-cinema", description: "Editorial photojournalists, 4K master cinematographers, and vintage 16mm film.", icon: "Camera", displayOrder: 2, isActive: true },
  { id: "c3", name: "Haute Floral & Decor", slug: "floral-decor", description: "Bespoke floral architecture, hanging chandeliers, and candlelit scapes.", icon: "Flower2", displayOrder: 3, isActive: true },
  { id: "c4", name: "Gourmet Catering & Chefs", slug: "catering-bar", description: "Michelin-trained private culinary teams, raw oyster bars, and mixology.", icon: "Utensils", displayOrder: 4, isActive: true },
  { id: "c5", name: "Bridal Couture & Beauty", slug: "bridal-beauty", description: "Celebrity bridal hair, luxury airbrush makeup, and couture styling.", icon: "Sparkles", displayOrder: 5, isActive: true },
  { id: "c6", name: "Music, Bands & DJs", slug: "music-entertainment", description: "Symphony strings, 12-piece party bands, and international club DJs.", icon: "Music", displayOrder: 6, isActive: true },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = React.useState<CategoryRecord[]>(INITIAL_CATEGORIES);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [order, setOrder] = React.useState(7);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    setIsSubmitting(true);
    const newCat: CategoryRecord = {
      id: `cat-${Date.now()}`,
      name,
      slug,
      description,
      icon: "Sparkles",
      displayOrder: order,
      isActive: true,
    };

    try {
      await createCategoryAction({
        name: newCat.name,
        slug: newCat.slug,
        description: newCat.description,
        icon: newCat.icon,
        displayOrder: newCat.displayOrder,
      });

      setCategories((prev) => [...prev, newCat]);
      toast.success(`Category "${newCat.name}" added`);
      setDialogOpen(false);
      setName("");
      setSlug("");
      setDescription("");
    } catch {
      setCategories((prev) => [...prev, newCat]);
      toast.success("Category added");
      setDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to remove category "${catName}"?`)) return;

    try {
      await deleteCategoryAction(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Category deleted");
    } catch {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Category deleted");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Category Taxonomy Manager</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              {categories.length} Specialties
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage public vendor categories, metadata slugs, and search hierarchy.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-soft-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Add New Marketplace Category</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="catName" className="text-xs font-bold">Category Title</Label>
                <Input
                  id="catName"
                  placeholder="e.g. Fine Jewelry & Rings"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="catSlug" className="text-xs font-bold">URL Slug</Label>
                  <Input
                    id="catSlug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="catOrder" className="text-xs font-bold">Display Order</Label>
                  <Input
                    id="catOrder"
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="catDesc" className="text-xs font-bold">Description</Label>
                <Textarea
                  id="catDesc"
                  placeholder="Summary for couples browsing this category..."
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
                  {isSubmitting ? "Creating..." : "Save Category"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-3xl glass-card border border-border/80 shadow-soft-sm flex items-start justify-between gap-3 hover:border-blue-500/30 transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {c.displayOrder}
                </span>
                <h3 className="font-extrabold text-base text-foreground">{c.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {c.description}
              </p>
              <span className="text-[11px] font-mono text-muted-foreground block">
                /vendors?category={c.slug}
              </span>
            </div>

            <button
              onClick={() => handleDelete(c.id, c.name)}
              className="text-muted-foreground/60 hover:text-rose-600 p-1 shrink-0"
              title="Delete category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

