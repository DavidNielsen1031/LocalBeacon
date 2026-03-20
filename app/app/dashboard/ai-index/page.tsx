'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { posthog } from '@/lib/posthog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAllPlatforms, getInstructions, type Platform } from '@/lib/deployment-instructions'
import { useBusinessContext } from '@/components/business-context'
import { UpgradeGate } from '@/components/upgrade-gate'

interface AiIndexResult {
  content: string
  businessName: string
}

export default function AiIndexPage() {
  const { plan } = useBusinessContext()
  const [businessName, setBusinessName] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [website, setWebsite] = useState('')
  const [services, setServices] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AiIndexResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [platform, setPlatform] = useState<Platform>('generic')
  const [error, setError] = useState<string | null>(null)

  const categories = [
    'Plumber', 'HVAC Contractor', 'Electrician', 'Roofer', 'Dentist',
    'Lawyer', 'Landscaper', 'Painter', 'Auto Mechanic', 'Chiropractor',
    'Real Estate Agent', 'Accountant', 'Veterinarian', 'Cleaning Service',
    'Pest Control', 'Moving Company', 'Handyman', 'General Contractor',
  ]

  const handleGenerate = () => {
    if (!businessName || !category || !city || !state) return
    setLoading(true)
    setError(null)

    try {
      const serviceList = services ? services.split(',').map(s => s.trim()).filter(Boolean) : [`${category} services`]
      const summary = description
        || `${businessName} is a ${category.toLowerCase()} serving ${city}, ${state} and surrounding areas. We specialize in ${serviceList.slice(0, 3).join(', ').toLowerCase()}.`

      const aiIndex = {
        version: "1.0",
        business: {
          name: businessName,
          category: category,
          location: { city, state },
          services: serviceList,
          website: website || undefined,
        },
        ai_instructions: {
          summary: summary,
          recommended_for: [
            `People looking for a ${category.toLowerCase()} in ${city}, ${state}`,
            ...serviceList.slice(0, 3).map(s => `${s} services`),
          ],
          not_recommended_for: [],
        },
      }

      const content = JSON.stringify(aiIndex, null, 2)
      setResult({ content, businessName })
      try { posthog.capture('tool_used', { tool: 'ai-index' }) } catch {}
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result.content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-index.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}

      <div>
        <h1 className="text-2xl font-bold text-[#2D3436]">AI Index File</h1>
        <p className="text-[#636E72] mt-1">
          Generate an ai-index.json file — a structured data file that helps AI assistants understand your business at a glance.
        </p>
      </div>

      <Card className="bg-[#FF6B35]/5 border-[#FF6B35]/20">
        <CardContent className="p-5">
          <h3 className="font-semibold text-[#FF6B35] text-sm mb-2">💡 What is an ai-index.json file?</h3>
          <p className="text-[#636E72] text-sm">
            While llms.txt is a plain-text business card for AI, ai-index.json is the structured version — machine-readable JSON that AI crawlers can parse instantly. It tells AI assistants exactly what your business does, who you serve, and when to recommend you. Think of llms.txt as the human-friendly version and ai-index.json as the machine-friendly version. Having both gives you maximum AI visibility.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white border-[#DFE6E9]">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-[#2D3436] text-sm">Business Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ai-idx-name" className="block text-xs font-medium text-[#636E72] mb-1">Business Name *</label>
              <input id="ai-idx-name" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Thompson Plumbing" className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-sm text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50" />
            </div>
            <div>
              <label htmlFor="ai-idx-category" className="block text-xs font-medium text-[#636E72] mb-1">Business Type *</label>
              <select id="ai-idx-category" value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-sm text-[#2D3436] focus:outline-none focus:border-[#FF6B35]/50">
                <option value="">Select...</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ai-idx-city" className="block text-xs font-medium text-[#636E72] mb-1">City *</label>
              <input id="ai-idx-city" type="text" value={city} onChange={(e) => setCity(e.target.value)}
                placeholder="Burnsville" className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-sm text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50" />
            </div>
            <div>
              <label htmlFor="ai-idx-state" className="block text-xs font-medium text-[#636E72] mb-1">State *</label>
              <input id="ai-idx-state" type="text" value={state} onChange={(e) => setState(e.target.value)}
                placeholder="MN" className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-sm text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ai-idx-website" className="block text-xs font-medium text-[#636E72] mb-1">Website</label>
              <input id="ai-idx-website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://thompsonplumbing.com" className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-sm text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50" />
            </div>
          </div>

          <div>
            <label htmlFor="ai-idx-services" className="block text-xs font-medium text-[#636E72] mb-1">Services (comma-separated)</label>
            <input id="ai-idx-services" type="text" value={services} onChange={(e) => setServices(e.target.value)}
              placeholder="Water heater repair, drain cleaning, sewer line replacement" className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-sm text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50" />
          </div>

          <div>
            <label htmlFor="ai-idx-desc" className="block text-xs font-medium text-[#636E72] mb-1">Business Description (optional — we&apos;ll generate one if blank)</label>
            <textarea id="ai-idx-desc" value={description} onChange={(e) => setDescription(e.target.value)}
              rows={2} placeholder="Family-owned plumbing company serving the south metro since 2005..."
              className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-sm text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:border-[#FF6B35]/50" />
          </div>

          <Button onClick={handleGenerate} disabled={loading || !businessName || !category || !city || !state}
            className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold">
            {loading ? 'Generating...' : 'Generate AI Index File'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <UpgradeGate
          feature="ai-index.json Generator"
          currentPlan={plan}
          requiredPlan="solo"
          previewMode="blur"
          suggestDfy={true}
          dfyContext="We'll deploy this file to your website for you."
        >
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2D3436]">Your ai-index.json File</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}
                  className="border-[#DFE6E9] text-[#2D3436] hover:text-[#1B2A4A]">
                  {copied ? '✓ Copied!' : 'Copy'}
                </Button>
                <Button onClick={handleDownload}
                  className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold" size="sm">
                  ⬇ Download ai-index.json
                </Button>
              </div>
            </div>

            <Card className="bg-white border-[#DFE6E9] mt-3">
              <CardContent className="p-5">
                <pre className="bg-[#FAFAF7] rounded-lg p-4 overflow-x-auto text-sm text-[#2D3436] whitespace-pre-wrap border border-[#DFE6E9]">
                  {result.content}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-[#FF6B35]/5 border-[#FF6B35]/20 mt-4">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#FF6B35] text-sm">📋 How to add this to your website</h3>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}
                    className="bg-white border border-[#DFE6E9] rounded px-2 py-1 text-xs text-[#2D3436] focus:outline-none focus:border-[#FF6B35]/50">
                    {getAllPlatforms().map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <ol className="text-[#636E72] text-sm space-y-2 list-decimal list-inside">
                  {getInstructions(platform).llmsTxt.map((step, i) => (
                    <li key={i}>{step.replace('llms.txt', 'ai-index.json')}</li>
                  ))}
                </ol>
                <p className="text-[#636E72] text-xs mt-4">
                  Upload to your website root so it&apos;s accessible at yoursite.com/ai-index.json. AI crawlers will discover it alongside your llms.txt file.
                </p>
              </CardContent>
            </Card>
          </div>
        </UpgradeGate>
      )}

      {!result && !loading && (
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">🗂️</span>
          <h2 className="text-xl font-bold text-[#2D3436] mb-2">Your AI Index File</h2>
          <p className="text-[#636E72] max-w-lg mx-auto">
            Fill in your business details above and we&apos;ll generate a structured JSON file that AI search engines can parse instantly. Works alongside your llms.txt file for maximum AI visibility.
          </p>
        </div>
      )}
    </div>
  )
}
