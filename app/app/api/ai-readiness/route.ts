export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { rateLimit } from '@/lib/rate-limit'
import { enforceLimits } from '@/lib/plan-limits'
import rulesConfig from '@/lib/aeo-rules.json'

interface CheckResult {
  id: string
  label: string
  description: string
  passed: boolean
  details: string
  fix: string
  weight: number
  errorType?: 'success' | 'dns_error' | 'timeout' | 'http_4xx' | 'http_5xx' | 'parse_error'
}

interface RuleConfig {
  id: string
  label: string
  description: string
  fix: string
  weight: number
  severity: string
  category: string
}

const AI_CRAWLERS_LEGACY = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Amazonbot', 'cohere-ai']
const AI_CRAWLERS_INDIVIDUAL = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot', 'GoogleOther', 'Bytespider', 'CCBot', 'anthropic-ai']

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

function getRule(id: string): RuleConfig {
  const rule = rulesConfig.rules.find((r: RuleConfig) => r.id === id)
  if (!rule) throw new Error(`Rule not found: ${id}`)
  return rule
}

// --- Fetch with retry and error classification ---

interface FetchResult {
  response: Response | null
  errorType: 'success' | 'dns_error' | 'timeout' | 'http_4xx' | 'http_5xx' | 'parse_error'
  statusCode?: number
}

async function fetchWithRetry(url: string, timeoutMs = 5000, maxRetries = 1): Promise<FetchResult> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'LocalBeacon-AEO-Checker/1.0' },
        redirect: 'follow',
      })
      clearTimeout(timeout)

      if (res.status >= 500) {
        if (attempt < maxRetries) {
          await new Promise(r => setTimeout(r, 1000))
          continue
        }
        return { response: res, errorType: 'http_5xx', statusCode: res.status }
      }

      if (res.status >= 400) {
        return { response: res, errorType: 'http_4xx', statusCode: res.status }
      }

      return { response: res, errorType: 'success', statusCode: res.status }
    } catch (err) {
      clearTimeout(timeout)
      const msg = err instanceof Error ? err.message : ''

      if (msg.includes('abort') || msg.includes('timeout')) {
        if (attempt < maxRetries) {
          await new Promise(r => setTimeout(r, 1000))
          continue
        }
        return { response: null, errorType: 'timeout' }
      }

      if (msg.includes('ENOTFOUND') || msg.includes('getaddrinfo') || msg.includes('DNS')) {
        return { response: null, errorType: 'dns_error' }
      }

      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1000))
        continue
      }
      return { response: null, errorType: 'dns_error' }
    }
  }

  return { response: null, errorType: 'timeout' }
}

// --- Individual check functions ---

async function checkLlmsTxt(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('llms_txt')
  const { response: res, errorType } = await fetchWithRetry(`${baseUrl}/llms.txt`)
  const passed = res?.ok === true
  const body = passed ? await res!.text().catch(() => '') : ''
  const hasContent = body.length > 50

  return {
    ...rule,
    passed: passed && hasContent,
    details: passed && hasContent
      ? `Found llms.txt (${body.length} characters)`
      : passed ? 'File exists but has very little content' : 'No llms.txt file found',
    errorType: passed && hasContent ? 'success' : errorType,
  }
}

