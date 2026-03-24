export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendScanUpdateEmail } from '@/lib/email'
import { fetchWithRetry, runAllChecks } from '@/lib/aeo-checks'

const SCORE_CHANGE_THRESHOLD = 5

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  // Single JOIN query — eliminates N+1 pattern
  const { data: bizWithUsers } = await supabase
    .from('businesses')
    .select('*, users!inner(id, clerk_id, plan)')

  // Filter: paid plans only, must have website and contact email
  const eligible = (bizWithUsers || []).filter((b: any) =>
    ['solo', 'agency'].includes(b.users?.plan) && b.website && b.contact_email
  )

  if (!eligible.length) return NextResponse.json({ scanned: 0, emailed: 0 })

  let scanned = 0
  let emailed = 0
  const errors: string[] = []

  // Process in parallel — network calls dominate, Promise.all is safe here
  await Promise.all(eligible.map(async (biz: any) => {
    try {
      {
        // Skip if no website or no contact email (already filtered, but keep guard)
        if (!biz.website || !biz.contact_email) return

        let baseUrl = biz.website.trim()
        if (!baseUrl.startsWith('http')) baseUrl = `https://${baseUrl}`
        baseUrl = baseUrl.replace(/\/+$/, '')

        try {
          // Fetch the homepage
          const { response: pageRes, errorType } = await fetchWithRetry(baseUrl, 8000, 1)

          if (!pageRes?.ok) {
            console.error(JSON.stringify({
              event: 'weekly_scan_fetch_failed',
              business_id: biz.id,
              url: baseUrl,
              errorType,
              timestamp: new Date().toISOString(),
            }))
            errors.push(`${biz.name}: fetch failed (${errorType})`)
            return
          }

          const html = await pageRes.text()

          // Run all AEO checks
          const { checks, score } = await runAllChecks(baseUrl, html)

          // Get previous scan for comparison
          const { data: prevScan } = await supabase
            .from('aeo_scans')
            .select('id, score')
            .eq('business_id', biz.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          // Save new scan
          await supabase.from('aeo_scans').insert({
            business_id: biz.id,
            url: baseUrl,
            score,
            checks,
            created_at: new Date().toISOString(),
          })
          scanned++

          console.log(JSON.stringify({
            event: 'weekly_scan_complete',
            business_id: biz.id,
            url: baseUrl,
            score,
            prev_score: prevScan?.score ?? null,
            timestamp: new Date().toISOString(),
          }))

          // Email if score changed by ≥5 points
          if (prevScan && Math.abs(score - prevScan.score) >= SCORE_CHANGE_THRESHOLD) {
            try {
              await sendScanUpdateEmail({
                to: biz.contact_email,
                businessName: biz.name,
                website: baseUrl,
                currentScore: score,
                previousScore: prevScan.score,
                checks,
                dashboardUrl: 'https://localbeacon.ai/dashboard',
              })
              emailed++
            } catch (emailErr) {
              console.error(`Weekly scan email failed for ${biz.name}:`, emailErr)
              errors.push(`${biz.name}: email failed`)
            }
          }
        } catch (bizErr) {
          console.error(`Weekly scan failed for business ${biz.id}:`, bizErr)
          errors.push(`${biz.name}: scan error`)
        }
      }
    } catch (err) {
      console.error(`Weekly scan failed for business ${biz.id}:`, err)
      errors.push(`${biz.name}: error`)
    }
  }))

  return NextResponse.json({ scanned, emailed, errors: errors.length ? errors : undefined })
}
