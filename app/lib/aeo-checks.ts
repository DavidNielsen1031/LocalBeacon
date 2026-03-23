/**
 * Shared AEO (AI Engine Optimization) check functions.
 * Used by both /api/ai-readiness and /api/cron/weekly-scan.
 */
import rulesConfig from '@/lib/aeo-rules.json'

export interface CheckResult {
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

function getRule(id: string): RuleConfig {
  const rule = rulesConfig.rules.find((r: RuleConfig) => r.id === id)
  if (!rule) throw new Error(`Rule not found: ${id}`)
  return rule
}

interface FetchResult {
  response: Response | null
  errorType: 'success' | 'dns_error' | 'timeout' | 'http_4xx' | 'http_5xx' | 'parse_error'
  statusCode?: number
}

export async function fetchWithRetry(url: string, timeoutMs = 5000, maxRetries = 1): Promise<FetchResult> {
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
        if (attempt < maxRetries) { await new Promise(r => setTimeout(r, 1000)); continue }
        return { response: null, errorType: 'timeout' }
      }
      if (msg.includes('ENOTFOUND') || msg.includes('getaddrinfo') || msg.includes('DNS')) {
        return { response: null, errorType: 'dns_error' }
      }
      if (attempt < maxRetries) { await new Promise(r => setTimeout(r, 1000)); continue }
      return { response: null, errorType: 'dns_error' }
    }
  }
  return { response: null, errorType: 'timeout' }
}

