'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
  const [businessName, setBusinessName] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [services, setServices] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FaqResult | null>(null)
  const [copied, setCopied] = useState<'html' | 'schema' | null>(null)

  const handleGenerate = async () => {
    if (!businessName || !category || !city || !state) return
    setLoading(true)
    setResult(null)

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
    } catch {
      // fallback
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">FAQ Page Builder</h1>
        <p className="text-white/50 mt-1">
          Generate FAQ content that AI search engines love to cite. When someone asks ChatGPT about your service, these answers show up.
        </p>
      </div>

      {/* Input form */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Thompson Plumbing"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Business Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FFD700]/50"
              >
                <option value="" className="bg-[#111]">Select your business type...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-[#111]">{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Burnsville"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="MN"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Services (optional, comma-separated)</label>
            <input
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Water heater repair, drain cleaning, sewer line replacement, faucet installation"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading || !businessName || !category || !city || !state}
            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
          >
            {loading ? 'Generating FAQs...' : 'Generate FAQ Page'}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              {result.faqs.length} FAQs Generated {result.isDemo && <span className="text-xs text-white/30 font-normal ml-2">(demo data)</span>}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateHtml(), 'html')}
                className="border-white/20 text-white/70 hover:text-white"
              >
                {copied === 'html' ? '✓ Copied!' : 'Copy HTML + Schema'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(JSON.stringify(result.schema, null, 2), 'schema')}
                className="border-white/20 text-white/70 hover:text-white"
              >
                {copied === 'schema' ? '✓ Copied!' : 'Copy Schema Only'}
              </Button>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="space-y-3">
            {result.faqs.map((faq, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-white text-sm mb-2">{faq.question}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Schema Preview */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-5">
              <h3 className="font-semibold text-white text-sm mb-3">📋 Schema Markup (paste in your website&apos;s &lt;head&gt; tag)</h3>
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-xs text-green-400 max-h-64 overflow-y-auto">
                {JSON.stringify(result.schema, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Instructions for Bob */}
          <Card className="bg-[#FFD700]/5 border-[#FFD700]/20">
            <CardContent className="p-5">
              <h3 className="font-semibold text-[#FFD700] text-sm mb-2">📧 Send this to your website person</h3>
              <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
                <li>Click &quot;Copy HTML + Schema&quot; above</li>
                <li>Email it to whoever manages your website</li>
                <li>Tell them: &quot;Please add this FAQ section to our homepage or a new FAQ page, and paste the schema code in the head tag&quot;</li>
                <li>That&apos;s it! AI search engines will start finding these answers within 1-2 weeks of crawling your site.</li>
              </ol>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">💬</span>
          <h2 className="text-xl font-bold text-white mb-2">AI-Optimized FAQ Content</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            We generate questions the way real people ask AI — &quot;How much does a water heater cost in Burnsville?&quot; — with direct, citable answers. Includes schema markup so Google and ChatGPT can parse it instantly.
          </p>
        </div>
      )}
    </div>
  )
}
