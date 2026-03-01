'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const POST_TYPES = [
  { value: 'whats_new', label: "What's New", emoji: '📢' },
  { value: 'offer', label: 'Special Offer', emoji: '🎁' },
  { value: 'event', label: 'Event', emoji: '📅' },
  { value: 'product', label: 'Service Spotlight', emoji: '🔦' },
]

interface GeneratedPost {
  title: string
  body: string
  call_to_action: string
}

export default function PostsPage() {
  const [postType, setPostType] = useState('whats_new')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeneratedPost | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'generate' | 'queue'>('generate')

  const generate = async () => {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/generate/gbp-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_type: postType }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      // handle error silently
    } finally {
      setLoading(false)
    }
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(`${result.title}

${result.body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">GBP Posts</h1>
          <p className="text-white/50 text-sm mt-1">AI-generated posts for your Google Business Profile</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-white/5 border-white/10 text-white/50 text-xs">Auto-post: Coming Soon</Badge>
          <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs">3 / 5 used (Free)</Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-white/5 rounded-lg p-1 w-fit">
        {(['generate', 'queue'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? 'bg-[#FFD700] text-black' : 'text-white/50 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'generate' && (
        <div className="space-y-6">
          {/* Post type selector */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">Post Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {POST_TYPES.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setPostType(type.value)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      postType === type.value
                        ? 'border-[#FFD700]/50 bg-[#FFD700]/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.emoji}</div>
                    <div className={`text-sm font-medium ${postType === type.value ? 'text-[#FFD700]' : 'text-white/70'}`}>
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
              <Button
                onClick={generate}
                disabled={loading}
                className="w-full mt-5 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold h-11"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span> Generating...
                  </span>
                ) : '✨ Generate Post'}
              </Button>
            </CardContent>
          </Card>

          {/* Result */}
          {result && (
            <Card className="bg-white/5 border-[#FFD700]/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-base">Generated Post</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={generate}
                      className="border-white/10 text-white/50 hover:bg-white/5 text-xs">
                      ↻ Regenerate
                    </Button>
                    <Button size="sm" onClick={copy}
                      className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-xs">
                      {copied ? '✓ Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white font-semibold mb-3 text-sm">{result.title}</p>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{result.body}</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/30 text-xs">CTA button: {result.call_to_action}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'queue' && (
        <div className="space-y-4">
          <p className="text-white/40 text-sm mb-6">
            Connect your Google Business Profile to enable auto-scheduling. Posts will go out Mon, Wed, Fri, and Sun.
          </p>
          {['Monday', 'Wednesday', 'Friday', 'Sunday'].map((day, i) => (
            <Card key={day} className="bg-white/5 border-white/10">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{day}</p>
                  <p className="text-white/30 text-sm italic">No post scheduled</p>
                </div>
                <Button size="sm" variant="outline"
                  onClick={() => setActiveTab('generate')}
                  className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10 text-xs">
                  Generate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
