"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddClientWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (businessId: string) => void
}

const CATEGORIES = [
  "Plumber",
  "HVAC",
  "Dentist",
  "Roofer",
  "Lawyer",
  "Landscaper",
  "Auto Repair",
  "Electrician",
  "Other",
] as const

const SPECIALTIES_MAP: Record<string, string> = {
  Plumber: "drain cleaning, water heater, leak repair, sewer line, faucet repair",
  HVAC: "AC repair, furnace, heat pump, ductwork, thermostat",
  Dentist: "cleaning, fillings, crowns, whitening, implants",
  Roofer: "roof repair, replacement, inspection, gutters, siding",
  Lawyer: "personal injury, family law, estate planning, criminal defense",
  Landscaper: "lawn care, landscape design, tree trimming, irrigation, hardscaping",
  "Auto Repair": "oil change, brake repair, engine diagnostics, tire rotation, transmission",
  Electrician: "wiring, panel upgrades, outlets, lighting, EV charger installation",
  Other: "",
}

interface FormData {
  // Step 1
  name: string
  category: string
  // Step 2
  address: string
  city: string
  state: string
  zip: string
  service_areas: string
  // Step 3
  website: string
  google_listing: string
  phone: string
}

const INITIAL_FORM: FormData = {
  name: "",
  category: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  service_areas: "",
  website: "",
  google_listing: "",
  phone: "",
}

const TOTAL_STEPS = 3

export function AddClientWizard({ open, onOpenChange, onComplete }: AddClientWizardProps) {
  const [step, setStep] = React.useState(1)
  const [form, setForm] = React.useState<FormData>(INITIAL_FORM)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Reset wizard state when dialog opens
  React.useEffect(() => {
    if (open) {
      setStep(1)
      setForm(INITIAL_FORM)
      setError(null)
      setLoading(false)
    }
  }, [open])

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function canAdvance(): boolean {
    if (step === 1) return form.name.trim().length > 0
    if (step === 2) return form.city.trim().length > 0 && form.state.trim().length > 0
    return true
  }

  function handleNext() {
    if (!canAdvance()) return
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function handleBack() {
    setError(null)
    setStep((s) => Math.max(s - 1, 1))
  }

  async function handleFinish() {
    if (loading) return
    setLoading(true)
    setError(null)

    const specialties = SPECIALTIES_MAP[form.category] ?? ""

    const payload = {
      name: form.name,
      category: form.category,
      primary_city: form.city,
      primary_state: form.state,
      address: form.address,
      zip: form.zip,
      service_areas: form.service_areas,
      website: form.website,
      google_listing: form.google_listing,
      phone: form.phone,
      specialties,
      description: "",
      gbp_connected: false,
      force_new: true,
    }

    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? "Failed to create business. Please try again.")
        return
      }

      const businessId: string = data?.business?.id ?? data?.id
      if (!businessId) {
        setError("Unexpected response from server.")
        return
      }

      onComplete(businessId)
      onOpenChange(false)
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={loading ? undefined : onOpenChange}>
      <DialogContent
        className="bg-[#111] border border-white/10 text-white max-w-lg p-0 overflow-hidden"
        showCloseButton={!loading}
      >
        {/* Progress bar */}
        <div className="h-1 w-full bg-white/10">
          <div
            className="h-full bg-[#FFD700] transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        <div className="p-6 flex flex-col gap-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white text-xl font-semibold">
                {step === 1 && "Business Info"}
                {step === 2 && "Location"}
                {step === 3 && "Online Presence"}
              </DialogTitle>
              <span className="text-xs text-white/40 font-mono">
                Step {step}/{TOTAL_STEPS}
              </span>
            </div>
            <p className="text-white/50 text-sm">
              {step === 1 && "Tell us about the client's business."}
              {step === 2 && "Where is the business located?"}
              {step === 3 && "How can customers find this business online?"}
            </p>
          </DialogHeader>

          {/* Step content */}
          <div className="flex flex-col gap-4">
            {step === 1 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 text-sm">
                    Business Name <span className="text-[#FFD700]">*</span>
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. Apex Plumbing LLC"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                    autoFocus
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 text-sm">Category</Label>
                  <select
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className="w-full h-9 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50 focus:ring-2 focus:ring-[#FFD700]/20"
                  >
                    <option value="" className="bg-[#111]">Select a category…</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#111]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {form.category && form.category !== "Other" && (
                  <div className="rounded-md border border-[#FFD700]/20 bg-[#FFD700]/5 px-3 py-2">
                    <p className="text-xs text-white/50 mb-1">Auto-populated specialties</p>
                    <p className="text-xs text-[#FFD700]/80">{SPECIALTIES_MAP[form.category]}</p>
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 text-sm">Street Address</Label>
                  <Input
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="123 Main St"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-white/70 text-sm">
                      City <span className="text-[#FFD700]">*</span>
                    </Label>
                    <Input
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Minneapolis"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-white/70 text-sm">
                      State <span className="text-[#FFD700]">*</span>
                    </Label>
                    <Input
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      placeholder="MN"
                      maxLength={2}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 text-sm">ZIP Code</Label>
                  <Input
                    value={form.zip}
                    onChange={(e) => set("zip", e.target.value)}
                    placeholder="55401"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 text-sm">Service Areas</Label>
                  <Input
                    value={form.service_areas}
                    onChange={(e) => set("service_areas", e.target.value)}
                    placeholder="Apple Valley, Burnsville, Lakeville"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                  />
                  <p className="text-xs text-white/30">Comma-separated cities</p>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 text-sm">Website URL</Label>
                  <Input
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    placeholder="https://example.com"
                    type="url"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                    autoFocus
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 text-sm">Google Business Listing URL</Label>
                  <Input
                    value={form.google_listing}
                    onChange={(e) => set("google_listing", e.target.value)}
                    placeholder="https://maps.google.com/..."
                    type="url"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-white/70 text-sm">Phone</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="(612) 555-0100"
                    type="tel"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"
                  />
                </div>
              </>
            )}

            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* Footer navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1 || loading}
              className="text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30"
            >
              Back
            </Button>

            <div className="flex gap-1.5">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i + 1 === step ? "bg-[#FFD700]" : i + 1 < step ? "bg-[#FFD700]/50" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            {step < TOTAL_STEPS ? (
              <Button
                onClick={handleNext}
                disabled={!canAdvance()}
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold disabled:opacity-40"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={loading}
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold disabled:opacity-40 min-w-[80px]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving…
                  </span>
                ) : (
                  "Add Client"
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddClientWizard
