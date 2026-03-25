"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GscData {
  connected: boolean
  siteUrl?: string
  period?: string
  totals?: { clicks: number; impressions: number; ctr: number; position: number }
  previous?: { clicks: number; impressions: number; ctr: number; position: number }
  topQueries?: Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>
  error?: string
  upgrade?: boolean
}

const ORANGE = "#FF6B35"
const NAVY = "#1B2A4A"
const SLATE = "#636E72"
// Accessible contrast colors: #00705A on white = 6.06:1, #B91C1C on white = 5.9:1
const GREEN_A11Y = "#00705A"
const RED_A11Y = "#B91C1C"

function TrendArrow({ current, previous, inverse, label }: { current: number; previous: number; inverse?: boolean; label: string }) {
  if (previous === 0 && current === 0) return <span className="text-xs" style={{ color: SLATE }} aria-label={`${label}: no change`}>—</span>
  const diff = current - previous
  const pct = previous > 0 ? Math.round((diff / previous) * 100) : current > 0 ? 100 : 0
  const isGood = inverse ? diff < 0 : diff > 0
  const color = isGood ? GREEN_A11Y : diff === 0 ? SLATE : RED_A11Y
  const arrow = diff > 0 ? "↑" : diff < 0 ? "↓" : "→"
  const sentiment = isGood ? "improved" : diff === 0 ? "unchanged" : "declined"
  return (
    <span className="text-xs font-semibold" style={{ color }} aria-label={`${label}: ${sentiment} by ${Math.abs(pct)}%`} role="text">
      {arrow} {Math.abs(pct)}%
    </span>
  )
}

export function GscCard() {
  const [data, setData] = useState<GscData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("28d")

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    fetch(`/api/gsc/data?period=${period}`, { signal: controller.signal })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(err => {
        if (err.name !== 'AbortError') { setData(null); setLoading(false) }
      })
    return () => controller.abort()
  }, [period])

  // Not connected — show connect CTA
  if (!loading && data && !data.connected) {
    return (
      <Card className="border" style={{ borderColor: "#DFE6E9" }}>
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>How Customers Find You on Google</h3>
          <p className="text-sm mb-4" style={{ color: SLATE }}>
            See how many people find your business on Google — which searches bring them, how often they click, and whether it&apos;s growing. Optional — takes 2 minutes to connect.
          </p>
          <Button
            type="button"
            onClick={() => window.location.href = "/api/gsc/connect"}
            className="font-semibold text-white"
            style={{ background: ORANGE }}
          >
            Connect Google Search Data
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Upgrade required
  if (!loading && data?.upgrade) {
    return (
      <Card className="border" style={{ borderColor: "#DFE6E9" }}>
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>How Customers Find You on Google</h3>
          <p className="text-sm mb-4" style={{ color: SLATE }}>
            Solo members can see how many people find their business through Google searches — and whether it&apos;s growing month over month.
          </p>
          <Button
            type="button"
            onClick={() => window.location.href = "/pricing"}
            className="font-semibold text-white"
            style={{ background: ORANGE }}
          >
            Upgrade to Autopilot — $99/mo
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Connected — show data
  return (
    <Card className="border" style={{ borderColor: "#DFE6E9" }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg" style={{ color: NAVY }}>How Customers Find You</h3>
          <div className="flex gap-1">
            {(["7d", "28d", "3mo"] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                aria-pressed={period === p}
                aria-label={p === "7d" ? "7 days" : p === "28d" ? "28 days" : "3 months"}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                style={{
                  background: period === p ? ORANGE : "transparent",
                  color: period === p ? NAVY : SLATE,
                  border: period === p ? "none" : "1px solid #DFE6E9",
                }}
              >
                {p === "7d" ? "7 days" : p === "28d" ? "28 days" : "3 months"}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8" style={{ color: SLATE }}>Loading search data...</div>
        ) : data?.error ? (
          <div className="text-center py-4 text-sm" style={{ color: SLATE }}>{data.error}</div>
        ) : (
          <>
            {/* Metrics grid — semantic dl for label/value association */}
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <dt className="text-xs uppercase tracking-wider mb-1" style={{ color: SLATE }}>Clicks</dt>
                <dd className="text-2xl font-bold" style={{ color: NAVY }}>
                  {data?.totals?.clicks ?? 0}
                  {data?.previous && <> <TrendArrow current={data.totals?.clicks ?? 0} previous={data.previous.clicks} label="Clicks" /></>}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider mb-1" style={{ color: SLATE }}>Impressions</dt>
                <dd className="text-2xl font-bold" style={{ color: NAVY }}>
                  {(data?.totals?.impressions ?? 0).toLocaleString()}
                  {data?.previous && <> <TrendArrow current={data.totals?.impressions ?? 0} previous={data.previous.impressions} label="Impressions" /></>}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider mb-1" style={{ color: SLATE }}>CTR</dt>
                <dd className="text-2xl font-bold" style={{ color: NAVY }}>
                  {data?.totals?.ctr ?? 0}%
                  {data?.previous && <> <TrendArrow current={data.totals?.ctr ?? 0} previous={data.previous.ctr} label="Click-through rate" /></>}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider mb-1" style={{ color: SLATE }}>Avg Position</dt>
                <dd className="text-2xl font-bold" style={{ color: NAVY }}>
                  {data?.totals?.position ?? 0}
                  {data?.previous && <> <TrendArrow current={data.totals?.position ?? 0} previous={data.previous.position} inverse label="Average position" /></>}
                </dd>
              </div>
            </dl>

            {/* Top queries */}
            {data?.topQueries && data.topQueries.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: SLATE }}>Top Search Queries</p>
                <div className="space-y-2">
                  {data.topQueries.slice(0, 5).map((q, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "#F0F0F0" }}>
                      <span className="text-sm truncate flex-1 mr-4" style={{ color: NAVY }}>{q.query}</span>
                      <div className="flex gap-4 text-xs shrink-0" style={{ color: SLATE }}>
                        <span>{q.clicks} clicks</span>
                        <span aria-label={`${q.impressions} impressions`}>{q.impressions} imp</span>
                        <span aria-label={`ranked number ${q.position}`}>#{q.position}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {(!data?.topQueries || data.topQueries.length === 0) && (
              <div className="text-center py-4 text-sm" style={{ color: SLATE }}>
                No search data yet — Google takes 3-5 days to start reporting. Check back soon!
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
