#!/usr/bin/env npx tsx
/**
 * LocalBeacon Cold Email Outreach Pipeline
 *
 * Reads prospects from Google Sheet, generates personalized emails,
 * attaches AEO PDF reports, sends via Resend, and logs everything back.
 *
 * Usage (run from products/localbeacon/app/):
 *   npx tsx scripts/send-outreach.ts              # Send to all "Not Contacted"
 *   npx tsx scripts/send-outreach.ts --dry-run    # Preview without sending
 *   npx tsx scripts/send-outreach.ts --limit 5    # Send to first N prospects
 */

import * as path from 'path'
import * as fs from 'fs'
import { execSync, execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SPREADSHEET_ID = '1dCiKBE5zUUn1vYFq3kzZtdg-F3E3uXfE4npUdaCCQ70'
const GWS_ACCOUNT = 'davidnielsen1031@gmail.com'
const FROM_EMAIL = 'LocalBeacon <hello@localbeacon.ai>'
const RATE_LIMIT_MS = 5000 // 5 seconds between sends
const TEMPLATE_PATH = path.resolve(__dirname, 'templates/outreach-email.html')

// Reports live in products/localbeacon/scripts/reports/
// When running from app/, that's ../scripts/reports/ relative to app/
const REPORTS_DIR = path.resolve(__dirname, '../../scripts/reports')

// Column indices (0-based) — Prospects!A:N
const enum Col {
  BusinessName = 0,
  URL = 1,
  Industry = 2,
  City = 3,
  State = 4,
  AEOScore = 5,
  TopFailures = 6,
  CompetitorName = 7,
  CompetitorURL = 8,
  CompetitorScore = 9,
  ContactEmail = 10,
  Phone = 11,
  OutreachStatus = 12,
  Notes = 13,
}

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const limitIdx = args.findIndex(a => a === '--limit')
const LIMIT = limitIdx !== -1 ? parseInt(args[limitIdx + 1] ?? '999', 10) : 999

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Prospect {
  row: number // 1-based sheet row (header = 1, first data = 2)
  businessName: string
  url: string
  industry: string
  city: string
  state: string
  aeoScore: string
  topFailures: string
  competitorName: string
  competitorURL: string
  competitorScore: string
  contactEmail: string
  phone: string
  outreachStatus: string
  notes: string
}

// ---------------------------------------------------------------------------
// Load env + ensure PATH includes common brew locations
// ---------------------------------------------------------------------------
function loadEnv(): string {
  // Ensure brew-installed tools (gws, etc.) are on PATH
  const brewPaths = ['/opt/homebrew/bin', '/usr/local/bin', '/usr/bin', '/bin']
  const currentPath = process.env.PATH || ''
  const missingPaths = brewPaths.filter(p => !currentPath.includes(p))
  if (missingPaths.length) {
    process.env.PATH = [...missingPaths, currentPath].join(':')
  }

  // Skip vars that would override gws OAuth credentials
  const SKIP_VARS = new Set(['GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE', 'GOOGLE_WORKSPACE_CLI_USER_EMAIL'])

  const envFile = path.join(process.env.HOME || '/root', '.config/env/global.env')
  if (fs.existsSync(envFile)) {
    const lines = fs.readFileSync(envFile, 'utf8').split('\n')
    for (const line of lines) {
      const match = line.match(/^(?:export\s+)?([A-Z_][A-Z0-9_]*)=(.+)$/)
      if (match && !SKIP_VARS.has(match[1])) {
        process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '')
      }
    }
  }
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not found in ~/.config/env/global.env')
  return key
}

// ---------------------------------------------------------------------------
// Read prospects from Google Sheet
// ---------------------------------------------------------------------------
function readProspects(): Prospect[] {
  console.log('📋 Reading prospects from Google Sheet...')
  const result = execSync(
    `gws sheets +read --account ${GWS_ACCOUNT} --spreadsheet "${SPREADSHEET_ID}" --range "Prospects!A1:N1000" --format json`,
    { encoding: 'utf8' }
  )

  let parsed: { values?: string[][] }
  try {
    parsed = JSON.parse(result)
  } catch {
    throw new Error(`Failed to parse gws output: ${result.slice(0, 200)}`)
  }

  const rows = parsed.values || []
  if (rows.length < 2) {
    console.log('⚠️  No data rows found in Prospects tab.')
    return []
  }

  // Skip header row (row[0]), data starts at row[1] → sheet row 2
  const prospects: Prospect[] = []
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const get = (col: Col) => (row[col] ?? '').trim()

    prospects.push({
      row: i + 1, // 1-based: header=1, first data=2
      businessName: get(Col.BusinessName),
      url: get(Col.URL),
      industry: get(Col.Industry),
      city: get(Col.City),
      state: get(Col.State),
      aeoScore: get(Col.AEOScore),
      topFailures: get(Col.TopFailures),
      competitorName: get(Col.CompetitorName),
      competitorURL: get(Col.CompetitorURL),
      competitorScore: get(Col.CompetitorScore),
      contactEmail: get(Col.ContactEmail),
      phone: get(Col.Phone),
      outreachStatus: get(Col.OutreachStatus),
      notes: get(Col.Notes),
    })
  }

  return prospects
}

