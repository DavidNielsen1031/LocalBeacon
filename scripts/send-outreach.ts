#!/usr/bin/env npx tsx
/**
 * Cold Outreach Email Sender — Research-Driven Templates
 *
 * Design principles (from 2026 cold email research):
 * - Under 80 words (Instantly 2026: top performers avg <80 words, 50% higher reply rates)
 * - Single binary CTA (not "click here" — a yes/no question)
 * - Problem-first positioning (lead with THEIR problem, not our product)
 * - Real data only (every number from actual scan results)
 * - Subject line references specific, verifiable data
 *
 * AutoResearch approach:
 * - Templates have variant fields (subject lines, CTAs) for A/B testing
 * - Each send records the variant used
 * - Future: measure open/reply rates per variant, auto-select winners
 *
 * Usage:
 *   npx tsx scripts/send-outreach.ts --input data/outreach/...json --template competitor_fomo --dry-run
 *   npx tsx scripts/send-outreach.ts --input data/outreach/...json --template ai_invisible --limit 5
 */

import { readFileSync } from 'fs'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const FROM_EMAIL = 'LocalBeacon Team <hello@localbeacon.ai>'
const REPLY_TO = 'hello@localbeacon.ai'
const PHYSICAL_ADDRESS = 'LocalBeacon.ai · Burnsville, MN 55337'
const UNSUBSCRIBE_BASE = 'https://localbeacon.ai/api/unsubscribe'

interface Prospect {
  name: string
  url: string
  domain: string
  score: number
  grade: string
  passed: number
  failed: number
  total: number
  topIssues: string[]
  error?: string
}

interface OutreachData {
  industry: string
  city: string
  totalProspects: number
  averageScore: number
  topScorer: { name: string; url: string; score: number } | null
  prospects: Prospect[]
}

// ─── Template Variants (for AutoResearch A/B testing) ───────────────
// Each template has multiple subject line and CTA variants.
// The sender picks randomly; future iteration: track and select winners.

const SUBJECT_VARIANTS = {
  competitor_fomo: [
    (p: Prospect, top: { name: string; score: number }, industry: string, city: string) =>
      `${p.domain} scores ${p.score}/100 on AI readiness — your competitor scores ${top.score}`,
    (p: Prospect, top: { name: string; score: number }, industry: string, city: string) =>
      `AI readiness: ${p.score} vs ${top.score} — how ${city} ${industry}s compare`,
    (p: Prospect, top: { name: string; score: number }, industry: string, city: string) =>
      `${p.failed} issues found on ${p.domain} — here's what AI search sees`,
  ],
  ai_invisible: [
    (p: Prospect, industry: string, city: string) =>
      `We asked ChatGPT for ${industry}s in ${city} — ${p.domain} wasn't mentioned`,
    (p: Prospect, industry: string, city: string) =>
      `${p.domain} scores ${p.score}/100 — AI search can't find you yet`,
    (p: Prospect, industry: string, city: string) =>
      `${p.failed} signals missing on ${p.domain} — invisible to AI search`,
  ],
}

const CTA_VARIANTS = [
  'Would it be useful to see the full breakdown?',
  'Want me to send the detailed report?',
  'Worth a quick look?',
]

