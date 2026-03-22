export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendVisibilityAlert } from '@/lib/email'
import { runAllChecks } from '@/lib/aeo-checks'

async function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<Response | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'LocalBeacon-Monitor/1.0' },
      redirect: 'follow',
    })
    clearTimeout(timer)
    return res
  } catch {
    clearTimeout(timer)
    return null
  }
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  // Get all solo/agency users with businesses that have a website
  const { data: users } = await supabase
    .from('users')
    .select('id, clerk_id, plan')
    .in('plan', ['solo', 'agency'])

  if (!users?.length) return NextResponse.json({ checked: 0, alerts: 0 })

  let checked = 0
  let alerts = 0

  for (const user of users) {
    try {
      const { data: businesses } = await supabase
        .from('businesses')
        .select('id, name, website, contact_email')
        .eq('user_id', user.id)
        .not('website', 'is', null)

      for (const biz of businesses || []) {
        if (!biz.website) continue

        // Normalise the base URL
        let baseUrl = biz.website.trim()
        if (!baseUrl.startsWith('http')) baseUrl = `https://${baseUrl}`
        baseUrl = baseUrl.replace(/\/+$/, '')

        // Get last visibility scan from aeo_scans (most recent that has checks)
        const { data: lastScan } = await supabase
          .from('aeo_scans')
          .select('checks, scanned_at')
          .eq('business_id', biz.id)
          .not('checks', 'eq', '[]')
          .order('scanned_at', { ascending: false })
          .limit(1)
          .single()

        // Build a set of check IDs that were previously passing
        const prevPassingIds = new Set<string>()
        if (lastScan?.checks && Array.isArray(lastScan.checks)) {
          for (const check of lastScan.checks) {
            if (check.id && check.passed) prevPassingIds.add(check.id)
          }
        }

        // Fetch page HTML (reuse fetchWithTimeout helper)
        const pageRes = await fetchWithTimeout(baseUrl)
        const html = pageRes?.ok ? await pageRes.text().catch(() => '') : ''

        // Run all 21 AEO checks
        const { checks, score, passed, failed } = await runAllChecks(baseUrl, html)
        checked++

        // Detect regressions: checks that were passing before but are now failing
        const regressedChecks = checks.filter(
          c => !c.passed && prevPassingIds.has(c.id)
        )

        if (regressedChecks.length > 0 && biz.contact_email) {
          await sendVisibilityAlert({
            to: biz.contact_email,
            businessName: biz.name,
            website: biz.website,
            regressedChecks: regressedChecks.map(c => ({ id: c.id, label: c.label })),
          })
          alerts++
        }

        // Store full scan in aeo_scans with real score
        await supabase.from('aeo_scans').insert({
          user_id: user.id,
          business_id: biz.id,
          url: baseUrl,
          score,
          passed,
          failed,
          checks,
          rules_version: 'monitor-v2',
          scanned_at: new Date().toISOString(),
        })

        console.log(JSON.stringify({
          event: 'visibility_monitor',
          business: biz.name,
          score,
          passed,
          failed,
          regressions: regressedChecks.map(c => c.id),
        }))
      }
    } catch (err) {
      console.error(`Visibility monitor failed for user ${user.clerk_id}:`, err)
    }
  }

  return NextResponse.json({ checked, alerts })
}
