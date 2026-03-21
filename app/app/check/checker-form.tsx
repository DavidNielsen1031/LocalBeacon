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

function getGrade(score: number): { letter: string; color: string; summary: string } {
  if (score >= 90) return { letter: 'A', color: '#22c55e', summary: 'Excellent visibility' }
  if (score >= 75) return { letter: 'B', color: '#84cc16', summary: 'Good, minor gaps' }
  if (score >= 60) return { letter: 'C', color: '#eab308', summary: 'Needs improvement' }
  if (score >= 40) return { letter: 'D', color: '#f97316', summary: 'Significant gaps' }
  return { letter: 'F', color: '#ef4444', summary: 'Not AI-ready' }
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
  const [error, setError] = useState('')

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
    // Analytics: email submitted
    try { posthog.capture('email_submitted', { url: result.url, score: result.score }) } catch {}
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          url_scanned: result.url,
          score: result.score,
          checks: result.checks,
        }),
      })
      setEmailSaved(true)
      setViewState('full-report')
    } catch {
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
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input
                type="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Where should we send your full report?"
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
              ✅ Report sent to {email}
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

          {/* CTA */}
          <div className="bg-[#FAFAF7] rounded-xl p-6 border border-black/5 text-center">
            <h3 className="font-semibold text-[#1B2A4A] mb-1">Want to fix these issues automatically?</h3>
            <p className="text-sm text-[#1B2A4A]/50 mb-4">
              LocalBeacon handles your local marketing — we fix your AI visibility and keep it growing.
            </p>
            <p className="text-lg font-bold text-[#FF6B35] mb-2">Your score: {result.score}/100</p>
            <p className="text-sm text-[#1B2A4A]/50 mb-4">
              LocalBeacon users average 80+ after 30 days. We handle it for you.
            </p>
            <a
              href={`/sign-up?url=${encodeURIComponent(result.url)}&score=${result.score}${email ? `&email=${encodeURIComponent(email)}` : ''}`}
              onClick={() => {
                // Save scan data to localStorage so onboarding can pre-fill
                try {
                  localStorage.setItem('lb_scan_data', JSON.stringify({
                    url: result.url,
                    score: result.score,
                    email: email,
                    timestamp: Date.now(),
                  }))
                } catch {}
              }}
              className="inline-block px-8 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#FF6B35]/90 transition-colors"
            >
              Start Fixing These Free →
            </a>
          </div>

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
