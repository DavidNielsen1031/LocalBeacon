#!/usr/bin/env npx tsx
/**
 * Batch AEO Scanner — Server-side bulk scanning for cold outreach
 *
 * Usage:
 *   npx tsx scripts/batch-scan.ts --urls urls.txt --output data/scan-results/plumbers-burnsville.json
 *   npx tsx scripts/batch-scan.ts --url "https://example.com" (single URL)
 *   echo "https://a.com\nhttps://b.com" | npx tsx scripts/batch-scan.ts --stdin
 *
 * Input: newline-separated URLs (file, stdin, or single --url)
 * Output: JSON array of { url, score, grade, passed, failed, total, checks[], scannedAt }
 */

import { writeFileSync, readFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

// ─── AEO Rules (inline to avoid Next.js import issues) ─────────────
const rulesConfig = JSON.parse(
  readFileSync(new URL('../app/lib/aeo-rules.json', import.meta.url), 'utf-8')
)

interface RuleConfig {
  id: string; label: string; description: string; fix: string; weight: number; severity: string; category: string
}

function getRule(id: string): RuleConfig {
  const rule = rulesConfig.rules.find((r: RuleConfig) => r.id === id)
  if (!rule) throw new Error(`Rule not found: ${id}`)
  return rule
}

interface CheckResult {
  id: string; label: string; passed: boolean; details: string; fix: string; weight: number
}

// ─── Fetch with timeout ─────────────────────────────────────────────
async function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<Response | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LocalBeacon-Scanner/1.0; +https://localbeacon.ai)' },
      redirect: 'follow',
    })
    clearTimeout(timer)
    return res
  } catch {
    clearTimeout(timer)
    return null
  }
}

// ─── Individual Checks (simplified from aeo-checks.ts) ─────────────

async function checkLlmsTxt(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('llms_txt')
  const res = await fetchWithTimeout(`${baseUrl}/llms.txt`)
  const passed = res !== null && res.ok && (await res.text()).trim().length > 0
  return { id: rule.id, label: rule.label, passed, details: passed ? 'llms.txt found' : 'No llms.txt file', fix: rule.fix, weight: rule.weight }
}

async function checkRobotsTxt(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('robots_txt')
  const res = await fetchWithTimeout(`${baseUrl}/robots.txt`)
  const passed = res !== null && res.ok
  return { id: rule.id, label: rule.label, passed, details: passed ? 'robots.txt found' : 'No robots.txt', fix: rule.fix, weight: rule.weight }
}

async function checkSitemap(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('sitemap')
  const res = await fetchWithTimeout(`${baseUrl}/sitemap.xml`)
  const passed = res !== null && res.ok
  return { id: rule.id, label: rule.label, passed, details: passed ? 'Sitemap found' : 'No sitemap.xml', fix: rule.fix, weight: rule.weight }
}

async function checkHttps(url: string): Promise<CheckResult> {
  const rule = getRule('https')
  const passed = url.startsWith('https://')
  return { id: rule.id, label: rule.label, passed, details: passed ? 'HTTPS enabled' : 'Not using HTTPS', fix: rule.fix, weight: rule.weight }
}

function checkSchemaMarkup(html: string): CheckResult {
  const rule = getRule('schema_markup')
  const passed = html.includes('application/ld+json') || html.includes('itemtype=')
  return { id: rule.id, label: rule.label, passed, details: passed ? 'Schema markup found' : 'No structured data', fix: rule.fix, weight: rule.weight }
}

function checkFaqContent(html: string): CheckResult {
  const rule = getRule('faq_content')
  const lower = html.toLowerCase()
  const passed = lower.includes('faq') || lower.includes('frequently asked') || lower.includes('FAQPage')
  return { id: rule.id, label: rule.label, passed, details: passed ? 'FAQ content found' : 'No FAQ section', fix: rule.fix, weight: rule.weight }
}

function checkOpenGraph(html: string): CheckResult {
  const rule = getRule('open_graph')
  const passed = html.includes('og:title') && html.includes('og:description')
  return { id: rule.id, label: rule.label, passed, details: passed ? 'OG tags found' : 'Missing Open Graph tags', fix: rule.fix, weight: rule.weight }
}

function checkMobile(html: string): CheckResult {
  const rule = getRule('mobile')
  const passed = html.includes('viewport')
  return { id: rule.id, label: rule.label, passed, details: passed ? 'Mobile viewport set' : 'No mobile viewport', fix: rule.fix, weight: rule.weight }
}

