'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { posthog } from '@/lib/posthog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAllPlatforms, getInstructions, type Platform } from '@/lib/deployment-instructions'
import { useBusinessContext } from '@/components/business-context'
import { UpgradeGate } from '@/components/upgrade-gate'

interface Faq {
  question: string
  answer: string
}

interface FaqResult {
  businessName: string
  faqs: Faq[]
  schema: Record<string, unknown>
  isDemo: boolean
}

export default function FaqBuilderPage() {
  const { plan } = useBusinessContext()
  const [businessName, setBusinessName] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [services, setServices] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FaqResult | null>(null)
  const [copied, setCopied] = useState<'html' | 'schema' | null>(null)
  const [platform, setPlatform] = useState<Platform>('generic')
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!businessName || !category || !city || !state) return
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch('/api/generate/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          category,
          city,
          state,
          services: services ? services.split(',').map(s => s.trim()).filter(Boolean) : [],
          count: 20,
        }),
      })
      const data = await res.json()
      setResult(data)
      try { posthog.capture('tool_used', { tool: 'faq' }) } catch {}
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const generateHtml = () => {
    if (!result) return ''
    let html = `<section id="faq">\n  <h2>Frequently Asked Questions — ${result.businessName}</h2>\n`
    result.faqs.forEach(faq => {
      html += `\n  <div class="faq-item">\n    <h3>${faq.question}</h3>\n    <p>${faq.answer}</p>\n  </div>\n`
    })
    html += `\n</section>\n\n<!-- FAQ Schema Markup — paste in your <head> tag -->\n<script type="application/ld+json">\n${JSON.stringify(result.schema, null, 2)}\n</script>`
    return html
  }

  const copyToClipboard = async (text: string, type: 'html' | 'schema') => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const categories = [
    'Plumber', 'HVAC Contractor', 'Electrician', 'Roofer', 'Dentist',
    'Lawyer', 'Landscaper', 'Painter', 'Auto Mechanic', 'Chiropractor',
    'Real Estate Agent', 'Accountant', 'Veterinarian', 'Cleaning Service',
    'Pest Control', 'Moving Company', 'Handyman', 'General Contractor',
  ]

  return (
    <div className="space-y-8">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2D3436]">FAQ Page Builder</h1>
        <p className="text-[#636E72] mt-1">
          Generate FAQ content that AI search engines love to cite. When someone asks ChatGPT about your service, these answers show up.
        </p>
      </div>

      {plan === 'free' && (
        <UpgradeGate
          feature="FAQ Generator"
          currentPlan={plan}
          requiredPlan="solo"
          previewMode="limit"
          usageCount={result ? 1 : 0}
          usageLimit={1}
          suggestDfy={true}
          dfyContext="Want these installed on your site with proper schema markup?"
        >
          <span />
        </UpgradeGate>
      )}

      {/* Input form */}
      <Card className="bg-white border-[#DFE6E9]">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="faq-businessName" className="block text-sm font-medium text-[#2D3436] mb-1.5">Business Name</label>
              <input
                id="faq-businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Thompson Plumbing"
                className="w-full bg-white border border-[#DFE6E9] rounded-lg px-4 py-2.5 text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50"
              />
            </div>
            <div>
              <label htmlFor="faq-category" className="block text-sm font-medium text-[#2D3436] mb-1.5">Business Type</label>
              <select
                id="faq-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-[#DFE6E9] rounded-lg px-4 py-2.5 text-[#2D3436] focus:outline-none focus:border-[#FF6B35]/50"
              >
                <option value="" className="bg-white">Select your business type...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-white">{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="faq-city" className="block text-sm font-medium text-[#2D3436] mb-1.5">City</label>
              <input
                id="faq-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Burnsville"
                className="w-full bg-white border border-[#DFE6E9] rounded-lg px-4 py-2.5 text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50"
              />
            </div>
            <div>
              <label htmlFor="faq-state" className="block text-sm font-medium text-[#2D3436] mb-1.5">State</label>
              <input
                id="faq-state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="MN"
                className="w-full bg-white border border-[#DFE6E9] rounded-lg px-4 py-2.5 text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="faq-services" className="block text-sm font-medium text-[#2D3436] mb-1.5">Services (optional, comma-separated)</label>
            <input
              id="faq-services"
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Water heater repair, drain cleaning, sewer line replacement, faucet installation"
              className="w-full bg-white border border-[#DFE6E9] rounded-lg px-4 py-2.5 text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading || !businessName || !category || !city || !state}
            className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold"
          >
            {loading ? 'Generating FAQs...' : 'Generate FAQ Page'}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D3436]">
              {result.faqs.length} FAQs Generated {result.isDemo && <span className="text-xs text-[#636E72]/60 font-normal ml-2">(demo data)</span>}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateHtml(), 'html')}
                className="border-[#DFE6E9] text-[#2D3436] hover:text-[#1B2A4A]"
              >
                {copied === 'html' ? '✓ Copied!' : 'Copy HTML + Schema'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(JSON.stringify(result.schema, null, 2), 'schema')}
                className="border-[#DFE6E9] text-[#2D3436] hover:text-[#1B2A4A]"
              >
                {copied === 'schema' ? '✓ Copied!' : 'Copy Schema Only'}
              </Button>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="space-y-3">
            {result.faqs.map((faq, i) => (
              <Card key={i} className="bg-white border-[#DFE6E9]">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-[#2D3436] text-sm mb-2">{faq.question}</h3>
                  <p className="text-[#636E72] text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Schema Preview */}
          <Card className="bg-white border-[#DFE6E9]">
            <CardContent className="p-5">
              <h3 className="font-semibold text-[#2D3436] text-sm mb-3">📋 Schema Markup (paste in your website&apos;s &lt;head&gt; tag)</h3>
              <pre className="bg-white rounded-lg p-4 overflow-x-auto text-xs text-green-400 max-h-64 overflow-y-auto">
                {JSON.stringify(result.schema, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Platform-specific instructions */}
          <Card className="bg-[#FF6B35]/5 border-[#FF6B35]/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#FF6B35] text-sm">📧 How to add this to your website</h3>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="bg-white border border-[#DFE6E9] rounded px-2 py-1 text-xs text-[#2D3436] focus:outline-none focus:border-[#FF6B35]/50"
                >
                  {getAllPlatforms().map(p => (
                    <option key={p.id} value={p.id} className="bg-white">{p.name}</option>
                  ))}
                </select>
              </div>
              <ol className="text-[#636E72] text-sm space-y-2 list-decimal list-inside">
                {getInstructions(platform).faqHtml.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              {getInstructions(platform).pitfalls.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#DFE6E9]">
                  <p className="text-[#636E72] text-xs font-medium mb-1">⚠️ Watch out for:</p>
                  <ul className="text-[#636E72] text-xs space-y-1 list-disc list-inside">
                    {getInstructions(platform).pitfalls.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">💬</span>
          <h2 className="text-xl font-bold text-[#2D3436] mb-2">AI-Optimized FAQ Content</h2>
          <p className="text-[#636E72] max-w-lg mx-auto">
            We generate questions the way real people ask AI — &quot;How much does a water heater cost in Burnsville?&quot; — with direct, citable answers. Includes schema markup so Google and ChatGPT can parse it instantly.
          </p>
        </div>
      )}
    </div>
  )
}
