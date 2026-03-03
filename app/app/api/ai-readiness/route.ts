export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

interface CheckResult {
  id: string
  label: string
  description: string
  passed: boolean
  details: string
  fix: string
  weight: number
}

const AI_CRAWLERS = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Amazonbot', 'cohere-ai']

async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<Response | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'LocalBeacon-AEO-Checker/1.0' },
      redirect: 'follow',
    })
    return res
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

async function checkLlmsTxt(baseUrl: string): Promise<CheckResult> {
  const res = await fetchWithTimeout(`${baseUrl}/llms.txt`)
  const passed = res?.ok === true
  const body = passed ? await res!.text().catch(() => '') : ''
  const hasContent = body.length > 50

  return {
    id: 'llms_txt',
    label: 'llms.txt file exists',
    description: 'A llms.txt file tells AI assistants about your business — what you do, where you operate, and how to recommend you.',
    passed: passed && hasContent,
    details: passed && hasContent
      ? `Found llms.txt (${body.length} characters)`
      : passed ? 'File exists but has very little content' : 'No llms.txt file found',
    fix: 'Download your llms.txt from LocalBeacon and upload it to your website root folder. Your website person can do this in 2 minutes.',
    weight: 10,
  }
}

async function checkRobotsTxt(baseUrl: string): Promise<CheckResult> {
  const res = await fetchWithTimeout(`${baseUrl}/robots.txt`)
  if (!res?.ok) {
    return {
      id: 'robots_txt',
      label: 'AI crawlers are allowed',
      description: 'Your robots.txt file controls which bots can read your website. AI assistants like ChatGPT and Claude need access to recommend you.',
      passed: true, // No robots.txt = all crawlers allowed
      details: 'No robots.txt found — all crawlers are allowed by default (this is fine)',
      fix: '',
      weight: 8,
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
      // Check if current agent is an AI crawler or wildcard blocking all
      for (const crawler of AI_CRAWLERS) {
        if (currentAgent === crawler.toLowerCase() || currentAgent === '*') {
          blocked.push(crawler)
        }
      }
    }
  }

  const uniqueBlocked = [...new Set(blocked)]
  const passed = uniqueBlocked.length === 0

  return {
    id: 'robots_txt',
    label: 'AI crawlers are allowed',
    description: 'Your robots.txt file controls which bots can read your website. AI assistants like ChatGPT and Claude need access to recommend you.',
    passed,
    details: passed
      ? 'All AI crawlers are allowed access'
      : `Blocked: ${uniqueBlocked.join(', ')}`,
    fix: passed ? '' : `Edit your robots.txt to remove blocks on: ${uniqueBlocked.join(', ')}. These are the bots that power ChatGPT, Claude, and Perplexity search.`,
    weight: 8,
  }
}

async function checkSchemaMarkup(html: string): Promise<CheckResult> {
  const hasLocalBusiness = /LocalBusiness|Plumber|Electrician|Dentist|HVAC|Attorney|Roofing/i.test(html) && /application\/ld\+json/i.test(html)
  const hasOrgSchema = /"@type"\s*:\s*"Organization"/i.test(html)
  const hasAnySchema = /application\/ld\+json/i.test(html)

  return {
    id: 'schema_markup',
    label: 'Business schema markup present',
    description: 'Schema markup is structured data that tells AI exactly what your business does, where it is, and what services you offer. It\'s like a business card for robots.',
    passed: hasLocalBusiness || hasOrgSchema,
    details: hasLocalBusiness
      ? 'LocalBusiness schema found — AI can read your business info'
      : hasOrgSchema
      ? 'Organization schema found (good, but LocalBusiness schema would be better)'
      : hasAnySchema
      ? 'Some schema found, but no business-specific schema'
      : 'No schema markup found',
    fix: 'Generate your Schema Markup in LocalBeacon\'s Schema tool and add it to your website\'s HTML head section. This helps AI understand your business details.',
    weight: 9,
  }
}