function checkHeadingStructure(html: string): CheckResult {
  const rule = getRule('headings')
  const h1Match = html.match(/<h1[\s>]/gi)
  const passed = h1Match !== null && h1Match.length >= 1
  return { id: rule.id, label: rule.label, passed, details: passed ? 'H1 heading found' : 'No H1 heading', fix: rule.fix, weight: rule.weight }
}

function checkServicePages(html: string): CheckResult {
  const rule = getRule('service_pages')
  const lower = html.toLowerCase()
  const serviceKeywords = ['services', 'service area', 'locations', 'cities we serve', 'areas we serve']
  const passed = serviceKeywords.some(k => lower.includes(k))
  return { id: rule.id, label: rule.label, passed, details: passed ? 'Service/area pages found' : 'No service area content', fix: rule.fix, weight: rule.weight }
}

function checkContentFreshness(html: string): CheckResult {
  const rule = getRule('freshness')
  const dateMatch = html.match(/202[4-9]|203\d/)
  const passed = dateMatch !== null
  return { id: rule.id, label: rule.label, passed, details: passed ? 'Recent content found' : 'No recent dates in content', fix: rule.fix, weight: rule.weight }
}

function checkAnswerFirstContent(html: string): CheckResult {
  const rule = getRule('answer_first')
  const lower = html.toLowerCase()
  const passed = lower.includes('we offer') || lower.includes('we provide') || lower.includes('our services') || lower.includes('we specialize')
  return { id: rule.id, label: rule.label, passed, details: passed ? 'Answer-first content found' : 'Content not structured for AI answers', fix: rule.fix, weight: rule.weight }
}

function checkNapConsistency(html: string): CheckResult {
  const rule = getRule('nap')
  const phoneMatch = html.match(/(\(\d{3}\)\s?\d{3}[-.]?\d{4}|\d{3}[-.]?\d{3}[-.]?\d{4})/)
  const passed = phoneMatch !== null
  return { id: rule.id, label: rule.label, passed, details: passed ? 'Phone number found' : 'No phone number on page', fix: rule.fix, weight: rule.weight }
}

function checkBrandSocialLinks(html: string): CheckResult {
  const rule = getRule('brand_social_links')
  const socials = ['facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'linkedin.com', 'yelp.com', 'youtube.com']
  const found = socials.filter(s => html.includes(s))
  const passed = found.length >= 2
  return { id: rule.id, label: rule.label, passed, details: passed ? `${found.length} social links found` : 'Too few social links', fix: rule.fix, weight: rule.weight }
}

function checkCitability(html: string): CheckResult {
  const rule = getRule('citability')
  const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gis) || []
  const substantive = paragraphs.filter(p => {
    const text = p.replace(/<[^>]+>/g, '').trim()
    return text.split(/\s+/).length >= 15
  })
  const passed = substantive.length >= 3
  return { id: rule.id, label: rule.label, passed, details: passed ? `${substantive.length} citable paragraphs` : 'Not enough substantial paragraphs', fix: rule.fix, weight: rule.weight }
}

function checkEeat(html: string): CheckResult {
  const rule = getRule('eeat')
  const lower = html.toLowerCase()
  const signals = ['about us', 'our team', 'licensed', 'certified', 'experience', 'years', 'founded', 'testimonial']
  const found = signals.filter(s => lower.includes(s))
  const passed = found.length >= 2
  return { id: rule.id, label: rule.label, passed, details: passed ? `${found.length} E-E-A-T signals` : 'Weak trust signals', fix: rule.fix, weight: rule.weight }
}

function checkReviewSchema(html: string): CheckResult {
  const rule = getRule('reviews')
  const lower = html.toLowerCase()
  const passed = lower.includes('aggregaterating') || lower.includes('review') || lower.includes('testimonial')
  return { id: rule.id, label: rule.label, passed, details: passed ? 'Review content found' : 'No reviews or testimonials', fix: rule.fix, weight: rule.weight }
}

async function checkAiCrawlerAccess(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('ai_crawler_access')
  const res = await fetchWithTimeout(`${baseUrl}/robots.txt`)
  if (!res || !res.ok) return { id: rule.id, label: rule.label, passed: true, details: 'No robots.txt (all crawlers allowed)', fix: rule.fix, weight: rule.weight }
  const text = await res.text()
  const blocked = ['GPTBot', 'ClaudeBot', 'PerplexityBot'].filter(bot => {
    const regex = new RegExp(`User-agent:\\s*${bot}[\\s\\S]*?Disallow:\\s*/`, 'i')
    return regex.test(text)
  })
  const passed = blocked.length === 0
  return { id: rule.id, label: rule.label, passed, details: passed ? 'AI crawlers allowed' : `Blocked: ${blocked.join(', ')}`, fix: rule.fix, weight: rule.weight }
}

