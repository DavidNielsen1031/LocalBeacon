'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

interface CheckResult {
  id: string
  label: string
  passed: boolean
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

interface CompetitorEntry {
  url: string
  result: ScanResult | null
  loading: boolean
}

function getGrade(score: number): { letter: string; color: string } {
  if (score >= 90) return { letter: 'A', color: '#22c55e' }
  if (score >= 75) return { letter: 'B', color: '#84cc16' }
  if (score >= 60) return { letter: 'C', color: '#eab308' }
  if (score >= 40) return { letter: 'D', color: '#f97316' }
  return { letter: 'F', color: '#ef4444' }
}

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<CompetitorEntry[]>([])
  const [newUrl, setNewUrl] = useState('')
  const [myResult, setMyResult] = useState<ScanResult | null>(null)
  const [myUrl, setMyUrl] = useState('')
  const [myLoading, setMyLoading] = useState(false)

  const scanUrl = useCallback(async (url: string): Promise<ScanResult | null> => {
    try {
      const res = await fetch('/api/ai-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) return null
      return await res.json()
    } catch {
      return null
    }
  }, [])

  const scanMySite = async () => {
    if (!myUrl.trim()) return
    setMyLoading(true)
    const result = await scanUrl(myUrl.trim())
    setMyResult(result)
    setMyLoading(false)
  }

  const addCompetitor = async () => {
    if (!newUrl.trim() || competitors.length >= 3) return
    const url = newUrl.trim()
    setNewUrl('')
    const entry: CompetitorEntry = { url, result: null, loading: true }
    setCompetitors(prev => [...prev, entry])

    const result = await scanUrl(url)
    setCompetitors(prev =>
      prev.map(c => c.url === url ? { ...c, result, loading: false } : c)
    )
  }

  const removeCompetitor = (url: string) => {
    setCompetitors(prev => prev.filter(c => c.url !== url))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Competitor Comparison</h1>
        <p className="text-white/50 text-sm mt-1">
          See how your AI visibility stacks up against your competitors
        </p>
      </div>

      {/* Your site */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-medium text-white/70 mb-3">Your website</h2>
        {!myResult ? (
          <div className="flex gap-3">
            <input
              type="url"
              value={myUrl}
              onChange={(e) => setMyUrl(e.target.value)}
              placeholder="Enter your website URL"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"
              onKeyDown={(e) => e.key === 'Enter' && scanMySite()}
            />
            <button
              onClick={scanMySite}
              disabled={myLoading || !myUrl.trim()}
              className="px-5 py-2.5 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#FFD700]/90 disabled:opacity-50 text-sm"
            >
              {myLoading ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getGrade(myResult.score).color }}
              >
                {myResult.score}
              </div>
              <div>
                <p className="text-white font-medium">{myResult.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                <p className="text-white/40 text-xs">{myResult.passed}/{myResult.total} signals passing</p>
              </div>
            </div>
            <button
              onClick={() => setMyResult(null)}
              className="text-xs text-white/30 hover:text-white/60"
            >
              Rescan
            </button>
          </div>
        )}
      </div>

      {/* Add competitor */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-white/70">Competitors</h2>
          <span className="text-xs text-white/30">{competitors.length}/3</span>
        </div>

        {competitors.length < 3 && (
          <div className="flex gap-3 mb-4">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Add a competitor's website"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50"
              onKeyDown={(e) => e.key === 'Enter' && addCompetitor()}
            />
            <button
              onClick={addCompetitor}
              disabled={!newUrl.trim()}
              className="px-5 py-2.5 bg-white/10 text-white font-medium rounded-lg hover:bg-white/15 disabled:opacity-50 text-sm"
            >
              + Add
            </button>
          </div>
        )}

        {competitors.length === 0 && (
          <p className="text-white/30 text-sm text-center py-4">
            Add up to 3 competitors to compare AI readiness scores
          </p>
        )}

        {/* Competitor list */}
        <div className="space-y-3">
          {competitors.map((comp) => (
            <div key={comp.url} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              {comp.loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
                  <div>
                    <p className="text-white/60 text-sm">{comp.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    <p className="text-white/30 text-xs">Scanning...</p>
                  </div>
                </div>
              ) : comp.result ? (
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: getGrade(comp.result.score).color }}
                  >
                    {comp.result.score}
                  </div>
                  <div>
                    <p className="text-white text-sm">{comp.result.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    <p className="text-white/40 text-xs">{comp.result.passed}/{comp.result.total} signals</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm">✗</div>
                  <div>
                    <p className="text-white/60 text-sm">{comp.url.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    <p className="text-red-400/60 text-xs">Could not scan</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => removeCompetitor(comp.url)}
                className="text-white/20 hover:text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      {myResult && competitors.some(c => c.result) && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h2 className="text-sm font-medium text-white/70 mb-4">Signal-by-signal comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white/40 font-medium">Signal</th>
                  <th className="text-center py-2 text-[#FFD700] font-medium">You</th>
                  {competitors.filter(c => c.result).map((comp) => (
                    <th key={comp.url} className="text-center py-2 text-white/40 font-medium">
                      {comp.url.replace(/^https?:\/\//, '').split('/')[0].slice(0, 15)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myResult.checks.map((check) => (
                  <tr key={check.id} className="border-b border-white/5">
                    <td className="py-2 text-white/70">{check.label}</td>
                    <td className="text-center">{check.passed ? '✅' : '❌'}</td>
                    {competitors.filter(c => c.result).map((comp) => {
                      const compCheck = comp.result!.checks.find(c => c.id === check.id)
                      return (
                        <td key={comp.url} className="text-center">
                          {compCheck?.passed ? '✅' : '❌'}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-2 text-white">Total Score</td>
                  <td className="text-center" style={{ color: getGrade(myResult.score).color }}>{myResult.score}</td>
                  {competitors.filter(c => c.result).map((comp) => (
                    <td key={comp.url} className="text-center" style={{ color: getGrade(comp.result!.score).color }}>
                      {comp.result!.score}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 text-center">
        <p className="text-white/30 text-xs mb-2">
          Want to share your score comparison with a prospect?
        </p>
        <Link
          href="/check"
          className="text-[#FFD700] text-sm hover:underline"
        >
          Use the free public checker →
        </Link>
      </div>
    </div>
  )
}
