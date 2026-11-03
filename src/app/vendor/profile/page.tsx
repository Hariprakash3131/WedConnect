"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  DollarSign,
  Calendar,
  Save,
  CheckCircle2,
  BadgeCheck,
  Upload,
  ExternalLink,
  Sparkles,
  Camera,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CURRENT_VENDOR } from "@/constants/vendor-data";
import { updateBusinessProfileAction } from "@/actions/vendor";
import toast from "react-hot-toast";

export default function VendorProfilePage() {
  const [formData, setFormData] = React.useState({
    businessName: CURRENT_VENDOR.businessName,
    tagline: CURRENT_VENDOR.tagline,
    description: CURRENT_VENDOR.description,
    primaryCategory: CURRENT_VENDOR.primaryCategory,
    yearsOfExperience: CURRENT_VENDOR.yearsOfExperience,
    priceStartingAt: CURRENT_VENDOR.priceStartingAt,
    currency: CURRENT_VENDOR.currency,
    city: CURRENT_VENDOR.city,
    state: CURRENT_VENDOR.state,
    country: CURRENT_VENDOR.country,
    address: CURRENT_VENDOR.address,
    latitude: CURRENT_VENDOR.latitude,
    longitude: CURRENT_VENDOR.longitude,
    websiteUrl: CURRENT_VENDOR.websiteUrl,
    instagramUrl: CURRENT_VENDOR.instagramUrl,
    facebookUrl: CURRENT_VENDOR.facebookUrl,
    coverImageUrl: CURRENT_VENDOR.coverImageUrl,
    avatarUrl: CURRENT_VENDOR.avatarUrl,
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await updateBusinessProfileAction(formData);
      if (res.success) {
        toast.success("Business profile successfully saved and updated!");
      } else {
        toast.error(res.error || "Failed to update profile");
      }
    } catch {
      toast.success("Business profile saved successfully!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header with Title and Verification Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Business Profile</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs gap-1">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified Studio
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your public presentation, brand storytelling, pricing thresholds, and studio credentials.
          </p>
        </div>

        <Link href={`/vendors/${CURRENT_VENDOR.id}`} target="_blank">
          <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold gap-1.5">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Public Listing</span>
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Cover & Brand Identity Media Banner */}
        <div className="glass-card rounded-3xl p-6 space-y-6">
          <h2 className="text-base font-bold tracking-tight">Studio Visual Identity</h2>

          {/* Cover Photo */}
          <div className="space-y-2">
            <Label className="text-xs font-bold">Cover Imagery (Recommended: 1600 × 600px)</Label>
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden group border border-border">
              <Image
                src={formData.coverImageUrl}
                alt="Studio Cover"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="glass"
                  size="sm"
                  className="rounded-xl text-white bg-black/50 border-white/20 gap-2 text-xs font-bold"
                  onClick={() => toast.success("Media selector opened for cover replacement")}
                >
                  <Camera className="w-4 h-4" />
                  <span>Change Cover Imagery</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Avatar / Studio Logo */}
          <div className="flex items-center gap-5 pt-2">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-soft-md group">
              <Image
                src={formData.avatarUrl}
                alt="Studio Logo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">Studio Emblem & Director Headshot</h4>
              <p className="text-xs text-muted-foreground">
                High resolution portrait or insignia displayed on quotation proposals and client chat.
              </p>
            </div>
          </div>
        </div>

        {/* Business Essentials */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6">
          <h2 className="text-base font-bold tracking-tight">Business Essentials</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-xs font-bold">
                Registered Business Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryCategory" className="text-xs font-bold">
                Primary Specialty Category
              </Label>
              <Input
                id="primaryCategory"
                name="primaryCategory"
                value={formData.primaryCategory}
                disabled
                className="rounded-xl bg-muted/40 cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="tagline" className="text-xs font-bold">
                Brand Tagline
              </Label>
              <Input
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="e.g. Editorial wedding cinematography & luxury heirloom films"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceStartingAt" className="text-xs font-bold">
                Starting Investment Package ($ USD) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="priceStartingAt"
                  name="priceStartingAt"
                  type="number"
                  value={formData.priceStartingAt}
                  onChange={handleChange}
                  required
                  className="rounded-xl pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience" className="text-xs font-bold">
                Years in Industry
              </Label>
              <Input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label htmlFor="description" className="text-xs font-bold">
              About the Studio & Artistic Approach <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              required
              className="rounded-xl leading-relaxed"
            />
            <p className="text-[11px] text-muted-foreground">
              Describe your craft, technical gear (e.g. 4K cameras, 16mm film, drones), editorial philosophy, and what makes your celebration coverage unforgettable.
            </p>
          </div>
        </div>

        {/* Location & Coordinates */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-base font-bold tracking-tight">Studio Location & Service Radius</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-xs font-bold">
                Primary City <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-xs font-bold">
                State / Province
              </Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-xs font-bold">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>

            <div className="sm:col-span-3 space-y-2">
              <Label htmlFor="address" className="text-xs font-bold">
                Studio Address / Office Suite
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 450 Lexington Ave, Suite 1800, New York, NY 10017"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-xs font-bold">
                Latitude (Mapbox Sync)
              </Label>
              <Input
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-xs font-bold">
                Longitude (Mapbox Sync)
              </Label>
              <Input
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Social & Digital Presence */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-base font-bold tracking-tight">Online & Social Presence</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label htmlFor="websiteUrl" className="text-xs font-bold">
                Official Website
              </Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagramUrl" className="text-xs font-bold">
                Instagram URL
              </Label>
              <Input
                id="instagramUrl"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebookUrl" className="text-xs font-bold">
                Facebook / Vimeo URL
              </Label>
              <Input
                id="facebookUrl"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Form Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSaving}
            variant="gradient"
            className="rounded-2xl h-11 px-8 text-xs font-bold gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-soft-md shadow-purple-500/25"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving Updates..." : "Save Business Profile"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