// ---------------------------------------------------------------------------
// Find or generate PDF report
// ---------------------------------------------------------------------------
function findReport(prospect: Prospect): string | null {
  const slug = prospect.businessName.replace(/[^a-z0-9]/gi, '-').toLowerCase()

  if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true })

  const files = fs.readdirSync(REPORTS_DIR)

  // Prefer comparison report, fall back to single report
  const comparison = files.find(f => f.startsWith(`${slug}-comparison-`) && f.endsWith('.pdf'))
  if (comparison) return path.join(REPORTS_DIR, comparison)

  const single = files.find(f => f.startsWith(`${slug}-report-`) && f.endsWith('.pdf'))
  if (single) return path.join(REPORTS_DIR, single)

  return null
}

function generateReport(prospect: Prospect): string {
  console.log(`  📄 Generating PDF report for ${prospect.businessName}...`)

  const genArgs: string[] = [
    'tsx',
    '../scripts/generate-report.ts',
    prospect.url,
    '--name', prospect.businessName,
  ]
  if (prospect.competitorURL && prospect.competitorName) {
    genArgs.push('--competitor', prospect.competitorURL, '--competitor-name', prospect.competitorName)
  }

  execFileSync('npx', genArgs, { encoding: 'utf8', stdio: 'inherit', cwd: process.cwd() })

  const report = findReport(prospect)
  if (!report) throw new Error(`Report generation completed but file not found for ${prospect.businessName}`)
  return report
}

function ensureReport(prospect: Prospect, dryRun: boolean): string | null {
  const existing = findReport(prospect)
  if (existing) {
    console.log(`  📄 Found existing PDF: ${path.basename(existing)}`)
    return existing
  }

  if (dryRun) {
    console.log(`  ⚠️  [DRY RUN] No PDF found — would generate report for ${prospect.businessName}`)
    return null
  }

  return generateReport(prospect)
}

// ---------------------------------------------------------------------------
// Build email HTML
// ---------------------------------------------------------------------------
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmail(prospect: Prospect): { html: string; subject: string } {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8')

  // Build top failures list items
  const failureLines = prospect.topFailures
    ? prospect.topFailures
        .split(/[;\n|]+/)
        .map(f => f.trim())
        .filter(Boolean)
        .slice(0, 3)
        .map(f => `<div class="failure-item"><div class="failure-dot"></div><span>${escapeHtml(f)}</span></div>`)
        .join('\n')
    : '<div class="failure-item"><div class="failure-dot"></div><span>AEO visibility issues detected — see attached report</span></div>'

  const html = template
    .replace(/\{\{BUSINESS_NAME\}\}/g, escapeHtml(prospect.businessName))
    .replace(/\{\{AEO_SCORE\}\}/g, escapeHtml(prospect.aeoScore))
    .replace(/\{\{TOP_FAILURES\}\}/g, failureLines)
    .replace(/\{\{COMPETITOR_NAME\}\}/g, escapeHtml(prospect.competitorName || 'a local competitor'))
    .replace(/\{\{COMPETITOR_SCORE\}\}/g, escapeHtml(prospect.competitorScore || 'N/A'))
    .replace(/\{\{CITY\}\}/g, escapeHtml(prospect.city))

  const subject = `Your business scored ${prospect.aeoScore}/100 on AI visibility — here's why`

  return { html, subject }
}