async function checkRobotsTxt(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('robots_txt')
  const { response: res } = await fetchWithRetry(`${baseUrl}/robots.txt`)

  if (!res?.ok) {
    return {
      ...rule,
      passed: true,
      details: 'No robots.txt found — all crawlers are allowed by default (this is fine)',
      errorType: 'success',
    }
  }

  const body = await res.text().catch(() => '')
  const blocked: string[] = []
  const lines = body.split('\n')
  let currentAgent = ''

  for (const line of lines) {
    const trimmed = line.trim().toLowerCase()
    if (trimmed.startsWith('user-agent:')) {
      currentAgent = trimmed.replace('user-agent:', '').trim()
    }
    if (trimmed.startsWith('disallow:') && trimmed.replace('disallow:', '').trim() === '/') {
      for (const crawler of AI_CRAWLERS_LEGACY) {
        if (currentAgent === crawler.toLowerCase() || currentAgent === '*') {
          blocked.push(crawler)
        }
      }
    }
  }

  const uniqueBlocked = [...new Set(blocked)]
  const passed = uniqueBlocked.length === 0

  return {
    ...rule,
    passed,
    details: passed
      ? 'All AI crawlers are allowed access'
      : `Blocked: ${uniqueBlocked.join(', ')}`,
    fix: passed ? '' : `Edit your robots.txt to remove blocks on: ${uniqueBlocked.join(', ')}. These are the bots that power ChatGPT, Claude, and Perplexity search.`,
    errorType: 'success',
  }
}

async function checkAiCrawlerAccess(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('ai_crawler_access')
  const { response: res } = await fetchWithRetry(`${baseUrl}/robots.txt`)

  if (!res?.ok) {
    return {
      ...rule,
      passed: true,
      details: 'No robots.txt found — all 8 AI crawlers are allowed by default',
      errorType: 'success',
    }
  }

  const body = await res.text().catch(() => '')
  const lines = body.split('\n')
  let currentAgent = ''
  const blocked: string[] = []
  const allowedByWildcardBlock: string[] = []
  let wildcardBlocksAll = false

  for (const line of lines) {
    const trimmed = line.trim().toLowerCase()
    if (trimmed.startsWith('user-agent:')) {
      currentAgent = trimmed.replace('user-agent:', '').trim()
    }
    if (trimmed.startsWith('disallow:') && trimmed.replace('disallow:', '').trim() === '/') {
      if (currentAgent === '*') {
        wildcardBlocksAll = true
      }
      for (const crawler of AI_CRAWLERS_INDIVIDUAL) {
        if (currentAgent === crawler.toLowerCase()) {
          blocked.push(crawler)
        }
      }
    }
    // Check for explicit Allow overrides
    if (trimmed.startsWith('allow:') && trimmed.replace('allow:', '').trim() === '/') {
      for (const crawler of AI_CRAWLERS_INDIVIDUAL) {
        if (currentAgent === crawler.toLowerCase()) {
          allowedByWildcardBlock.push(crawler)
        }
      }
    }
  }

  // If wildcard blocks all and no individual allow, all are blocked
  const finalBlocked = wildcardBlocksAll
    ? AI_CRAWLERS_INDIVIDUAL.filter(c => !allowedByWildcardBlock.includes(c) && !blocked.includes(c)).concat(blocked)
    : blocked

  const uniqueBlocked = [...new Set(finalBlocked)]
  const blockedCount = uniqueBlocked.length
  const passed = blockedCount === 0
  const partial = blockedCount > 0 && blockedCount < AI_CRAWLERS_INDIVIDUAL.length

  return {
    ...rule,
    passed,
    details: passed
      ? `All 8 AI crawlers allowed: ${AI_CRAWLERS_INDIVIDUAL.join(', ')}`
      : blockedCount === AI_CRAWLERS_INDIVIDUAL.length
      ? `All 8 AI crawlers are blocked — AI engines cannot index your site`
      : `${blockedCount} of 8 AI crawlers blocked: ${uniqueBlocked.join(', ')}`,
    fix: passed ? '' : `Edit your robots.txt to allow: ${uniqueBlocked.join(', ')}`,
    errorType: partial ? 'parse_error' : passed ? 'success' : 'http_4xx',
  }
}

async function checkAiIndexJson(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('ai_index_json')
  const { response: res, errorType } = await fetchWithRetry(`${baseUrl}/ai-index.json`)

  if (!res?.ok) {
    return {
      ...rule,
      passed: false,
      details: 'No ai-index.json file found at site root',
      errorType,
    }
  }

  try {
    const text = await res.text()
    JSON.parse(text)
    return {
      ...rule,
      passed: true,
      details: 'ai-index.json found and contains valid JSON',
      errorType: 'success',
    }
  } catch {
    return {
      ...rule,
      passed: false,
      details: 'ai-index.json found but contains invalid JSON',
      errorType: 'parse_error',
    }
  }
}

