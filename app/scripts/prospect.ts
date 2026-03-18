#!/usr/bin/env npx tsx
/**
 * LocalBeacon Lead Prospecting Script
 * Usage: npx tsx scripts/prospect.ts "plumber" "Burnsville" "MN"
 *
 * Finds local businesses, runs AEO scans, and writes ranked results to Google Sheets.
 */

import { spawnSync } from "child_process";
import * as fs from "fs";

// ─── Config ───────────────────────────────────────────────────────────────────

const SHEET_ID = "1dCiKBE5zUUn1vYFq3kzZtdg-F3E3uXfE4npUdaCCQ70";
const SHEET_ACCOUNT = "davidnielsen1031@gmail.com";
const AEO_API = "https://localbeacon.ai/api/ai-readiness";
const BRAVE_API = "https://api.search.brave.com/res/v1/web/search";

// Directories to skip
const SKIP_DOMAINS = [
  "yelp.com",
  "yellowpages.com",
  "angi.com",
  "bbb.org",
  "homeadvisor.com",
  "thumbtack.com",
  "angieslist.com",
  "houzz.com",
  "mapquest.com",
  "manta.com",
  "superpages.com",
  "citysearch.com",
  "merchantcircle.com",
  "porch.com",
  "bark.com",
  "nextdoor.com",
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "google.com",
  "bing.com",
  "maps.google.com",
  "tripadvisor.com",
  "foursquare.com",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface BusinessResult {
  name: string;
  url: string;
  industry: string;
  city: string;
  state: string;
  aeoScore: number | null;
  topFailures: string[];
  contactEmail: string;
  phone: string;
  error?: string;
}

interface AEOCheck {
  name: string;
  passed: boolean;
  score?: number;
  label?: string;
  description?: string;
}

interface AEOResponse {
  score: number;
  checks: AEOCheck[];
}

// ─── Load env ─────────────────────────────────────────────────────────────────

function loadEnv(): string {
  const envPath = `${process.env.HOME}/.config/env/global.env`;
  if (!fs.existsSync(envPath)) {
    throw new Error(`global.env not found at ${envPath}`);
  }
  const content = fs.readFileSync(envPath, "utf-8");
  const match = content.match(/BRAVE_API_KEY="?([^"\n]+)"?/);
  if (!match) throw new Error("BRAVE_API_KEY not found in global.env");
  return match[1];
}

// ─── Utilities ─────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isDirectory(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return SKIP_DOMAINS.some(
      (d) => hostname === d || hostname.endsWith("." + d)
    );
  } catch {
    return true; // malformed URL, skip
  }
}

function extractHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

// ─── Brave Search ─────────────────────────────────────────────────────────────

interface BraveResult {
  title: string;
  url: string;
  description?: string;
}

