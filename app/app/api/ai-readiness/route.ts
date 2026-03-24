export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { rateLimit } from '@/lib/rate-limit'
import { enforceLimits } from '@/lib/plan-limits'
import rulesConfig from '@/lib/aeo-rules.json'
import {
  fetchWithRetry,
  checkLlmsTxt,
  checkRobotsTxt,
  checkAiCrawlerAccess,
  checkAiIndexJson,
  checkCitability,
  checkEeat,
  checkBrandSocialLinks,
  checkSchemaMarkup,
  checkFaqContent,
  checkHttps,
  checkOpenGraph,
  checkMobile,
  checkSitemap,
  checkHeadingStructure,
  checkServicePages,
  checkContentFreshness,
  checkReviewSchema,
  checkAnswerFirstContent,
  checkNapConsistency,
  checkSitemapInRobots,
  checkCanonicalTags,
  checkOgImage,
  checkCanonicalMatch,
  checkFaviconComplete,
  checkWwwRedirect,
  checkMetaUnique,
} from '@/lib/aeo-checks'

/**
 * SSRF protection: returns true if the URL targets a private/internal network.
 */
function isPrivateUrl(url: string): boolean {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return true // Unparseable URLs are blocked
  }

  // Block non-http(s) protocols
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return true

  const hostname = parsed.hostname.toLowerCase()

  // Block localhost variants
  if (['localhost', '127.0.0.1', '0.0.0.0', '::1', '[::1]'].includes(hostname)) return true

  // Block RFC1918 private ranges and link-local
  const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (ipv4Match) {
    const [, a, b] = ipv4Match.map(Number)
    // 10.0.0.0/8
    if (a === 10) return true
    // 172.16.0.0/12
    if (a === 172 && b >= 16 && b <= 31) return true
    // 192.168.0.0/16
    if (a === 192 && b === 168) return true
    // 169.254.0.0/16 (link-local / cloud metadata)
    if (a === 169 && b === 254) return true
  }

  return false
}

