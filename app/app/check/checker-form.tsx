'use client'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { posthog } from '@/lib/posthog'

interface CheckResult {
  id: string
  label: string
  passed: boolean
  details: string
  fix: string
  weight: number
}

interface ScanResult {
  url: string
  score: number
  passed: number
  failed: number
  total: number
  checks: CheckResult[]
}

type ViewState = 'idle' | 'scanning' | 'teaser' | 'email-gate' | 'full-report'

// Simple client-side rate tracking
const RATE_LIMIT_KEY = 'lb_check_scans'
const MAX_SCANS_PER_HOUR = 3

function checkRateLimit(): boolean {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY)
    const scans: number[] = stored ? JSON.parse(stored) : []
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    const recent = scans.filter((t: number) => t > oneHourAgo)
    return recent.length < MAX_SCANS_PER_HOUR
  } catch {
    return true
  }
}

function recordScan() {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY)
    const scans: number[] = stored ? JSON.parse(stored) : []
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    const recent = scans.filter((t: number) => t > oneHourAgo)
    recent.push(Date.now())
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent))
  } catch {
    // ignore
  }
}

/**
 * Maps each check ID to what each plan fixes.
 * null = plan doesn't fix it. string = how the plan fixes it.
 */
type FixMode = 'diy' | 'self-setup' | 'auto' | 'done'
const PLAN_FIX_MAP: Record<string, { fixLabel?: string; free: string | null; freeMode?: FixMode; autopilot: string | null; autopilotMode?: FixMode; dfy: string | null; dfyMode?: FixMode }> = {
  llms_txt:          { fixLabel: 'AI discovery file', free: null, autopilot: 'We generate it — you copy-paste to your site', autopilotMode: 'self-setup', dfy: 'We create and install it on your site', dfyMode: 'done' },
  ai_index_json:     { fixLabel: 'AI index file', free: null, autopilot: 'We generate it from your business info', autopilotMode: 'self-setup', dfy: 'We create and deploy it for you', dfyMode: 'done' },
  schema_markup:     { fixLabel: 'Schema markup', free: 'Preview only', freeMode: 'diy', autopilot: 'We generate it — you add it to your site', autopilotMode: 'self-setup', dfy: 'We install it on your site live', dfyMode: 'done' },
  faq_content:       { fixLabel: 'FAQ content', free: null, autopilot: 'We write up to 5 FAQs/month for you', autopilotMode: 'auto', dfy: 'We write 15-25 custom FAQs and install them', dfyMode: 'done' },
  service_pages:     { fixLabel: 'City pages for areas you serve', free: null, autopilot: 'We build 10 city pages/month for you', autopilotMode: 'auto', dfy: 'We build all your city pages during setup', dfyMode: 'done' },
  freshness:         { fixLabel: 'Fresh Google posts', free: '5 posts/month', freeMode: 'diy', autopilot: 'We write and schedule weekly posts', autopilotMode: 'auto', dfy: 'Weekly posts included (1 month)', dfyMode: 'auto' },
  reviews:           { fixLabel: 'Review responses', free: '3 drafts/month', freeMode: 'diy', autopilot: 'We draft responses — you paste them', autopilotMode: 'self-setup', dfy: 'Unlimited drafts (1 month included)', dfyMode: 'done' },
  answer_first:      { fixLabel: 'Content AI can cite', free: null, autopilot: 'We write content structured for AI answers', autopilotMode: 'auto', dfy: 'We rewrite your existing content for AI', dfyMode: 'done' },
  citability:        { fixLabel: 'Citable paragraphs', free: null, autopilot: 'Every post includes citable paragraphs', autopilotMode: 'auto', dfy: 'We audit and rewrite your content', dfyMode: 'done' },
  eeat:              { fixLabel: 'Trust signals (E-E-A-T)', free: null, autopilot: 'We add author + expertise signals', autopilotMode: 'auto', dfy: 'Full trust audit on your site', dfyMode: 'done' },
  open_graph:        { fixLabel: 'Social preview tags', free: null, autopilot: 'Included in generated pages', autopilotMode: 'auto', dfy: 'We add them to your site', dfyMode: 'done' },
  nap:               { fixLabel: 'Business info consistency', free: null, autopilot: 'Consistent info across all content', autopilotMode: 'auto', dfy: 'Full audit + corrections across the web', dfyMode: 'done' },
  brand_social_links:{ fixLabel: 'Social media links', free: null, autopilot: null, dfy: 'We add social links to your site', dfyMode: 'done' },
  sitemap:           { fixLabel: 'Sitemap', free: null, autopilot: null, dfy: 'We verify and fix your sitemap', dfyMode: 'done' },
  sitemap_in_robots: { fixLabel: 'Robots.txt sitemap reference', free: null, autopilot: null, dfy: 'We fix your robots.txt', dfyMode: 'done' },
  canonical_tags:    { fixLabel: 'Canonical URL tags', free: null, autopilot: null, dfy: 'We add canonical tags', dfyMode: 'done' },
  // These are usually already passing or not fixable by LocalBeacon
  robots_txt:        { free: null, autopilot: null, dfy: null },
  ai_crawler_access: { free: null, autopilot: null, dfy: null },
  headings:          { free: null, autopilot: null, dfy: null },
  https:             { free: null, autopilot: null, dfy: null },
  mobile:            { free: null, autopilot: null, dfy: null },
}

