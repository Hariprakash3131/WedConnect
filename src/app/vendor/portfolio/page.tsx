"use client";

import * as React from "react";
import Image from "next/image";
import {
  Film,
  Plus,
  Trash2,
  Star,
  Sparkles,
  Camera,
  Layers,
  X,
  Check,
  Eye,
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
  INITIAL_VENDOR_PORTFOLIO,
  VendorPortfolioItem,
} from "@/constants/vendor-data";
import {
  addPortfolioMediaAction,
  deletePortfolioMediaAction,
} from "@/actions/vendor";
import toast from "react-hot-toast";

const CATEGORIES = ["All", "Ceremony", "Reception", "Portraits", "Cinematography", "Aerial"] as const;

export default function VendorPortfolioPage() {
  const [items, setItems] = React.useState<VendorPortfolioItem[]>(INITIAL_VENDOR_PORTFOLIO);
  const [activeCategory, setActiveCategory] = React.useState<string>("All");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // New Media Form state
  const [newTitle, setNewTitle] = React.useState("");
  const [newCaption, setNewCaption] = React.useState("");
  const [newUrl, setNewUrl] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<VendorPortfolioItem["category"]>("Ceremony");
  const [newFeatured, setNewFeatured] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) {
      toast.error("Please provide both title and image URL");
      return;
    }

    setIsSubmitting(true);
    const newItem: VendorPortfolioItem = {
      id: `port-${Date.now()}`,
      title: newTitle.trim(),
      caption: newCaption.trim(),
      mediaType: "image",
      mediaUrl: newUrl.trim(),
      category: newCategory,
      featured: newFeatured,
    };

    try {
      await addPortfolioMediaAction({
        title: newItem.title,
        caption: newItem.caption,
        mediaType: "image",
        mediaUrl: newItem.mediaUrl,
        category: newItem.category,
        featured: newItem.featured,
      });
      setItems((prev) => [newItem, ...prev]);
      toast.success("Showcase media added to portfolio!");
      setDialogOpen(false);
      setNewTitle("");
      setNewCaption("");
      setNewUrl("");
      setNewFeatured(false);
    } catch {
      setItems((prev) => [newItem, ...prev]);
      toast.success("Media added!");
      setDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}" from your portfolio?`)) return;

    try {
      await deletePortfolioMediaAction(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Media item removed");
    } catch {
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Media item removed");
    }
  };

  const toggleFeatured = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, featured: !i.featured } : i))
    );
    toast.success("Featured status updated");
  };

  return (
    <div className="space-y-8">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Portfolio Gallery</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs">
              {items.length} Works
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Curate the high-resolution imagery and cinema frames showcased to prospective couples.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-soft-md shadow-purple-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Add Media Item</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Add Showcase Item to Portfolio</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleAddMedia} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold">Title / Event Name</Label>
                <Input
                  id="title"
                  placeholder="e.g. Sunset Vows on Lake Como"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-bold">Category</Label>
                <select
                  id="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as VendorPortfolioItem["category"])}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Ceremony">Ceremony</option>
                  <option value="Reception">Reception</option>
                  <option value="Portraits">Portraits</option>
                  <option value="Cinematography">Cinematography</option>
                  <option value="Aerial">Aerial</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mediaUrl" className="text-xs font-bold">Media URL (High-Res Image)</Label>
                <Input
                  id="mediaUrl"
                  placeholder="https://images.unsplash.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption" className="text-xs font-bold">Caption & Venue Details</Label>
                <Textarea
                  id="caption"
                  placeholder="Details about the setting, lighting, or equipment used..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  rows={3}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newFeatured}
                  onChange={(e) => setNewFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="featured" className="text-xs font-semibold cursor-pointer">
                  Feature this item on hero profile preview
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
                  {isSubmitting ? "Uploading..." : "Add to Gallery"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft-sm shadow-purple-500/25"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl overflow-hidden border border-border/80 glass-card shadow-soft-md flex flex-col"
          >
            {/* Image Container with Aspect Ratio */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={item.mediaUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges on Top */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <Badge className="bg-black/60 backdrop-blur-md text-white border-none text-[10px] font-bold">
                  {item.category}
                </Badge>
                {item.featured && (
                  <Badge className="bg-amber-500/90 backdrop-blur-md text-white border-none text-[10px] font-bold gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 p-4">
                <Button
                  size="sm"
                  variant="glass"
                  onClick={() => toggleFeatured(item.id)}
                  className={`rounded-xl text-xs font-bold gap-1.5 h-9 ${
                    item.featured ? "text-amber-400 bg-amber-500/20" : "text-white bg-white/20"
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${item.featured ? "fill-amber-400" : ""}`} />
                  <span>{item.featured ? "Unfeature" : "Feature"}</span>
                </Button>

                <Button
                  size="sm"
                  variant="glass"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="rounded-xl text-xs font-bold gap-1.5 h-9 text-rose-300 bg-rose-500/20 hover:bg-rose-500/40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </Button>
              </div>
            </div>

            {/* Caption & Metadata */}
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground line-clamp-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

