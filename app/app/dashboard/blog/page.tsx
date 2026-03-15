'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useBusinessContext } from '@/components/business-context'

const BLOG_TYPES = [
  { value: 'seasonal', label: 'Seasonal Tips', desc: 'Timely advice your customers are searching for right now' },
  { value: 'faq', label: 'FAQ Article', desc: 'Answer the questions your customers actually ask' },
  { value: 'how_to', label: 'How-To Guide', desc: 'Step-by-step guides that build trust and rank on Google' },
  { value: 'local', label: 'Local Guide', desc: 'Neighborhood-specific content that wins "near me" searches' },
]

interface GeneratedPost {
  id: string
  title: string
  type: string
  city: string
  wordCount: number
  status: 'ready' | 'draft'
  preview: string
  html: string
  faqs: Array<{ q: string; a: string }>
}

export default function BlogPage() {
  const { activeBusinessId } = useBusinessContext()
  const [selectedType, setSelectedType] = useState('seasonal')
  const [city, setCity] = useState('')
  const [topic, setTopic] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<GeneratedPost[]>([])
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleGenerate = async () => {
    setGenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/generate/blog-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: activeBusinessId || undefined,
          type: selectedType,
          city: city.trim() || undefined,
          topic: topic.trim() || undefined,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 403 && data.upgradeUrl) {
          setError(`You've reached your plan limit. Upgrade to Solo or Agency for unlimited blog posts.`)
        } else {
          setError(data.error || 'Generation failed — please try again.')
        }
        return
      }

      const newPost: GeneratedPost = {
        id: Date.now().toString(),
        title: data.title || 'Blog Post',
        type: selectedType,
        city: city.trim() || 'Your City',
        wordCount: data.word_count || 0,
        status: 'ready',
        preview: data.preview || '',
        html: data.html || '',
        faqs: data.faqs || [],
      }

      setPosts(prev => [newPost, ...prev])
      setExpandedPost(newPost.id)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const copyHtml = async (post: GeneratedPost) => {
    await navigator.clipboard.writeText(post.html)
    setCopiedId(post.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadHtml = (post: GeneratedPost) => {
    const blob = new Blob([post.html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Blog Posts</h1>
        <p className="text-white/50">We write locally-optimized blog posts that rank on Google and bring in new customers.</p>
      </div>

      {/* Generator */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Write a New Post</h2>

        {/* Post type selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {BLOG_TYPES.map(t => (
            <button
              key={t.value}
              onClick={() => setSelectedType(t.value)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedType === t.value
                  ? 'border-[#FFD700]/50 bg-[#FFD700]/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <span className={`text-sm font-medium ${selectedType === t.value ? 'text-[#FFD700]' : 'text-white'}`}>
                {t.label}
              </span>
              <p className="text-xs text-white/40 mt-1">{t.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-sm text-white/60 block mb-1.5">City or neighborhood</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="e.g. Burnsville, Apple Valley"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 block mb-1.5">Topic <span className="text-white/30">(optional — we&apos;ll pick one if blank)</span></label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. water heater maintenance, teeth whitening"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-[#FFD700] text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-[#FFD700]/90 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {generating ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Writing your post…
            </>
          ) : (
            'Write My Blog Post'
          )}
        </button>
        {generating && (
          <p className="mt-2 text-xs text-white/30">Takes about 15-20 seconds — we&apos;re writing a full 800+ word post for you.</p>
        )}
      </div>

      {/* Post list */}
      {posts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Your Blog Posts</h2>
          {posts.map(post => (
            <div key={post.id} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
              <div
                className="p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{post.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-white/40 flex-wrap">
                      {post.city && <span>📍 {post.city}</span>}
                      <span>📄 ~{post.wordCount} words</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                        ✓ Ready to publish
                      </span>
                    </div>
                  </div>
                  <span className="text-white/30 text-lg">{expandedPost === post.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expandedPost === post.id && (
                <div className="border-t border-white/10 p-5">
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{post.preview}</p>

                  {post.faqs.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-[#FFD700] mb-2">FAQ Section (Schema Markup Included)</h4>
                      {post.faqs.map((faq, i) => (
                        <div key={i} className="mb-2 text-sm">
                          <p className="text-white/80 font-medium">Q: {faq.q}</p>
                          <p className="text-white/50 ml-4">A: {faq.a}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => copyHtml(post)}
                      className="bg-[#FFD700] text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#FFD700]/90 transition-colors"
                    >
                      {copiedId === post.id ? '✓ Copied!' : 'Copy HTML'}
                    </button>
                    <button
                      onClick={() => downloadHtml(post)}
                      className="border border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-white/30">
                    Paste this HTML into WordPress, Squarespace, Wix, or any page builder. FAQPage schema is included for rich results.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="text-center py-12 text-white/30">
          <p className="text-4xl mb-3">✍️</p>
          <p className="text-sm">No posts yet — generate your first one above.</p>
          <p className="text-xs mt-1">Each post is 800–1,000 words, locally optimized, and includes FAQ schema for AI search.</p>
        </div>
      )}
    </div>
  )
}