export async function checkLlmsTxt(baseUrl: string): Promise<CheckResult> {
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

export async function checkRobotsTxt(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('robots_txt')
  const { response: res } = await fetchWithRetry(`${baseUrl}/robots.txt`)
  if (!res?.ok) {
    return { ...rule, passed: true, details: 'No robots.txt found — all crawlers are allowed by default (this is fine)', errorType: 'success' }
  }
  const body = await res.text().catch(() => '')
  const blocked: string[] = []
  const lines = body.split('\n')
  let currentAgent = ''
  for (const line of lines) {
    const trimmed = line.trim().toLowerCase()
    if (trimmed.startsWith('user-agent:')) currentAgent = trimmed.replace('user-agent:', '').trim()
    if (trimmed.startsWith('disallow:') && trimmed.replace('disallow:', '').trim() === '/') {
      for (const crawler of AI_CRAWLERS_LEGACY) {
        if (currentAgent === crawler.toLowerCase() || currentAgent === '*') blocked.push(crawler)
      }
    }
  }
  const uniqueBlocked = [...new Set(blocked)]
  const passed = uniqueBlocked.length === 0
  return {
    ...rule,
    passed,
    details: passed ? 'All AI crawlers are allowed access' : `Blocked: ${uniqueBlocked.join(', ')}`,
    fix: passed ? '' : `Edit your robots.txt to remove blocks on: ${uniqueBlocked.join(', ')}.`,
    errorType: 'success',
  }
}

export async function checkAiCrawlerAccess(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('ai_crawler_access')
  const { response: res } = await fetchWithRetry(`${baseUrl}/robots.txt`)
  if (!res?.ok) {
    return { ...rule, passed: true, details: 'No robots.txt found — all 8 AI crawlers are allowed by default', errorType: 'success' }
  }
  const body = await res.text().catch(() => '')
  const lines = body.split('\n')
  let currentAgent = ''
  const blocked: string[] = []
  const allowedByWildcardBlock: string[] = []
  let wildcardBlocksAll = false
  for (const line of lines) {
    const trimmed = line.trim().toLowerCase()
    if (trimmed.startsWith('user-agent:')) currentAgent = trimmed.replace('user-agent:', '').trim()
    if (trimmed.startsWith('disallow:') && trimmed.replace('disallow:', '').trim() === '/') {
      if (currentAgent === '*') wildcardBlocksAll = true
      for (const crawler of AI_CRAWLERS_INDIVIDUAL) {
        if (currentAgent === crawler.toLowerCase()) blocked.push(crawler)
      }
    }
    if (trimmed.startsWith('allow:') && trimmed.replace('allow:', '').trim() === '/') {
      for (const crawler of AI_CRAWLERS_INDIVIDUAL) {
        if (currentAgent === crawler.toLowerCase()) allowedByWildcardBlock.push(crawler)
      }
    }
  }
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

export async function checkAiIndexJson(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('ai_index_json')
  const { response: res, errorType } = await fetchWithRetry(`${baseUrl}/ai-index.json`)
  if (!res?.ok) return { ...rule, passed: false, details: 'No ai-index.json file found at site root', errorType }
  try {
    const text = await res.text()
    JSON.parse(text)
    return { ...rule, passed: true, details: 'ai-index.json found and contains valid JSON', errorType: 'success' }
  } catch {
    return { ...rule, passed: false, details: 'ai-index.json found but contains invalid JSON', errorType: 'parse_error' }
  }
}

function extractCitabilityPassages(html: string) {
  const pTagMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || []
  const passages: Array<{ text: string; wordCount: number; citable: boolean; reason: string }> = []
  for (const match of pTagMatches) {
    const text = match.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    if (text.length < 30) continue
    const words = text.split(/\s+/).filter(w => w.length > 0)
    const wordCount = words.length
    const firstSentence = text.split(/[.!?]/)[0] || ''
    const hasDeclarativeSentence = /^[A-Z][^,]{10,}/.test(firstSentence) &&
      !/^(Are|Is|Do|Does|Did|Will|Can|Could|Should|Would|Have|Has|Had|What|How|Why|When|Where|Who)\b/i.test(firstSentence)
    let citable = false
    let reason = ''
    if (wordCount < 50) reason = 'Too short (under 50 words)'
    else if (wordCount > 250) reason = 'Too long (over 250 words)'
    else if (wordCount >= 100 && wordCount <= 200 && hasDeclarativeSentence) { citable = true; reason = 'Good length with clear topic sentence' }
    else if (wordCount >= 50 && wordCount < 100) reason = 'Slightly short (50-100 words)'
    else if (wordCount > 200 && wordCount <= 250) reason = 'Slightly long (200-250 words)'
    else if (!hasDeclarativeSentence) reason = 'No clear declarative topic sentence at start'
    else reason = 'Does not meet citability criteria'
    passages.push({ text: text.slice(0, 300) + (text.length > 300 ? '...' : ''), wordCount, citable, reason })
  }
  return passages.slice(0, 15)
}

export async function checkCitability(html: string): Promise<CheckResult> {
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
  }
}

export async function checkEeat(html: string): Promise<CheckResult> {
  const rule = getRule('eeat')
  const signals: string[] = []
  if (/href="[^"]*\/(about|about-us|our-team|who-we-are)[^"]*"/i.test(html)) signals.push('About page link')
  if (/\b(written by|by [A-Z][a-z]+ [A-Z][a-z]+|author:|team member|our team|meet [a-z]+ )/i.test(html)) signals.push('Author/team mentions')
  if (/\b(licensed|certified|insured|bonded|accredited|years of experience|[0-9]+ years|member of|association|credential|diploma|degree)\b/i.test(html)) signals.push('Credential/certification keywords')
  const passed = signals.length >= 2
  return {
    ...rule,
    passed,
    details: signals.length === 0
      ? 'No E-E-A-T signals found'
      : passed
      ? `E-E-A-T signals found: ${signals.join(', ')}`
      : `Only ${signals.length} E-E-A-T signal found: ${signals.join(', ')} — need at least 2`,
    errorType: 'success',
  }
}

export async function checkBrandSocialLinks(html: string): Promise<CheckResult> {
  const rule = getRule('brand_social_links')
  const hasSameAs = /"sameAs"\s*:\s*\[/i.test(html) || /"sameAs"\s*:\s*"https?:/i.test(html)
  const socialPatterns = [
    /href="https?:\/\/(www\.)?(facebook|fb)\.com\/[^"]+"/i,
    /href="https?:\/\/(www\.)?instagram\.com\/[^"]+"/i,
    /href="https?:\/\/(www\.)?twitter\.com\/[^"]+"/i,
    /href="https?:\/\/(www\.)?x\.com\/[^"]+"/i,
    /href="https?:\/\/(www\.)?linkedin\.com\/(company|in)\/[^"]+"/i,
    /href="https?:\/\/(www\.)?youtube\.com\/(channel|c|@)[^"]+"/i,
    /href="https?:\/\/(www\.)?yelp\.com\/biz\/[^"]+"/i,
  ]
  const socialNames = ['Facebook', 'Instagram', 'Twitter/X', 'Twitter/X', 'LinkedIn', 'YouTube', 'Yelp']
  const foundSocials: string[] = []
  socialPatterns.forEach((pattern, i) => { if (pattern.test(html)) foundSocials.push(socialNames[i]) })
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
      ? `Only 1 social link found (${uniqueSocials[0]}) — add more`
      : 'No social profile links or sameAs schema found',
    errorType: 'success',
  }
}

