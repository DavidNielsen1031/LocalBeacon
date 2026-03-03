export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'

async function getMonthlyData(clerkUserId: string) {
  const supabase = createServerClient()
  if (!supabase) return null

  const { data: user } = await supabase
    .from('users')
    .select('id')
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
    pagesCreated: pagesCount ?? 0,
    reviewsReplied: reviewsCount ?? 0,
    queuedTotal: queuedCount ?? 0,
    queuedPosted: postedCount ?? 0,
    aeoScore: aeoScan?.score ?? null,
    aeoDate: aeoScan?.scanned_at ?? null,
    monthName: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  }
}

export default async function ReportsPage() {
  const { userId } = await auth()
  const data = userId ? await getMonthlyData(userId) : null

  const stats = [
    { label: 'Google Posts', value: data?.postsGenerated ?? 0, icon: '📝', color: '#FF6B35' },
    { label: 'City Pages', value: data?.pagesCreated ?? 0, icon: '🌐', color: '#FF6B35' },
    { label: 'Review Replies', value: data?.reviewsReplied ?? 0, icon: '⭐', color: '#FF6B35' },
    { label: 'Posts Queued', value: data?.queuedTotal ?? 0, icon: '📅', color: '#FFD700' },
    { label: 'Posts Published', value: data?.queuedPosted ?? 0, icon: '✅', color: '#00B894' },
  ]

  return (
    <div className="flex-1 px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Monthly Content Summary</h1>
        <p className="text-white/50 mt-1 text-sm">
          {data?.monthName ?? 'This month'} — {data?.businessName ?? 'Your Business'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white/5 border-white/10">
            <CardContent className="p-5 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AEO Score */}
      {data?.aeoScore !== null && data?.aeoScore !== undefined && (
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#00B894]">
                {data.aeoScore}
              </div>
              <div className="text-xs text-white/40 mt-1">out of 100</div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">AI Readiness Score</h3>
              <p className="text-white/50 text-sm">
                How visible your business is to AI search engines like ChatGPT, Perplexity, and Google AI.
                {data.aeoDate && (
                  <span className="text-white/30">
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
        <Card className="bg-[#FFD700]/5 border-[#FFD700]/30">
          <CardContent className="p-6 text-center">
            <p className="text-white text-lg font-semibold mb-2">No activity yet this month</p>
            <p className="text-white/50 text-sm mb-4">
              Start generating content and your monthly summary will appear here.
              You&apos;ll also receive this as an email on the 1st of each month.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Email note */}
      <p className="text-white/30 text-xs text-center mt-8">
        This summary is emailed to you on the 1st of each month.
      </p>
    </div>
  )
}