export async function POST(req: NextRequest) {
  // Rate limiting: 10 requests per minute per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  if (!rateLimit(ip, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests. Please wait before scanning again.' }, { status: 429 })
  }

  // Plan enforcement: dashboard scans require a paid plan (free plan gets 1/month via scansPerMonth limit)
  const { userId } = await auth()
  if (userId) {
    const limitError = await enforceLimits(userId, 'aeo_scan')
    if (limitError) {
      return NextResponse.json(limitError, { status: 403 })
    }
  }

  const { url } = await req.json() as { url: string }

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  let baseUrl = url.trim()
  if (!baseUrl.startsWith('http')) baseUrl = `https://${baseUrl}`
  baseUrl = baseUrl.replace(/\/+$/, '')

  // SSRF protection: block private/internal URLs
  if (isPrivateUrl(baseUrl)) {
    return NextResponse.json({ error: 'Invalid URL: internal and private network addresses are not allowed.' }, { status: 400 })
  }

  const { response: pageRes, errorType: pageError } = await fetchWithRetry(baseUrl, 8000, 1)

  if (!pageRes || !pageRes.ok) {
    const errorDetail = pageError === 'timeout'
      ? `${baseUrl} took too long to respond. The site may be slow or down.`
      : pageError === 'dns_error'
      ? `Could not find ${baseUrl}. Check that the domain is correct and the site is online.`
      : `Could not reach ${baseUrl} (HTTP ${pageRes?.status || 'unknown'}). Make sure the website is online.`

    console.error(JSON.stringify({
      event: 'aeo_scan_failed',
      url: baseUrl,
      errorType: pageError,
      statusCode: pageRes?.status,
      timestamp: new Date().toISOString(),
    }))

    return NextResponse.json({
      error: errorDetail,
      url: baseUrl,
      score: null,
      errorType: pageError,
      checks: [],
      rulesVersion: rulesConfig.version,
    }, { status: 400 })
  }

  const html = await pageRes.text()

  const checks = await Promise.all([
    // AI Access
    checkLlmsTxt(baseUrl),
    checkRobotsTxt(baseUrl),
    checkAiCrawlerAccess(baseUrl),
    checkAiIndexJson(baseUrl),
    // Content Structure
    checkHeadingStructure(html),
    checkFaqContent(html),
    checkAnswerFirstContent(html),
    checkServicePages(html),
    checkContentFreshness(html),
    // Schema & Data
    checkSchemaMarkup(html),
    checkReviewSchema(html),
    checkNapConsistency(html),
    checkBrandSocialLinks(html),
    // Citability & Quality
    checkCitability(html),
    checkEeat(html, baseUrl),
    // Meta & Technical
    checkHttps(baseUrl),
    checkMobile(html),
    checkOpenGraph(html),
    checkSitemap(baseUrl),
    // Indexing
    checkSitemapInRobots(baseUrl),
    checkCanonicalTags(html),
    // SEO hygiene
    checkOgImage(html),
    checkCanonicalMatch(baseUrl, html),
    checkFaviconComplete(baseUrl),
    checkWwwRedirect(baseUrl),
    checkMetaUnique(baseUrl, html),
  ])

  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0)
  const earnedWeight = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0)
  const score = Math.round((earnedWeight / totalWeight) * 100)
  const passed = checks.filter(c => c.passed).length
  const failed = checks.filter(c => !c.passed).length

  const scannedAt = new Date().toISOString()

  console.log(JSON.stringify({
    event: 'aeo_scan_complete',
    url: baseUrl,
    score,
    passed,
    failed,
    rulesVersion: rulesConfig.version,
    timestamp: scannedAt,
  }))

  // Persist scan to Supabase (best-effort, don't fail the response)
  try {
    const supabase = createServerClient()
    if (supabase) {
      // Resolve user's internal UUID from Clerk ID
      let userUuid: string | null = null
      if (userId) {
        const { data: userRow } = await supabase
          .from('users')
          .select('id')
          .eq('clerk_id', userId)
          .single()
        userUuid = userRow?.id ?? null
      }

      await supabase.from('aeo_scans').insert({
        user_id: userUuid,
        url: baseUrl,
        score,
        passed,
        failed,
        checks,
        rules_version: rulesConfig.version,
        scanned_at: scannedAt,
      })
    }
  } catch (err) {
    console.error(JSON.stringify({
      event: 'aeo_scan_persist_failed',
      url: baseUrl,
      error: err instanceof Error ? err.message : 'unknown',
      timestamp: scannedAt,
    }))
  }

  return NextResponse.json({
    url: baseUrl,
    score,
    passed,
    failed,
    total: checks.length,
    checks,
    rulesVersion: rulesConfig.version,
    scannedAt,
  })
}

// --- History endpoint ---

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  // Solo users can see up to 12 scans; free users just the latest 1
  const requestedLimit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '20'), 100)

  if (!url) {
    return NextResponse.json({ error: 'url query parameter is required' }, { status: 400 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  // Determine plan to gate history depth
  const { userId } = await auth()
  let plan = 'free'
  if (userId) {
    const { data: userRow } = await supabase
      .from('users')
      .select('plan')
      .eq('clerk_id', userId)
      .single()
    plan = userRow?.plan ?? 'free'
  }

  // Free plan: show only the latest 1 scan; solo/agency: up to 12
  const limit = plan === 'free' ? 1 : Math.min(requestedLimit, 12)

  const { data, error } = await supabase
    .from('aeo_scans')
    .select('id, url, score, passed, failed, rules_version, scanned_at, checks')
    .eq('url', url.replace(/\/+$/, ''))
    .order('scanned_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error(JSON.stringify({ event: 'aeo_history_failed', url, error: error.message }))
    return NextResponse.json({ error: 'Failed to fetch scan history' }, { status: 500 })
  }

  return NextResponse.json({
    url,
    scans: data || [],
    total: data?.length || 0,
    plan,
  })
}
