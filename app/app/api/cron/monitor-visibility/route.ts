export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendVisibilityAlert } from '@/lib/email'

interface VisibilityScan {
  has_schema: boolean
  has_llms_txt: boolean
  checked_at: string
}

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

async function checkVisibility(website: string): Promise<{ has_schema: boolean; has_llms_txt: boolean }> {
  let baseUrl = website.trim()
  if (!baseUrl.startsWith('http')) baseUrl = `https://${baseUrl}`
  baseUrl = baseUrl.replace(/\/+$/, '')

  const [pageRes, llmsRes] = await Promise.all([
    fetchWithTimeout(baseUrl),
    fetchWithTimeout(`${baseUrl}/llms.txt`),
  ])

  const html = pageRes?.ok ? await pageRes.text().catch(() => '') : ''
  const has_schema = /application\/ld\+json/i.test(html)
  const has_llms_txt = llmsRes?.ok === true && (await llmsRes.text().catch(() => '')).length > 50

  return { has_schema, has_llms_txt }
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

        // Get last visibility scan from aeo_scans (look for most recent that has checks)
        const { data: lastScan } = await supabase
          .from('aeo_scans')
          .select('checks, scanned_at')
          .eq('business_id', biz.id)
          .not('checks', 'eq', '[]')
          .order('scanned_at', { ascending: false })
          .limit(1)
          .single()

        // Derive previous visibility from stored checks
        let prevSchemaDetected = false
        let prevLlmsDetected = false
        if (lastScan?.checks && Array.isArray(lastScan.checks)) {
          for (const check of lastScan.checks) {
            if (check.id === 'schema_markup' && check.passed) prevSchemaDetected = true
            if (check.id === 'llms_txt' && check.passed) prevLlmsDetected = true
          }
        }

        // Check current state
        const current = await checkVisibility(biz.website)
        checked++

        // Alert if something disappeared that was previously there
        const schemaDisappeared = prevSchemaDetected && !current.has_schema
        const llmsDisappeared = prevLlmsDetected && !current.has_llms_txt

        if ((schemaDisappeared || llmsDisappeared) && biz.contact_email) {
          await sendVisibilityAlert({
            to: biz.contact_email,
            businessName: biz.name,
            website: biz.website,
            schemaDisappeared,
            llmsDisappeared,
          })
          alerts++
        }

        // Store visibility snapshot in aeo_scans (lightweight record without full checks)
        await supabase.from('aeo_scans').insert({
          user_id: user.id,
          business_id: biz.id,
          url: biz.website.replace(/\/+$/, ''),
          score: 0, // not a full scan — just a visibility monitor ping
          passed: [current.has_schema, current.has_llms_txt].filter(Boolean).length,
          failed: [current.has_schema, current.has_llms_txt].filter(b => !b).length,
          checks: [
            {
              id: 'schema_markup',
              label: 'Schema Markup',
              passed: current.has_schema,
              details: current.has_schema ? 'Schema markup detected' : 'No schema markup found',
            },
            {
              id: 'llms_txt',
              label: 'llms.txt',
              passed: current.has_llms_txt,
              details: current.has_llms_txt ? 'llms.txt detected' : 'llms.txt not found',
            },
          ],
          rules_version: 'monitor-v1',
          scanned_at: new Date().toISOString(),
        })

        console.log(JSON.stringify({
          event: 'visibility_monitor',
          business: biz.name,
          has_schema: current.has_schema,
          has_llms_txt: current.has_llms_txt,
          schema_disappeared: schemaDisappeared,
          llms_disappeared: llmsDisappeared,
        }))
      }
    } catch (err) {
      console.error(`Visibility monitor failed for user ${user.clerk_id}:`, err)
    }
  }

  return NextResponse.json({ checked, alerts })
}
