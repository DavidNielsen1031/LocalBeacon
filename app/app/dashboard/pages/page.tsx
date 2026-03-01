'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ServicePage {
  city: string
  html: string
  title: string
  word_count: number
}

export default function PagesPage() {
  const [pages, setPages] = useState<ServicePage[]>([])
  const [cityInput, setCityInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [previewPage, setPreviewPage] = useState<ServicePage | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generate = async () => {
    if (!cityInput.trim()) return
    setGenerating(true)
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
      // handle silently
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Area Pages</h1>
          <p className="text-white/50 text-sm mt-1">Hyper-local pages for every city you serve</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs">
            {pages.length} / 3 pages (Free)
          </Badge>
          <Button
            onClick={() => setShowAdd(true)}
            disabled={pages.length >= 3}
            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-sm"
          >
            + Add City
          </Button>
        </div>
      </div>

      {/* Add city dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-md">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Add Service Area</h2>
            <p className="text-white/50 text-sm mb-6">
              We&apos;ll generate a unique, AEO-optimized landing page targeting searches for your service in that city.
            </p>
            <Input
              placeholder="e.g. Minneapolis, Apple Valley, Eagan..."
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 mb-4"
              autoFocus
            />
            <Button
              onClick={generate}
              disabled={!cityInput.trim() || generating}
              className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
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
              dangerouslySetInnerHTML={{ __html: previewPage.html }} />
          )}
        </DialogContent>
      </Dialog>

      {/* Pages grid */}
      {pages.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🌐</div>
          <h3 className="text-white font-semibold mb-2">No pages yet</h3>
          <p className="text-white/40 text-sm mb-6 max-w-sm mx-auto">
            Create a service area page for each city you serve. Each page is uniquely written to rank for local searches.
          </p>
          <Button
            onClick={() => setShowAdd(true)}
            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
          >
            + Add Your First City
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map(page => (
            <Card key={page.city} className="bg-white/5 border-white/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-base">{page.city}</CardTitle>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">Draft</Badge>
                </div>
                <p className="text-white/30 text-xs">{page.word_count} words · AEO-optimized · FAQ schema</p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPreviewPage(page)}
                    className="border-white/10 text-white/50 hover:bg-white/5 text-xs flex-1"
                  >
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => copyHtml(page)}
                    className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs flex-1"
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
              className="border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 p-8 hover:border-[#FFD700]/30 transition-colors"
            >
              <span className="text-3xl">+</span>
              <span className="text-white/30 text-sm">Add City</span>
            </button>
          )}
        </div>
      )}

      {pages.length >= 3 && (
        <div className="mt-6 p-4 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg text-center">
          <p className="text-[#FFD700] text-sm">
            You&apos;ve reached the Free plan limit. <button className="underline font-semibold">Upgrade to Solo</button> for 10 pages.
          </p>
        </div>
      )}
    </div>
  )
}
