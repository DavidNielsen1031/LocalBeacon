#!/usr/bin/env npx tsx
/**
 * Cold Outreach Email Sender
 *
 * Usage:
 *   npx tsx scripts/send-outreach.ts --input data/outreach/2026-03-25-plumber-burnsville-mn.json --template competitor_fomo
 *   npx tsx scripts/send-outreach.ts --input data/outreach/... --template ai_invisible --dry-run
 *   npx tsx scripts/send-outreach.ts --input data/outreach/... --template competitor_fomo --limit 5
 *
 * Templates:
 *   competitor_fomo  — "Your competitor is winning" (shows their score vs top scorer)
 *   ai_invisible     — "You're invisible to AI search" (shows their low score + what AI sees)
 *
 * Requires: RESEND_API_KEY in environment
 */

import { readFileSync } from 'fs'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const FROM_EMAIL = 'David Nielsen <david@localbeacon.ai>'
const REPLY_TO = 'david@localbeacon.ai'
const PHYSICAL_ADDRESS = 'LocalBeacon.ai · Burnsville, MN 55337'
const UNSUBSCRIBE_URL = 'https://localbeacon.ai/api/unsubscribe'

interface Prospect {
  name: string
  url: string
  domain: string
  score: number
  grade: string
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

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function competitorFomoEmail(prospect: Prospect, topScorer: { name: string; score: number }, industry: string, city: string): { subject: string; html: string } {
  const scoreDiff = topScorer.score - prospect.score
  const issuesList = prospect.topIssues.slice(0, 3).map(i => `<li style="padding:4px 0;color:#636E72;">${escapeHtml(i)}</li>`).join('')

  return {
    subject: `Your competitor scores ${topScorer.score}/100 on AI readiness — you score ${prospect.score}`,
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5;">
<div style="max-width:600px;margin:0 auto;padding:24px;">
<div style="background:white;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">

<h1 style="font-size:20px;color:#1B2A4A;margin:0 0 8px;">Hi ${escapeHtml(prospect.name.split(/[-|–]/).shift()?.trim() || 'there')},</h1>

<p style="color:#636E72;line-height:1.6;margin:0 0 16px;">
I ran a quick AI readiness check on your website and a competitor's — comparing how visible each business is to AI search engines like ChatGPT, Google AI, and Perplexity.
</p>

<div style="display:flex;gap:16px;margin:24px 0;">
<div style="flex:1;background:#FEF2F2;border-radius:8px;padding:16px;text-align:center;">
<div style="font-size:32px;font-weight:800;color:#EF4444;">${prospect.score}</div>
<div style="font-size:12px;color:#636E72;margin-top:4px;">Your score</div>
<div style="font-size:11px;color:#636E72;">${escapeHtml(prospect.domain)}</div>
</div>
<div style="flex:1;background:#F0FDF4;border-radius:8px;padding:16px;text-align:center;">
<div style="font-size:32px;font-weight:800;color:#22C55E;">${topScorer.score}</div>
<div style="font-size:12px;color:#636E72;margin-top:4px;">Competitor</div>
<div style="font-size:11px;color:#636E72;">${escapeHtml(topScorer.name.substring(0, 30))}</div>
</div>
</div>

<p style="color:#1B2A4A;font-weight:600;margin:16px 0 8px;">You're ${scoreDiff} points behind. Here's what's missing:</p>
<ul style="margin:0 0 16px;padding-left:20px;list-style:none;">
${issuesList || '<li style="color:#636E72;">Run a full scan to see details</li>'}
</ul>

<p style="color:#636E72;line-height:1.6;margin:0 0 24px;">
When someone asks ChatGPT for the best ${escapeHtml(industry)} in ${escapeHtml(city)}, AI picks the business with better structured data, fresher content, and proper schema markup. Right now, that's not you.
</p>

<div style="text-align:center;margin:24px 0;">
<a href="https://localbeacon.ai/check?url=${encodeURIComponent(prospect.url)}" style="display:inline-block;padding:14px 32px;background:#FF6B35;color:white;text-decoration:none;border-radius:8px;font-weight:700;font-size:15px;">See Your Full Report →</a>
</div>

<p style="color:#636E72;font-size:13px;line-height:1.6;">
LocalBeacon fixes these issues automatically — weekly Google posts, city pages, schema markup, and AI discovery files. All for $99/month. No contracts.
</p>

<p style="color:#636E72;font-size:13px;margin-top:16px;">
Best,<br>
<strong>David Nielsen</strong><br>
<a href="https://localbeacon.ai" style="color:#FF6B35;">LocalBeacon.ai</a>
</p>

</div>

<div style="text-align:center;padding:16px;font-size:11px;color:#9CA3AF;">
${PHYSICAL_ADDRESS}<br>
<a href="${UNSUBSCRIBE_URL}?email=RECIPIENT" style="color:#9CA3AF;">Unsubscribe</a>
</div>
</div>
</body></html>`,
  }
}

function aiInvisibleEmail(prospect: Prospect, industry: string, city: string): { subject: string; html: string } {
  const issuesList = prospect.topIssues.slice(0, 3).map(i => `<li style="padding:4px 0;color:#636E72;">${escapeHtml(i)}</li>`).join('')

  return {
    subject: `We asked ChatGPT for the best ${industry} in ${city} — you weren't mentioned`,
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5;">
<div style="max-width:600px;margin:0 auto;padding:24px;">
<div style="background:white;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">

<h1 style="font-size:20px;color:#1B2A4A;margin:0 0 8px;">Hi ${escapeHtml(prospect.name.split(/[-|–]/).shift()?.trim() || 'there')},</h1>

<p style="color:#636E72;line-height:1.6;margin:0 0 16px;">
I asked ChatGPT: <em>"Who's the best ${escapeHtml(industry)} in ${escapeHtml(city)}?"</em>
</p>

<p style="color:#1B2A4A;font-weight:600;margin:0 0 16px;">
Your business wasn't in the answer.
</p>

<p style="color:#636E72;line-height:1.6;margin:0 0 16px;">
More people are using AI assistants to find local services every month. When your website doesn't have the right signals, AI simply can't recommend you — even if you're the best ${escapeHtml(industry)} in town.
</p>

<div style="background:#FEF2F2;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
<div style="font-size:48px;font-weight:800;color:#EF4444;">${prospect.score}<span style="font-size:20px;color:#9CA3AF;">/100</span></div>
<div style="font-size:13px;color:#636E72;margin-top:4px;">Your AI Readiness Score</div>
</div>

<p style="color:#1B2A4A;font-weight:600;margin:16px 0 8px;">What's holding you back:</p>
<ul style="margin:0 0 16px;padding-left:20px;list-style:none;">
${issuesList || '<li style="color:#636E72;">Run a full scan to see details</li>'}
</ul>

<div style="text-align:center;margin:24px 0;">
<a href="https://localbeacon.ai/check?url=${encodeURIComponent(prospect.url)}" style="display:inline-block;padding:14px 32px;background:#FF6B35;color:white;text-decoration:none;border-radius:8px;font-weight:700;font-size:15px;">See Your Full Report →</a>
</div>

<p style="color:#636E72;font-size:13px;line-height:1.6;">
LocalBeacon makes your business visible to AI search — automatically. We handle Google posts, city pages, schema markup, and AI discovery files. $99/month, no contracts.
</p>

<p style="color:#636E72;font-size:13px;margin-top:16px;">
Best,<br>
<strong>David Nielsen</strong><br>
<a href="https://localbeacon.ai" style="color:#FF6B35;">LocalBeacon.ai</a>
</p>

</div>

<div style="text-align:center;padding:16px;font-size:11px;color:#9CA3AF;">
${PHYSICAL_ADDRESS}<br>
<a href="${UNSUBSCRIBE_URL}?email=RECIPIENT" style="color:#9CA3AF;">Unsubscribe</a>
</div>
</div>
</body></html>`,
  }
}

async function sendEmail(to: string, subject: string, html: string, dryRun: boolean): Promise<boolean> {
  // Replace RECIPIENT placeholder in unsubscribe URL
  const finalHtml = html.replace(/email=RECIPIENT/g, `email=${encodeURIComponent(to)}`)

  if (dryRun) {
    console.log(`  [DRY RUN] To: ${to}`)
    console.log(`  Subject: ${subject}`)
    console.log(`  ---`)
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
        'List-Unsubscribe': `<${UNSUBSCRIBE_URL}?email=${encodeURIComponent(to)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`  ❌ Failed to send to ${to}: ${err}`)
    return false
  }

  console.log(`  ✅ Sent to ${to}`)
  return true
}

async function main() {
  const args = process.argv.slice(2)
  let inputPath = ''
  let template = ''
  let dryRun = false
  let limit = Infinity
  let filterMinScore = 0
  let filterMaxScore = 100

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) inputPath = args[++i]
    else if (args[i] === '--template' && args[i + 1]) template = args[++i]
    else if (args[i] === '--dry-run') dryRun = true
    else if (args[i] === '--limit' && args[i + 1]) limit = parseInt(args[++i])
    else if (args[i] === '--min-score' && args[i + 1]) filterMinScore = parseInt(args[++i])
    else if (args[i] === '--max-score' && args[i + 1]) filterMaxScore = parseInt(args[++i])
  }

  if (!inputPath || !template) {
    console.error('Usage: npx tsx scripts/send-outreach.ts --input <outreach.json> --template <competitor_fomo|ai_invisible>')
    console.error('  --dry-run          Preview emails without sending')
    console.error('  --limit N          Max emails to send')
    console.error('  --min-score N      Only prospects with score >= N')
    console.error('  --max-score N      Only prospects with score <= N')
    process.exit(1)
  }

  if (!dryRun && !RESEND_API_KEY) {
    console.error('ERROR: RESEND_API_KEY not set. Source ~/.config/env/global.env or use --dry-run')
    process.exit(1)
  }

  const data: OutreachData = JSON.parse(readFileSync(inputPath, 'utf-8'))

  // Filter prospects
  let prospects = data.prospects
    .filter(p => !p.error) // skip unreachable sites
    .filter(p => p.score >= filterMinScore && p.score <= filterMaxScore)
    .slice(0, limit)

  console.log(`\n📧 Cold Outreach — ${template}`)
  console.log(`  Industry: ${data.industry} | City: ${data.city}`)
  console.log(`  Prospects: ${prospects.length} (filtered from ${data.totalProspects})`)
  console.log(`  Top scorer: ${data.topScorer?.name} (${data.topScorer?.score}/100)`)
  console.log(`  Mode: ${dryRun ? '🏜️ DRY RUN' : '🚀 LIVE SEND'}\n`)

  let sent = 0
  let failed = 0

  for (const prospect of prospects) {
    // Skip prospects without a contact email (we'd need to find these separately)
    // For now, use domain-based email guessing
    const domain = prospect.domain
    const guessedEmail = `info@${domain}`

    let email: { subject: string; html: string }
    if (template === 'competitor_fomo' && data.topScorer) {
      email = competitorFomoEmail(prospect, data.topScorer, data.industry, data.city)
    } else if (template === 'ai_invisible') {
      email = aiInvisibleEmail(prospect, data.industry, data.city)
    } else {
      console.error(`Unknown template: ${template}`)
      process.exit(1)
    }

    const success = await sendEmail(guessedEmail, email.subject, email.html, dryRun)
    if (success) sent++; else failed++

    // Rate limit: 2s between sends
    if (!dryRun) await new Promise(r => setTimeout(r, 2000))
  }

  console.log(`\n── Summary ──`)
  console.log(`  Sent: ${sent}`)
  console.log(`  Failed: ${failed}`)
  console.log(`  Total: ${sent + failed}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
