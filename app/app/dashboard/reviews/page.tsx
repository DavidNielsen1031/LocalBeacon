'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star, BookmarkCheck } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { useBusinessContext } from '@/components/business-context'
import { UpgradeGate } from '@/components/upgrade-gate'

const STAR_RATINGS = [1, 2, 3, 4, 5]

interface DraftedResponse {
  id: string
  author: string
  rating: number
  comment: string
  response: string
  timestamp: string
}

interface SavedResponse {
  id: string
  title: string
  body: string
  metadata: {
    reviewer_name: string
    rating: number
    original_comment: string
    generated_response: string
  }
  created_at: string
}

export default function ReviewsPage() {
  const { plan, activeBusinessId } = useBusinessContext()
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([])
  const [loadingSaved, setLoadingSaved] = useState(false)
  const [history, setHistory] = useState<DraftedResponse[]>([
    {
      id: 'demo-1',
      author: 'Sarah M.',
      rating: 5,
      comment: 'Amazing service! They came out same day and fixed our furnace. Very professional and fair pricing. Will definitely use again!',
      response: 'Thank you so much, Sarah! We\'re glad we could get to you quickly — same-day service is always our goal. It was a pleasure working with you and we appreciate the kind words about our pricing. We\'ll be here whenever you need us!',
      timestamp: 'Today',
    },
    {
      id: 'demo-2',
      author: 'Mike R.',
      rating: 3,
      comment: 'Work was fine but had to wait 3 days for the appointment. Expected faster service.',
      response: 'Hi Mike, thank you for your honest feedback. We understand how frustrating wait times can be, especially when you need help right away. We\'re actively working on expanding our team to reduce scheduling delays. We\'re glad the work itself met your expectations and we\'d love the chance to provide faster service next time.',
      timestamp: 'Yesterday',
    },
    {
      id: 'demo-3',
      author: 'Jennifer K.',
      rating: 5,
      comment: 'Best plumber in Burnsville! Fixed a leak that two other companies couldn\'t figure out. Highly recommend.',
      response: 'Wow, thank you Jennifer! That means a lot to us. Tricky leaks are actually our specialty — we love a good challenge. We\'re proud to serve the Burnsville community and thrilled we could solve the problem for you. Thank you for the recommendation!',
      timestamp: '2 days ago',
    },
  ])

  // Load saved responses from DB when business changes
  useEffect(() => {
    if (!activeBusinessId) return
    setLoadingSaved(true)
    fetch(`/api/save/review-response?business_id=${activeBusinessId}`)
      .then(r => r.json())
      .then(data => setSavedResponses(data.items || []))
      .catch(() => {})
      .finally(() => setLoadingSaved(false))
  }, [activeBusinessId])

  const draft = async () => {
    if (!comment.trim()) return
    setLoading(true)
    setResponse('')
    setSaved(false)
    setError(null)
    try {
      const res = await fetch('/api/generate/review-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewer_name: author || 'Customer',
          rating,
          review_text: comment,
          business_name: 'Your Business',
        }),
      })
      const data = await res.json()
      setResponse(data.response || '')
      setHistory(prev => [{
        id: Date.now().toString(),
        author: author || 'Customer',
        rating,
        comment,
        response: data.response || '',
        timestamp: new Date().toLocaleDateString(),
      }, ...prev])
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const saveResponse = async () => {
    if (!response || !activeBusinessId) return
    setSaving(true)
    try {
      const res = await fetch('/api/save/review-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: activeBusinessId,
          reviewer_name: author || 'Customer',
          rating,
          comment,
          response,
        }),
      })
      if (res.ok) {
        setSaved(true)
        // Refresh saved responses list
        const updated = await fetch(`/api/save/review-response?business_id=${activeBusinessId}`)
        const data = await updated.json()
        setSavedResponses(data.items || [])
      }
    } catch {
      // Silent — copy still works even if save fails
    } finally {
      setSaving(false)
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyFromSaved = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const resetForm = () => {
    setAuthor('')
    setRating(5)
    setComment('')
    setResponse('')
    setSaved(false)
  }

  const reviewDraftCount = history.filter(h => !h.id.startsWith('demo-')).length

  return (
    <div className="flex-1 px-6 py-8 max-w-5xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2D3436]">Review Responses</h1>
          <p className="text-[#636E72] text-sm mt-1">We draft professional responses to your Google reviews</p>
        </div>
        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
          Manual mode · GBP sync coming soon
        </Badge>
      </div>

      {plan === 'free' && (
        <UpgradeGate
          feature="Review Responses"
          currentPlan={plan}
          requiredPlan="solo"
          previewMode="limit"
          usageCount={reviewDraftCount}
          usageLimit={3}
        >
          <span />
        </UpgradeGate>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input form */}
        <Card className="bg-white border-[#DFE6E9] h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#2D3436] text-base">Paste a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label htmlFor="review-author" className="text-[#2D3436] mb-2 block text-sm">Reviewer Name <span className="text-[#636E72]/60">(optional)</span></Label>
              <Input
                id="review-author"
                placeholder="e.g. John D."
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="bg-white border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60"
              />
            </div>
            <div>
              <Label className="text-[#2D3436] mb-2 block text-sm">Star Rating</Label>
              <div className="flex gap-2">
                {STAR_RATINGS.map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-transform hover:scale-110 ${
                      star <= rating ? 'opacity-100' : 'opacity-20'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
                <span className="text-[#636E72] text-sm self-center ml-1">{rating}/5</span>
              </div>
            </div>
            <div>
              <Label htmlFor="review-comment" className="text-[#2D3436] mb-2 block text-sm">Review Text *</Label>
              <textarea
                id="review-comment"
                placeholder="Paste the full review text here..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={5}
                className="w-full bg-white border border-[#DFE6E9] text-[#2D3436] placeholder:text-[#636E72]/60 rounded-md px-3 py-2 text-sm focus:border-[#FF6B35]/50 focus:outline-none resize-none"
              />
            </div>
            <Button
              onClick={draft}
              disabled={!comment.trim() || loading}
              className="w-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2"><span className="animate-spin">⟳</span> Drafting...</span>
              ) : '✨ Draft Response'}
            </Button>
          </CardContent>
        </Card>

        {/* Response output */}
        <div className="space-y-4">
          {response ? (
            <Card className="bg-white border-[#FF6B35]/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#2D3436] text-base">Your Response</CardTitle>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">Ready to copy</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#2D3436] text-sm leading-relaxed mb-5">{response}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={draft}
                    className="border-[#DFE6E9] text-[#636E72] hover:bg-white text-xs flex-1"
                  >
                    ↻ Regenerate
                  </Button>
                  <Button
                    size="sm"
                    onClick={copy}
                    className="bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold text-xs flex-1"
                  >
                    {copied ? '✓ Copied!' : 'Copy Response'}
                  </Button>
                </div>
                {activeBusinessId && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={saveResponse}
                    disabled={saving || saved}
                    className={`w-full mt-2 text-xs border-[#DFE6E9] ${saved ? 'text-emerald-600 border-emerald-300 bg-emerald-50' : 'text-[#636E72]'}`}
                  >
                    {saving ? (
                      <span className="flex items-center gap-1.5"><span className="animate-spin">⟳</span> Saving...</span>
                    ) : saved ? (
                      <span className="flex items-center gap-1.5"><BookmarkCheck className="w-3.5 h-3.5" /> Saved to responses</span>
                    ) : (
                      <span className="flex items-center gap-1.5"><BookmarkCheck className="w-3.5 h-3.5" /> Save Response</span>
                    )}
                  </Button>
                )}
                <p className="text-[#636E72]/60 text-xs mt-4 text-center">
                  Paste this response directly into Google Maps on your business profile
                </p>
                <button
                  onClick={resetForm}
                  className="text-[#636E72]/40 text-xs mt-2 w-full text-center hover:text-[#636E72]"
                >
                  ← Start a new review
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center">
              <EmptyState
                icon={Star}
                title="No reviews to respond to"
                description="Connect your Google listing to see reviews"
              />
            </div>
          )}
        </div>
      </div>

      {/* Saved Responses from DB */}
      {(savedResponses.length > 0 || loadingSaved) && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-[#2D3436] mb-1">Saved Responses</h2>
          <p className="text-[#636E72] text-sm mb-4">Responses you&apos;ve saved — ready to copy and paste into Google.</p>
          {loadingSaved ? (
            <p className="text-[#636E72]/60 text-sm">Loading...</p>
          ) : (
            <div className="space-y-3">
              {savedResponses.map(item => (
                <Card key={item.id} className="bg-white border-[#DFE6E9] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#1B2A4A] font-medium text-sm">{item.metadata?.reviewer_name || 'Customer'}</span>
                        <span className="text-yellow-400 text-xs">{'⭐'.repeat(item.metadata?.rating || 5)}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[#636E72]/60 text-xs">{new Date(item.created_at).toLocaleDateString()}</span>
                        <button
                          onClick={() => copyFromSaved(item.body)}
                          className="text-[#FF6B35] text-xs font-medium hover:underline"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    {item.metadata?.original_comment && (
                      <p className="text-[#636E72] text-xs italic mb-2 line-clamp-1">&ldquo;{item.metadata.original_comment}&rdquo;</p>
                    )}
                    <p className="text-[#2D3436] text-xs leading-relaxed line-clamp-2">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recent Session History */}
      {history.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-[#2D3436] mb-4">Recent Responses</h2>
          <div className="space-y-3">
            {history.map(item => (
              <Card key={item.id} className="bg-white border-[#DFE6E9] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#1B2A4A] font-medium text-sm">{item.author}</span>
                    <span className="text-yellow-400 text-xs">{'⭐'.repeat(item.rating)}</span>
                    <span className="text-[#636E72]/60 text-xs ml-auto">{item.timestamp}</span>
                  </div>
                  <p className="text-[#636E72] text-xs italic mb-2 line-clamp-1">&ldquo;{item.comment}&rdquo;</p>
                  <p className="text-[#636E72] text-xs line-clamp-2">{item.response}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