const MODE_BADGE_CONFIG: Record<FixMode, { label: string; bg: string; color: string }> = {
  diy:         { label: 'Self-Service', bg: '#F0F0F0', color: '#636E72' },
  'self-setup': { label: 'Self-Setup',  bg: '#FFF8E1', color: '#B8860B' },
  auto:        { label: 'Automated',   bg: '#ECFDF5', color: '#059669' },
  done:        { label: 'Done for you', bg: '#EFF6FF', color: '#2563EB' },
}

function getGrade(score: number): { letter: string; color: string; summary: string } {
  if (score >= 90) return { letter: 'A', color: '#22c55e', summary: 'Excellent visibility' }
  if (score >= 75) return { letter: 'B', color: '#84cc16', summary: 'Good, minor gaps' }
  if (score >= 60) return { letter: 'C', color: '#eab308', summary: 'Needs improvement' }
  if (score >= 40) return { letter: 'D', color: '#f97316', summary: 'Significant gaps' }
  return { letter: 'F', color: '#ef4444', summary: 'Not visible to AI search' }
}

export function CheckerForm() {
  const searchParams = useSearchParams()
  const [url, setUrl] = useState('')

  // Pre-fill URL from query param
  useEffect(() => {
    const urlParam = searchParams.get('url')
    if (urlParam) setUrl(urlParam)
  }, [searchParams])
  const [competitorUrl, setCompetitorUrl] = useState('')
  const [showCompetitor, setShowCompetitor] = useState(false)
  const [viewState, setViewState] = useState<ViewState>('idle')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [competitorResult, setCompetitorResult] = useState<ScanResult | null>(null)
  const [email, setEmail] = useState('')
  const [emailSaving, setEmailSaving] = useState(false)
  const [emailSaved, setEmailSaved] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [error, setError] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)

  const runScan = useCallback(async () => {
    if (!url.trim()) return
    if (!checkRateLimit()) {
      setError('You\'ve reached the scan limit (3 per hour). Try again later.')
      return
    }

    setError('')
    setViewState('scanning')

    try {
      const res = await fetch('/api/ai-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Could not scan that URL. Make sure the website is online.')
        setViewState('idle')
        return
      }

      const data: ScanResult = await res.json()
      setResult(data)
      recordScan()
      // Analytics: scan completed
      try { posthog.capture('scan_completed', { url: data.url, score: data.score }) } catch {}

      // If competitor URL provided, scan that too
      if (showCompetitor && competitorUrl.trim()) {
        const compRes = await fetch('/api/ai-readiness', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: competitorUrl.trim() }),
        })
        if (compRes.ok) {
          const compData: ScanResult = await compRes.json()
          setCompetitorResult(compData)
        }
      }

      setViewState('teaser')
    } catch {
      setError('Something went wrong. Please try again.')
      setViewState('idle')
    }
  }, [url, competitorUrl, showCompetitor])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !result) return

    setEmailSaving(true)
    setEmailError(false)
    // Analytics: email submitted
    try { posthog.capture('email_submitted', { url: result.url, score: result.score }) } catch {}
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          url_scanned: result.url,
          score: result.score,
          checks: result.checks,
        }),
      })
      if (!res.ok) {
        setEmailError(true)
      } else {
        setEmailSaved(true)
      }
      setViewState('full-report')
    } catch {
      setEmailError(true)
      // Still show the report even if email save fails
      setViewState('full-report')
    } finally {
      setEmailSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pb-8">
      {/* Input Form */}
      {(viewState === 'idle' || viewState === 'scanning') && (
        <div className="bg-white rounded-2xl shadow-lg border border-black/5 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              aria-label="Your website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL (e.g. bobsplumbing.com)"
              className="flex-1 px-4 py-3 rounded-lg border border-black/10 bg-[#FAFAF7] text-[#1B2A4A] placeholder:text-[#1B2A4A]/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
              onKeyDown={(e) => e.key === 'Enter' && runScan()}
              disabled={viewState === 'scanning'}
            />
            <button
              onClick={runScan}
              disabled={viewState === 'scanning' || !url.trim()}
              className="px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#FF6B35]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full sm:w-auto"
            >
              {viewState === 'scanning' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Scanning...
                </span>
              ) : (
                'Check My Score'
              )}
            </button>
          </div>

          {/* Competitor toggle */}
          {!showCompetitor ? (
            <button
              onClick={() => setShowCompetitor(true)}
              className="mt-3 text-sm text-[#FF6B35] hover:underline"
            >
              + Compare with a competitor
            </button>
          ) : (
            <div className="mt-3">
              <input
                type="url"
                aria-label="Competitor website URL"
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                placeholder="Competitor's website (optional)"
                className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#FAFAF7] text-[#1B2A4A] placeholder:text-[#1B2A4A]/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]"
                disabled={viewState === 'scanning'}
              />
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Teaser Score */}
      {viewState === 'teaser' && result && (
        <div className="bg-white rounded-2xl shadow-lg border border-black/5 p-8 text-center">
          {/* Score circle */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={getGrade(result.score).color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(result.score / 100) * 327} 327`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#1B2A4A]">{result.score}</span>
              <span className="text-xs text-[#1B2A4A]/40">out of 100</span>
            </div>
          </div>

          <div
            className="inline-block px-3 py-1 rounded-full text-white font-bold text-sm mb-2"
            style={{ backgroundColor: getGrade(result.score).color }}
          >
            Grade: {getGrade(result.score).letter}
          </div>
          <p className="text-[#1B2A4A]/60 text-sm mb-2">{getGrade(result.score).summary}</p>
          <p className="text-[#1B2A4A]/40 text-xs mb-6">
            {result.passed}/{result.total} signals passing · {result.url}
          </p>

          {/* Competitor comparison teaser */}
          {competitorResult && (
            <div className="mb-6 p-4 rounded-lg bg-[#FAFAF7] border border-black/5">
              <p className="text-sm font-medium text-[#1B2A4A] mb-2">vs. Competitor</p>
              <div className="flex items-center justify-center gap-8">
                <div>
                  <p className="text-2xl font-bold" style={{ color: getGrade(result.score).color }}>{result.score}</p>
                  <p className="text-xs text-[#1B2A4A]/40">Your site</p>
                </div>
                <span className="text-[#1B2A4A]/20 text-lg">vs</span>
                <div>
                  <p className="text-2xl font-bold" style={{ color: getGrade(competitorResult.score).color }}>{competitorResult.score}</p>
                  <p className="text-xs text-[#1B2A4A]/40">{competitorResult.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                </div>
              </div>
              {result.score > competitorResult.score && (
                <p className="text-xs text-green-600 mt-2">🏆 You&apos;re ahead by {result.score - competitorResult.score} points!</p>
              )}
              {result.score < competitorResult.score && (
                <p className="text-xs text-orange-600 mt-2">📊 You&apos;re {competitorResult.score - result.score} points behind — see how to catch up</p>
              )}
            </div>
          )}

          {/* Top 3 failing checks preview */}
          {(() => {
            const topFailing = result.checks
              .filter(c => !c.passed)
              .sort((a, b) => b.weight - a.weight)
              .slice(0, 3)
            if (topFailing.length === 0) return null
            return (
              <div className="mb-6 text-left">
                <h3 className="font-semibold text-[#1B2A4A] text-sm mb-3">Your top issues:</h3>
                <div className="space-y-2">
                  {topFailing.map(check => (
                    <div key={check.id} className="p-3 rounded-lg bg-red-50 border border-red-100">
                      <span className="text-red-500 mr-2">✗</span>
                      <span className="font-medium text-[#1B2A4A] text-sm">{check.label}</span>
                      <p className="text-xs text-[#1B2A4A]/50 ml-6">{check.details}</p>
                    </div>
                  ))}
                </div>
                {result.failed - topFailing.length > 0 && (
                  <p className="text-xs text-[#1B2A4A]/40 mt-2">
                    + {result.failed - topFailing.length} more issues found. Get the full breakdown below.
                  </p>
                )}
              </div>
            )
          })()}

          {/* Email gate */}
          <div className="bg-[#FAFAF7] rounded-xl p-6 border border-black/5">
            <h3 className="font-semibold text-[#1B2A4A] mb-1">Get your {result.total}-point breakdown + fix-it guide</h3>
            <p className="text-sm text-[#1B2A4A]/50 mb-2">Your full report includes:</p>
            <ul className="text-sm text-[#1B2A4A]/60 mb-4 space-y-1 text-left">
              <li>✓ All {result.total} signals scored (not just top 3)</li>
              <li>✓ Step-by-step fix instructions for every failing check</li>
              <li>✓ Priority ranking — which fixes move the needle most</li>
            </ul>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-black/10 bg-white text-[#1B2A4A] placeholder:text-[#1B2A4A]/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30"
              />
              <button
                type="submit"
                disabled={emailSaving}
                className="px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#FF6B35]/90 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {emailSaving ? 'Sending...' : 'Get Full Report'}
              </button>
            </form>
            <p className="text-xs text-[#1B2A4A]/30 mt-2">No spam. Unsubscribe anytime.</p>
          </div>

          {/* Scan another */}
          <button
            onClick={() => {
              setViewState('idle')
              setResult(null)
              setCompetitorResult(null)
              setUrl('')
              setCompetitorUrl('')
              setEmail('')
              setEmailSaved(false)
            }}
            className="mt-4 text-sm text-[#FF6B35] hover:underline"
          >
            ← Scan another website
          </button>
        </div>
      )}

      {/* Full Report */}
      {viewState === 'full-report' && result && (
        <div className="bg-white rounded-2xl shadow-lg border border-black/5 p-8">
          {/* Score summary */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: getGrade(result.score).color }}
            >
              {result.score}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B2A4A]">
                AI Readiness Report — {result.url.replace(/^https?:\/\//, '').split('/')[0]}
              </h2>
              <p className="text-sm text-[#1B2A4A]/50">
                Grade: {getGrade(result.score).letter} · {result.passed} passing · {result.failed} failing
              </p>
            </div>
          </div>

          {emailSaved && (
            <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              ✅ Report sent to {email} — check your inbox (and spam folder)
            </div>
          )}

          {emailError && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              ⚠️ We couldn&apos;t send the report email. You can still view your results below.
            </div>
          )}

          {/* Category-grouped results */}
          {(() => {
            const categories = [
              { name: 'AI Access', icon: '🤖', ids: ['robots_txt', 'ai_crawler_access', 'llms_txt', 'ai_index_json'] },
              { name: 'Content Structure', icon: '📝', ids: ['headings', 'faq_content', 'answer_first', 'service_pages', 'freshness'] },
              { name: 'Schema & Data', icon: '🔗', ids: ['schema_markup', 'reviews', 'nap', 'brand_social_links'] },
              { name: 'Citability & Quality', icon: '📊', ids: ['citability', 'eeat'] },
              { name: 'Meta & Technical', icon: '⚙️', ids: ['https', 'mobile', 'open_graph', 'sitemap'] },
            ]
            return (
              <div className="space-y-6 mb-8">
                {categories.map(cat => {
                  const catChecks = result.checks.filter(c => cat.ids.includes(c.id))
                  if (catChecks.length === 0) return null
                  const passing = catChecks.filter(c => c.passed).length
                  const total = catChecks.length
                  const pct = Math.round((passing / total) * 100)
                  return (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-[#1B2A4A] text-sm flex items-center gap-2">
                          <span>{cat.icon}</span> {cat.name}
                        </h3>
                        <span className={`text-xs font-medium ${pct === 100 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                          {passing}/{total} passing
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                        <div className={`h-1.5 rounded-full ${pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="space-y-2">
                        {catChecks.sort((a, b) => (a.passed === b.passed ? b.weight - a.weight : a.passed ? 1 : -1)).map(check => (
                          <div key={check.id} className={`p-3 rounded-lg border ${check.passed ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-[#1B2A4A] text-sm flex items-center gap-2">
                                <span className={check.passed ? 'text-green-500' : 'text-red-500'}>{check.passed ? '✓' : '✗'}</span>
                                {check.label}
                              </span>
                              {!check.passed && (
                                <span className="text-xs font-medium text-red-400">
                                  {check.weight >= 8 ? 'Critical' : check.weight >= 5 ? 'Important' : 'Nice-to-have'}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#1B2A4A]/50 ml-6">{check.details}</p>
                            {!check.passed && check.fix && (
                              <p className="text-xs text-[#FF6B35] font-medium ml-6 mt-1">💡 {check.fix}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
                {/* Ungrouped checks (fallback for any check IDs not in categories) */}
                {(() => {
                  const allCatIds = categories.flatMap(c => c.ids)
                  const ungrouped = result.checks.filter(c => !allCatIds.includes(c.id))
                  if (ungrouped.length === 0) return null
                  return (
                    <div>
                      <h3 className="font-semibold text-[#1B2A4A] text-sm mb-2">Other Signals</h3>
                      <div className="space-y-2">
                        {ungrouped.map(check => (
                          <div key={check.id} className={`p-3 rounded-lg border ${check.passed ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                            <span className={`${check.passed ? 'text-green-500' : 'text-red-500'} mr-2`}>{check.passed ? '✓' : '✗'}</span>
                            <span className="font-medium text-[#1B2A4A] text-sm">{check.label}</span>
                            <p className="text-xs text-[#1B2A4A]/50 ml-6">{check.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })()}
              </div>
            )
          })()}

          {/* Competitor side-by-side */}
          {competitorResult && (
            <div className="mb-8">
              <h3 className="font-semibold text-[#1B2A4A] mb-3">📊 Competitor Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="text-left py-2 text-[#1B2A4A]/50 font-medium">Signal</th>
                      <th className="text-center py-2 text-[#1B2A4A]/50 font-medium">You</th>
                      <th className="text-center py-2 text-[#1B2A4A]/50 font-medium">Competitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.checks.map((check) => {
                      const comp = competitorResult.checks.find(c => c.id === check.id)
                      return (
                        <tr key={check.id} className="border-b border-black/5">
                          <td className="py-2 text-[#1B2A4A]">{check.label}</td>
                          <td className="text-center">{check.passed ? '✅' : '❌'}</td>
                          <td className="text-center">{comp?.passed ? '✅' : '❌'}</td>
                        </tr>
                      )
                    })}
                    <tr className="font-bold">
                      <td className="py-2 text-[#1B2A4A]">Total Score</td>
                      <td className="text-center" style={{ color: getGrade(result.score).color }}>{result.score}/100</td>
                      <td className="text-center" style={{ color: getGrade(competitorResult.score).color }}>{competitorResult.score}/100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Score-Aware CTA */}
          {(() => {
            const failingChecks = result.checks.filter(c => !c.passed)
            const totalFailing = failingChecks.length
            const score = result.score

            const getMessage = () => {
              if (score >= 90) return {
                headline: 'Your site is already well-optimized.',
                sub: 'LocalBeacon Pro keeps it that way automatically \u2014 fresh content, new signals, and competitor monitoring so you stay ahead.',
                emoji: '\ud83c\udfc6',
                urgency: false,
              }
              if (score >= 60) return {
                headline: `You\u2019re ahead of most competitors, but ${totalFailing} gap${totalFailing === 1 ? '' : 's'} could cost you visibility.`,
                sub: 'AI search evolves weekly. LocalBeacon Pro fixes these gaps and keeps you updated as new signals emerge.',
                emoji: '\ud83d\udcc8',
                urgency: false,
              }
              if (score >= 30) return {
                headline: 'Your competitors are more visible to AI search than you are.',
                sub: `${totalFailing} issue${totalFailing === 1 ? '' : 's'} found. Every week without fixing these, you\u2019re losing potential customers to businesses that AI recommends instead.`,
                emoji: '\u26a0\ufe0f',
                urgency: true,
              }
              return {
                headline: 'AI search engines can barely find your business.',
                sub: `${totalFailing} critical issue${totalFailing === 1 ? '' : 's'}. When customers ask ChatGPT or Google AI for recommendations, you\u2019re invisible. This needs fixing now.`,
                emoji: '\ud83d\udea8',
                urgency: true,
              }
            }

            const msg = getMessage()

            const saveScanData = () => {
              try {
                localStorage.setItem('lb_scan_data', JSON.stringify({
                  url: result.url,
                  score: result.score,
                  email: email,
                  timestamp: Date.now(),
                }))
              } catch {}
            }

            const handlePaidCheckout = async (planKey: 'SOLO' | 'SOLO_ANNUAL' | 'DFY') => {
              setCheckoutLoading(planKey)
              saveScanData()
              try {
                const res = await fetch('/api/checkout-public', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    plan: planKey,
                    email: email || undefined,
                    url: result.url,
                    score: result.score,
                  }),
                })
                const data = await res.json()
                if (data.url) {
                  window.location.href = data.url
                  return
                }
                console.error('Checkout failed:', data.error)
              } catch (err) {
                console.error('Checkout error:', err)
              }
              setCheckoutLoading(null)
            }

            const proFixable = failingChecks
              .filter(c => PLAN_FIX_MAP[c.id]?.autopilot)
              .sort((a, b) => b.weight - a.weight)
              .slice(0, 4)

            return (
              <div className="mt-8 pt-8 border-t border-black/5">
                <div className="text-center mb-8">
                  <span className="text-3xl mb-2 block">{msg.emoji}</span>
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">{msg.headline}</h3>
                  <p className="text-sm text-[#636E72] max-w-lg mx-auto">{msg.sub}</p>
                </div>

                {proFixable.length > 0 && (
                  <div className="max-w-lg mx-auto mb-8 p-4 rounded-xl bg-[#FFF5F0] border border-[#FF6B35]/10">
                    <h4 className="font-semibold text-[#1B2A4A] text-sm mb-3">What LocalBeacon Pro fixes for you:</h4>
                    <ul className="space-y-2">
                      {proFixable.map(check => (
                        <li key={check.id} className="flex items-start gap-2 text-sm">
                          <span className="text-[#FF6B35] mt-0.5 shrink-0 font-bold">\u2192</span>
                          <div>
                            <span className="font-medium text-[#1B2A4A]">{PLAN_FIX_MAP[check.id]?.fixLabel || check.label}</span>
                            <span className="text-[#636E72]"> \u2014 {PLAN_FIX_MAP[check.id]?.autopilot}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <div className="rounded-xl relative" style={{ border: '2px solid #FF6B35', background: 'rgba(255,107,53,0.02)' }}>
                    <div className="text-center -mt-3">
                      <span className="inline-block text-xs font-bold text-white px-3 py-1 rounded-full" style={{ background: '#FF6B35' }}>
                        Most Popular
                      </span>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-[#1B2A4A] text-lg">LocalBeacon Pro</h4>
                      <p className="text-xs text-[#636E72] mb-3">AI-powered local marketing on autopilot</p>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-bold text-[#1B2A4A]">$99</span>
                        <span className="text-sm text-[#636E72]">/month</span>
                      </div>
                      <p className="text-xs text-[#636E72] mb-4">or $899/year (save $289)</p>

                      <ul className="space-y-2 mb-6">
                        {[
                          'Weekly Google posts \u2014 written & ready',
                          '2 blog posts/month, locally optimized',
                          '3 city pages/month for service areas',
                          'Monthly Intelligence Report',
                          'Schema & llms.txt auto-generated',
                          'AI readiness monitoring',
                        ].map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm text-[#1B2A4A]/80">
                            <span className="text-[#FF6B35] mt-0.5 shrink-0">\u2713</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handlePaidCheckout('SOLO')}
                        disabled={checkoutLoading !== null}
                        className="block w-full text-center py-3 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                        style={{ background: '#FF6B35', boxShadow: '0 4px 14px rgba(255,107,53,0.3)' }}
                      >
                        {checkoutLoading === 'SOLO' ? 'Redirecting...' : 'Start Pro \u2014 $99/mo'}
                      </button>
                      <button
                        onClick={() => handlePaidCheckout('SOLO_ANNUAL')}
                        disabled={checkoutLoading !== null}
                        className="block w-full text-center py-2.5 mt-2 rounded-lg font-medium text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                        style={{ color: '#FF6B35', border: '1px solid #FF6B35' }}
                      >
                        {checkoutLoading === 'SOLO_ANNUAL' ? 'Redirecting...' : 'Or $899/year \u2014 save $289'}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl relative" style={{ border: '2px solid #D4A017', background: 'linear-gradient(180deg, #FFFDF5, #FFF8E7)' }}>
                    <div className="text-center -mt-3">
                      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'linear-gradient(90deg, #B8860B, #FFD700)', color: '#000' }}>
                        White Glove
                      </span>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-[#1B2A4A] text-lg">Beacon Launch</h4>
                      <p className="text-xs text-[#636E72] mb-3">We set everything up for you</p>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-bold text-[#1B2A4A]">$499</span>
                        <span className="text-sm text-[#636E72]">one-time</span>
                      </div>
                      <p className="text-xs text-[#636E72] mb-4">+ first month of Pro included</p>

                      <ul className="space-y-2 mb-6">
                        {[
                          'Strategy call with our team',
                          'GBP audit & optimization',
                          'Competitor deep-dive report',
                          'FAQs, schema, llms.txt installed',
                          'Service area pages built',
                          'Custom brand voice profile',
                        ].map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm text-[#1B2A4A]/80">
                            <span className="text-[#B8860B] mt-0.5 shrink-0">\u2713</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handlePaidCheckout('DFY')}
                        disabled={checkoutLoading !== null}
                        className="block w-full text-center py-3 rounded-lg font-semibold text-sm text-black transition-opacity hover:opacity-90 disabled:opacity-60"
                        style={{ background: 'linear-gradient(90deg, #B8860B, #DAA520)' }}
                      >
                        {checkoutLoading === 'DFY' ? 'Redirecting...' : 'Get Beacon Launch \u2014 $499'}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-center text-xs text-[#636E72] mt-6">No contracts \u00b7 Cancel anytime \u00b7 26+ AI signals monitored</p>
              </div>
            )
          })()}
          {/* Scan another */}
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setViewState('idle')
                setResult(null)
                setCompetitorResult(null)
                setUrl('')
                setCompetitorUrl('')
                setEmail('')
                setEmailSaved(false)
              }}
              className="text-sm text-[#FF6B35] hover:underline"
            >
              ← Scan another website
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
