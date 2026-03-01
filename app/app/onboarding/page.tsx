'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const BUSINESS_CATEGORIES = [
  'Plumber', 'HVAC Technician', 'Dentist', 'Roofer', 'Lawyer',
  'Electrician', 'Landscaper', 'Pest Control', 'House Painter',
  'Auto Repair', 'Chiropractor', 'Physical Therapist', 'Other',
]

interface BusinessData {
  name: string
  category: string
  primary_city: string
  primary_state: string
  phone: string
  website: string
  service_areas: string[]
}

interface GeneratedPost {
  title: string
  body: string
  call_to_action: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [areaInput, setAreaInput] = useState('')
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null)
  const [copied, setCopied] = useState(false)

  const [data, setData] = useState<BusinessData>({
    name: '', category: '', primary_city: '', primary_state: '',
    phone: '', website: '', service_areas: [],
  })

  const update = (field: keyof BusinessData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }))

  const addArea = () => {
    if (areaInput.trim() && !data.service_areas.includes(areaInput.trim())) {
      setData(prev => ({ ...prev, service_areas: [...prev.service_areas, areaInput.trim()] }))
      setAreaInput('')
    }
  }

  const removeArea = (area: string) =>
    setData(prev => ({ ...prev, service_areas: prev.service_areas.filter(a => a !== area) }))

  const saveBusiness = async () => {
    const res = await fetch('/api/businesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    return json.business?.id
  }

  const generateFirstPost = async (businessId?: string) => {
    try {
      const res = await fetch('/api/generate/gbp-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          post_type: 'whats_new',
          business_name: data.name,
          business_category: data.category,
          primary_city: data.primary_city,
          service_areas: data.service_areas,
        }),
      })
      const json = await res.json()
      // Ensure we have content — fall back to mock if API failed
      if (!json.title && !json.body) {
        return {
          title: `${data.name} — Trusted ${data.category} in ${data.primary_city}`,
          body: `Looking for a reliable ${data.category.toLowerCase()} in ${data.primary_city}? ${data.name} has been proudly serving the community with professional service.\n\nWhether it's a routine check or an emergency, our team is ready.\n\n✅ Licensed & insured\n✅ Same-day service available\n✅ Transparent pricing`,
          call_to_action: 'CALL',
        }
      }
      return json
    } catch {
      return {
        title: `${data.name} — Trusted ${data.category} in ${data.primary_city}`,
        body: `Looking for a reliable ${data.category.toLowerCase()} in ${data.primary_city}? ${data.name} has been proudly serving the community with professional service.\n\nWhether it's a routine check or an emergency, our team is ready.\n\n✅ Licensed & insured\n✅ Same-day service available\n✅ Transparent pricing`,
        call_to_action: 'CALL',
      }
    }
  }

  const handleStep3Continue = async (plan: string) => {
    if (plan !== 'free') {
      // TODO: Stripe checkout — for now continue on free
    }
    setLoading(true)
    const businessId = await saveBusiness()
    const post = await generateFirstPost(businessId)
    setGeneratedPost(post)
    setLoading(false)
    setStep(4)
  }

  const copyPost = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(`${generatedPost.title}\n\n${generatedPost.body}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const steps = ['Business Info', 'Service Areas', 'Choose Plan', 'First Post']

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-4 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <span className="text-2xl">🔦</span>
        <span className="text-white font-bold text-xl">LocalBeacon.ai</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i + 1 === step ? 'bg-[#FFD700] text-black' :
              i + 1 < step ? 'bg-[#FFD700]/30 text-[#FFD700]' :
              'bg-white/10 text-white/30'
            }`}>
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${i + 1 === step ? 'text-white' : 'text-white/30'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-white/10 mx-1" />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg">
        {/* Step 1: Business Basics */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Tell us about your business</h1>
            <p className="text-white/50 mb-8">We&apos;ll use this to generate locally-targeted content.</p>
            <div className="space-y-5">
              <div>
                <Label className="text-white/70 mb-2 block">Business Name *</Label>
                <Input
                  placeholder="e.g. Johnson Plumbing & Heating"
                  value={data.name}
                  onChange={e => update('name', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"
                />
              </div>
              <div>
                <Label className="text-white/70 mb-2 block">Business Type *</Label>
                <select
                  value={data.category}
                  onChange={e => update('category', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 focus:border-[#FFD700]/50 focus:outline-none"
                >
                  <option value="" className="bg-zinc-900">Select your business type...</option>
                  {BUSINESS_CATEGORIES.map(c => (
                    <option key={c} value={c} className="bg-zinc-900">{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/70 mb-2 block">City *</Label>
                  <Input
                    placeholder="e.g. Burnsville"
                    value={data.primary_city}
                    onChange={e => update('primary_city', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"
                  />
                </div>
                <div>
                  <Label className="text-white/70 mb-2 block">State *</Label>
                  <Input
                    placeholder="e.g. MN"
                    maxLength={2}
                    value={data.primary_state}
                    onChange={e => update('primary_state', e.target.value.toUpperCase())}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/70 mb-2 block">Phone Number</Label>
                <Input
                  placeholder="e.g. (612) 555-0100"
                  value={data.phone}
                  onChange={e => update('phone', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"
                />
              </div>
              <div>
                <Label className="text-white/70 mb-2 block">Website <span className="text-white/30">(optional)</span></Label>
                <Input
                  placeholder="e.g. https://johnsonplumbing.com"
                  value={data.website}
                  onChange={e => update('website', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!data.name || !data.category || !data.primary_city || !data.primary_state}
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold h-11 mt-2"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Service Areas */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Where do you serve?</h1>
            <p className="text-white/50 mb-8">Add cities and neighborhoods you cover. We&apos;ll create local pages for each one.</p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Minneapolis, Apple Valley, Lakeville..."
                  value={areaInput}
                  onChange={e => setAreaInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addArea()}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50"
                />
                <Button onClick={addArea} variant="outline" className="border-white/10 text-white hover:bg-white/5 shrink-0">
                  Add
                </Button>
              </div>
              {data.service_areas.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-lg border border-white/10">
                  {data.service_areas.map(area => (
                    <Badge
                      key={area}
                      className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 cursor-pointer hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      onClick={() => removeArea(area)}
                    >
                      {area} ×
                    </Badge>
                  ))}
                </div>
              )}
              {data.service_areas.length === 0 && (
                <p className="text-white/30 text-sm text-center py-4">No service areas added yet. We&apos;ll default to {data.primary_city}.</p>
              )}
              <div className="flex gap-3 pt-2">
                <Button onClick={() => setStep(1)} variant="outline" className="border-white/10 text-white/50 hover:bg-white/5 flex-1">
                  ← Back
                </Button>
                <Button onClick={() => setStep(3)} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold flex-1">
                  Continue →
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Plan Selection */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Choose your plan</h1>
            <p className="text-white/50 mb-8">Start free, upgrade anytime.</p>
            <div className="space-y-3">
              {[
                {
                  plan: 'free', name: 'Free', price: '$0', badge: null,
                  features: ['5 GBP posts/month', '3 service area pages', '1 business location', 'Copy-paste mode'],
                  cta: 'Start Free',
                },
                {
                  plan: 'solo', name: 'Solo', price: '$29/mo', badge: 'Most Popular',
                  features: ['Unlimited GBP posts', '10 service area pages', '3 locations', '1 blog post/month', 'Review response drafts'],
                  cta: 'Start Solo →',
                },
                {
                  plan: 'agency', name: 'Agency', price: '$79/mo', badge: null,
                  features: ['Everything unlimited', 'Multi-client dashboard', 'White-label reports', 'Priority support'],
                  cta: 'Start Agency →',
                },
              ].map(({ plan, name, price, badge, features, cta }) => (
                <Card
                  key={plan}
                  className={`border cursor-pointer transition-all ${
                    plan === 'solo'
                      ? 'border-[#FFD700]/50 bg-[#FFD700]/5'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                  onClick={() => handleStep3Continue(plan)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-lg">{name}</span>
                        {badge && <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 text-xs">{badge}</Badge>}
                      </div>
                      <span className="text-[#FFD700] font-bold">{price}</span>
                    </div>
                    <ul className="space-y-1">
                      {features.map(f => (
                        <li key={f} className="text-white/60 text-sm flex items-center gap-2">
                          <span className="text-[#FFD700]">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-4 font-semibold ${
                        plan === 'solo'
                          ? 'bg-[#FFD700] text-black hover:bg-[#FFD700]/90'
                          : 'bg-white/10 text-white hover:bg-white/15'
                      }`}
                      disabled={loading}
                    >
                      {loading ? 'Setting up...' : cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="text-white/30 text-sm mt-4 w-full text-center hover:text-white/50">
              ← Back
            </button>
          </div>
        )}

        {/* Step 4: First Generated Post */}
        {step === 4 && (
          <div>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-white mb-2">Your first Google post is ready!</h1>
              <p className="text-white/50">Copy it and paste it into your Google Business Profile right now.</p>
            </div>
            {generatedPost && (
              <Card className="bg-white/5 border-[#FFD700]/30 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs">GBP Post — Draft</Badge>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-3">{generatedPost.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{generatedPost.body}</p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-white/30 text-xs">CTA: {generatedPost.call_to_action}</span>
                    <Button
                      size="sm"
                      onClick={copyPost}
                      className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs"
                    >
                      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <p className="text-white/50 text-sm text-center">
                📱 To post: Open <strong className="text-white">Google Maps</strong> → find your business → <strong className="text-white">Add post</strong> → paste this content
              </p>
            </div>
            <Button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold h-11"
            >
              Go to Dashboard →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
