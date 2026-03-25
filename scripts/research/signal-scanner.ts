#!/usr/bin/env npx tsx
/**
 * Research Engine v1 — Signal Scanner
 *
 * Scans RSS feeds and web search for new AI/AEO signals relevant to local businesses.
 * Run daily via cron or manually.
 *
 * Usage:
 *   npx tsx scripts/research/signal-scanner.ts
 *   npx tsx scripts/research/signal-scanner.ts --digest  (also generate weekly digest)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'

const BRAVE_API_KEY = process.env.BRAVE_API_KEY || ''
const SIGNALS_FILE = join(dirname(new URL(import.meta.url).pathname), '../../data/research/signals.json')
const CHANGELOG_FILE = join(dirname(new URL(import.meta.url).pathname), '../../data/research/changelog.md')

interface Signal {
  id: string
  title: string
  url: string
  source: string
  summary: string
  priority: 'high' | 'medium' | 'low'
  actionable: boolean
  category: 'ai_search' | 'seo' | 'schema' | 'content' | 'local' | 'tools'
  discoveredAt: string
}

interface SignalStore {
  lastUpdated: string
  signals: Signal[]
}

// ─── RSS Feed Parsing (simple XML extraction) ──────────────────────
async function fetchRSS(feedUrl: string, sourceName: string): Promise<Signal[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'LocalBeacon-Research/1.0' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return []

    const xml = await res.text()
    const items: Signal[] = []

    // Simple regex-based RSS/Atom parsing
    const entryRegex = /<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/gi
    let match
    while ((match = entryRegex.exec(xml)) !== null) {
      const block = match[1]
      const title = block.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() || ''
      const link = block.match(/<link[^>]*href="([^"]+)"/i)?.[1]
        || block.match(/<link[^>]*>(.*?)<\/link>/i)?.[1]?.trim()
        || ''
      const desc = block.match(/<(?:description|summary|content)[^>]*>(.*?)<\/(?:description|summary|content)>/is)?.[1]
        ?.replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
        ?.replace(/<[^>]+>/g, '')
        ?.trim()
        ?.substring(0, 300)
        || ''
      const pubDate = block.match(/<(?:pubDate|published|updated)[^>]*>(.*?)<\/(?:pubDate|published|updated)>/i)?.[1]?.trim() || ''

      // Only include items from last 7 days
      if (pubDate) {
        const itemDate = new Date(pubDate)
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        if (itemDate < weekAgo) continue
      }

      if (!title || !link) continue

      // Score relevance
      const relevance = scoreRelevance(title + ' ' + desc)
      if (relevance.priority === 'low' && !relevance.actionable) continue

      items.push({
        id: Buffer.from(link).toString('base64').substring(0, 20),
        title,
        url: link,
        source: sourceName,
        summary: desc.substring(0, 200),
        priority: relevance.priority,
        actionable: relevance.actionable,
        category: relevance.category,
        discoveredAt: new Date().toISOString(),
      })
    }

    return items
  } catch (err) {
    console.error(`  ⚠️ Failed to fetch ${sourceName}: ${err}`)
    return []
  }
}

// ─── Brave Search ──────────────────────────────────────────────────
async function searchBrave(query: string): Promise<Signal[]> {
  if (!BRAVE_API_KEY) return []

  const params = new URLSearchParams({
    q: query,
    count: '10',
    freshness: 'pw', // past week
  })

  try {
    const res = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': BRAVE_API_KEY,
      },
    })
    if (!res.ok) return []

    const data = await res.json()
    const results: Signal[] = []

    for (const item of data.web?.results || []) {
      const relevance = scoreRelevance(item.title + ' ' + (item.description || ''))
      if (relevance.priority === 'low' && !relevance.actionable) continue

      results.push({
        id: Buffer.from(item.url).toString('base64').substring(0, 20),
        title: item.title,
        url: item.url,
        source: `brave:${query.substring(0, 30)}`,
        summary: item.description?.substring(0, 200) || '',
        priority: relevance.priority,
        actionable: relevance.actionable,
        category: relevance.category,
        discoveredAt: new Date().toISOString(),
      })
    }

    return results
  } catch {
    return []
  }
}

// ─── Relevance Scoring ─────────────────────────────────────────────
function scoreRelevance(text: string): { priority: 'high' | 'medium' | 'low'; actionable: boolean; category: Signal['category'] } {
  const lower = text.toLowerCase()

  // High priority keywords (directly about AI search optimization)
  const highKeywords = ['llms.txt', 'ai search ranking', 'ai overviews', 'aeo', 'ai engine optimization',
    'chatgpt recommendation', 'perplexity ranking', 'claude citation', 'ai crawl', 'gptbot',
    'ai discovery', 'ai-index.json', 'schema markup update', 'structured data change']

  // Medium priority (related SEO/content signals)
  const medKeywords = ['local seo update', 'google business profile', 'local search', 'schema.org',
    'e-e-a-t', 'content freshness', 'ai generated content', 'search generative', 'gemini search',
    'bing ai', 'copilot search', 'review signals', 'citation', 'knowledge graph']

  // Category detection
  let category: Signal['category'] = 'seo'
  if (highKeywords.some(k => lower.includes(k))) category = 'ai_search'
  else if (lower.includes('schema') || lower.includes('structured data')) category = 'schema'
  else if (lower.includes('content') || lower.includes('blog') || lower.includes('faq')) category = 'content'
  else if (lower.includes('local') || lower.includes('gbp') || lower.includes('google business')) category = 'local'

  const isHigh = highKeywords.some(k => lower.includes(k))
  const isMedium = medKeywords.some(k => lower.includes(k))

  // Actionable = could lead to a new checker rule or content recommendation
  const actionable = isHigh || lower.includes('new signal') || lower.includes('ranking factor') ||
    lower.includes('update') || lower.includes('change') || lower.includes('deprecated')

  return {
    priority: isHigh ? 'high' : isMedium ? 'medium' : 'low',
    actionable,
    category,
  }
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const generateDigest = args.includes('--digest')

  console.error('\n🔬 Research Engine — Signal Scanner\n')

  // Load existing signals
  mkdirSync(dirname(SIGNALS_FILE), { recursive: true })
  let store: SignalStore = { lastUpdated: '', signals: [] }
  if (existsSync(SIGNALS_FILE)) {
    store = JSON.parse(readFileSync(SIGNALS_FILE, 'utf-8'))
  }
  const existingUrls = new Set(store.signals.map(s => s.url))

  const allNew: Signal[] = []

  // RSS Feeds
  const feeds = [
    { url: 'https://developers.google.com/search/blog/rss', name: 'Google Search Central' },
    { url: 'https://blogs.bing.com/webmaster/rss', name: 'Bing Webmaster' },
    { url: 'https://www.searchenginejournal.com/feed/', name: 'Search Engine Journal' },
    { url: 'https://ahrefs.com/blog/feed/', name: 'Ahrefs Blog' },
    { url: 'https://moz.com/blog/feed', name: 'Moz Blog' },
  ]

  for (const feed of feeds) {
    console.error(`  📡 ${feed.name}...`)
    const signals = await fetchRSS(feed.url, feed.name)
    const newOnes = signals.filter(s => !existingUrls.has(s.url))
    allNew.push(...newOnes)
    console.error(`    ${signals.length} items, ${newOnes.length} new`)
  }

  // Brave Search queries
  const queries = [
    'AI search ranking signals 2026',
    'llms.txt standard update',
    'AEO AI engine optimization local business',
    'Google AI overviews changes',
    'schema markup local business update',
  ]

  for (const query of queries) {
    console.error(`  🔍 "${query}"...`)
    const signals = await searchBrave(query)
    const newOnes = signals.filter(s => !existingUrls.has(s.url))
    allNew.push(...newOnes)
    console.error(`    ${signals.length} items, ${newOnes.length} new`)
    await new Promise(r => setTimeout(r, 1000)) // rate limit
  }

  // Dedupe new signals by URL
  const deduped = allNew.filter((s, i, arr) => arr.findIndex(x => x.url === s.url) === i)

  // Merge into store
  store.signals.push(...deduped)
  store.lastUpdated = new Date().toISOString()
  writeFileSync(SIGNALS_FILE, JSON.stringify(store, null, 2))

  console.error(`\n── Results ──`)
  console.error(`  New signals: ${deduped.length}`)
  console.error(`  Total in database: ${store.signals.length}`)
  console.error(`  High priority: ${deduped.filter(s => s.priority === 'high').length}`)
  console.error(`  Actionable: ${deduped.filter(s => s.actionable).length}`)

  // Generate weekly digest if requested
  if (generateDigest && deduped.length > 0) {
    const digest = generateWeeklyDigest(deduped)
    console.log('\n' + digest)
  }
}

function generateWeeklyDigest(signals: Signal[]): string {
  const high = signals.filter(s => s.priority === 'high')
  const medium = signals.filter(s => s.priority === 'medium')

  let md = `## 🔬 Weekly Signal Digest — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n\n`
  md += `**${signals.length} new signals** detected this week.\n\n`

  if (high.length > 0) {
    md += `### 🔴 High Priority\n`
    for (const s of high) {
      md += `- **${s.title}** — [${s.source}](${s.url})\n  ${s.summary}\n\n`
    }
  }

  if (medium.length > 0) {
    md += `### 🟡 Medium Priority\n`
    for (const s of medium.slice(0, 10)) {
      md += `- **${s.title}** — [${s.source}](${s.url})\n`
    }
  }

  md += `\n---\n*Generated by LocalBeacon Research Engine*\n`
  return md
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
