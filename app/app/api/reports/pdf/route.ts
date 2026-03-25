export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get('businessId')
  if (!businessId) return NextResponse.json({ error: 'businessId required' }, { status: 400 })

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })

  // Verify ownership
  const { data: user } = await supabase
    .from('users')
    .select('id, plan')
    .eq('clerk_id', userId)
    .single()

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Plan gate: PDF reports require Solo+ plan
  const userPlan = (user.plan || 'free').toLowerCase()
  if (userPlan === 'free') {
    return NextResponse.json(
      { error: 'PDF reports require a Autopilot plan or higher.', upgrade_url: '/pricing' },
      { status: 403 }
    )
  }

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .eq('user_id', user.id)
    .single()

  if (!business) return NextResponse.json({ error: 'Business not found' }, { status: 404 })

  // Gather report data
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // Content counts this month
  const { count: postsThisMonth } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('type', 'gbp_post')
    .gte('created_at', startOfMonth.toISOString())

  const { count: pagesThisMonth } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('type', 'service_page')
    .gte('created_at', startOfMonth.toISOString())

  const { count: reviewsThisMonth } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('type', 'review_response')
    .gte('created_at', startOfMonth.toISOString())

  // Total counts
  const { count: totalPosts } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('type', 'gbp_post')

  const { count: totalPages } = await supabase
    .from('content_items')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('type', 'service_page')

  // AEO score
  const { data: aeoScans } = await supabase
    .from('aeo_scans')
    .select('score, scanned_at')
    .eq('business_id', businessId)
    .order('scanned_at', { ascending: false })
    .limit(2)

  const currentAeoScore = aeoScans?.[0]?.score ?? null
  const previousAeoScore = aeoScans?.[1]?.score ?? null
  const aeoTrend = currentAeoScore !== null && previousAeoScore !== null
    ? currentAeoScore - previousAeoScore
    : null

  // Freshness
  const { data: latestPost } = await supabase
    .from('content_items')
    .select('created_at')
    .eq('business_id', businessId)
    .eq('type', 'gbp_post')
    .order('created_at', { ascending: false })
    .limit(1)

  const daysSinceLastPost = latestPost?.[0]
    ? Math.floor((Date.now() - new Date(latestPost[0].created_at).getTime()) / (1000 * 60 * 60 * 24))
    : null

  // Generate PDF
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  let y = 30

  // Helper: check if we need a new page
  function checkPageBreak(requiredSpace: number = 30) {
    if (y + requiredSpace > pageHeight - 30) {
      doc.addPage()
      y = 30
    }
  }

  // Header
  doc.setFontSize(22)
  doc.setTextColor(27, 42, 74) // NAVY
  doc.text(business.name, margin, y)
  y += 10

  doc.setFontSize(10)
  doc.setTextColor(99, 110, 114) // SLATE
  doc.text(`${business.primary_city}, ${business.primary_state}`, margin, y)
  y += 6
  doc.text(`Report generated: ${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, margin, y)
  y += 4

  // Separator
  doc.setDrawColor(223, 230, 233) // MIST
  doc.setLineWidth(0.5)
  doc.line(margin, y + 4, pageWidth - margin, y + 4)
  y += 14

  // Content Summary Section
  checkPageBreak(60)
  doc.setFontSize(14)
  doc.setTextColor(27, 42, 74)
  doc.text('Content Summary', margin, y)
  y += 10

  doc.setFontSize(11)
  doc.setTextColor(45, 52, 54) // CHARCOAL

  const contentRows = [
    ['Google Post Drafts', `${postsThisMonth ?? 0} this month`, `${totalPosts ?? 0} total`],
    ['City Pages', `${pagesThisMonth ?? 0} this month`, `${totalPages ?? 0} total`],
    ['Review Replies', `${reviewsThisMonth ?? 0} this month`, ''],
  ]

  for (const [label, monthly, total] of contentRows) {
    doc.setTextColor(99, 110, 114)
    doc.text(label, margin, y)
    doc.setTextColor(45, 52, 54)
    doc.text(monthly, margin + 70, y)
    if (total) doc.text(total, margin + 120, y)
    y += 8
  }

  y += 6

  // AI Readiness Score
  checkPageBreak(40)
  doc.setFontSize(14)
  doc.setTextColor(27, 42, 74)
  doc.text('AI Readiness Score', margin, y)
  y += 10

  if (currentAeoScore !== null) {
    doc.setFontSize(28)
    doc.setTextColor(255, 107, 53) // ORANGE
    doc.text(`${currentAeoScore}/100`, margin, y)

    if (aeoTrend !== null) {
      doc.setFontSize(12)
      doc.setTextColor(aeoTrend >= 0 ? 0 : 192, aeoTrend >= 0 ? 184 : 57, aeoTrend >= 0 ? 148 : 43)
      doc.text(`${aeoTrend >= 0 ? '+' : ''}${aeoTrend} from previous scan`, margin + 50, y)
    }
    y += 12
  } else {
    doc.setFontSize(11)
    doc.setTextColor(99, 110, 114)
    doc.text('No AI Readiness scan yet — run one from the dashboard.', margin, y)
    y += 10
  }

  // Content Freshness
  checkPageBreak(30)
  y += 4
  doc.setFontSize(14)
  doc.setTextColor(27, 42, 74)
  doc.text('Content Freshness', margin, y)
  y += 10

  doc.setFontSize(11)
  if (daysSinceLastPost !== null) {
    const status = daysSinceLastPost <= 7 ? 'Fresh' : daysSinceLastPost <= 14 ? 'Getting Stale' : 'Needs Attention'
    const statusColor = daysSinceLastPost <= 7 ? [0, 184, 148] : daysSinceLastPost <= 14 ? [255, 165, 0] : [225, 112, 85]
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2])
    doc.text(`${status} — Last post ${daysSinceLastPost} day${daysSinceLastPost === 1 ? '' : 's'} ago`, margin, y)
  } else {
    doc.setTextColor(99, 110, 114)
    doc.text('No posts yet — generate your first post from the dashboard.', margin, y)
  }
  y += 12

  // Recommendations
  checkPageBreak(40)
  y += 4
  doc.setFontSize(14)
  doc.setTextColor(27, 42, 74)
  doc.text('Recommendations', margin, y)
  y += 10

  doc.setFontSize(10)
  doc.setTextColor(45, 52, 54)

  const recommendations: string[] = []
  if (daysSinceLastPost === null || daysSinceLastPost > 7) {
    recommendations.push('Post to Google weekly to keep your listing active and ranking higher.')
  }
  if (currentAeoScore === null) {
    recommendations.push('Run an AI Readiness scan to see how visible you are to ChatGPT and Google AI.')
  } else if (currentAeoScore < 70) {
    recommendations.push('Your AI Readiness score is below 70. Check the recommendations on your dashboard.')
  }
  if ((totalPages ?? 0) < 3) {
    recommendations.push('Build more city pages to appear in search results for the areas you serve.')
  }
  if (recommendations.length === 0) {
    recommendations.push('Keep posting weekly and monitoring your AI Readiness score!')
  }

  for (const rec of recommendations) {
    checkPageBreak(16)
    doc.text(`• ${rec}`, margin, y, { maxWidth: pageWidth - margin * 2 })
    y += 8
  }

  // Footer
  y = doc.internal.pageSize.getHeight() - 20
  doc.setFontSize(8)
  doc.setTextColor(99, 110, 114)
  doc.text('Powered by LocalBeacon.ai — More calls. Less work.', margin, y)
  doc.text(`© ${now.getFullYear()} LocalBeacon`, pageWidth - margin - 50, y)

  // Output
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
  const filename = `${business.name.replace(/[^a-zA-Z0-9]/g, '-')}-Report-${now.toISOString().slice(0, 7)}.pdf`

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