async function checkFaqContent(html: string): Promise<CheckResult> {
  const hasFaqSchema = /FAQPage/i.test(html) && /application\/ld\+json/i.test(html)
  const hasFaqSection = /<(h[1-6])[^>]*>.*?(faq|frequently asked|common questions)/i.test(html)
  const questionCount = (html.match(/<(h[2-6])[^>]*>.*?\?/gi) || []).length

  return {
    id: 'faq_content',
    label: 'FAQ content exists on site',
    description: 'FAQ pages are gold for AI visibility. When someone asks ChatGPT a question about your service, it looks for clear Q&A content to cite.',
    passed: hasFaqSchema || (hasFaqSection && questionCount >= 3),
    details: hasFaqSchema
      ? 'FAQ page with schema markup found — excellent for AI citations'
      : hasFaqSection
      ? `FAQ section found with ${questionCount} questions`
      : questionCount > 0
      ? `Found ${questionCount} question-like headings but no dedicated FAQ section`
      : 'No FAQ content found',
    fix: 'Use LocalBeacon\'s FAQ Builder to generate 15-25 questions specific to your business and location. Add them to your website with our FAQ schema markup.',
    weight: 9,
  }
}

async function checkHttps(url: string): Promise<CheckResult> {
  const isHttps = url.startsWith('https://')
  return {
    id: 'https',
    label: 'Website uses HTTPS (secure)',
    description: 'AI engines strongly prefer secure websites. An unsecured site is less likely to be recommended.',
    passed: isHttps,
    details: isHttps ? 'Site uses HTTPS' : 'Site does not use HTTPS',
    fix: 'Contact your hosting provider to enable SSL/HTTPS. Most hosts offer free SSL certificates.',
    weight: 6,
  }
}

async function checkOpenGraph(html: string): Promise<CheckResult> {
  const hasOg = /property="og:(title|description|type)"/i.test(html)
  const hasTwitter = /name="twitter:(card|title|description)"/i.test(html)

  return {
    id: 'open_graph',
    label: 'Social/AI preview tags present',
    description: 'Open Graph and Twitter tags help AI engines understand your pages. They\'re used by ChatGPT, Perplexity, and social media when sharing your links.',
    passed: hasOg,
    details: hasOg && hasTwitter
      ? 'Both Open Graph and Twitter Card tags found'
      : hasOg
      ? 'Open Graph tags found (add Twitter Card tags too for full coverage)'
      : 'No Open Graph tags found',
    fix: 'Add Open Graph meta tags to your homepage: og:title, og:description, og:type, og:image. Most website builders have an SEO settings section for this.',
    weight: 5,
  }
}

async function checkMobile(html: string): Promise<CheckResult> {
  const hasViewport = /name="viewport"/i.test(html)
  return {
    id: 'mobile',
    label: 'Mobile-friendly',
    description: 'AI engines deprioritize websites that don\'t work on phones. Most people asking AI for recommendations are on mobile.',
    passed: hasViewport,
    details: hasViewport ? 'Viewport meta tag found — site appears mobile-friendly' : 'No viewport meta tag found',
    fix: 'Add a viewport meta tag to your HTML head: <meta name="viewport" content="width=device-width, initial-scale=1">',
    weight: 6,
  }
}

async function checkSitemap(baseUrl: string): Promise<CheckResult> {
  const res = await fetchWithTimeout(`${baseUrl}/sitemap.xml`)
  const passed = res?.ok === true

  return {
    id: 'sitemap',
    label: 'Sitemap exists',
    description: 'A sitemap helps AI crawlers discover all your pages efficiently. Without one, some pages may never be found.',
    passed,
    details: passed ? 'sitemap.xml found' : 'No sitemap.xml found',
    fix: 'Most website builders can generate a sitemap automatically. Check your platform\'s SEO settings, or ask your website person to add one.',
    weight: 4,
  }
}

