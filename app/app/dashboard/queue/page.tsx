export const dynamic = 'force-dynamic'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { QueueActions } from './queue-actions'
import { UsageMeter } from '@/components/usage-meter'
import { getFreshness } from '@/lib/freshness'
import { FreshnessBadge } from '@/components/freshness-badge'

interface QueueItem {
  id: string
  title: string | null
  content: string
  scheduled_for: string | null
  status: 'draft' | 'ready' | 'posted'
  created_at: string
}

async function getQueueData(userId: string) {
  const supabase = createServerClient()
  if (!supabase) return { business: null, items: [] }

  // Get the user's internal ID
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!user) return { business: null, items: [] }

  const { data: business } = await supabase
    .from('businesses')
    .select('id, name, category, primary_city')
    .eq('user_id', user.id)
    .single()

  if (!business) return { business: null, items: [] }

  const { data: items } = await supabase
    .from('content_queue')
    .select('id, title, content, scheduled_for, status, created_at')
    .eq('business_id', business.id)
    .order('scheduled_for', { ascending: true })

  return { business, items: (items ?? []) as QueueItem[] }
}

function formatDate(iso: string | null): string {
  if (!iso) return 'Not scheduled'
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function QueuePage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const { business, items } = await getQueueData(user.id)
  const freshness = await getFreshness(user.id)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Upcoming Posts</h1>
          <p className="text-white/50 text-sm mt-1">
            Posts we&apos;ve written for your Google listing — ready to copy and publish
          </p>
        </div>

        <QueueActions businessId={business?.id ?? null} />
      </div>

      {/* Freshness badge */}
      <div className="mb-4">
        <FreshnessBadge
          daysSinceLastPost={freshness.daysSinceLastPost}
          status={freshness.status}
          lastPostDate={freshness.lastPostDate}
        />
      </div>

      {/* Usage meter for free plan */}
      <UsageMeter />

      {/* List */}
      {items.length === 0 ? (
        <Card className="bg-[#111] border-white/10">
          <CardContent className="py-16 text-center">
            <div className="text-4xl mb-4">📅</div>
            <p className="text-white/60 text-lg mb-2">No posts queued yet.</p>
            <p className="text-white/40 text-sm mb-6">
              Generate your first weekly post!
            </p>
            <QueueActions businessId={business?.id ?? null} variant="empty" />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="bg-[#111] border-white/10">
              <CardContent className="p-5">
                {/* Title + meta */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {item.title || 'Untitled Post'}
                    </p>
                    <p className="text-white/50 text-sm mt-1 line-clamp-2">
                      {item.content.slice(0, 100)}
                      {item.content.length > 100 ? '…' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={item.status} />
                    <span className="text-white/30 text-xs">
                      📅 {formatDate(item.scheduled_for)}
                    </span>
                  </div>
                </div>

                {/* Actions below content */}
                <QueueActions
                  businessId={business?.id ?? null}
                  itemId={item.id}
                  content={item.content}
                  title={item.title ?? undefined}
                  status={item.status}
                  variant="item"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: QueueItem['status'] }) {
  if (status === 'posted') {
    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
        ✅ Posted
      </Badge>
    )
  }
  if (status === 'ready') {
    return (
      <Badge className="bg-yellow-500/20 text-[#FFD700] border-yellow-500/30 text-xs">
        🟡 Ready
      </Badge>
    )
  }
  return (
    <Badge className="bg-white/10 text-white/50 border-white/10 text-xs">
      Draft
    </Badge>
  )
}