async function checkAiIndexJson(baseUrl: string): Promise<CheckResult> {
  const rule = getRule('ai_index_json')
  const res = await fetchWithTimeout(`${baseUrl}/ai-index.json`)
  const passed = res !== null && res.ok
  return { id: rule.id, label: rule.label, passed, details: passed ? 'ai-index.json found' : 'No ai-index.json', fix: rule.fix, weight: rule.weight }
}

// ─── Run all checks on one URL ──────────────────────────────────────
async function scanUrl(url: string): Promise<{
  url: string; score: number; grade: string; passed: number; failed: number; total: number;
  checks: CheckResult[]; scannedAt: string; error?: string
}> {
  // Normalize URL
  if (!url.startsWith('http')) url = `https://${url}`
  url = url.replace(/\/+$/, '')

  console.error(`  Scanning ${url}...`)

  // Fetch the page HTML
  const res = await fetchWithTimeout(url, 10000)
  if (!res || !res.ok) {
    return {
      url, score: 0, grade: 'F', passed: 0, failed: 0, total: 0,
      checks: [], scannedAt: new Date().toISOString(),
      error: res ? `HTTP ${res.status}` : 'Could not reach site',
    }
  }

  const html = await res.text()
  const baseUrl = new URL(url).origin

  // Run all checks
  const checks = await Promise.all([
    checkLlmsTxt(baseUrl),
    checkRobotsTxt(baseUrl),
    checkAiCrawlerAccess(baseUrl),
    checkAiIndexJson(baseUrl),
    checkSitemap(baseUrl),
    checkHttps(url),
    checkSchemaMarkup(html),
    checkFaqContent(html),
    checkOpenGraph(html),
    checkMobile(html),
    checkHeadingStructure(html),
    checkServicePages(html),
    checkContentFreshness(html),
    checkAnswerFirstContent(html),
    checkNapConsistency(html),
    checkBrandSocialLinks(html),
    checkCitability(html),
    checkEeat(html),
    checkReviewSchema(html),
  ])

  const passed = checks.filter(c => c.passed).length
  const failed = checks.filter(c => !c.passed).length
  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0)
  const earnedWeight = checks.filter(c => c.passed).reduce((sum, c) => sum + c.weight, 0)
  const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0

  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F'

  return { url, score, grade, passed, failed, total: checks.length, checks, scannedAt: new Date().toISOString() }
}

// ─── Main ───────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  let urls: string[] = []
  let outputPath = ''

  // Parse args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      urls.push(args[++i])
    } else if (args[i] === '--urls' && args[i + 1]) {
      const content = readFileSync(args[++i], 'utf-8')
      urls.push(...content.split('\n').map(u => u.trim()).filter(Boolean))
    } else if (args[i] === '--stdin') {
      const content = readFileSync('/dev/stdin', 'utf-8')
      urls.push(...content.split('\n').map(u => u.trim()).filter(Boolean))
    } else if (args[i] === '--output' && args[i + 1]) {
      outputPath = args[++i]
    }
  }

  if (urls.length === 0) {
    console.error('Usage: npx tsx scripts/batch-scan.ts --url URL | --urls file.txt | --stdin')
    console.error('  --output path.json    Save results to file')
    process.exit(1)
  }

  console.error(`\nBatch AEO Scanner — ${urls.length} URL(s)\n`)

  const results = []
  for (let i = 0; i < urls.length; i++) {
    const result = await scanUrl(urls[i])
    results.push(result)
    console.error(`  [${i + 1}/${urls.length}] ${result.url} → Score: ${result.score} (${result.grade})${result.error ? ` [ERROR: ${result.error}]` : ''}\n`)

    // Rate limit: 1.5s between scans to be polite
    if (i < urls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1500))
    }
  }

  // Output
  const json = JSON.stringify(results, null, 2)
  if (outputPath) {
    mkdirSync(dirname(outputPath), { recursive: true })
    writeFileSync(outputPath, json)
    console.error(`\nResults saved to ${outputPath}`)
  } else {
    console.log(json)
  }

  // Summary
  const avg = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)
  const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 }
  results.forEach(r => { if (r.grade in grades) grades[r.grade as keyof typeof grades]++ })
  console.error(`\n── Summary ──`)
  console.error(`  URLs scanned: ${results.length}`)
  console.error(`  Average score: ${avg}/100`)
  console.error(`  Grades: A:${grades.A} B:${grades.B} C:${grades.C} D:${grades.D} F:${grades.F}`)
  console.error(`  Errors: ${results.filter(r => r.error).length}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