async function checkHeadingStructure(html: string): Promise<CheckResult> {
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length
  const passed = h1Count === 1 && h2Count >= 2

  return {
    id: 'headings',
    label: 'Clean heading structure',
    description: 'AI breaks your pages into sections using headings (H1, H2, H3). Clear headings help AI extract and cite specific answers from your content.',
    passed,
    details: `Found ${h1Count} H1 tag${h1Count !== 1 ? 's' : ''} and ${h2Count} H2 tags. ${h1Count === 1 ? 'Good H1 structure.' : h1Count === 0 ? 'Missing H1.' : 'Multiple H1s — should have exactly one.'} ${h2Count >= 2 ? 'Good content structure.' : 'Need more H2 sections.'}`,
    fix: 'Ensure your homepage has exactly one H1 tag (your business name or main headline) and at least 2-3 H2 tags for different sections (Services, About, FAQ, etc.).',
    weight: 5,
  }
}

async function checkServicePages(html: string, baseUrl: string): Promise<CheckResult> {
  // Check for links to service-related pages
  const serviceLinks = html.match(/href="[^"]*(?:service|plumb|hvac|dental|roof|repair|install|clean|landscap|electri|paint)[^"]*"/gi) || []
  const areaLinks = html.match(/href="[^"]*(?:area|location|city|neighborhood|serve|cover)[^"]*"/gi) || []
  const totalLinks = serviceLinks.length + areaLinks.length

  return {
    id: 'service_pages',
    label: 'Service area pages exist',
    description: 'Dedicated pages for each city you serve dramatically increase your chances of being recommended when someone asks AI for services "near me" or in a specific city.',
    passed: totalLinks >= 2,
    details: totalLinks >= 2
      ? `Found ${serviceLinks.length} service page links and ${areaLinks.length} area page links`
      : 'Few or no service/area-specific page links found',
    fix: 'Use LocalBeacon\'s Page Builder to create pages for each city you serve. Example: "Plumbing Services in Apple Valley, MN" — each page should answer local questions.',
    weight: 8,
  }
}

async function checkContentFreshness(html: string): Promise<CheckResult> {
  const currentYear = new Date().getFullYear().toString()
  const lastYear = (new Date().getFullYear() - 1).toString()
  const hasCurrent = html.includes(currentYear)
  const hasRecent = hasCurrent || html.includes(lastYear)

  // Check for date meta tags
  const hasDateMeta = /(?:dateModified|datePublished|last-modified)/i.test(html)

  return {
    id: 'freshness',
    label: 'Content is fresh and current',
    description: 'AI engines strongly favor recent content. Pages with current dates and updated information get cited more often.',
    passed: hasRecent,
    details: hasCurrent
      ? `Content references ${currentYear} — appears current`
      : hasRecent
      ? `Content references ${lastYear} but not ${currentYear} — consider updating`
      : 'No recent year references found — content may appear outdated to AI',
    fix: `Update your website content to reference ${currentYear}. Add "Last updated" dates to key pages. Fresh content gets cited more by AI search engines.`,
    weight: 6,
  }
}

async function checkReviewSchema(html: string): Promise<CheckResult> {
  const hasReviewSchema = /AggregateRating|Review/i.test(html) && /application\/ld\+json/i.test(html)
  const hasTestimonials = /testimonial|review|customer said|what our|client feedback/i.test(html)

  return {
    id: 'reviews',
    label: 'Reviews or testimonials on site',
    description: 'Third-party validation (reviews, testimonials) is one of the strongest signals for AI recommendations. AI engines trust businesses that customers vouch for.',
    passed: hasReviewSchema || hasTestimonials,
    details: hasReviewSchema
      ? 'Review/rating schema markup found'
      : hasTestimonials
      ? 'Testimonial content found (add schema markup to boost AI visibility)'
      : 'No review content or testimonials found on homepage',
    fix: 'Add customer testimonials to your website with AggregateRating schema markup. Include star ratings and review counts.',
    weight: 7,
  }
}

