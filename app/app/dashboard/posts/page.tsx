'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { useBusinessContext } from '@/components/business-context'
import { UpgradeGate } from '@/components/upgrade-gate'

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

type PostStatus = 'draft' | 'scheduled' | 'published'

interface QueuedPost {
  id: string
  day: string
  date: string
  title: string
  preview: string
  type: string
  status: PostStatus
}

// Demo posts — shows what the pipeline looks like when active
const DEMO_POSTS: QueuedPost[] = [
  {
    id: '1',
    day: 'Monday',
    date: 'Mar 3',
    title: '🔧 Spring maintenance season is here!',
    preview: "Don't wait for the first hot day — schedule your AC tune-up now and avoid the summer rush. Our certified technicians...",
    type: "What's New",
    status: 'scheduled',
  },
  {
    id: '2',
    day: 'Wednesday',
    date: 'Mar 5',
    title: '💰 15% off first-time customers this March',
    preview: "New to our service? Welcome! This month, enjoy 15% off any residential service call. Mention this post when you call...",
    type: 'Special Offer',
    status: 'scheduled',
  },
  {
    id: '3',
    day: 'Friday',
    date: 'Mar 7',
    title: '⭐ Spotlight: Emergency plumbing — 24/7',
    preview: "Burst pipe at 2 AM? We've got you covered. Our emergency team responds within 45 minutes, day or night, across...",
    type: 'Service Spotlight',
    status: 'draft',
  },
  {
    id: '4',
    day: 'Sunday',
    date: 'Mar 9',
    title: '📅 Free home safety inspection event',
    preview: "Join us this Saturday at the community center for free home safety inspections. Our experts will check your...",
    type: 'Event',
    status: 'draft',
  },
]

const STATUS_STYLES: Record<PostStatus, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-white', text: 'text-[#636E72]', label: 'Draft — Review & Approve' },
  scheduled: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Scheduled' },
  published: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Published ✓' },
}