interface CitabilityPassage {
  text: string
  wordCount: number
  citable: boolean
  reason: string
}

function extractCitabilityPassages(html: string): CitabilityPassage[] {
  // Extract text from <p> tags
  const pTagMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || []
  const passages: CitabilityPassage[] = []

  for (const match of pTagMatches) {
    const text = match.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    if (text.length < 30) continue // skip very short fragments

    const words = text.split(/\s+/).filter(w => w.length > 0)
    const wordCount = words.length

    // Check for declarative topic sentence (starts with a subject + verb pattern)
    const firstSentence = text.split(/[.!?]/)[0] || ''
    const hasDeclarativeSentence = /^[A-Z][^,]{10,}/.test(firstSentence) &&
      !/^(Are|Is|Do|Does|Did|Will|Can|Could|Should|Would|Have|Has|Had|What|How|Why|When|Where|Who)\b/i.test(firstSentence)

    let citable = false
    let reason = ''

    if (wordCount < 50) {
      reason = 'Too short (under 50 words) — AI needs more context'
    } else if (wordCount > 250) {
      reason = 'Too long (over 250 words) — AI prefers focused passages'
    } else if (wordCount >= 100 && wordCount <= 200 && hasDeclarativeSentence) {
      citable = true
      reason = 'Good length with clear topic sentence'
    } else if (wordCount >= 50 && wordCount < 100) {
      reason = 'Slightly short (50-100 words) — aim for 100-200 words'
    } else if (wordCount > 200 && wordCount <= 250) {
      reason = 'Slightly long (200-250 words) — consider tightening'
    } else if (!hasDeclarativeSentence) {
      reason = 'No clear declarative topic sentence at start'
    } else {
      reason = 'Does not meet citability criteria'
    }

    passages.push({ text: text.slice(0, 300) + (text.length > 300 ? '...' : ''), wordCount, citable, reason })
  }

  return passages.slice(0, 15) // cap to 15 passages for performance
}

async function checkCitability(html: string): Promise<CheckResult & { passages?: CitabilityPassage[] }> {
  const rule = getRule('citability')
  const passages = extractCitabilityPassages(html)
  const citableCount = passages.filter(p => p.citable).length
  const passed = citableCount >= 3

  return {
    ...rule,
    passed,
    details: passed
      ? `Found ${citableCount} citable passages — strong AI citation potential`
      : citableCount === 0
      ? 'No citable passages found — paragraphs need to be 100-200 words with clear topic sentences'
      : `Only ${citableCount} citable passage${citableCount === 1 ? '' : 's'} found — need at least 3`,
    errorType: 'success',
    passages,
  }
}

async function checkEeat(html: string, baseUrl: string): Promise<CheckResult> {
  const rule = getRule('eeat')
  const signals: string[] = []

  // Check for about page link
  const hasAboutLink = /href="[^"]*\/(about|about-us|our-team|who-we-are)[^"]*"/i.test(html)
  if (hasAboutLink) signals.push('About page link')

  // Author name/bio mentions
  const hasAuthorMention = /\b(written by|by [A-Z][a-z]+ [A-Z][a-z]+|author:|team member|our team|meet [a-z]+ )/i.test(html)
  if (hasAuthorMention) signals.push('Author/team mentions')

  // Credential keywords
  const hasCredentials = /\b(licensed|certified|insured|bonded|accredited|years of experience|[0-9]+ years|member of|association|credential|diploma|degree)\b/i.test(html)
  if (hasCredentials) signals.push('Credential/certification keywords')

  const passed = signals.length >= 2

  return {
    ...rule,
    passed,
    details: signals.length === 0
      ? 'No E-E-A-T signals found — no about page, credentials, or team mentions'
      : passed
      ? `E-E-A-T signals found: ${signals.join(', ')}`
      : `Only ${signals.length} E-E-A-T signal found: ${signals.join(', ')} — need at least 2`,
    errorType: 'success',
  }
}

