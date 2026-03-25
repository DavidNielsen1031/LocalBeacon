"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

const ORANGE = "#FF6B35"
const NAVY = "#1B2A4A"

/**
 * Recent AI search landscape changes — shown on the dashboard for paid users.
 * Static for now; will be automated via research agent later.
 */
const AI_UPDATES = [
  {
    date: "Mar 2026",
    title: "Google added AI Overviews to local searches",
    impact: "LocalBeacon now generates content structured for AI citation — your posts include citable paragraphs that AI assistants can quote directly.",
    tag: "Google",
  },
  {
    date: "Feb 2026",
    title: "ChatGPT started recommending local businesses",
    impact: "We added llms.txt and ai-index.json generation so ChatGPT and Claude can discover your business info programmatically.",
    tag: "ChatGPT",
  },
  {
    date: "Jan 2026",
    title: "Perplexity expanded local business answers",
    impact: "Schema markup with FAQ, service areas, and business hours now helps AI assistants surface your business in local recommendations.",
    tag: "Perplexity",
  },
]

interface AiUpdatesCardProps {
  plan: string
}

export function AiUpdatesCard({ plan }: AiUpdatesCardProps) {
  // Only show for paid users
  if (plan === "free" || !plan) {
    return (
      <Card className="border border-dashed" style={{ borderColor: "#DFE6E9" }}>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} style={{ color: ORANGE }} />
            <h3 className="font-bold text-sm" style={{ color: NAVY }}>AI Search Updates</h3>
            <Badge className="text-[0.6rem] px-1.5 py-0" style={{ background: "#EFF6FF", color: "#2563EB" }}>Autopilot</Badge>
          </div>
          <p className="text-xs" style={{ color: "#636E72" }}>
            Upgrade to Pro to see how AI search is changing — and how we keep your listing current automatically.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border" style={{ borderColor: "#DFE6E9" }}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={18} style={{ color: ORANGE }} />
            <h3 className="font-bold text-sm" style={{ color: NAVY }}>AI Search Updates</h3>
          </div>
          <span className="text-[0.6875rem]" style={{ color: "#636E72" }}>
            Last updated: Mar 21, 2026
          </span>
        </div>

        <div className="space-y-3">
          {AI_UPDATES.map((update, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-1 rounded-full shrink-0" style={{ background: ORANGE, opacity: 1 - i * 0.25 }} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold" style={{ color: NAVY }}>{update.title}</span>
                  <Badge className="text-[0.6rem] px-1.5 py-0 shrink-0" style={{ background: "#F0F0F0", color: "#636E72" }}>
                    {update.tag}
                  </Badge>
                </div>
                <p className="text-xs" style={{ color: "#636E72", lineHeight: 1.5 }}>
                  {update.impact}
                </p>
                <span className="text-[0.625rem]" style={{ color: "#B2BEC3" }}>{update.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t" style={{ borderColor: "#DFE6E9" }}>
          <p className="text-xs" style={{ color: "#636E72" }}>
            We track changes to Google, ChatGPT, Perplexity, and Claude so your listing stays optimized — you don&apos;t have to keep up.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
