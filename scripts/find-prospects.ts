#!/usr/bin/env npx tsx
/**
 * Prospect Discovery Pipeline — Find local businesses by industry + city
 *
 * Usage:
 *   npx tsx scripts/find-prospects.ts --industry "plumber" --city "Burnsville MN"
 *   npx tsx scripts/find-prospects.ts --industry "hvac" --city "Eagan MN" --output data/prospects/hvac-eagan.json
 *
 * Uses Brave Search API to find local business websites.
 */

import { writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

const BRAVE_API_KEY = process.env.BRAVE_API_KEY || ''

interface Prospect {
  name: string
  url: string
  description: string
  source: string
}

async function searchBrave(query: string, count = 20): Promise<Prospect[]> {
  if (!BRAVE_API_KEY) {
    console.error('ERROR: BRAVE_API_KEY not set. Source ~/.config/env/global.env first.')
    process.exit(1)
  }

  const params = new URLSearchParams({
    q: query,
    count: String(count),
    result_filter: 'web',
    country: 'us',
  })

  const res = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip',
      'X-Subscription-Token': BRAVE_API_KEY,
    },
  })

  if (!res.ok) {
    console.error(`Brave API error: ${res.status} ${res.statusText}`)
    return []
  }

  const data = await res.json()
  const results: Prospect[] = []

  for (const item of data.web?.results || []) {
    // Filter out directories, aggregators, and non-business sites
    const skipDomains = [
      'yelp.com', 'yellowpages.com', 'bbb.org', 'angieslist.com', 'angi.com',
      'homeadvisor.com', 'thumbtack.com', 'facebook.com', 'nextdoor.com',
      'mapquest.com', 'manta.com', 'chamberofcommerce.com', 'superpages.com',
      'google.com', 'bing.com', 'apple.com', 'indeed.com', 'glassdoor.com',
      'wikipedia.org', 'reddit.com', 'linkedin.com', 'twitter.com', 'x.com',
      'instagram.com', 'tiktok.com', 'pinterest.com',
    ]
    const domain = new URL(item.url).hostname.toLowerCase()
    if (skipDomains.some(d => domain.includes(d))) continue

    results.push({
      name: item.title?.replace(/ [-|–—].*$/, '').trim() || domain,
      url: item.url,
      description: item.description || '',
      source: 'brave_search',
    })
  }

  return results
}

function dedupeByDomain(prospects: Prospect[]): Prospect[] {
  const seen = new Set<string>()
  return prospects.filter(p => {
    try {
      const domain = new URL(p.url).hostname.replace(/^www\./, '')
      if (seen.has(domain)) return false
      seen.add(domain)
      return true
    } catch {
      return false
    }
  })
}

async function main() {
  const args = process.argv.slice(2)
  let industry = ''
  let city = ''
  let outputPath = ''
  let count = 20

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--industry' && args[i + 1]) industry = args[++i]
    else if (args[i] === '--city' && args[i + 1]) city = args[++i]
    else if (args[i] === '--output' && args[i + 1]) outputPath = args[++i]
    else if (args[i] === '--count' && args[i + 1]) count = parseInt(args[++i])
  }

  if (!industry || !city) {
    console.error('Usage: npx tsx scripts/find-prospects.ts --industry "plumber" --city "Burnsville MN"')
    console.error('  --output path.json    Save results to file')
    console.error('  --count N             Number of results per query (default: 20)')
    process.exit(1)
  }

  console.error(`\nProspect Discovery — ${industry} in ${city}\n`)

  // Multiple search queries to maximize coverage
  const queries = [
    `${industry} ${city}`,
    `best ${industry} near ${city}`,
    `${industry} company ${city}`,
    `${industry} service ${city} website`,
  ]

  const allProspects: Prospect[] = []

  for (const query of queries) {
    console.error(`  Searching: "${query}"`)
    const results = await searchBrave(query, count)
    allProspects.push(...results)
    console.error(`    Found ${results.length} results`)
    // Rate limit between searches
    await new Promise(r => setTimeout(r, 1000))
  }

  // Dedupe by domain
  const unique = dedupeByDomain(allProspects)
  console.error(`\n  Total unique prospects: ${unique.length}`)

  // Output
  const output = {
    industry,
    city,
    scannedAt: new Date().toISOString(),
    count: unique.length,
    prospects: unique,
  }

  const json = JSON.stringify(output, null, 2)
  if (outputPath) {
    mkdirSync(dirname(outputPath), { recursive: true })
    writeFileSync(outputPath, json)
    console.error(`  Saved to ${outputPath}`)
  } else {
    console.log(json)
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