async function checkBrandSocialLinks(html: string): Promise<CheckResult> {
  const rule = getRule('brand_social_links')

  // Check schema.org sameAs
  const hasSameAs = /"sameAs"\s*:\s*\[/i.test(html) || /"sameAs"\s*:\s*"https?:/i.test(html)

  // Check explicit social link patterns
  const socialPatterns = [
    /href="https?:\/\/(www\.)?(facebook|fb)\.com\/[^"]+"/i,
    /href="https?:\/\/(www\.)?instagram\.com\/[^"]+"/i,
    /href="https?:\/\/(www\.)?twitter\.com\/[^"]+"/i,
    /href="https?:\/\/(www\.)?x\.com\/[^"]+"/i,
    /href="https?:\/\/(www\.)?linkedin\.com\/(company|in)\/[^"]+"/i,
    /href="https?:\/\/(www\.)?youtube\.com\/(channel|c|@)[^"]+"/i,
    /href="https?:\/\/(www\.)?yelp\.com\/biz\/[^"]+"/i,
  ]

  const foundSocials: string[] = []
  const socialNames = ['Facebook', 'Instagram', 'Twitter/X', 'Twitter/X', 'LinkedIn', 'YouTube', 'Yelp']
  socialPatterns.forEach((pattern, i) => {
    if (pattern.test(html)) foundSocials.push(socialNames[i])
  })
  const uniqueSocials = [...new Set(foundSocials)]

  const passed = hasSameAs || uniqueSocials.length >= 2

  return {
    ...rule,
    passed,
    details: hasSameAs
      ? `Schema sameAs found${uniqueSocials.length > 0 ? ` + ${uniqueSocials.join(', ')} links` : ''}`
      : uniqueSocials.length >= 2
      ? `Social profile links found: ${uniqueSocials.join(', ')}`
      : uniqueSocials.length === 1
      ? `Only 1 social link found (${uniqueSocials[0]}) — add more for stronger brand authority`
      : 'No social profile links or sameAs schema found',
    errorType: 'success',
  }
}

async function checkSchemaMarkup(html: string): Promise<CheckResult> {
  const rule = getRule('schema_markup')
  const hasLocalBusiness = /LocalBusiness|Plumber|Electrician|Dentist|HVAC|Attorney|Roofing/i.test(html) && /application\/ld\+json/i.test(html)
  const hasOrgSchema = /"@type"\s*:\s*"Organization"/i.test(html)
  const hasAnySchema = /application\/ld\+json/i.test(html)

  return {
    ...rule,
    passed: hasLocalBusiness || hasOrgSchema,
    details: hasLocalBusiness
      ? 'LocalBusiness schema found — AI can read your business info'
      : hasOrgSchema
      ? 'Organization schema found (good, but LocalBusiness schema would be better)'
      : hasAnySchema
      ? 'Some schema found, but no business-specific schema'
      : 'No schema markup found',
    errorType: 'success',
  }
}

async function checkFaqContent(html: string): Promise<CheckResult> {
  const rule = getRule('faq_content')
  const hasFaqSchema = /FAQPage/i.test(html) && /application\/ld\+json/i.test(html)
  const hasFaqSection = /<(h[1-6])[^>]*>.*?(faq|frequently asked|common questions)/i.test(html)
  const questionCount = (html.match(/<(h[2-6])[^>]*>.*?\?/gi) || []).length

  return {
    ...rule,
    passed: hasFaqSchema || (hasFaqSection && questionCount >= 3),
    details: hasFaqSchema
      ? 'FAQ page with schema markup found — excellent for AI citations'
      : hasFaqSection
      ? `FAQ section found with ${questionCount} questions`
      : questionCount > 0
      ? `Found ${questionCount} question-like headings but no dedicated FAQ section`
      : 'No FAQ content found',
    errorType: 'success',
  }
}