export async function checkSchemaMarkup(html: string): Promise<CheckResult> {
  const rule = getRule('schema_markup')
  const hasLocalBusiness = /LocalBusiness|Plumber|Electrician|Dentist|HVAC|Attorney|Roofing/i.test(html) && /application\/ld\+json/i.test(html)
  const hasOrgSchema = /"@type"\s*:\s*"Organization"/i.test(html)
  const hasAnySchema = /application\/ld\+json/i.test(html)
  return {
    ...rule,
    passed: hasLocalBusiness || hasOrgSchema,
    details: hasLocalBusiness
      ? 'LocalBusiness schema found'
      : hasOrgSchema
      ? 'Organization schema found'
      : hasAnySchema
      ? 'Some schema found, but no business-specific schema'
      : 'No schema markup found',
    errorType: 'success',
  }
}

export async function checkFaqContent(html: string): Promise<CheckResult> {
  const rule = getRule('faq_content')
  const hasFaqSchema = /FAQPage/i.test(html) && /application\/ld\+json/i.test(html)
  const hasFaqSection = /<(h[1-6])[^>]*>.*?(faq|frequently asked|common questions)/i.test(html)
  const questionCount = (html.match(/<(h[2-6])[^>]*>.*?\?/gi) || []).length
  return {
    ...rule,
    passed: hasFaqSchema || (hasFaqSection && questionCount >= 3),
    details: hasFaqSchema
      ? 'FAQ page with schema markup found'
      : hasFaqSection
      ? `FAQ section found with ${questionCount} questions`
      : questionCount > 0
      ? `Found ${questionCount} question-like headings but no dedicated FAQ section`
      : 'No FAQ content found',
    errorType: 'success',
  }
}

export async function checkHttps(url: string): Promise<CheckResult> {
  const rule = getRule('https')
  const isHttps = url.startsWith('https://')
  return { ...rule, passed: isHttps, details: isHttps ? 'Site uses HTTPS' : 'Site does not use HTTPS', errorType: 'success' }
}

export async function checkOpenGraph(html: string): Promise<CheckResult> {
  const rule = getRule('open_graph')
  const hasOg = /property="og:(title|description|type)"/i.test(html)
  const hasTwitter = /name="twitter:(card|title|description)"/i.test(html)
  return {
    ...rule,
    passed: hasOg,
    details: hasOg && hasTwitter
      ? 'Both Open Graph and Twitter Card tags found'
      : hasOg
      ? 'Open Graph tags found'
      : 'No Open Graph tags found',
    errorType: 'success',
  }
}