async function braveSearch(
  query: string,
  apiKey: string,
  count = 20
): Promise<BraveResult[]> {
  const params = new URLSearchParams({
    q: query,
    count: String(count),
    search_lang: "en",
    country: "US",
  });

  const res = await fetch(`${BRAVE_API}?${params}`, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip",
      "X-Subscription-Token": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Brave Search error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as {
    web?: { results?: BraveResult[] };
  };
  return data?.web?.results ?? [];
}

// ─── Contact extraction ───────────────────────────────────────────────────────

function extractContacts(html: string): { email: string; phone: string } {
  // Emails: mailto: links first, then generic pattern
  const mailtoMatches = [...html.matchAll(/mailto:([^\s"?&>]+)/gi)];
  const emailPatternMatches = [
    ...html.matchAll(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g
    ),
  ];

  let email = "";
  if (mailtoMatches.length > 0) {
    email = mailtoMatches[0][1].toLowerCase().trim();
  } else if (emailPatternMatches.length > 0) {
    // Skip noreply/support/info that are less useful — but keep as fallback
    const filtered = emailPatternMatches
      .map((m) => m[0].toLowerCase())
      .filter((e) => !e.includes("example.com") && !e.includes("sentry.io") && !e.includes("w3.org"));
    if (filtered.length > 0) email = filtered[0];
  }

  // Phones: tel: links first, then generic pattern
  const telMatches = [...html.matchAll(/tel:([\+\d\s\(\)\-\.]{7,20})/gi)];
  const phonePattern = /(?:\+1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g;
  const phoneMatches = [...html.matchAll(phonePattern)];

  let phone = "";
  if (telMatches.length > 0) {
    phone = telMatches[0][1].replace(/[^\d+\-\(\)\s\.]/g, "").trim();
  } else if (phoneMatches.length > 0) {
    phone = phoneMatches[0][0].trim();
  }

  return { email, phone };
}

async function fetchContacts(url: string): Promise<{ email: string; phone: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; LocalBeaconBot/1.0; +https://localbeacon.ai)",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return { email: "", phone: "" };
    const html = await res.text();
    return extractContacts(html);
  } catch {
    return { email: "", phone: "" };
  }
}

// ─── AEO Scan ─────────────────────────────────────────────────────────────────

async function runAEOScan(url: string): Promise<AEOResponse | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    const res = await fetch(AEO_API, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`  ⚠ AEO scan failed for ${url}: ${res.status}`);
      return null;
    }
    return (await res.json()) as AEOResponse;
  } catch (err: unknown) {
    console.error(`  ⚠ AEO scan error for ${url}: ${(err as Error).message}`);
    return null;
  }
}

function getTopFailures(checks: AEOCheck[], count = 3): string[] {
  return checks
    .filter((c) => !c.passed)
    .slice(0, count)
    .map((c) => c.name ?? c.label ?? "Unknown check");
}

// ─── Google Sheets append ─────────────────────────────────────────────────────

function appendToSheet(rows: string[][]): void {
  // Use the low-level Sheets API (spreadsheets values append) for proper multi-row support.
  // The +append helper flattens multi-row JSON into a single row.
  const params = JSON.stringify({
    spreadsheetId: SHEET_ID,
    range: "Prospects",
    valueInputOption: "USER_ENTERED",
  });
  const body = JSON.stringify({ values: rows });

  const result = spawnSync(
    "gws",
    [
      "sheets",
      "spreadsheets",
      "values",
      "append",
      "--params",
      params,
      "--json",
      body,
    ],
    { encoding: "utf-8", timeout: 30000 }
  );

  if (result.error) {
    console.error("\n❌ Failed to write to Google Sheet:", result.error.message);
    return;
  }
  if (result.status !== 0) {
    console.error("\n❌ gws sheets append failed:");
    console.error(result.stderr || result.stdout || "(no output)");
    return;
  }

  console.log(`\n✅ Wrote ${rows.length} rows to Google Sheet`);
  if (result.stdout?.trim()) {
    try {
      const out = JSON.parse(result.stdout.trim());
      if (out.updates) {
        console.log(`   Range: ${out.updates.updatedRange}, Rows: ${out.updates.updatedRows}`);
      }
    } catch {
      console.log(result.stdout.trim());
    }
  }
}

// ─── Name extraction from search results ─────────────────────────────────────

function extractBusinessName(title: string, url: string): string {
  // Strip common suffixes like " - Plumber in City" or " | Homepage"
  let name = title
    .replace(/\s*[-|–—]\s*.+$/, "")
    .replace(/\s*\|.+$/, "")
    .trim();

  if (!name || name.length < 2) {
    // Fall back to hostname without TLD
    name = extractHostname(url)
      .replace(/^www\./, "")
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return name;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error(
      'Usage: npx tsx scripts/prospect.ts "industry" "city" "state"'
    );
    console.error('Example: npx tsx scripts/prospect.ts "plumber" "Burnsville" "MN"');
    process.exit(1);
  }

  const [industry, city, state] = args;
  const query = `${industry} ${city} ${state}`;

  console.log(`\n🔍 LocalBeacon Prospect Scanner`);
  console.log(`   Industry: ${industry}`);
  console.log(`   Location: ${city}, ${state}`);
  console.log(`   Query: "${query}"`);
  console.log("─".repeat(50));

  // Load API key
  let braveApiKey: string;
  try {
    braveApiKey = loadEnv();
    console.log("✓ Loaded BRAVE_API_KEY");
  } catch (err: unknown) {
    console.error("❌", (err as Error).message);
    process.exit(1);
  }

  // Search for businesses
  console.log(`\n📡 Searching Brave for "${query}"...`);
  let searchResults: BraveResult[] = [];
  try {
    searchResults = await braveSearch(query, braveApiKey, 20);
    console.log(`✓ Got ${searchResults.length} search results`);
  } catch (err: unknown) {
    console.error("❌ Brave Search failed:", (err as Error).message);
    process.exit(1);
  }

  // Filter out directories
  const businessResults = searchResults.filter(
    (r) => r.url && !isDirectory(r.url)
  );

  // Deduplicate by hostname
  const seen = new Set<string>();
  const uniqueBusinesses = businessResults.filter((r) => {
    const host = extractHostname(r.url);
    if (seen.has(host)) return false;
    seen.add(host);
    return true;
  });

  console.log(
    `✓ Found ${uniqueBusinesses.length} business sites (after filtering directories)`
  );

  if (uniqueBusinesses.length === 0) {
    console.error("❌ No business sites found. Try different search terms.");
    process.exit(1);
  }

  // Process each business
  const results: BusinessResult[] = [];
  console.log("\n🔬 Scanning businesses...\n");

  for (let i = 0; i < uniqueBusinesses.length; i++) {
    const biz = uniqueBusinesses[i];
    const name = extractBusinessName(biz.title, biz.url);
    console.log(`[${i + 1}/${uniqueBusinesses.length}] ${name}`);
    console.log(`    URL: ${biz.url}`);

    // Fetch contact info
    const { email, phone } = await fetchContacts(biz.url);
    if (email) console.log(`    📧 ${email}`);
    if (phone) console.log(`    📞 ${phone}`);

    // Rate limit: wait between Brave API calls handled here for contact fetch
    // AEO scan
    await sleep(2000); // 2s between scans
    console.log(`    🔍 Running AEO scan...`);
    const aeoResult = await runAEOScan(biz.url);

    let aeoScore: number | null = null;
    let topFailures: string[] = [];

    if (aeoResult) {
      aeoScore = aeoResult.score;
      topFailures = getTopFailures(aeoResult.checks);
      console.log(`    📊 AEO Score: ${aeoScore}`);
      if (topFailures.length > 0) {
        console.log(`    ❌ Top failures: ${topFailures.join(", ")}`);
      }
    } else {
      console.log(`    ⚠ AEO scan unavailable`);
    }

    results.push({
      name,
      url: biz.url,
      industry,
      city,
      state,
      aeoScore,
      topFailures,
      contactEmail: email,
      phone,
    });

    console.log();
  }

  // Sort by AEO score ascending (worst = best prospects first), nulls last
  const sorted = [...results].sort((a, b) => {
    if (a.aeoScore === null && b.aeoScore === null) return 0;
    if (a.aeoScore === null) return 1;
    if (b.aeoScore === null) return -1;
    return a.aeoScore - b.aeoScore;
  });

  // Find competitor (highest score)
  const withScores = sorted.filter((r) => r.aeoScore !== null);
  const competitor =
    withScores.length > 0 ? withScores[withScores.length - 1] : null;

  // Print summary
  console.log("─".repeat(50));
  console.log("\n📋 SUMMARY (sorted by AEO Score, worst first)\n");
  console.log(
    `${"#".padEnd(3)} ${"Business".padEnd(30)} ${"Score".padEnd(8)} ${"Email".padEnd(30)} Top Failures`
  );
  console.log("─".repeat(100));

  sorted.forEach((r, i) => {
    const score = r.aeoScore !== null ? String(r.aeoScore) : "N/A";
    const failures = r.topFailures.slice(0, 2).join(", ") || "—";
    console.log(
      `${String(i + 1).padEnd(3)} ${r.name.substring(0, 29).padEnd(30)} ${score.padEnd(8)} ${(r.contactEmail || "—").substring(0, 29).padEnd(30)} ${failures}`
    );
  });

  if (competitor) {
    console.log(`\n🏆 Top Competitor: ${competitor.name} (Score: ${competitor.aeoScore})`);
    console.log(`   URL: ${competitor.url}`);
  }

  console.log(`\n📊 Stats:`);
  console.log(`   Total businesses found: ${results.length}`);
  console.log(`   Successfully scanned: ${withScores.length}`);
  console.log(
    `   Avg AEO Score: ${
      withScores.length > 0
        ? Math.round(
            withScores.reduce((sum, r) => sum + (r.aeoScore ?? 0), 0) /
              withScores.length
          )
        : "N/A"
    }`
  );

  // Build sheet rows
  // Columns: Business Name, URL, Industry, City, State, AEO Score, Top Failures,
  //          Competitor Name, Competitor URL, Competitor Score,
  //          Contact Email, Phone, Outreach Status, Notes
  const rows: string[][] = sorted.map((r) => [
    r.name,
    r.url,
    industry,
    city,
    state,
    r.aeoScore !== null ? String(r.aeoScore) : "",
    r.topFailures.join("; "),
    competitor?.name ?? "",
    competitor?.url ?? "",
    competitor?.aeoScore !== null ? String(competitor?.aeoScore) : "",
    r.contactEmail,
    r.phone,
    "New", // Outreach Status default
    "", // Notes
  ]);

  // Write to Google Sheet
  console.log("\n📝 Writing to Google Sheet...");
  appendToSheet(rows);

  console.log("\n✅ Done!\n");
}

main().catch((err: unknown) => {
  console.error("Fatal error:", (err as Error).message);
  process.exit(1);
});