// ---------------------------------------------------------------------------
// Send email via Resend HTTP API
// ---------------------------------------------------------------------------
async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
  pdfPath: string | null
): Promise<void> {
  interface ResendPayload {
    from: string
    to: string[]
    subject: string
    html: string
    attachments?: { filename: string; content: string; content_type: string }[]
  }

  const payload: ResendPayload = {
    from: FROM_EMAIL,
    to: [to],
    subject,
    html,
  }

  if (pdfPath && fs.existsSync(pdfPath)) {
    payload.attachments = [
      {
        filename: path.basename(pdfPath),
        content: fs.readFileSync(pdfPath).toString('base64'),
        content_type: 'application/pdf',
      },
    ]
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Resend API error ${res.status}: ${errText}`)
  }
}

// ---------------------------------------------------------------------------
// Log to Outreach Log tab
// ---------------------------------------------------------------------------
function logToSheet(prospect: Prospect, subject: string, pdfAttached: boolean): void {
  const date = new Date().toISOString().slice(0, 10)
  const row = [
    date,
    prospect.businessName,
    prospect.contactEmail,
    subject,
    'outreach-email.html',
    pdfAttached ? 'Yes' : 'No',
    '', // Reply Received
    'Sent',
  ]

  const jsonValues = JSON.stringify([row])
  execSync(
    `gws sheets +append --account ${GWS_ACCOUNT} --spreadsheet "${SPREADSHEET_ID}" --json-values '${jsonValues}'`,
    { encoding: 'utf8' }
  )
}

// ---------------------------------------------------------------------------
// Update Prospects tab Outreach Status to "Emailed"
// ---------------------------------------------------------------------------
function markEmailed(prospect: Prospect): void {
  const range = `Prospects!M${prospect.row}`
  const params = JSON.stringify({ spreadsheetId: SPREADSHEET_ID, range, valueInputOption: 'RAW' })
  const body = JSON.stringify({ values: [['Emailed']] })

  execSync(
    `gws sheets spreadsheets values update --account ${GWS_ACCOUNT} --params '${params}' --json '${body}'`,
    { encoding: 'utf8' }
  )
}

// ---------------------------------------------------------------------------
// Sleep helper
// ---------------------------------------------------------------------------
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\n🚀 LocalBeacon Cold Email Outreach Pipeline`)
  console.log(`   Mode: ${DRY_RUN ? '🔍 DRY RUN (no emails sent)' : '📧 LIVE'}`)
  if (LIMIT < 999) console.log(`   Limit: ${LIMIT} prospects`)
  console.log('')

  // Load Resend API key
  const apiKey = loadEnv()
  console.log('✅ Resend API key loaded')

  // Read prospects
  const allProspects = readProspects()
  console.log(`   Found ${allProspects.length} total rows`)

  // Filter: "Not Contacted" + valid email
  const eligible = allProspects.filter(p => p.outreachStatus === 'Not Contacted' && p.contactEmail.includes('@'))
  const prospects = eligible.slice(0, LIMIT)

  console.log(`   ${eligible.length} eligible (Not Contacted + has email)`)
  if (LIMIT < 999) console.log(`   Applying limit: ${LIMIT}`)
  console.log('')

  if (prospects.length === 0) {
    console.log('✅ Nothing to send. All done.')
    return
  }

  let sent = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < prospects.length; i++) {
    const p = prospects[i]
    const idx = `[${i + 1}/${prospects.length}]`
    console.log(`${idx} ${p.businessName} <${p.contactEmail}> (row ${p.row})`)

    try {
      // 1. Get or generate PDF
      const pdfPath = ensureReport(p, DRY_RUN)
      const pdfAttached = !!pdfPath && fs.existsSync(pdfPath)

      // 2. Build email
      const { html, subject } = buildEmail(p)

      if (DRY_RUN) {
        console.log(`  📝 Subject:  ${subject}`)
        console.log(`  📎 PDF:      ${pdfPath ? path.basename(pdfPath) : '(none — would generate)'}`)
        console.log(`  📊 Score:    ${p.aeoScore}/100  |  ${p.competitorName || 'Competitor'}: ${p.competitorScore}/100`)
        console.log(`  ✅ [DRY RUN] Skipped`)
        skipped++
        continue
      }

      // 3. Send email
      await sendEmail(apiKey, p.contactEmail, subject, html, pdfPath)
      console.log(`  ✅ Email sent`)

      // 4. Log to Outreach Log
      logToSheet(p, subject, pdfAttached)
      console.log(`  📝 Logged to Outreach Log`)

      // 5. Update status
      markEmailed(p)
      console.log(`  🔄 Status → "Emailed" (row ${p.row})`)

      sent++

      // 6. Rate limit
      if (i < prospects.length - 1) {
        console.log(`  ⏳ Waiting ${RATE_LIMIT_MS / 1000}s...`)
        await sleep(RATE_LIMIT_MS)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ❌ Error: ${msg}`)
      errors++
    }

    console.log('')
  }

  // Summary
  console.log('─────────────────────────────────────────')
  if (DRY_RUN) {
    console.log(`📊 DRY RUN SUMMARY`)
    console.log(`   Would process: ${prospects.length} prospects`)
    console.log(`   Errors:        ${errors}`)
  } else {
    console.log(`📊 SUMMARY`)
    console.log(`   Sent:    ${sent}`)
    console.log(`   Skipped: ${skipped}`)
    console.log(`   Errors:  ${errors}`)
  }
  console.log('─────────────────────────────────────────\n')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
