'use client'

import Link from 'next/link'
import type { FreshnessStatus } from '@/lib/freshness'

interface FreshnessBadgeProps {
  daysSinceLastPost: number | null
  status: FreshnessStatus
  lastPostDate: string | null
}

export function FreshnessBadge({ daysSinceLastPost, status, lastPostDate }: FreshnessBadgeProps) {
  // "No posts yet" state
  if (status === 'none' || daysSinceLastPost === null) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#DFE6E9] text-sm text-[#636E72]">
        <span>📭</span>
        <span>No posts yet —</span>
        <Link
          href="/dashboard/queue"
          className="text-[#FF6B35] hover:underline font-medium"
        >
          generate your first!
        </Link>
      </div>
    )
  }

  const dayLabel = daysSinceLastPost === 0
    ? 'today'
    : daysSinceLastPost === 1
    ? '1 day ago'
    : `${daysSinceLastPost} days ago`

  if (status === 'fresh') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-sm text-green-400">
        <span>✅</span>
        <span>Last post: {dayLabel}</span>
      </div>
    )
  }

  if (status === 'stale') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-400">
        <span>⚠️</span>
        <span>Last post: {dayLabel} — Time to post!</span>
      </div>
    )
  }

  // critical
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
      <span>🔴</span>
      <span>Last post: {dayLabel} — Your Google listing needs a new post!</span>
    </div>
  )
}