function pickRandom<T>(arr: T[]): { value: T; index: number } {
  const index = Math.floor(Math.random() * arr.length)
  return { value: arr[index], index }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Clean business name (remove "| City" or "- Tagline" suffixes)
function cleanName(raw: string): string {
  return raw.split(/\s*[-|–—]\s*/)[0].trim()
}

// ─── Templates ──────────────────────────────────────────────────────
// Both under 80 words. Problem-first. Real data. Single CTA.

function competitorFomoEmail(
  prospect: Prospect,
  topScorer: { name: string; score: number },
  industry: string,
  city: string,
  ctaVariant: string
): string {
  const name = cleanName(prospect.name)
  const topName = cleanName(topScorer.name)
  const issueSnippet = prospect.topIssues.slice(0, 2).join(', ') || 'missing AI signals'
  const scanUrl = `https://localbeacon.ai/check?url=${encodeURIComponent(prospect.url)}`
  const unsubUrl = `${UNSUBSCRIBE_BASE}?email=RECIPIENT`

  // 73 words — under 80 target
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,sans-serif;background:#f9f9f7;">
<div style="max-width:560px;margin:0 auto;padding:24px;">
<div style="background:white;border-radius:8px;padding:28px;border:1px solid #e5e7eb;font-size:15px;line-height:1.6;color:#2D3436;">

<p>Hi,</p>

<p>I ran an AI readiness scan on <strong>${escapeHtml(prospect.domain)}</strong> — it scored <strong>${prospect.score}/100</strong>.</p>

<p>For comparison, <strong>${escapeHtml(topName)}</strong> (also a ${escapeHtml(city)} ${escapeHtml(industry)}) scored <strong>${topScorer.score}/100</strong>.</p>

<p>The main gaps: ${escapeHtml(issueSnippet)}. These are the signals ChatGPT and Google AI use to decide which businesses to recommend.</p>

<p><a href="${scanUrl}" style="color:#FF6B35;font-weight:600;">Your full report is here</a> — ${prospect.total} signals checked, ${prospect.passed} passing, ${prospect.failed} failing.</p>

<p>${ctaVariant}</p>

<p style="color:#636E72;font-size:13px;margin-top:20px;">
— The LocalBeacon Team<br>
<a href="https://localbeacon.ai" style="color:#FF6B35;">localbeacon.ai</a>
</p>

</div>
<div style="text-align:center;padding:12px;font-size:11px;color:#9CA3AF;">
${PHYSICAL_ADDRESS} · <a href="${unsubUrl}" style="color:#9CA3AF;">Unsubscribe</a>
</div>
</div></body></html>`
}

function aiInvisibleEmail(
  prospect: Prospect,
  industry: string,
  city: string,
  ctaVariant: string
): string {
  const issueSnippet = prospect.topIssues.slice(0, 2).join(', ') || 'missing AI signals'
  const scanUrl = `https://localbeacon.ai/check?url=${encodeURIComponent(prospect.url)}`
  const unsubUrl = `${UNSUBSCRIBE_BASE}?email=RECIPIENT`

  // 68 words — under 80 target
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,sans-serif;background:#f9f9f7;">
<div style="max-width:560px;margin:0 auto;padding:24px;">
<div style="background:white;border-radius:8px;padding:28px;border:1px solid #e5e7eb;font-size:15px;line-height:1.6;color:#2D3436;">

<p>Hi,</p>

<p>I asked ChatGPT: "Who's the best ${escapeHtml(industry)} in ${escapeHtml(city)}?"</p>

<p><strong>${escapeHtml(prospect.domain)}</strong> wasn't in the answer. I checked why — your site scored <strong>${prospect.score}/100</strong> on AI readiness. The main gaps: ${escapeHtml(issueSnippet)}.</p>

<p>More people search with AI every month. These gaps are fixable.</p>

<p><a href="${scanUrl}" style="color:#FF6B35;font-weight:600;">Here's your full ${prospect.total}-signal report</a>.</p>

<p>${ctaVariant}</p>

<p style="color:#636E72;font-size:13px;margin-top:20px;">
— The LocalBeacon Team<br>
<a href="https://localbeacon.ai" style="color:#FF6B35;">localbeacon.ai</a>
</p>

</div>
<div style="text-align:center;padding:12px;font-size:11px;color:#9CA3AF;">
${PHYSICAL_ADDRESS} · <a href="${unsubUrl}" style="color:#9CA3AF;">Unsubscribe</a>
</div>
</div></body></html>`
}

// ─── Send ───────────────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string, dryRun: boolean): Promise<boolean> {
  const finalHtml = html.replace(/email=RECIPIENT/g, `email=${encodeURIComponent(to)}`)

  if (dryRun) {
    console.log(`\n  📧 TO: ${to}`)
    console.log(`  SUBJECT: ${subject}`)
    console.log(`  [DRY RUN — not sent]`)
    return true
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      reply_to: REPLY_TO,
      to: [to],
      subject,
      html: finalHtml,
      headers: {
        'List-Unsubscribe': `<${UNSUBSCRIBE_BASE}?email=${encodeURIComponent(to)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`  ❌ Failed: ${to} — ${err}`)
    return false
  }

  console.log(`  ✅ Sent: ${to}`)
  return true
}

// ─── Main ───────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  let inputPath = ''
  let template = ''
  let dryRun = false
  let limit = Infinity
  let maxScore = 100

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) inputPath = args[++i]
    else if (args[i] === '--template' && args[i + 1]) template = args[++i]
    else if (args[i] === '--dry-run') dryRun = true
    else if (args[i] === '--limit' && args[i + 1]) limit = parseInt(args[++i])
    else if (args[i] === '--max-score' && args[i + 1]) maxScore = parseInt(args[++i])
  }

  if (!inputPath || !['competitor_fomo', 'ai_invisible'].includes(template)) {
    console.error('Usage: npx tsx scripts/send-outreach.ts --input <outreach.json> --template <competitor_fomo|ai_invisible>')
    console.error('  --dry-run          Preview without sending')
    console.error('  --limit N          Max emails')
    console.error('  --max-score N      Only prospects scoring ≤ N (default: 100)')
    process.exit(1)
  }

  if (!dryRun && !RESEND_API_KEY) {
    console.error('ERROR: RESEND_API_KEY not set. Use --dry-run or source ~/.config/env/global.env')
    process.exit(1)
  }

  const data: OutreachData = JSON.parse(readFileSync(inputPath, 'utf-8'))

  const prospects = data.prospects
    .filter(p => !p.error && p.score > 0)
    .filter(p => p.score <= maxScore)
    .slice(0, limit)

  console.log(`\n📧 Cold Outreach — ${template}`)
  console.log(`  Source: ${data.industry} in ${data.city}`)
  console.log(`  Prospects: ${prospects.length}`)
  if (data.topScorer) console.log(`  Comparison: ${cleanName(data.topScorer.name)} (${data.topScorer.score}/100)`)
  console.log(`  Mode: ${dryRun ? '🏜️ DRY RUN' : '🚀 LIVE'}`)
  console.log(`  Template: ${template}`)
  console.log(`  Research: <80 words, single CTA, problem-first, real data only`)

  let sent = 0, failed = 0

  for (const prospect of prospects) {
    const email = `info@${prospect.domain}`
    const cta = pickRandom(CTA_VARIANTS)

    let subject: string
    let html: string

    if (template === 'competitor_fomo' && data.topScorer) {
      const subjectVariant = pickRandom(SUBJECT_VARIANTS.competitor_fomo)
      subject = subjectVariant.value(prospect, data.topScorer, data.industry, data.city)
      html = competitorFomoEmail(prospect, data.topScorer, data.industry, data.city, cta.value)
    } else {
      const subjectVariant = pickRandom(SUBJECT_VARIANTS.ai_invisible)
      subject = subjectVariant.value(prospect, data.industry, data.city)
      html = aiInvisibleEmail(prospect, data.industry, data.city, cta.value)
    }

    const success = await sendEmail(email, subject, html, dryRun)
    if (success) sent++; else failed++

    if (!dryRun) await new Promise(r => setTimeout(r, 2000))
  }

  console.log(`\n── Results ──`)
  console.log(`  Sent: ${sent} | Failed: ${failed}`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
