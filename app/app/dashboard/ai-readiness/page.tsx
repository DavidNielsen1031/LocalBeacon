'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getRecommendations } from '@/lib/aeo-recommendations'
import { AeoRecommendations } from '@/components/aeo-recommendations'

interface CheckResult {
  id: string
  label: string
  description: string
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
  scannedAt: string
}

interface HistoryScan {
  id: string
  url: string
  score: number
  passed: number
  failed: number
  rules_version: string
  scanned_at: string
}

function ScoreRing({ score }: { score: number }) {
  const radius = 58
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? '#22c55e' : score >= 50 ? '#FFD700' : '#ef4444'

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <circle
          cx="64" cy="64" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-white">{score}</span>
        <span className="text-xs text-white/50">out of 100</span>
      </div>
    </div>
  )
}

function TrendChart({ scans }: { scans: HistoryScan[] }) {
  if (scans.length < 2) return null

  const sorted = [...scans].reverse() // oldest first
  const maxScore = 100
  const width = 320
  const height = 80
  const padding = 4
  const stepX = (width - padding * 2) / (sorted.length - 1)

  const points = sorted.map((s, i) => ({
    x: padding + i * stepX,
    y: height - padding - ((s.score / maxScore) * (height - padding * 2)),
    score: s.score,
    date: new Date(s.scanned_at).toLocaleDateString(),
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const firstScore = sorted[0].score
  const lastScore = sorted[sorted.length - 1].score
  const delta = lastScore - firstScore
  const deltaColor = delta > 0 ? 'text-green-400' : delta < 0 ? 'text-red-400' : 'text-white/40'

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Score History</h3>
          <span className={`text-sm font-bold ${deltaColor}`}>
            {delta > 0 ? `+${delta}` : delta} pts
          </span>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20">
          <path d={pathD} fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#FFD700" />
          ))}
        </svg>
        <div className="flex justify-between text-xs text-white/30 mt-1">
          <span>{points[0].date}</span>
          <span>{scans.length} scans</span>
          <span>{points[points.length - 1].date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function getGradeLabel(score: number): { label: string; color: string; emoji: string; message: string } {
  if (score >= 90) return { label: 'Excellent', color: 'text-green-400', emoji: '🏆', message: 'AI search engines can find and recommend your business easily.' }
  if (score >= 70) return { label: 'Good', color: 'text-green-300', emoji: '👍', message: 'You\'re ahead of most local businesses, but there\'s room to improve.' }
  if (score >= 50) return { label: 'Needs Work', color: 'text-yellow-400', emoji: '⚠️', message: 'AI assistants might find you sometimes, but you\'re missing key signals.' }
  if (score >= 30) return { label: 'Poor', color: 'text-orange-400', emoji: '🔧', message: 'AI search engines are unlikely to recommend your business right now.' }
  return { label: 'Critical', color: 'text-red-400', emoji: '🚨', message: 'Your business is invisible to AI assistants like ChatGPT, Siri, and Perplexity.' }
}

export default function AIReadinessPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryScan[]>([])

  const fetchHistory = async (scanUrl: string) => {
    try {
      let normalized = scanUrl.trim()
      if (!normalized.startsWith('http')) normalized = `https://${normalized}`
      normalized = normalized.replace(/\/+$/, '')
      const res = await fetch(`/api/ai-readiness?url=${encodeURIComponent(normalized)}`)
      const data = await res.json()
      if (data.scans) setHistory(data.scans)
    } catch {
      // History is non-critical
    }
  }

  const handleScan = async () => {
    if (!url.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    setHistory([])

    try {
      const res = await fetch('/api/ai-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()
      if (data.error && !data.checks) {
        setError(data.error)
      } else {
        setResult(data)
        // Fetch history after scan completes (includes the new scan)
        fetchHistory(url)
      }
    } catch {
      setError('Failed to scan. Please check the URL and try again.')
    } finally {
      setLoading(false)
    }
  }

  const grade = result ? getGradeLabel(result.score) : null

  // Compute recommendations from scan results
  const recommendations = useMemo(() => {
    if (!result) return []
    const signals: Record<string, boolean> = {}
    for (const check of result.checks) {
      signals[check.id] = check.passed
    }
    return getRecommendations(signals)
  }, [result])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">AI Readiness Score</h1>
        <p className="text-white/50 mt-1">
          Check if AI assistants like ChatGPT, Siri, and Perplexity can find and recommend your business.
        </p>
      </div>

      {/* URL Input */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Enter your website URL
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              placeholder="example.com or https://example.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/30"
            />
            <Button
              onClick={handleScan}
              disabled={loading || !url.trim()}
              className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8"
            >
              {loading ? 'Scanning...' : 'Scan'}
            </Button>
          </div>
          {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
        </CardContent>
      </Card>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin mb-4" />
          <p className="text-white/50">Scanning {url}...</p>
          <p className="text-white/30 text-sm mt-1">Checking 15 AI visibility signals</p>
        </div>
      )}

      {/* Results */}
      {result && grade && (
        <>
          {/* Score overview */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreRing score={result.score} />
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="text-2xl">{grade.emoji}</span>
                    <span className={`text-2xl font-bold ${grade.color}`}>{grade.label}</span>
                  </div>
                  <p className="text-white/60 mb-4">{grade.message}</p>
                  <div className="flex gap-6 justify-center md:justify-start">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-400">{result.passed}</span>
                      <p className="text-xs text-white/40">Passed</p>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-red-400">{result.failed}</span>
                      <p className="text-xs text-white/40">Need Fixing</p>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-white/60">{result.total}</span>
                      <p className="text-xs text-white/40">Total Checks</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend chart */}
          {history.length >= 2 && <TrendChart scans={history} />}

          {/* Failed checks first */}
          {result.checks.filter(c => !c.passed).length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">
                🔧 What to Fix ({result.checks.filter(c => !c.passed).length} items)
              </h2>
              <div className="space-y-3">
                {result.checks
                  .filter(c => !c.passed)
                  .sort((a, b) => b.weight - a.weight)
                  .map(check => (
                    <Card key={check.id} className="bg-red-500/5 border-red-500/20">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="text-red-400 mt-0.5 text-lg">✗</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{check.label}</h3>
                            <p className="text-white/50 text-sm mt-1">{check.description}</p>
                            <p className="text-red-300/70 text-sm mt-2">
                              <span className="font-medium">Status:</span> {check.details}
                            </p>
                            <div className="mt-3 bg-white/5 rounded-lg p-3">
                              <p className="text-[#FFD700] text-sm font-medium">How to fix:</p>
                              <p className="text-white/60 text-sm mt-1">{check.fix}</p>
                            </div>
                          </div>
                          <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">
                            Impact: {check.weight >= 8 ? 'High' : check.weight >= 6 ? 'Medium' : 'Low'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Passed checks */}
          {result.checks.filter(c => c.passed).length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">
                ✅ What&apos;s Working ({result.checks.filter(c => c.passed).length} items)
              </h2>
              <div className="space-y-2">
                {result.checks
                  .filter(c => c.passed)
                  .sort((a, b) => b.weight - a.weight)
                  .map(check => (
                    <Card key={check.id} className="bg-green-500/5 border-green-500/10">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-green-400 text-lg">✓</span>
                          <div className="flex-1">
                            <h3 className="font-medium text-white text-sm">{check.label}</h3>
                            <p className="text-white/40 text-xs mt-0.5">{check.details}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* AEO Recommendations */}
          <AeoRecommendations recommendations={recommendations} />

          {/* Scanned timestamp */}
          <p className="text-white/20 text-xs text-center">
            Scanned {new Date(result.scannedAt).toLocaleString()} · {result.url}
          </p>
        </>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🔍</span>
          <h2 className="text-xl font-bold text-white mb-2">Check Your AI Visibility</h2>
          <p className="text-white/50 max-w-md mx-auto mb-6">
            Enter any website URL above to see how visible it is to AI search engines like ChatGPT, Claude, Perplexity, and Google AI.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Your business website', 'A competitor\'s site', 'localbeacon.ai'].map(suggestion => (
              <button
                key={suggestion}
                onClick={() => suggestion === 'localbeacon.ai' ? setUrl('localbeacon.ai') : null}
                className="text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                Try: {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