export default function PostsPage() {
  const { plan } = useBusinessContext()
  const [postType, setPostType] = useState('whats_new')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeneratedPost | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'pipeline' | 'create'>('pipeline')
  const [posts, setPosts] = useState<QueuedPost[]>(DEMO_POSTS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  const startEdit = (post: QueuedPost) => {
    setEditingId(post.id)
    setEditTitle(post.title)
    setEditBody(post.preview)
  }

  const saveEdit = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, title: editTitle, preview: editBody } : p))
    setEditingId(null)
  }

  const saveAndApprove = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, title: editTitle, preview: editBody, status: 'scheduled' as PostStatus } : p))
    setEditingId(null)
  }

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
    navigator.clipboard.writeText(`${result.title}\n\n${result.body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const approvePost = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'scheduled' as PostStatus } : p))
  }

  const scheduled = posts.filter(p => p.status === 'scheduled').length
  const drafts = posts.filter(p => p.status === 'draft').length
  const published = posts.filter(p => p.status === 'published').length

  const publishedPostCount = posts.filter(p => p.status === 'published').length

  return (
    <div className="flex-1 px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#2D3436]">Google Posts</h1>
          <p className="text-[#636E72] text-sm mt-1">Your weekly posting pipeline — we write, you approve, Google publishes.</p>
        </div>
        <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/30 text-xs">
          {posts.length} / 5 this week (Free)
        </Badge>
      </div>

      {plan === 'free' && (
        <UpgradeGate
          feature="Google Posts"
          currentPlan={plan}
          requiredPlan="solo"
          previewMode="limit"
          usageCount={publishedPostCount}
          usageLimit={5}
        >
          <span />
        </UpgradeGate>
      )}

      {/* Pipeline stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-[#DFE6E9] rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-[#636E72]">{drafts}</p>
          <p className="text-xs text-[#636E72]/60">Need Review</p>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-400">{scheduled}</p>
          <p className="text-xs text-blue-400/60">Scheduled</p>
        </div>
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-400">{published}</p>
          <p className="text-xs text-green-400/60">Published</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 w-fit">
        {[
          { key: 'pipeline' as const, label: `This Week's Posts` },
          { key: 'create' as const, label: '+ Create Post' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key ? 'bg-[#FF6B35] text-black' : 'text-[#636E72] hover:text-[#2D3436]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'pipeline' && (
        <div className="space-y-3">
          {/* Auto-post banner */}
          <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-lg p-4 mb-4 flex items-start gap-3">
            <span className="text-xl">🔦</span>
            <div>
              <p className="text-[#2D3436] text-sm font-medium">Auto-posting is almost ready</p>
              <p className="text-[#636E72] text-xs mt-1">
                Once your Google listing is connected, these posts will publish automatically on schedule.
                For now, copy each post and paste it into your Google Business Profile.
              </p>
            </div>
          </div>

          {posts.map(post => {
            const style = STATUS_STYLES[post.status]
            const isEditing = editingId === post.id
            return (
              <Card key={post.id} className={`bg-white border-[#DFE6E9] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                post.status === 'draft' ? 'border-l-2 border-l-[#FF6B35]/50' : ''
              } ${isEditing ? 'border-[#FF6B35]/30' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[#636E72]/60 text-xs font-medium">{post.day}, {post.date}</span>
                    <Badge className={`${style.bg} ${style.text} text-xs border-0`}>
                      {style.label}
                    </Badge>
                    <Badge className="bg-white text-[#636E72]/60 text-xs border-0">{post.type}</Badge>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3 mt-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-[#2D3436] text-sm focus:outline-none focus:border-[#FF6B35]/50"
                      />
                      <textarea
                        value={editBody}
                        onChange={e => setEditBody(e.target.value)}
                        rows={4}
                        className="w-full bg-white border border-[#DFE6E9] rounded-lg px-3 py-2 text-[#2D3436] text-sm leading-relaxed focus:outline-none focus:border-[#FF6B35]/50 resize-none"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline"
                          onClick={() => setEditingId(null)}
                          className="border-[#DFE6E9] text-[#636E72] hover:bg-white text-xs">
                          Cancel
                        </Button>
                        <Button size="sm" variant="outline"
                          onClick={() => saveEdit(post.id)}
                          className="border-[#DFE6E9] text-[#2D3436] hover:bg-white text-xs">
                          Save Draft
                        </Button>
                        <Button size="sm"
                          onClick={() => saveAndApprove(post.id)}
                          className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold text-xs">
                          Save & Approve ✓
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1B2A4A] font-medium text-sm mb-1">{post.title}</p>
                        <p className="text-[#636E72] text-xs leading-relaxed line-clamp-2">{post.preview}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {post.status === 'draft' && (
                          <>
                            <Button size="sm" variant="outline"
                              onClick={() => startEdit(post)}
                              className="border-[#DFE6E9] text-[#2D3436] hover:bg-white text-xs">
                              ✏️ Edit
                            </Button>
                            <Button size="sm"
                              onClick={() => approvePost(post.id)}
                              className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold text-xs">
                              Approve ✓
                            </Button>
                          </>
                        )}
                        {post.status === 'scheduled' && (
                          <Button size="sm" variant="outline"
                            onClick={() => startEdit(post)}
                            className="border-[#DFE6E9] text-[#2D3436] hover:bg-white text-xs">
                            ✏️ Edit
                          </Button>
                        )}
                        <Button size="sm" variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(`${post.title}\n\n${post.preview}`)
                          }}
                          className="border-[#DFE6E9] text-[#636E72] hover:bg-white text-xs">
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}

          {posts.length === 0 && (
            <EmptyState
              icon={FileText}
              title="No posts yet"
              description="Generate your first Google post →"
              actionLabel="+ Create Post"
              onAction={() => setActiveTab('create')}
            />
          )}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="space-y-6">
          <Card className="bg-white border-[#DFE6E9]">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#2D3436] text-base">What kind of post?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {POST_TYPES.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setPostType(type.value)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      postType === type.value
                        ? 'border-[#FF6B35]/50 bg-[#FF6B35]/10'
                        : 'border-[#DFE6E9] bg-white hover:border-[#DFE6E9]'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.emoji}</div>
                    <div className={`text-sm font-medium ${postType === type.value ? 'text-[#FF6B35]' : 'text-[#2D3436]'}`}>
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
              <Button
                onClick={generate}
                disabled={loading}
                className="w-full mt-5 bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold h-11"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span> Writing your post...
                  </span>
                ) : '✨ Generate Post'}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-white border-[#FF6B35]/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#2D3436] text-base">Your Post</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={generate}
                      className="border-[#DFE6E9] text-[#636E72] hover:bg-white text-xs">
                      ↻ Try Again
                    </Button>
                    <Button size="sm" onClick={copy}
                      className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold text-xs">
                      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#1B2A4A] font-semibold mb-3 text-sm">{result.title}</p>
                <p className="text-[#2D3436] text-sm leading-relaxed whitespace-pre-line">{result.body}</p>
                <div className="mt-4 pt-4 border-t border-[#DFE6E9] flex items-center justify-between">
                  <p className="text-[#636E72]/60 text-xs">Suggested button: {result.call_to_action}</p>
                  <Badge className="bg-white text-[#636E72]/60 text-xs border-0">
                    Copy this into your Google Business Profile
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
