'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

const BLOG_TYPES = [
  { value: 'seasonal', label: 'Seasonal Tips', desc: 'Timely advice your customers are searching for right now' },
  { value: 'faq', label: 'FAQ Article', desc: 'Answer the questions your customers actually ask' },
  { value: 'how_to', label: 'How-To Guide', desc: 'Step-by-step guides that build trust and rank on Google' },
  { value: 'local', label: 'Local Guide', desc: 'Neighborhood-specific content that wins "near me" searches' },
]

const DEMO_POSTS = [
  {
    id: '1',
    title: '5 Signs Your AC Needs Maintenance Before Summer',
    type: 'seasonal',
    city: 'Burnsville',
    wordCount: 850,
    status: 'ready' as const,
    preview: "As temperatures start climbing in Burnsville and the surrounding south metro area, your air conditioning system is about to work overtime. Here are 5 warning signs that your AC needs professional attention before the summer rush hits...",
    faqs: [
      { q: 'How often should I service my AC?', a: 'Most HVAC professionals recommend servicing your AC at least once a year...' },
      { q: 'How much does AC maintenance cost in Burnsville?', a: 'A typical AC tune-up in the Burnsville area runs between $89-$150...' },
    ]
  },
  {
    id: '2',
    title: "Homeowner's Guide to Emergency Plumbing in Apple Valley",
    type: 'how_to',
    city: 'Apple Valley',
    wordCount: 1100,
    status: 'draft' as const,
    preview: "A burst pipe at 2 AM is every Apple Valley homeowner's nightmare. Before you panic, here's exactly what to do — and when to call a professional. Step 1: Locate your main water shutoff valve...",
    faqs: [
      { q: 'What counts as a plumbing emergency?', a: 'Any situation involving uncontrolled water flow, sewage backup, or no water at all...' },
      { q: 'How fast can a plumber get to Apple Valley?', a: 'Most emergency plumbers in the south metro can arrive within 60-90 minutes...' },
    ]
  },
]

export default function BlogPage() {
  const [selectedType, setSelectedType] = useState('seasonal')
  const [city, setCity] = useState('')
  const [topic, setTopic] = useState('')
  const [generating, setGenerating] = useState(false)
  const [posts] = useState(DEMO_POSTS)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)

  const handleGenerate = async () => {
    setGenerating(true)
    // TODO: Wire to /api/blog endpoint
    setTimeout(() => setGenerating(false), 2000)
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
            <label className="text-sm text-white/60 block mb-1.5">Topic (optional — we'll pick one if blank)</label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. water heater maintenance, teeth whitening"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-[#FFD700] text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-[#FFD700]/90 disabled:opacity-50 transition-all"
        >
          {generating ? 'Writing...' : 'Write My Blog Post'}
        </button>
      </div>

      {/* Post list */}
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
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span>📍 {post.city}</span>
                    <span>📄 ~{post.wordCount} words</span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      post.status === 'ready' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status === 'ready' ? '✓ Ready to publish' : 'Draft'}
                    </span>
                  </div>
                </div>
                <span className="text-white/30 text-lg">{expandedPost === post.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expandedPost === post.id && (
              <div className="border-t border-white/10 p-5">
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{post.preview}</p>

                {/* FAQ section */}
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

                <div className="flex gap-3">
                  <button className="bg-[#FFD700] text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#FFD700]/90">
                    Copy HTML
                  </button>
                  <button className="border border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/5">
                    Edit
                  </button>
                  <button className="border border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/5">
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
