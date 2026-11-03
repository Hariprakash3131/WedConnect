"use client";

import * as React from "react";
import { useAuthStore } from "@/store/auth-store";
import { updateCustomerProfileAction } from "@/actions/customer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, MapPin, Shield, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CustomerProfilePage() {
  const { user, setUser } = useAuthStore();
  const [fullName, setFullName] = React.useState(user?.full_name || "Audrey Taylor");
  const [email] = React.useState(user?.email || "audrey@domain.com");
  const [phone, setPhone] = React.useState(user?.phone || "+1 (555) 234-5678");
  const [weddingDate, setWeddingDate] = React.useState("2026-10-18");
  const [weddingCity, setWeddingCity] = React.useState("New York, NY");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateCustomerProfileAction({
        fullName,
        phone,
      });

      if (!res.success) {
        toast.error(res.error || "Failed to update profile");
        setIsSaving(false);
        return;
      }

      if (user) {
        setUser({ ...user, full_name: fullName, phone });
      }
      toast.success("Profile changes saved successfully!");
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-2">
          <User className="w-3.5 h-3.5" />
          <span>Account Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Profile & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Manage your personal details, celebration preferences, and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="md:col-span-8 space-y-6">
          <Card className="glass-card border-border/80">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-bold">Personal Information</CardTitle>
              <CardDescription className="text-xs">
                This information is shared with vendors when you request quotations.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    icon={<User className="w-4 h-4" />}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address (Managed by Supabase Auth)</Label>
                  <Input
                    id="email"
                    disabled
                    value={email}
                    icon={<Mail className="w-4 h-4" />}
                    className="opacity-70 bg-muted/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    icon={<Phone className="w-4 h-4" />}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="weddingDate">Celebration Date</Label>
                    <Input
                      id="weddingDate"
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      icon={<Calendar className="w-4 h-4" />}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="weddingCity">Primary City</Label>
                    <Input
                      id="weddingCity"
                      value={weddingCity}
                      onChange={(e) => setWeddingCity(e.target.value)}
                      icon={<MapPin className="w-4 h-4" />}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={isSaving}
                    className="h-11 px-6 rounded-2xl text-xs font-bold gap-2 shadow-soft-sm"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Save Profile Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Status Summary */}
        <div className="md:col-span-4 space-y-6">
          <Card className="glass-card border-border/80 p-6 space-y-4">
            <h3 className="font-bold text-base text-foreground">Membership Status</h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Account Role</span>
              <Badge variant="luxury" className="text-[10px] font-bold">
                Customer
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Account Status</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Security Protection</span>
              <span className="text-primary font-bold">Supabase RLS</span>
            </div>
          </Card>

          <Card className="glass-card border-border/80 p-6 space-y-3">
            <h3 className="font-bold text-base text-foreground">Concierge Support</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Need assistance negotiating quotes or custom venue site visits?
            </p>
            <Button variant="glass" size="sm" className="w-full text-xs font-semibold">
              Contact VIP Concierge
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