async function checkHttps(url: string): Promise<CheckResult> {
  const rule = getRule('https')
  const isHttps = url.startsWith('https://')
  return {
    ...rule,
    passed: isHttps,
    details: isHttps ? 'Site uses HTTPS' : 'Site does not use HTTPS',
    errorType: 'success',
  }
}

async function checkOpenGraph(html: string): Promise<CheckResult> {
  const rule = getRule('open_graph')
  const hasOg = /property="og:(title|description|type)"/i.test(html)
  const hasTwitter = /name="twitter:(card|title|description)"/i.test(html)

  return {
    ...rule,
    passed: hasOg,
    details: hasOg && hasTwitter
      ? 'Both Open Graph and Twitter Card tags found'
      : hasOg
      ? 'Open Graph tags found (add Twitter Card tags too for full coverage)'
      : 'No Open Graph tags found',
    errorType: 'success',
  }
}

async function checkMobile(html: string): Promise<CheckResult> {
  const rule = getRule('mobile')
  const hasViewport = /name="viewport"/i.test(html)
  return {
    ...rule,
    passed: hasViewport,
    details: hasViewport ? 'Viewport meta tag found — site appears mobile-friendly' : 'No viewport meta tag found',
    errorType: 'success',
  }
}

async function checkSitemap(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('sitemap')
  const { response: res } = await fetchWithRetry(`${baseUrl}/sitemap.xml`)
  const passed = res?.ok === true

  return {
    ...rule,
    passed,
    details: passed ? 'sitemap.xml found' : 'No sitemap.xml found',
    errorType: 'success',
  }
}

async function checkHeadingStructure(html: string): Promise<CheckResult> {
  const rule = getRule('headings')
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length
  const passed = h1Count === 1 && h2Count >= 2

  return {
    ...rule,
    passed,
    details: `Found ${h1Count} H1 tag${h1Count !== 1 ? 's' : ''} and ${h2Count} H2 tags. ${h1Count === 1 ? 'Good H1 structure.' : h1Count === 0 ? 'Missing H1.' : 'Multiple H1s — should have exactly one.'} ${h2Count >= 2 ? 'Good content structure.' : 'Need more H2 sections.'}`,
    errorType: 'success',
  }
}

async function checkServicePages(html: string): Promise<CheckResult> {
  const rule = getRule('service_pages')
  const serviceLinks = html.match(/href="[^"]*(?:service|plumb|hvac|dental|roof|repair|install|clean|landscap|electri|paint)[^"]*"/gi) || []
  const areaLinks = html.match(/href="[^"]*(?:area|location|city|neighborhood|serve|cover)[^"]*"/gi) || []
  const totalLinks = serviceLinks.length + areaLinks.length

  return {
    ...rule,
    passed: totalLinks >= 2,
    details: totalLinks >= 2
      ? `Found ${serviceLinks.length} service page links and ${areaLinks.length} area page links`
      : 'Few or no service/area-specific page links found',
    errorType: 'success',
  }
}

async function checkContentFreshness(html: string): Promise<CheckResult> {
  const rule = getRule('freshness')
  const currentYear = new Date().getFullYear().toString()
  const lastYear = (new Date().getFullYear() - 1).toString()
  const hasCurrent = html.includes(currentYear)
  const hasRecent = hasCurrent || html.includes(lastYear)

  return {
    ...rule,
    passed: hasRecent,
    details: hasCurrent
      ? `Content references ${currentYear} — appears current`
      : hasRecent
      ? `Content references ${lastYear} but not ${currentYear} — consider updating`
      : 'No recent year references found — content may appear outdated to AI',
    errorType: 'success',
  }
}