export async function checkMobile(html: string): Promise<CheckResult> {
  const rule = getRule('mobile')
  const hasViewport = /name="viewport"/i.test(html)
  return { ...rule, passed: hasViewport, details: hasViewport ? 'Viewport meta tag found' : 'No viewport meta tag found', errorType: 'success' }
}

export async function checkSitemap(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('sitemap')
  const { response: res } = await fetchWithRetry(`${baseUrl}/sitemap.xml`)
  const passed = res?.ok === true
  return { ...rule, passed, details: passed ? 'sitemap.xml found' : 'No sitemap.xml found', errorType: 'success' }
}

export async function checkHeadingStructure(html: string): Promise<CheckResult> {
  const rule = getRule('headings')
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length
  const passed = h1Count === 1 && h2Count >= 2
  return {
    ...rule,
    passed,
    details: `Found ${h1Count} H1 tag${h1Count !== 1 ? 's' : ''} and ${h2Count} H2 tags.`,
    errorType: 'success',
  }
}

export async function checkServicePages(html: string): Promise<CheckResult> {
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

export async function checkContentFreshness(html: string): Promise<CheckResult> {
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
      ? `Content references ${lastYear} but not ${currentYear}`
      : 'No recent year references found',
    errorType: 'success',
  }
}

export async function checkReviewSchema(html: string): Promise<CheckResult> {
  const rule = getRule('reviews')
  const hasReviewSchema = /AggregateRating|Review/i.test(html) && /application\/ld\+json/i.test(html)
  const hasTestimonials = /testimonial|review|customer said|what our|client feedback/i.test(html)
  return {
    ...rule,
    passed: hasReviewSchema || hasTestimonials,
    details: hasReviewSchema
      ? 'Review/rating schema markup found'
      : hasTestimonials
      ? 'Testimonial content found'
      : 'No review content or testimonials found',
    errorType: 'success',
  }
}

export async function checkAnswerFirstContent(html: string): Promise<CheckResult> {
  const rule = getRule('answer_first')
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)/i)
  if (!bodyMatch) return { ...rule, passed: false, details: 'Could not analyze page content', errorType: 'parse_error' }
  const text = bodyMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1000)
  const hasLocationMention = /\b(in|near|serving|located)\s+[A-Z][a-z]+/i.test(text)
  const hasServiceMention = /\b(plumb|hvac|heat|cool|dental|roof|repair|install|clean|law|attorney|electric|landscap|paint|construct)/i.test(text)
  const passed = hasLocationMention && hasServiceMention
  return {
    ...rule,
    passed,
    details: passed
      ? 'Homepage content mentions both services and location early'
      : hasServiceMention
      ? 'Services mentioned but no specific location in early content'
      : hasLocationMention
      ? 'Location mentioned but services not clear in early content'
      : 'Homepage doesn\'t clearly state what you do or where',
    errorType: 'success',
  }
}

export async function checkNapConsistency(html: string): Promise<CheckResult> {
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
      ? `Found ${uniquePhones.length} different phone numbers`
      : `Phone number found. ${hasAddress ? 'Address markup present.' : 'No structured address found.'}`,
    errorType: 'success',
  }
}

export async function checkSitemapInRobots(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('sitemap_in_robots')
  const { response: robotsRes } = await fetchWithRetry(`${baseUrl}/robots.txt`)
  if (!robotsRes?.ok) return { ...rule, passed: false, details: 'No robots.txt found', errorType: 'http_4xx' }
  const robotsTxt = await robotsRes.text().catch(() => '')
  const hasSitemapLine = /^Sitemap:\s*https?:\/\/.+/mi.test(robotsTxt)
  return {
    ...rule,
    passed: hasSitemapLine,
    details: hasSitemapLine ? 'Sitemap URL referenced in robots.txt' : 'robots.txt exists but does not reference a sitemap URL',
    errorType: 'success',
  }
}

