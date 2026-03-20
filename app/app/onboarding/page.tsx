'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { posthog } from '@/lib/posthog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

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

function OnboardingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [areaInput, setAreaInput] = useState('')
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null)
  const [copied, setCopied] = useState(false)
  const [prefillScore, setPrefillScore] = useState<number | null>(null)
  const [showDfyDialog, setShowDfyDialog] = useState(false)

  const [data, setData] = useState<BusinessData>({
    name: '', category: '', primary_city: '', primary_state: '',
    phone: '', website: '', service_areas: [],
  })

  // Pre-fill from /check query params + localStorage scan data
  useEffect(() => {
    const urlParam = searchParams.get('url')
    const scoreParam = searchParams.get('score')

    // Try localStorage first (set by /check before redirect to sign-up)
    let scanData: { url?: string; score?: number; email?: string } = {}
    try {
      const stored = localStorage.getItem('lb_scan_data')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Only use if less than 1 hour old
        if (parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
          scanData = parsed
        }
        localStorage.removeItem('lb_scan_data') // One-time use
      }
    } catch {}

    const website = urlParam || scanData.url
    if (website) {
      // Try to extract business name from the domain
      const domain = website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].split('.')[0]
      const guessedName = domain
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())

      setData(prev => ({
        ...prev,
        website: website,
        // Only set name if it looks like a real business name (not "example" or single char)
        name: guessedName.length > 2 && guessedName.toLowerCase() !== 'www' ? guessedName : prev.name,
      }))
    }

    const score = scoreParam ? parseInt(scoreParam, 10) : scanData.score
    if (score && !isNaN(score)) setPrefillScore(score)
  }, [searchParams])

  const update = (field: keyof BusinessData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }))

  const goToStep = (s: number) => {
    // Auto-add primary city as first service area when entering Step 2
    if (s === 2 && data.primary_city && !data.service_areas.includes(data.primary_city)) {
      setData(prev => ({ ...prev, service_areas: [prev.primary_city, ...prev.service_areas] }))
    }
    setStep(s)
    try { posthog.capture('onboarding_step', { step: s }) } catch {}
  }

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

    const handleGeneratePost = async () => {
    setLoading(true)
    const businessId = await saveBusiness()
    const post = await generateFirstPost(businessId)
    setGeneratedPost(post)
    setLoading(false)
    goToStep(3)
  }

  // Keep for DFY dialog and pricing page checkout flows
  const handleStep3Continue = async (plan: string) => {
    if (plan === 'dfy') {
      setShowDfyDialog(true)
      return
    }
    setLoading(true)
    const businessId = await saveBusiness()
    if (plan !== 'free') {
      try {
        const planKey = plan === 'solo' ? 'SOLO' : 'DFY'
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: planKey }),
        })
        const json = await res.json()
        if (json.url) {
          window.location.href = json.url
          return
        }
      } catch {
        // Fall through to free flow if checkout fails
      }
    }
    const post = await generateFirstPost(businessId)
    setGeneratedPost(post)
    setLoading(false)
    goToStep(3)
  }

  const handleDfyConfirm = async () => {
    setShowDfyDialog(false)
    setLoading(true)
    await saveBusiness()
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'DFY' }),
      })
      const json = await res.json()
      if (json.url) {
        window.location.href = json.url
        return
      }
    } catch {
      // Fall through
    }
    setLoading(false)
  }

  const copyPost = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(`${generatedPost.title}\n\n${generatedPost.body}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const steps = ['Business Info', 'Service Areas', 'First Post', "What's Next"]

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center px-4 py-12">
      {/* Logo — links home as escape hatch */}
      <a href="/" className="flex items-center gap-2 mb-10 no-underline hover:opacity-80 transition-opacity">
        <img src="/logo-192.png" alt="LocalBeacon" style={{ height: "36px", width: "36px" }} />
        <span className="text-[#1B2A4A] font-bold text-xl">LocalBeacon.ai</span>
      </a>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i + 1 === step ? 'bg-[#FF6B35] text-white' :
              i + 1 < step ? 'bg-[#FF6B35]/20 text-[#FF6B35]' :
              'bg-[#DFE6E9] text-[#636E72]'
            }`}>
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${i + 1 === step ? 'text-[#1B2A4A]' : 'text-[#636E72]'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-[#DFE6E9] mx-1" />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg">
        {/* Step 1: Business Basics */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-[#1B2A4A] mb-2">2 minutes to your first AI-optimized Google post</h1>
            <div className="flex items-center gap-3 mb-8">
              <p className="text-[#636E72]">Tell us about your business and we&apos;ll generate your first post.</p>
              {prefillScore !== null && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30">
                  Score: {prefillScore}/100
                </span>
              )}
            </div>
            <div className="space-y-5">
              <div>
                <Label htmlFor="onboarding-name" className="text-[#2D3436] mb-2 block">Business Name *</Label>
                <Input
                  id="onboarding-name"
                  placeholder="e.g. Johnson Plumbing & Heating"
                  value={data.name}
                  onChange={e => update('name', e.target.value)}
                  className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/50 focus:border-[#FF6B35]/50"
                />
              </div>
              <div>
                <Label htmlFor="onboarding-category" className="text-[#2D3436] mb-2 block">Business Type *</Label>
                <select
                  id="onboarding-category"
                  value={data.category}
                  onChange={e => update('category', e.target.value)}
                  className="w-full bg-white border border-[#DFE6E9] text-[#2D3436] rounded-md px-3 py-2 focus:border-[#FF6B35]/50 focus:outline-none"
                >
                  <option value="">Select your business type...</option>
                  {BUSINESS_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="onboarding-city" className="text-[#2D3436] mb-2 block">City *</Label>
                  <Input
                    id="onboarding-city"
                    placeholder="e.g. Burnsville"
                    value={data.primary_city}
                    onChange={e => update('primary_city', e.target.value)}
                    className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/50 focus:border-[#FF6B35]/50"
                  />
                </div>
                <div>
                  <Label htmlFor="onboarding-state" className="text-[#2D3436] mb-2 block">State *</Label>
                  <select
                    id="onboarding-state"
                    value={data.primary_state}
                    onChange={e => update('primary_state', e.target.value)}
                    className="w-full bg-white border border-[#DFE6E9] text-[#2D3436] rounded-md px-3 py-2 focus:border-[#FF6B35]/50 focus:outline-none"
                  >
                    <option value="">State...</option>
                    {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="onboarding-website" className="text-[#2D3436] mb-2 block">Website <span className="text-[#636E72]">(optional)</span></Label>
                <Input
                  id="onboarding-website"
                  placeholder="e.g. https://johnsonplumbing.com"
                  value={data.website}
                  onChange={e => update('website', e.target.value)}
                  className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/50 focus:border-[#FF6B35]/50"
                />
              </div>
              <Button
                onClick={() => goToStep(2)}
                disabled={!data.name || !data.category || !data.primary_city || !data.primary_state}
                className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold h-11 mt-2"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Service Areas */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-[#1B2A4A] mb-2">Where do you serve?</h1>
            <p className="text-[#636E72] mb-8">Add cities and neighborhoods you cover. We&apos;ll create local pages for each one.</p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Minneapolis, Apple Valley, Lakeville..."
                  value={areaInput}
                  onChange={e => setAreaInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addArea()}
                  className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/50 focus:border-[#FF6B35]/50"
                />
                <Button onClick={addArea} variant="outline" className="border-[#DFE6E9] text-[#1B2A4A] hover:bg-[#DFE6E9]/50 shrink-0">
                  Add
                </Button>
              </div>
              {data.service_areas.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg border border-[#DFE6E9]">
                  {data.service_areas.map(area => (
                    <Badge
                      key={area}
                      className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/30 cursor-pointer hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-colors"
                      onClick={() => removeArea(area)}
                    >
                      {area} ×
                    </Badge>
                  ))}
                </div>
              )}
              {data.service_areas.length === 0 && (
                <p className="text-[#636E72] text-sm text-center py-4">No service areas added yet. We&apos;ll default to {data.primary_city}.</p>
              )}
              <div className="flex gap-3 pt-2">
                <Button onClick={() => goToStep(1)} variant="outline" className="border-[#DFE6E9] text-[#636E72] hover:bg-[#DFE6E9]/50 flex-1">
                  ← Back
                </Button>
                <Button onClick={handleGeneratePost} disabled={loading} className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold flex-1">
                  {loading ? 'Generating your first post...' : 'Generate First Post →'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Plan selection removed — all users start on Free, upgrade from dashboard */}

        {/* Step 3: First Generated Post */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-[#1B2A4A] mb-2">Your first Google post is ready!</h1>
              <p className="text-[#636E72]">Copy it and paste it into your Google Business Profile right now.</p>
            </div>
            {generatedPost && (
              <Card className="bg-white border-[#FF6B35]/30 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/30 text-xs">GBP Post — Draft</Badge>
                  </div>
                  <h3 className="text-[#1B2A4A] font-semibold text-base mb-3">{generatedPost.title}</h3>
                  <p className="text-[#636E72] text-sm leading-relaxed whitespace-pre-line">{generatedPost.body}</p>
                  <div className="mt-4 pt-4 border-t border-[#DFE6E9] flex items-center justify-between">
                    <span className="text-[#636E72]/50 text-xs">Suggested action: {generatedPost.call_to_action === 'CALL' ? 'Call Now' : generatedPost.call_to_action}</span>
                    <Button
                      size="sm"
                      onClick={copyPost}
                      className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold text-xs"
                    >
                      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="bg-white border border-[#DFE6E9] rounded-lg p-4 mb-6">
              <p className="text-[#636E72] text-sm text-center">
                📱 To post: Open <strong className="text-[#1B2A4A]">Google Maps</strong> → find your business → <strong className="text-[#1B2A4A]">Add post</strong> → paste this content
              </p>
            </div>
            <Button
              onClick={() => goToStep(4)}
              className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold h-11"
            >
              See What's Next →
            </Button>
          </div>
        )}

        {/* Step 4: What's Next */}
        {step === 4 && (
          <div>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🚀</div>
              <h1 className="text-2xl font-bold text-[#1B2A4A] mb-2">You&apos;re all set!</h1>
              <p className="text-[#636E72]">Here&apos;s everything you can do to boost your AI visibility.</p>
            </div>

            <div className="space-y-3 mb-8">
              {/* Completed */}
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-500 text-xl flex-shrink-0">✅</span>
                <div>
                  <p className="text-[#1B2A4A] font-semibold text-sm">Business profile created</p>
                  <p className="text-[#636E72] text-xs">Your business info is saved and ready to use</p>
                </div>
              </div>

              {/* Primary CTA — AI Readiness Scan */}
              <a
                href="/dashboard/ai-readiness"
                className="flex items-center gap-3 p-5 bg-[#FF6B35] rounded-lg hover:bg-[#FF6B35]/90 transition-colors group"
              >
                <span className="text-2xl flex-shrink-0">🔍</span>
                <div className="flex-1">
                  <p className="text-white font-bold text-base">Run your AI Readiness scan</p>
                  <p className="text-white/80 text-sm">See how visible your business is to ChatGPT, Perplexity & Google AI</p>
                </div>
                <span className="text-white text-lg flex-shrink-0">→</span>
              </a>

              {/* Secondary actions */}
              {[
                {
                  href: '/dashboard/llms-txt',
                  emoji: '📄',
                  title: 'Generate your llms.txt file',
                  desc: 'Help AI search engines discover and recommend your business',
                },
                {
                  href: '/dashboard/audit',
                  emoji: '🏥',
                  title: 'Check your listing health',
                  desc: 'Find gaps in your Google Business Profile and local citations',
                },
                {
                  href: '/dashboard',
                  emoji: '📊',
                  title: 'View your dashboard',
                  desc: 'See all your generated content and manage your local presence',
                },
              ].map(({ href, emoji, title, desc }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-4 bg-white border border-[#DFE6E9] rounded-lg hover:border-[#FF6B35]/50 hover:bg-[#FFF8F0] transition-colors group"
                >
                  <span className="text-xl flex-shrink-0">{emoji}</span>
                  <div className="flex-1">
                    <p className="text-[#1B2A4A] font-semibold text-sm group-hover:text-[#FF6B35] transition-colors">{title}</p>
                    <p className="text-[#636E72] text-xs">{desc}</p>
                  </div>
                  <span className="text-[#FF6B35] text-lg flex-shrink-0">→</span>
                </a>
              ))}
            </div>

            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="w-full border-[#DFE6E9] text-[#636E72] hover:bg-[#DFE6E9]/50 font-semibold h-11"
            >
              Skip to Dashboard →
            </Button>
          </div>
        )}
      </div>

      {/* DFY Confirmation Dialog */}
      <Dialog open={showDfyDialog} onOpenChange={setShowDfyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm DFY Setup — $499</DialogTitle>
            <DialogDescription>
              You&apos;re about to start a $499 one-time DFY Setup. This includes schema markup, llms.txt, FAQs, and a full AEO audit — all implemented for you. Continue to checkout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDfyDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDfyConfirm}
              className="flex-1 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white hover:from-[#DAA520] hover:to-[#FFD700] font-semibold"
            >
              Continue to Checkout →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center"><span className="text-[#636E72]">Loading...</span></div>}>
      <OnboardingContent />
    </Suspense>
  )
}
