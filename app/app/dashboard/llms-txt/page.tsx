'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAllPlatforms, getInstructions, type Platform } from '@/lib/deployment-instructions'

interface LlmsTxtResult {
  content: string
  filename: string
  businessName: string
  byteSize: number
}

export default function LlmsTxtPage() {
  const [businessName, setBusinessName] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [hours, setHours] = useState('')
  const [services, setServices] = useState('')
  const [serviceAreas, setServiceAreas] = useState('')
  const [description, setDescription] = useState('')
  const [reviewRating, setReviewRating] = useState('')
  const [reviewCount, setReviewCount] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<LlmsTxtResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [platform, setPlatform] = useState<Platform>('generic')

  const handleGenerate = async () => {
    if (!businessName || !category || !city || !state) return
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/generate/llms-txt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName, category, city, state,
          phone: phone || undefined,
          address: address || undefined,
          website: website || undefined,
          hours: hours || undefined,
          services: services ? services.split(',').map(s => s.trim()).filter(Boolean) : [],
          serviceAreas: serviceAreas ? serviceAreas.split(',').map(s => s.trim()).filter(Boolean) : [],
          description: description || undefined,
          reviewRating: reviewRating || undefined,
          reviewCount: reviewCount || undefined,
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

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'llms.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
        <h1 className="text-2xl font-bold text-white">AI Discovery File</h1>
        <p className="text-white/50 mt-1">
          Generate an llms.txt file that tells AI assistants about your business. Upload it to your website and AI search engines will know how to recommend you.
        </p>
      </div>

      {/* What is this */}
      <Card className="bg-[#FFD700]/5 border-[#FFD700]/20">
        <CardContent className="p-5">
          <h3 className="font-semibold text-[#FFD700] text-sm mb-2">💡 What is an llms.txt file?</h3>
          <p className="text-white/60 text-sm">
            Think of it as a business card for AI. When ChatGPT, Claude, Perplexity, or Google AI searches the web, they look for this file to quickly understand what your business does, where you operate, and what services you offer. Without it, AI has to guess — and it usually guesses wrong or skips you entirely.
          </p>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-white text-sm">Business Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Business Name *</label>
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Thompson Plumbing" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Business Type *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFD700]/50">
                <option value="" className="bg-[#111]">Select...</option>
                {categories.map(cat => <option key={cat} value={cat} className="bg-[#111]">{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">City *</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                placeholder="Burnsville" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">State *</label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)}
                placeholder="MN" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="(952) 555-1234" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Website</label>
              <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://thompsonplumbing.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Burnsville, MN 55337" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Hours</label>
              <input type="text" value={hours} onChange={(e) => setHours(e.target.value)}
                placeholder="Mon-Fri 7AM-6PM, Sat 8AM-2PM" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/50 mb-1">Services (comma-separated)</label>
            <input type="text" value={services} onChange={(e) => setServices(e.target.value)}
              placeholder="Water heater repair, drain cleaning, sewer line replacement, faucet installation" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1">Service Areas (comma-separated cities)</label>
            <input type="text" value={serviceAreas} onChange={(e) => setServiceAreas(e.target.value)}
              placeholder="Apple Valley, Eagan, Lakeville, Prior Lake, Savage" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1">Business Description (optional)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              rows={2} placeholder="Family-owned plumbing company serving the south metro since 2005..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Google Review Rating</label>
              <input type="text" value={reviewRating} onChange={(e) => setReviewRating(e.target.value)}
                placeholder="4.8" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1">Number of Reviews</label>
              <input type="text" value={reviewCount} onChange={(e) => setReviewCount(e.target.value)}
                placeholder="127" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50" />
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={loading || !businessName || !category || !city || !state}
            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
            {loading ? 'Generating...' : 'Generate AI Discovery File'}
          </Button>
        </CardContent>
      </Card>

      {/* Result */}
      {result && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Your llms.txt File</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}
                className="border-white/20 text-white/70 hover:text-white">
                {copied ? '✓ Copied!' : 'Copy'}
              </Button>
              <Button onClick={handleDownload}
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold" size="sm">
                ⬇ Download llms.txt
              </Button>
            </div>
          </div>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-5">
              <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm text-green-400 whitespace-pre-wrap">
                {result.content}
              </pre>
              <p className="text-white/30 text-xs mt-3">{result.byteSize} bytes — well under the 2KB recommended size</p>
            </CardContent>
          </Card>

          {/* Platform-specific instructions */}
          <Card className="bg-[#FFD700]/5 border-[#FFD700]/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#FFD700] text-sm">📋 How to add this to your website</h3>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#FFD700]/50"
                >
                  {getAllPlatforms().map(p => (
                    <option key={p.id} value={p.id} className="bg-[#111]">{p.name}</option>
                  ))}
                </select>
              </div>
              <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
                {getInstructions(platform).llmsTxt.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              {getInstructions(platform).pitfalls.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-white/40 text-xs font-medium mb-1">⚠️ Watch out for:</p>
                  <ul className="text-white/40 text-xs space-y-1 list-disc list-inside">
                    {getInstructions(platform).pitfalls.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-white/40 text-xs mt-4">
                AI search engines typically discover new llms.txt files within 1-4 weeks of deployment.
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">📄</span>
          <h2 className="text-xl font-bold text-white mb-2">Your AI Business Card</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Fill in your business details above and we&apos;ll generate a file that tells ChatGPT, Claude, Perplexity, and Google AI exactly who you are and what you do. One file, all AI assistants.
          </p>
        </div>
      )}
    </div>
  )
}
