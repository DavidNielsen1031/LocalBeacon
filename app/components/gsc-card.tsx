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

function TrendArrow({ current, previous, inverse }: { current: number; previous: number; inverse?: boolean }) {
  if (previous === 0 && current === 0) return <span className="text-xs" style={{ color: SLATE }}>—</span>
  const diff = current - previous
  const pct = previous > 0 ? Math.round((diff / previous) * 100) : current > 0 ? 100 : 0
  const isGood = inverse ? diff < 0 : diff > 0
  const color = isGood ? "#00B894" : diff === 0 ? SLATE : "#D63031"
  const arrow = diff > 0 ? "↑" : diff < 0 ? "↓" : "→"
  return <span className="text-xs font-semibold" style={{ color }}>{arrow} {Math.abs(pct)}%</span>
}

export function GscCard() {
  const [data, setData] = useState<GscData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("28d")

  useEffect(() => {
    setLoading(true)
    fetch(`/api/gsc/data?period=${period}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setData(null); setLoading(false) })
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
            onClick={() => window.location.href = "/pricing"}
            className="font-semibold text-white"
            style={{ background: ORANGE }}
          >
            Upgrade to Solo — $49/mo
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
                className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
                style={{
                  background: period === p ? ORANGE : "transparent",
                  color: period === p ? "#fff" : SLATE,
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
            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: SLATE }}>Clicks</p>
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{data?.totals?.clicks ?? 0}</p>
                {data?.previous && <TrendArrow current={data.totals?.clicks ?? 0} previous={data.previous.clicks} />}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: SLATE }}>Impressions</p>
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{(data?.totals?.impressions ?? 0).toLocaleString()}</p>
                {data?.previous && <TrendArrow current={data.totals?.impressions ?? 0} previous={data.previous.impressions} />}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: SLATE }}>CTR</p>
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{data?.totals?.ctr ?? 0}%</p>
                {data?.previous && <TrendArrow current={data.totals?.ctr ?? 0} previous={data.previous.ctr} />}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: SLATE }}>Avg Position</p>
                <p className="text-2xl font-bold" style={{ color: NAVY }}>{data?.totals?.position ?? 0}</p>
                {data?.previous && <TrendArrow current={data.totals?.position ?? 0} previous={data.previous.position} inverse />}
              </div>
            </div>

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
                        <span>{q.impressions} imp</span>
                        <span>#{q.position}</span>
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
