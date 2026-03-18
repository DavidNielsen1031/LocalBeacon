"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    website: "",
    description: "",
    service_areas: "",
    specialties: "",
  });

  useEffect(() => {
    // Load existing business data
    fetch("/api/businesses")
      .then((res) => res.json())
      .then((data) => {
        if (data.business) {
          setForm({
            name: data.business.name || "",
            phone: data.business.phone || "",
            address: data.business.address || "",
            city: data.business.city || "",
            state: data.business.state || "",
            zip: data.business.zip || "",
            website: data.business.website || "",
            description: data.business.description || "",
            service_areas: data.business.service_areas || "",
            specialties: data.business.specialties || "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // Silently fail — form stays as-is
    } finally {
      setSaving(false);
    }
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 px-6 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2D3436]">Settings</h1>
        <p className="text-[#636E72] mt-1 text-sm">
          Your business details are used to personalize all generated content.
        </p>
      </div>

      {/* Business Info */}
      <Card className="bg-white border-[#DFE6E9] mb-6">
        <CardHeader>
          <CardTitle className="text-[#2D3436] text-base">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-[#2D3436] text-sm mb-1.5 block">Business Name</Label>
            <Input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Mike's Plumbing"
              className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[#2D3436] text-sm mb-1.5 block">Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(555) 123-4567"
                className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
                disabled={loading}
              />
            </div>
            <div>
              <Label className="text-[#2D3436] text-sm mb-1.5 block">Website</Label>
              <Input
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://yourbusiness.com"
                className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <Label className="text-[#2D3436] text-sm mb-1.5 block">Street Address</Label>
            <Input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="123 Main St"
              className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-[#2D3436] text-sm mb-1.5 block">City</Label>
              <Input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Denver"
                className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
                disabled={loading}
              />
            </div>
            <div>
              <Label className="text-[#2D3436] text-sm mb-1.5 block">State</Label>
              <Input
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                placeholder="CO"
                className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
                disabled={loading}
              />
            </div>
            <div>
              <Label className="text-[#2D3436] text-sm mb-1.5 block">ZIP</Label>
              <Input
                value={form.zip}
                onChange={(e) => update("zip", e.target.value)}
                placeholder="80202"
                className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <Label className="text-[#2D3436] text-sm mb-1.5 block">Business Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe what your business does, who you serve, and what makes you different..."
              className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60 min-h-[80px]"
              disabled={loading}
            />
          </div>
          <div>
            <Label className="text-[#2D3436] text-sm mb-1.5 block">Service Areas</Label>
            <Input
              value={form.service_areas}
              onChange={(e) => update("service_areas", e.target.value)}
              placeholder="Denver, Lakewood, Aurora, Arvada"
              className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
              disabled={loading}
            />
            <p className="text-[#636E72]/60 text-xs mt-1">Comma-separated cities or neighborhoods</p>
          </div>
          <div>
            <Label className="text-[#2D3436] text-sm mb-1.5 block">Specialties</Label>
            <Input
              value={form.specialties}
              onChange={(e) => update("specialties", e.target.value)}
              placeholder="Emergency plumbing, drain cleaning, water heater installation"
              className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
              disabled={loading}
            />
            <p className="text-[#636E72]/60 text-xs mt-1">Comma-separated services you offer</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSave}
              disabled={saving || loading}
              className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold text-sm"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            {saved && (
              <span className="text-green-400 text-sm">✓ Saved</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card className="bg-white border-[#DFE6E9]">
        <CardHeader>
          <CardTitle className="text-[#2D3436] text-base flex items-center gap-2">
            Subscription
            <Badge className="bg-white text-[#636E72] border-[#DFE6E9] text-xs">
              Free Plan
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#636E72] text-sm mb-4">
            You are on the Free plan. Upgrade to unlock unlimited post drafts, AI review replies,
            and full AI Readiness recommendations.
          </p>
          <Button className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold text-sm">
            Upgrade to Solo — $49/month
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