async function checkReviewSchema(html: string): Promise<CheckResult> {
  const rule = getRule('reviews')
  const hasReviewSchema = /AggregateRating|Review/i.test(html) && /application\/ld\+json/i.test(html)
  const hasTestimonials = /testimonial|review|customer said|what our|client feedback/i.test(html)

  return {
    ...rule,
    passed: hasReviewSchema || hasTestimonials,
    details: hasReviewSchema
      ? 'Review/rating schema markup found'
      : hasTestimonials
      ? 'Testimonial content found (add schema markup to boost AI visibility)'
      : 'No review content or testimonials found on homepage',
    errorType: 'success',
  }
}

async function checkAnswerFirstContent(html: string): Promise<CheckResult> {
  const rule = getRule('answer_first')
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)/i)
  if (!bodyMatch) {
    return {
      ...rule,
      passed: false,
      details: 'Could not analyze page content',
      errorType: 'parse_error',
    }
  }

  const text = bodyMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1000)
  const hasLocationMention = /\b(in|near|serving|located)\s+[A-Z][a-z]+/i.test(text)
  const hasServiceMention = /\b(plumb|hvac|heat|cool|dental|roof|repair|install|clean|law|attorney|electric|landscap|paint|construct)/i.test(text)
  const passed = hasLocationMention && hasServiceMention

  return {
    ...rule,
    passed,
    details: passed
      ? 'Homepage content mentions both services and location early — good for AI extraction'
      : hasServiceMention
      ? 'Services mentioned but no specific location in early content'
      : hasLocationMention
      ? 'Location mentioned but services not clear in early content'
      : 'Homepage doesn\'t clearly state what you do or where in the first content block',
    errorType: 'success',
  }
}

async function checkNapConsistency(html: string): Promise<CheckResult> {
  const rule = getRule('nap')
  const phonePattern = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
  const phones = html.match(phonePattern) || []
  const uniquePhones = [...new Set(phones.map(p => p.replace(/\D/g, '')))]
  const hasAddress = /<address/i.test(html) || /itemtype=".*PostalAddress"/i.test(html) || /"address"/i.test(html)

  return {
    ...rule,
    passed: uniquePhones.length >= 1 && uniquePhones.length <= 2 && hasAddress,
    details: uniquePhones.length === 0
      ? 'No phone number found on page'
      : uniquePhones.length > 2
      ? `Found ${uniquePhones.length} different phone numbers — this confuses AI`
      : `Phone number found. ${hasAddress ? 'Address markup present.' : 'No structured address found.'}`,
    errorType: 'success',
  }
}

async function checkSitemapInRobots(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('sitemap_in_robots')
  const { response: robotsRes } = await fetchWithRetry(`${baseUrl}/robots.txt`)
  if (!robotsRes?.ok) {
    return { ...rule, passed: false, details: 'No robots.txt found — cannot check for sitemap reference', errorType: 'http_4xx' }
  }
  const robotsTxt = await robotsRes.text().catch(() => '')
  const hasSitemapLine = /^Sitemap:\s*https?:\/\/.+/mi.test(robotsTxt)
  return {
    ...rule,
    passed: hasSitemapLine,
    details: hasSitemapLine
      ? 'Sitemap URL referenced in robots.txt'
      : 'robots.txt exists but does not reference a sitemap URL',
    errorType: 'success',
  }
}

async function checkCanonicalTags(html: string): Promise<CheckResult> {
  const rule = getRule('canonical_tags')
  const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html)
  const hasNoindex = /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]*>/i.test(html)
  return {
    ...rule,
    passed: hasCanonical && !hasNoindex,
    details: hasNoindex
      ? 'Page has a noindex directive — search engines will not index this page'
      : hasCanonical
      ? 'Canonical URL tag found — search engines know which version of this page to index'
      : 'No canonical URL tag found — search engines may index duplicate versions of your pages',
    errorType: 'success',
  }
}

// --- Main handler ---

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