export async function checkCanonicalTags(html: string): Promise<CheckResult> {
  const rule = getRule('canonical_tags')
  const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html)
  const hasNoindex = /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]*>/i.test(html)
  return {
    ...rule,
    passed: hasCanonical && !hasNoindex,
    details: hasNoindex
      ? 'Page has a noindex directive'
      : hasCanonical
      ? 'Canonical URL tag found'
      : 'No canonical URL tag found',
    errorType: 'success',
  }
}

export async function checkOgImage(html: string): Promise<CheckResult> {
  const rule = getRule('og_image')
  const hasOgImage = /property=["']og:image["'][^>]*content=["'][^"']+["']/i.test(html)
    || /content=["'][^"']+["'][^>]*property=["']og:image["']/i.test(html)
  return {
    ...rule,
    passed: hasOgImage,
    details: hasOgImage
      ? 'og:image meta tag found — social share image is set'
      : 'No og:image meta tag found — pages will show a blank image when shared',
    errorType: 'success',
  }
}

export async function checkCanonicalMatch(url: string, html: string): Promise<CheckResult> {
  const rule = getRule('canonical_match')
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)
  if (!canonicalMatch) {
    return {
      ...rule,
      passed: false,
      details: 'No canonical tag found — cannot verify canonical URL',
      errorType: 'success',
    }
  }
  const canonicalUrl = canonicalMatch[1].replace(/\/+$/, '')
  const pageUrl = url.replace(/\/+$/, '')
  // Normalize: strip trailing slashes and compare
  const passed = canonicalUrl === pageUrl || canonicalUrl === pageUrl + '/'
  return {
    ...rule,
    passed,
    details: passed
      ? `Canonical URL matches page URL: ${canonicalUrl}`
      : `Canonical URL (${canonicalUrl}) points to a different page than the URL being checked (${pageUrl})`,
    errorType: 'success',
  }
}

export async function checkFaviconComplete(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('favicon_complete')
  const [icoResult, pngResult] = await Promise.all([
    fetchWithRetry(`${baseUrl}/favicon.ico`, 5000, 0),
    fetchWithRetry(`${baseUrl}/favicon.png`, 5000, 0),
  ])
  const hasIco = icoResult.errorType === 'success' && icoResult.response?.ok === true
  const hasPng = pngResult.errorType === 'success' && pngResult.response?.ok === true
  const passed = hasIco || hasPng
  return {
    ...rule,
    passed,
    details: passed
      ? `Favicon found: ${hasIco ? '/favicon.ico' : ''}${hasIco && hasPng ? ' and ' : ''}${hasPng ? '/favicon.png' : ''}`
      : 'No favicon found at /favicon.ico or /favicon.png',
    errorType: passed ? 'success' : 'http_4xx',
  }
}

export async function checkWwwRedirect(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('www_redirect')
  let parsedUrl: URL
  try {
    parsedUrl = new URL(baseUrl)
  } catch {
    return { ...rule, passed: false, details: 'Could not parse URL', errorType: 'parse_error' }
  }

  const hostname = parsedUrl.hostname
  const isWww = hostname.startsWith('www.')
  const nonWwwHost = isWww ? hostname.slice(4) : `www.${hostname}`
  const altUrl = `${parsedUrl.protocol}//${nonWwwHost}${parsedUrl.pathname}`

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)
    let redirected = false
    let finalUrl = ''
    try {
      const res = await fetch(altUrl, {
        signal: controller.signal,
        headers: { 'User-Agent': 'LocalBeacon-AEO-Checker/1.0' },
        redirect: 'follow',
      })
      clearTimeout(timeout)
      redirected = res.redirected || res.url !== altUrl
      finalUrl = res.url
    } catch {
      clearTimeout(timeout)
      // If we can't reach the www variant at all, that's actually fine — it just doesn't exist
      return {
        ...rule,
        passed: true,
        details: `${nonWwwHost} does not resolve — only one version of the domain is accessible`,
        errorType: 'success',
      }
    }

    const canonicalBase = baseUrl.replace(/\/+$/, '')
    const finalBase = finalUrl.replace(/\/+$/, '')
    const redirectsToCanonical = finalBase === canonicalBase || finalBase.startsWith(canonicalBase)

    return {
      ...rule,
      passed: redirected && redirectsToCanonical,
      details: redirected && redirectsToCanonical
        ? `${nonWwwHost} correctly redirects to ${hostname}`
        : redirected
        ? `${nonWwwHost} redirects, but not to the canonical domain (goes to ${finalUrl})`
        : `${nonWwwHost} does not redirect — both www and non-www versions serve content independently`,
      errorType: 'success',
    }
  } catch {
    return { ...rule, passed: false, details: 'Could not check www redirect', errorType: 'timeout' }
  }
}

