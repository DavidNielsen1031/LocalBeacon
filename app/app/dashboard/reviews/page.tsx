'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'

const STAR_RATINGS = [1, 2, 3, 4, 5]

interface DraftedResponse {
  id: string
  author: string
  rating: number
  comment: string
  response: string
  timestamp: string
}

export default function ReviewsPage() {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [copied, setCopied] = useState(false)
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

  const draft = async () => {
    if (!comment.trim()) return
    setLoading(true)
    setResponse('')
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
      // handle silently
    } finally {
      setLoading(false)
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetForm = () => {
    setAuthor('')
    setRating(5)
    setComment('')
    setResponse('')
  }

  return (
    <div className="flex-1 px-6 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2D3436]">Review Responses</h1>
          <p className="text-[#636E72] text-sm mt-1">We draft professional responses to your Google reviews</p>
        </div>
        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
          Manual mode · GBP sync coming soon
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input form */}
        <Card className="bg-white border-[#DFE6E9] h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#2D3436] text-base">Paste a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label className="text-[#2D3436] mb-2 block text-sm">Reviewer Name <span className="text-[#636E72]/60">(optional)</span></Label>
              <Input
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
              <Label className="text-[#2D3436] mb-2 block text-sm">Review Text *</Label>
              <textarea
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
              className="w-full bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold"
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
                    className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold text-xs flex-1"
                  >
                    {copied ? '✓ Copied!' : 'Copy Response'}
                  </Button>
                </div>
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

      {/* History */}
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
