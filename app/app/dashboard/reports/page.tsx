export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Lock } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import Link from 'next/link'

async function getMonthlyData(clerkUserId: string) {
  const supabase = createServerClient()
  if (!supabase) return null

  const { data: user } = await supabase
    .from('users')
    .select('id, plan')
    .eq('clerk_id', clerkUserId)
    .single()

  if (!user) return null

  const { data: business } = await supabase
    .from('businesses')
    .select('id, name')
    .eq('user_id', user.id)
    .single()

  if (!business) return null

  // Current month range
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // Count content items this month
  const { count: postsCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('type', 'gbp_post')
    .gte('created_at', startOfMonth.toISOString())

  const { count: pagesCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('type', 'city_page')
    .gte('created_at', startOfMonth.toISOString())

  const { count: reviewsCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('type', 'review_reply')
    .gte('created_at', startOfMonth.toISOString())

  // Previous month counts for comparison
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)

  const { count: prevPostsCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('type', 'gbp_post')
    .gte('created_at', prevMonthStart.toISOString())
    .lte('created_at', prevMonthEnd.toISOString())

  const { count: prevPagesCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('type', 'city_page')
    .gte('created_at', prevMonthStart.toISOString())
    .lte('created_at', prevMonthEnd.toISOString())

  const { count: prevReviewsCount } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('type', 'review_reply')
    .gte('created_at', prevMonthStart.toISOString())
    .lte('created_at', prevMonthEnd.toISOString())

  // Count queued items
  const { count: queuedCount } = await supabase
    .from('content_queue')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .gte('created_at', startOfMonth.toISOString())

  const { count: postedCount } = await supabase
    .from('content_queue')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('status', 'posted')
    .gte('created_at', startOfMonth.toISOString())

  // Latest AEO scan
  const { data: aeoScan } = await supabase
    .from('aeo_scans')
    .select('score, scanned_at')
    .eq('business_id', business.id)
    .order('scanned_at', { ascending: false })
    .limit(1)
    .single()

  return {
    businessName: business.name,
    postsGenerated: postsCount ?? 0,
    prevPosts: prevPostsCount ?? 0,
    pagesCreated: pagesCount ?? 0,
    prevPages: prevPagesCount ?? 0,
    reviewsReplied: reviewsCount ?? 0,
    prevReviews: prevReviewsCount ?? 0,
    queuedTotal: queuedCount ?? 0,
    queuedPosted: postedCount ?? 0,
    aeoScore: aeoScan?.score ?? null,
    aeoDate: aeoScan?.scanned_at ?? null,
    monthName: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    plan: (user.plan || 'free').toLowerCase() as 'free' | 'solo' | 'agency',
  }
}

export default async function ReportsPage() {
  const { userId } = await auth()
  const data = userId ? await getMonthlyData(userId) : null
  const plan = data?.plan ?? 'free'

  // Free plan: lock the whole reports page
  if (plan === 'free') {
    return (
      <div className="flex-1 px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2D3436]">Monthly Reports</h1>
          <p className="text-[#636E72] mt-1 text-sm">Track your progress over time</p>
        </div>
        <div
          className="rounded-xl border p-10 flex flex-col items-center text-center"
          style={{ backgroundColor: '#FAFAF7', borderColor: '#DFE6E9' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: 'rgba(255,107,53,0.12)' }}
          >
            <Lock size={24} style={{ color: '#FF6B35' }} />
          </div>
          <h3 className="text-base font-bold mb-1" style={{ color: '#1B2A4A' }}>
            Monthly Reports
          </h3>
          <p className="text-sm mb-1" style={{ color: '#636E72' }}>Available on Local Autopilot plan</p>
          <p className="text-xs mb-5" style={{ color: '#636E72' }}>
            Upgrade to unlock monthly progress reports and track your AI visibility score over time.
          </p>
          <Link href="/pricing">
            <button
              className="rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#FF6B35' }}
            >
              Upgrade — $49/mo →
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Google Posts', value: data?.postsGenerated ?? 0, prev: data?.prevPosts ?? 0, icon: '📝' },
    { label: 'City Pages', value: data?.pagesCreated ?? 0, prev: data?.prevPages ?? 0, icon: '🌐' },
    { label: 'Review Replies', value: data?.reviewsReplied ?? 0, prev: data?.prevReviews ?? 0, icon: '⭐' },
    { label: 'Posts Queued', value: data?.queuedTotal ?? 0, prev: null, icon: '📅' },
    { label: 'Posts Published', value: data?.queuedPosted ?? 0, prev: null, icon: '✅' },
  ]

  return (
    <div className="flex-1 px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2D3436]">Your Monthly Report</h1>
        <p className="text-[#636E72] mt-1 text-sm">
          {data?.monthName ?? 'This month'} — {data?.businessName ?? 'Your Business'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => {
          const delta = stat.prev !== null ? stat.value - stat.prev : null
          return (
            <Card key={stat.label} className="bg-white border-[#DFE6E9] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="p-5 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-3xl font-bold text-[#2D3436]">{stat.value}</p>
                <p className="text-xs text-[#636E72] mt-1">{stat.label}</p>
                {delta !== null && delta !== 0 && (
                  <p className={`text-xs mt-1 font-semibold ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {delta > 0 ? `↑ ${delta} more` : `↓ ${Math.abs(delta)} fewer`} than last month
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AEO Score */}
      {data?.aeoScore !== null && data?.aeoScore !== undefined && (
        <Card className="bg-white border-[#DFE6E9] mb-8">
          <CardContent className="p-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#00B894]">
                {data.aeoScore}
              </div>
              <div className="text-xs text-[#636E72] mt-1">out of 100</div>
            </div>
            <div>
              <h3 className="text-[#1B2A4A] font-semibold mb-1">AI Readiness Score</h3>
              <p className="text-[#636E72] text-sm">
                How visible your business is to AI search engines like ChatGPT, Perplexity, and Google AI.
                {data.aeoDate && (
                  <span className="text-[#636E72]/60">
                    {' '}Last scanned {new Date(data.aeoDate).toLocaleDateString()}.
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {(!data || (data.postsGenerated === 0 && data.pagesCreated === 0 && data.reviewsReplied === 0 && data.queuedTotal === 0)) && (
        <Card className="bg-white border-[#DFE6E9]">
          <CardContent className="py-4">
            <EmptyState
              icon={BarChart3}
              title="No reports yet"
              description="Reports are generated monthly after your first scan"
            />
          </CardContent>
        </Card>
      )}

      {/* Email note */}
      <p className="text-[#636E72]/60 text-xs text-center mt-8">
        This summary is emailed to you on the 1st of each month.
      </p>
    </div>
  )
}
