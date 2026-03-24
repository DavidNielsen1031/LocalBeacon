'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Globe } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'

interface ServicePage {
  city: string
  html: string
  title: string
  word_count: number
}

export default function PagesPage() {
  const domPurifyRef = useRef<typeof import('dompurify') | null>(null)

  useEffect(() => {
    // Dynamically import DOMPurify on the client only (requires window)
    import('dompurify').then(mod => { domPurifyRef.current = mod.default ?? mod })
  }, [])

  const sanitizeHtml = (html: string): string => {
    if (domPurifyRef.current) return domPurifyRef.current.sanitize(html)
    // Fallback before DOMPurify loads: strip all tags
    return html.replace(/<[^>]*>/g, '')
  }

  const [pages, setPages] = useState<ServicePage[]>([
    {
      city: 'Burnsville',
      html: '<h1>Professional Plumbing Services in Burnsville, MN</h1><p>Looking for a reliable plumber in Burnsville? We provide expert residential and commercial plumbing services throughout the Burnsville area...</p>',
      title: 'Professional Plumbing Services in Burnsville, MN',
      word_count: 850,
    },
    {
      city: 'Apple Valley',
      html: '<h1>Expert Plumbing Services in Apple Valley, MN</h1><p>Need a plumber in Apple Valley? Our licensed team serves Apple Valley and surrounding neighborhoods with fast, professional plumbing solutions...</p>',
      title: 'Expert Plumbing Services in Apple Valley, MN',
      word_count: 820,
    },
  ])
  const [cityInput, setCityInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [previewPage, setPreviewPage] = useState<ServicePage | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generate = async () => {
    if (!cityInput.trim()) return
    setGenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/generate/service-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_city: cityInput.trim() }),
      })
      const data = await res.json()
      setPages(prev => [...prev, { city: cityInput.trim(), ...data }])
      setCityInput('')
      setShowAdd(false)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const copyHtml = (page: ServicePage) => {
    navigator.clipboard.writeText(page.html)
    setCopied(page.city)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="flex-1 px-6 py-8 max-w-4xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2D3436]">City Pages</h1>
          <p className="text-[#636E72] text-sm mt-1">Local pages that help you show up when people search in nearby cities</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/30 text-xs">
            {pages.length} / 3 pages (Free)
          </Badge>
          <Button
            onClick={() => setShowAdd(true)}
            disabled={pages.length >= 3}
            className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold text-sm"
          >
            + Add City
          </Button>
        </div>
      </div>

      {/* Add city dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-zinc-900 border-[#DFE6E9] text-[#2D3436] max-w-md">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Add Service Area</h2>
            <p className="text-[#636E72] text-sm mb-6">
              We&apos;ll create a unique page designed to help you show up when people in that city search for your services.
            </p>
            <Input
              placeholder="e.g. Minneapolis, Apple Valley, Eagan..."
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
              className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60 mb-4"
              autoFocus
            />
            <Button
              onClick={generate}
              disabled={!cityInput.trim() || generating}
              className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold"
            >
              {generating ? (
                <span className="flex items-center gap-2"><span className="animate-spin">⟳</span> Generating...</span>
              ) : '✨ Generate Page'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview dialog */}
      <Dialog open={!!previewPage} onOpenChange={() => setPreviewPage(null)}>
        <DialogContent className="bg-white max-w-2xl max-h-[80vh] overflow-y-auto">
          {previewPage && (
            <div className="p-6 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(previewPage.html) }} />
          )}
        </DialogContent>
      </Dialog>

      {/* Pages grid */}
      {pages.length === 0 ? (
        <div className="flex flex-col items-center">
          <EmptyState
            icon={Globe}
            title="No city pages yet"
            description="Build pages for areas you serve →"
            actionLabel="+ Add Your First City"
            onAction={() => setShowAdd(true)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map(page => (
            <Card key={page.city} className="bg-white border-[#DFE6E9] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#2D3436] text-base">{page.city}</CardTitle>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">Draft</Badge>
                </div>
                <p className="text-[#636E72]/60 text-xs">{page.word_count} words · Optimized for local search · FAQ included</p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPreviewPage(page)}
                    className="border-[#DFE6E9] text-[#636E72] hover:bg-white text-xs flex-1"
                  >
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => copyHtml(page)}
                    className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold text-xs flex-1"
                  >
                    {copied === page.city ? '✓ Copied!' : 'Copy HTML'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {pages.length < 3 && (
            <button
              onClick={() => setShowAdd(true)}
              className="border-2 border-dashed border-[#DFE6E9] rounded-lg flex flex-col items-center justify-center gap-2 p-8 hover:border-[#FF6B35]/30 transition-colors"
            >
              <span className="text-3xl">+</span>
              <span className="text-[#636E72]/60 text-sm">Add City</span>
            </button>
          )}
        </div>
      )}

      {pages.length >= 3 && (
        <div className="mt-6 p-4 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-lg text-center">
          <p className="text-[#FF6B35] text-sm">
            You&apos;ve reached the Free plan limit. <button className="underline font-semibold">Upgrade to Local Autopilot</button> for 10 pages.
          </p>
        </div>
      )}
    </div>
  )
}
