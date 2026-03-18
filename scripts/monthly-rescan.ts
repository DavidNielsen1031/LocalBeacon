#!/usr/bin/env npx tsx
/**
 * LocalBeacon Monthly Re-Scan + Progress Report
 *
 * Re-scans all active customers, stores score history,
 * sends progress emails showing score improvement.
 *
 * Usage:
 *   npx tsx scripts/monthly-rescan.ts                    # Scan all customers
 *   npx tsx scripts/monthly-rescan.ts --dry-run          # Preview without sending
 *   npx tsx scripts/monthly-rescan.ts --url "https://..." --email "x@y.com" --name "Biz"  # Single business
 */

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SPREADSHEET_ID = '1dCiKBE5zUUn1vYFq3kzZtdg-F3E3uXfE4npUdaCCQ70'
const GWS_ACCOUNT = 'davidnielsen1031@gmail.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const FROM_EMAIL = 'LocalBeacon <hello@perpetualagility.com>'
const SCORE_HISTORY_DIR = path.resolve(__dirname, 'score-history')
const SCAN_API = 'https://localbeacon.ai/api/ai-readiness'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ScanResult {
  url: string
  score: number | null
  checks: Array<{
    name: string
    passed: boolean
    weight: number
    details?: string
  }>
}

interface ScoreEntry {
  date: string
  score: number
  checksPassedCount: number
  checksTotalCount: number
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function scanUrl(url: string): Promise<ScanResult> {
  const res = await fetch(SCAN_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  if (!res.ok) {
    throw new Error(`Scan failed for ${url}: ${res.status}`)
  }
  return await res.json() as ScanResult
}

function loadScoreHistory(slug: string): ScoreEntry[] {
  const filePath = path.join(SCORE_HISTORY_DIR, `${slug}.json`)
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }
  return []
}

function saveScoreHistory(slug: string, history: ScoreEntry[]) {
  if (!fs.existsSync(SCORE_HISTORY_DIR)) {
    fs.mkdirSync(SCORE_HISTORY_DIR, { recursive: true })
  }
  const filePath = path.join(SCORE_HISTORY_DIR, `${slug}.json`)
  fs.writeFileSync(filePath, JSON.stringify(history, null, 2))
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#22C55E' // green
  if (score >= 60) return '#F59E0B' // amber
  if (score >= 40) return '#F97316' // orange
  return '#EF4444' // red
}

function getScoreGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function getDeltaEmoji(delta: number): string {
  if (delta > 0) return '📈'
  if (delta < 0) return '📉'
  return '➡️'
}

// ---------------------------------------------------------------------------
// Email Template
// ---------------------------------------------------------------------------
function buildProgressEmail(params: {
  businessName: string
  currentScore: number
  previousScore: number | null
  delta: number
  history: ScoreEntry[]
  failingChecks: Array<{ name: string; weight: number; details?: string }>
  passingChecks: Array<{ name: string; weight: number }>
  url: string
}): string {
  const { businessName, currentScore, previousScore, delta, failingChecks, passingChecks, url } = params
  const color = getScoreColor(currentScore)
  const grade = getScoreGrade(currentScore)
  const deltaEmoji = getDeltaEmoji(delta)
  const deltaText = previousScore !== null
    ? `${deltaEmoji} ${delta > 0 ? '+' : ''}${delta} points from last month (was ${previousScore})`
    : '📊 First scan — this is your baseline'

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; color: #2D3436; background: #f8f9fa;">
  <div style="background: #1B2A4A; padding: 32px 24px; text-align: center;">
    <h1 style="color: #FFD700; margin: 0; font-size: 20px;">🔦 LocalBeacon</h1>
    <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Monthly AI Readiness Report</p>
  </div>

  <div style="background: white; padding: 32px 24px;">
    <h2 style="color: #1B2A4A; margin: 0 0 4px; font-size: 18px;">${businessName}</h2>
    <p style="color: #636E72; margin: 0 0 24px; font-size: 13px;">${url}</p>

    <!-- Score -->
    <div style="text-align: center; padding: 24px; background: #f8f9fa; border-radius: 12px; margin-bottom: 24px;">
      <div style="font-size: 64px; font-weight: 800; color: ${color}; line-height: 1;">${currentScore}</div>
      <div style="font-size: 14px; color: #636E72; margin-top: 4px;">out of 100 — Grade: <strong>${grade}</strong></div>
      <div style="font-size: 13px; color: #636E72; margin-top: 8px;">${deltaText}</div>
    </div>

    ${failingChecks.length > 0 ? `
    <!-- Failing -->
    <h3 style="color: #EF4444; font-size: 14px; margin: 24px 0 12px;">❌ What's Still Failing (${failingChecks.length})</h3>
    ${failingChecks.map(c => `
    <div style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
      <div style="font-weight: 600; font-size: 14px; color: #2D3436;">${c.name}</div>
      ${c.details ? `<div style="font-size: 12px; color: #636E72; margin-top: 2px;">${c.details}</div>` : ''}
    </div>`).join('')}
    ` : ''}

    ${passingChecks.length > 0 ? `
    <!-- Passing -->
    <h3 style="color: #22C55E; font-size: 14px; margin: 24px 0 12px;">✅ What's Working (${passingChecks.length})</h3>
    <p style="font-size: 13px; color: #636E72; margin: 0;">${passingChecks.map(c => c.name).join(' · ')}</p>
    ` : ''}

    <!-- CTA -->
    <div style="text-align: center; padding: 32px 0 16px;">
      <a href="https://localbeacon.ai/dashboard" style="display: inline-block; background: #FF6B35; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">View Your Dashboard →</a>
    </div>

    <p style="font-size: 12px; color: #B2BEC3; text-align: center; margin: 16px 0 0;">
      Want us to fix everything for you? <a href="https://localbeacon.ai/pricing" style="color: #FF6B35;">Upgrade to Done-For-You →</a>
    </p>
  </div>

  <div style="padding: 20px 24px; text-align: center;">
    <p style="font-size: 11px; color: #B2BEC3; margin: 0;">
      Perpetual Agility LLC · Burnsville, MN 55337<br>
      <a href="https://localbeacon.ai" style="color: #B2BEC3;">localbeacon.ai</a> · 
      You're receiving this because your site is monitored by LocalBeacon.
    </p>
  </div>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Send Email
// ---------------------------------------------------------------------------
async function sendProgressEmail(to: string, businessName: string, html: string, score: number, delta: number) {
  const deltaText = delta > 0 ? `↑${delta}` : delta < 0 ? `↓${Math.abs(delta)}` : '→'
  const subject = `${businessName}: AI Readiness ${score}/100 (${deltaText}) — Monthly Report`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error: ${res.status} ${err}`)
  }

  return await res.json()
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const urlIdx = args.indexOf('--url')
  const emailIdx = args.indexOf('--email')
  const nameIdx = args.indexOf('--name')

  console.log(`\n🔦 LocalBeacon Monthly Re-Scan`)
  console.log(`   Mode: ${dryRun ? '🔍 DRY RUN' : '📧 LIVE'}`)
  console.log(`${'─'.repeat(50)}`)

  // Single business mode
  if (urlIdx >= 0 && emailIdx >= 0 && nameIdx >= 0) {
    const url = args[urlIdx + 1]
    const email = args[emailIdx + 1]
    const name = args[nameIdx + 1]

    console.log(`\n📡 Scanning ${name} (${url})...`)
    const result = await scanUrl(url)

    if (result.score === null) {
      console.log(`   ❌ Scan failed`)
      return
    }

    const slug = slugify(name)
    const history = loadScoreHistory(slug)
    const previousScore = history.length > 0 ? history[history.length - 1].score : null
    const delta = previousScore !== null ? result.score - previousScore : 0

    // Save new entry
    history.push({
      date: new Date().toISOString().split('T')[0],
      score: result.score,
      checksPassedCount: result.checks.filter(c => c.passed).length,
      checksTotalCount: result.checks.length,
    })
    saveScoreHistory(slug, history)

    const failingChecks = result.checks.filter(c => !c.passed)
    const passingChecks = result.checks.filter(c => c.passed)

    console.log(`   📊 Score: ${result.score}/100 (${previousScore !== null ? `was ${previousScore}, ${delta > 0 ? '+' : ''}${delta}` : 'first scan'})`)
    console.log(`   ✅ Passing: ${passingChecks.length} | ❌ Failing: ${failingChecks.length}`)

    const html = buildProgressEmail({
      businessName: name,
      currentScore: result.score,
      previousScore,
      delta,
      history,
      failingChecks,
      passingChecks,
      url,
    })

    if (dryRun) {
      console.log(`   📧 [DRY RUN] Would send to ${email}`)
      // Save preview
      const previewPath = path.join(SCORE_HISTORY_DIR, `${slug}-preview.html`)
      fs.writeFileSync(previewPath, html)
      console.log(`   💾 Preview saved: ${previewPath}`)
    } else {
      if (!RESEND_API_KEY) {
        console.log(`   ⚠️ RESEND_API_KEY not set — skipping email`)
      } else {
        await sendProgressEmail(email, name, html, result.score, delta)
        console.log(`   ✅ Email sent to ${email}`)
      }
    }

    console.log(`\n${'─'.repeat(50)}`)
    console.log(`✅ Done!`)
    return
  }

  // Batch mode — read from Google Sheet Customers tab
  console.log(`\n📋 Reading customers from Google Sheet...`)
  let customersRaw: string
  try {
    customersRaw = execSync(
      `gws sheets +read --account ${GWS_ACCOUNT} --spreadsheet "${SPREADSHEET_ID}" --range "Customers!A1:K100" --format json`,
      { encoding: 'utf-8', timeout: 15000 }
    ).trim()
  } catch (e) {
    console.log(`   ⚠️ Could not read Customers tab — run in single mode with --url --email --name`)
    return
  }

  let rows: string[][]
  try {
    const parsed = JSON.parse(customersRaw)
    rows = parsed.values || []
  } catch {
    console.log(`   ⚠️ Could not parse sheet data`)
    return
  }

  if (rows.length < 2) {
    console.log(`   📭 No customers found`)
    return
  }

  const headers = rows[0]
  const nameCol = headers.indexOf('Business Name')
  const urlCol = headers.indexOf('URL') >= 0 ? headers.indexOf('URL') : headers.indexOf('Website')
  const emailCol = headers.indexOf('Email') >= 0 ? headers.indexOf('Email') : headers.indexOf('Contact Email')

  if (nameCol < 0 || urlCol < 0) {
    console.log(`   ⚠️ Could not find Business Name or URL columns in Customers tab`)
    return
  }

  const customers = rows.slice(1).filter(row => row[urlCol] && row[nameCol])
  console.log(`   Found ${customers.length} customers`)

  let sent = 0
  let errors = 0

  for (const row of customers) {
    const name = row[nameCol]
    const url = row[urlCol]
    const email = emailCol >= 0 ? row[emailCol] : null

    console.log(`\n[${sent + errors + 1}/${customers.length}] ${name}`)
    console.log(`   URL: ${url}`)

    try {
      const result = await scanUrl(url)
      if (result.score === null) {
        console.log(`   ❌ Scan failed`)
        errors++
        continue
      }

      const slug = slugify(name)
      const history = loadScoreHistory(slug)
      const previousScore = history.length > 0 ? history[history.length - 1].score : null
      const delta = previousScore !== null ? result.score - previousScore : 0

      history.push({
        date: new Date().toISOString().split('T')[0],
        score: result.score,
        checksPassedCount: result.checks.filter(c => c.passed).length,
        checksTotalCount: result.checks.length,
      })
      saveScoreHistory(slug, history)

      const failingChecks = result.checks.filter(c => !c.passed)
      const passingChecks = result.checks.filter(c => c.passed)

      console.log(`   📊 Score: ${result.score}/100 (${previousScore !== null ? `was ${previousScore}, ${delta > 0 ? '+' : ''}${delta}` : 'first scan'})`)

      if (email) {
        const html = buildProgressEmail({
          businessName: name,
          currentScore: result.score,
          previousScore,
          delta,
          history,
          failingChecks,
          passingChecks,
          url,
        })

        if (dryRun) {
          console.log(`   📧 [DRY RUN] Would send to ${email}`)
        } else if (RESEND_API_KEY) {
          await sendProgressEmail(email, name, html, result.score, delta)
          console.log(`   ✅ Email sent to ${email}`)
        }
      } else {
        console.log(`   ⚠️ No email address — skipping email`)
      }

      sent++
      // Rate limit
      await new Promise(r => setTimeout(r, 2000))
    } catch (err) {
      console.log(`   ❌ Error: ${err instanceof Error ? err.message : err}`)
      errors++
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`📊 SUMMARY`)
  console.log(`   Scanned: ${sent + errors}`)
  console.log(`   Emails sent: ${sent}`)
  console.log(`   Errors: ${errors}`)
  console.log(`${'─'.repeat(50)}`)
}

main().catch(console.error)