async function checkAnswerFirstContent(html: string): Promise<CheckResult> {
  // Check if the page has direct, answer-style content early
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)/i)
  if (!bodyMatch) {
    return {
      id: 'answer_first',
      label: 'Answer-first content structure',
      description: 'AI engines extract the first clear answer they find. Your homepage should immediately state what you do and where, not start with generic marketing fluff.',
      passed: false,
      details: 'Could not analyze page content',
      fix: 'Start your homepage with a clear statement: "[Business Name] provides [service] in [city], [state]." AI engines look for direct answers in the first few paragraphs.',
      weight: 7,
    }
  }

  // Strip HTML tags and check first 500 chars of visible text
  const text = bodyMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1000)
  const hasLocationMention = /\b(in|near|serving|located)\s+[A-Z][a-z]+/i.test(text)
  const hasServiceMention = /\b(plumb|hvac|heat|cool|dental|roof|repair|install|clean|law|attorney|electric|landscap|paint|construct)/i.test(text)
  const passed = hasLocationMention && hasServiceMention

  return {
    id: 'answer_first',
    label: 'Answer-first content structure',
    description: 'AI engines extract the first clear answer they find. Your homepage should immediately state what you do and where, not start with generic marketing fluff.',
    passed,
    details: passed
      ? 'Homepage content mentions both services and location early — good for AI extraction'
      : hasServiceMention
      ? 'Services mentioned but no specific location in early content'
      : hasLocationMention
      ? 'Location mentioned but services not clear in early content'
      : 'Homepage doesn\'t clearly state what you do or where in the first content block',
    fix: 'Start your homepage with a clear statement: "[Business Name] provides [service] in [city], [state]. Call [phone] for [specific service]." Put this above the fold.',
    weight: 7,
  }
}

async function checkNapConsistency(html: string): Promise<CheckResult> {
  const phonePattern = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
  const phones = html.match(phonePattern) || []
  const uniquePhones = [...new Set(phones.map(p => p.replace(/\D/g, '')))]

  const hasAddress = /<address/i.test(html) || /itemtype=".*PostalAddress"/i.test(html) || /"address"/i.test(html)

  return {
    id: 'nap',
    label: 'Contact info is clear and consistent',
    description: 'AI engines verify your business by checking if your name, address, and phone (NAP) are consistent. Inconsistent info = less trustworthy = less likely to be recommended.',
    passed: uniquePhones.length >= 1 && uniquePhones.length <= 2 && hasAddress,
    details: uniquePhones.length === 0
      ? 'No phone number found on page'
      : uniquePhones.length > 2
      ? `Found ${uniquePhones.length} different phone numbers — this confuses AI`
      : `Phone number found. ${hasAddress ? 'Address markup present.' : 'No structured address found.'}`,
    fix: 'Display one consistent phone number and full address on every page. Use structured address markup (schema.org PostalAddress) so AI can read it accurately.',
    weight: 7,
  }
}

export async function POST(req: NextRequest) {
  const { url } = await req.json() as { url: string }

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  // Normalize URL
  let baseUrl = url.trim()
  if (!baseUrl.startsWith('http')) baseUrl = `https://${baseUrl}`
  baseUrl = baseUrl.replace(/\/+$/, '')

  // Fetch the homepage
  const pageRes = await fetchWithTimeout(baseUrl, 8000)
  if (!pageRes || !pageRes.ok) {
    return NextResponse.json({
      error: `Could not reach ${baseUrl}. Make sure the website is online and the URL is correct.`,
      score: 0,
      checks: [],
    }, { status: 400 })
  }

  const html = await pageRes.text()

  // Run all checks in parallel
  const checks = await Promise.all([
    checkLlmsTxt(baseUrl),
    checkRobotsTxt(baseUrl),
    checkSchemaMarkup(html),
    checkFaqContent(html),
    checkHttps(baseUrl),
    checkOpenGraph(html),
    checkMobile(html),
    checkSitemap(baseUrl),
    checkHeadingStructure(html),
    checkServicePages(html, baseUrl),
    checkContentFreshness(html),
    checkReviewSchema(html),
    checkAnswerFirstContent(html),
    checkNapConsistency(html),
  ])

  // Calculate weighted score
  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0)
  const earnedWeight = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0)
  const score = Math.round((earnedWeight / totalWeight) * 100)

  const passed = checks.filter(c => c.passed).length
  const failed = checks.filter(c => !c.passed).length

  return NextResponse.json({
    url: baseUrl,
    score,
    passed,
    failed,
    total: checks.length,
    checks,
    scannedAt: new Date().toISOString(),
  })
}