export async function checkMetaUnique(url: string, html: string): Promise<CheckResult> {
  const rule = getRule('meta_unique')

  // Extract page title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  const pageTitle = titleMatch ? titleMatch[1].trim() : ''

  // Determine if this is the homepage
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    return { ...rule, passed: true, details: 'Could not parse URL for homepage check', errorType: 'parse_error' }
  }

  const isHomepage = !parsedUrl.pathname || parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html'

  if (isHomepage) {
    // For homepage, just check that a title exists
    const passed = pageTitle.length > 0
    return {
      ...rule,
      passed,
      details: passed
        ? `Homepage title found: "${pageTitle}"`
        : 'No page title found',
      errorType: 'success',
    }
  }

  if (!pageTitle) {
    return {
      ...rule,
      passed: false,
      details: 'No page title found on this page',
      errorType: 'success',
    }
  }

  // For non-homepage, fetch homepage and compare titles
  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`
  try {
    const { response: homeRes } = await fetchWithRetry(baseUrl, 5000, 0)
    if (!homeRes?.ok) {
      // Can't fetch homepage — assume title is unique
      return {
        ...rule,
        passed: true,
        details: `Page title found: "${pageTitle}" (could not compare to homepage)`,
        errorType: 'success',
      }
    }
    const homeHtml = await homeRes.text().catch(() => '')
    const homeTitleMatch = homeHtml.match(/<title[^>]*>([^<]*)<\/title>/i)
    const homeTitle = homeTitleMatch ? homeTitleMatch[1].trim() : ''

    const passed = !homeTitle || pageTitle.toLowerCase() !== homeTitle.toLowerCase()
    return {
      ...rule,
      passed,
      details: passed
        ? `Page title "${pageTitle}" is unique from homepage title`
        : `Page title "${pageTitle}" is identical to homepage title — each page needs a unique title`,
      errorType: 'success',
    }
  } catch {
    return {
      ...rule,
      passed: true,
      details: `Page title found: "${pageTitle}" (could not compare to homepage)`,
      errorType: 'success',
    }
  }
}

/**
 * Run all AEO checks for a given URL and HTML body.
 * Returns checks array and computed score (0-100).
 */
export async function runAllChecks(baseUrl: string, html: string): Promise<{ checks: CheckResult[]; score: number; passed: number; failed: number }> {
  const checks = await Promise.all([
    checkLlmsTxt(baseUrl),
    checkRobotsTxt(baseUrl),
    checkAiCrawlerAccess(baseUrl),
    checkAiIndexJson(baseUrl),
    checkHeadingStructure(html),
    checkFaqContent(html),
    checkAnswerFirstContent(html),
    checkServicePages(html),
    checkContentFreshness(html),
    checkSchemaMarkup(html),
    checkReviewSchema(html),
    checkNapConsistency(html),
    checkBrandSocialLinks(html),
    checkCitability(html),
    checkEeat(html),
    checkHttps(baseUrl),
    checkMobile(html),
    checkOpenGraph(html),
    checkSitemap(baseUrl),
    checkSitemapInRobots(baseUrl),
    checkCanonicalTags(html),
    // SEO hygiene checks
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

  return { checks, score, passed, failed }
}
