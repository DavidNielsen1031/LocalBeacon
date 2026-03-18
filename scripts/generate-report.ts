#!/usr/bin/env npx tsx
/**
 * LocalBeacon AEO PDF Report Generator
 *
 * Usage:
 *   Single scan:
 *     npx tsx scripts/generate-report.ts "https://example.com" --name "Example Business"
 *
 *   Comparison mode:
 *     npx tsx scripts/generate-report.ts "https://target.com" --name "Target Biz" \
 *       --competitor "https://rival.com" --competitor-name "Rival Biz"
 *
 * Run from: products/localbeacon/app/  (so node_modules are available)
 */

import * as path from 'path'
import * as fs from 'fs'

// Colors
const NAVY = '#1B2A4A'
const GOLD = '#FFD700'
const WHITE = '#FFFFFF'
const LIGHT_GRAY = '#F5F6FA'
const MID_GRAY = '#8896AB'
const DARK_GRAY = '#2D3748'
const GREEN = '#22C55E'
const RED = '#EF4444'
const AMBER = '#F59E0B'

// ---- Types ----
interface CheckResult {
  id: string
  label: string
  description: string
  passed: boolean
  details: string
  fix: string
  weight: number
  errorType?: string
  severity?: string
  category?: string
}

interface ScanResult {
  url: string
  score: number
  passed: number
  failed: number
  total: number
  checks: CheckResult[]
  rulesVersion?: string
  scannedAt?: string
}

// ---- API Call ----
async function scanUrl(url: string): Promise<ScanResult> {
  console.log(`  Scanning ${url}...`)
  const res = await fetch('https://localbeacon.ai/api/ai-readiness', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`)
  }
  return res.json() as Promise<ScanResult>
}

// ---- Helpers ----
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function scoreColor(score: number): string {
  if (score >= 70) return GREEN
  if (score >= 40) return AMBER
  return RED
}

function scoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Needs Work'
  return 'Poor'
}

// ---- PDF Generation ----
async function generatePDF(
  target: ScanResult,
  targetName: string,
  competitor?: ScanResult,
  competitorName?: string
): Promise<string> {
  // Dynamic import — resolve jspdf from app/node_modules (script is in scripts/, app/ is sibling)
  // Support running from: products/localbeacon/app/ (CWD) or products/localbeacon/scripts/
  const cwd = process.cwd()
  const jspdfCandidates = [
    path.resolve(cwd, 'node_modules/jspdf/dist/jspdf.node.js'),            // run from app/
    path.resolve(__dirname, '../app/node_modules/jspdf/dist/jspdf.node.js'), // run from scripts/
    path.resolve(__dirname, '../../localbeacon/app/node_modules/jspdf/dist/jspdf.node.js'),
  ]
  let jsPDF: any
  for (const candidate of jspdfCandidates) {
    if (fs.existsSync(candidate)) {
      const mod = await import(candidate)
      jsPDF = mod.jsPDF
      break
    }
  }
  if (!jsPDF) {
    throw new Error('Could not find jspdf. Run this script from products/localbeacon/app/ directory.')
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageW = 210
  const pageH = 297
  const margin = 16
  const contentW = pageW - margin * 2

  // --- Header ---
  doc.setFillColor(...hexToRgb(NAVY))
  doc.rect(0, 0, pageW, 52, 'F')

  // Gold accent bar
  doc.setFillColor(...hexToRgb(GOLD))
  doc.rect(0, 52, pageW, 3, 'F')

  // Logo emoji + brand name
  doc.setTextColor(...hexToRgb(GOLD))
  doc.setFontSize(26)
  doc.setFont('helvetica', 'bold')
  doc.text('LocalBeacon', margin + 12, 22)

  doc.setTextColor(...hexToRgb(WHITE))
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('AI Readiness Report', margin + 12, 30)

  const scanDate = new Date(target.scannedAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
  doc.setFontSize(9)
  doc.setTextColor(...hexToRgb(MID_GRAY))
  doc.text(`Generated: ${scanDate}`, margin + 12, 45)

  let y = 64

  if (!competitor) {
    // ===== SINGLE SCAN MODE =====
    y = renderSingleScan(doc, target, targetName, y, margin, contentW, pageW, pageH)
  } else {
    // ===== COMPARISON MODE =====
    y = renderComparisonScan(doc, target, targetName, competitor, competitorName!, y, margin, contentW, pageW, pageH)
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    renderFooter(doc, pageW, pageH)
  }

  // Output
  const reportsDir = path.resolve(__dirname, 'reports')
  fs.mkdirSync(reportsDir, { recursive: true })

  const safeName = targetName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const timestamp = new Date().toISOString().slice(0, 10)
  const suffix = competitor ? '-comparison' : '-report'
  const filename = `${safeName}${suffix}-${timestamp}.pdf`
  const outputPath = path.join(reportsDir, filename)

  const pdfBuffer = Buffer.from(doc.output('arraybuffer') as ArrayBuffer)
  fs.writeFileSync(outputPath, pdfBuffer)
  return outputPath
}

function renderFooter(doc: any, pageW: number, pageH: number) {
  doc.setFillColor(...hexToRgb(NAVY))
  doc.rect(0, pageH - 14, pageW, 14, 'F')

  doc.setTextColor(...hexToRgb(GOLD))
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('Improve your AI visibility at localbeacon.ai', pageW / 2, pageH - 8, { align: 'center' })

  doc.setTextColor(...hexToRgb(MID_GRAY))
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text('Report generated by LocalBeacon.ai', pageW / 2, pageH - 4, { align: 'center' })
}

function renderSingleScan(
  doc: any,
  scan: ScanResult,
  name: string,
  startY: number,
  margin: number,
  contentW: number,
  pageW: number,
  pageH: number
): number {
  let y = startY

  // Business info card
  doc.setFillColor(...hexToRgb(LIGHT_GRAY))
  doc.roundedRect(margin, y, contentW, 30, 3, 3, 'F')

  doc.setTextColor(...hexToRgb(NAVY))
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(name, margin + 8, y + 10)

  doc.setTextColor(...hexToRgb(MID_GRAY))
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(scan.url, margin + 8, y + 17)

  doc.setTextColor(...hexToRgb(MID_GRAY))
  doc.setFontSize(8)
  doc.text(`${scan.passed} checks passed · ${scan.failed} checks failed · ${scan.total} total`, margin + 8, y + 24)

  y += 38

  // Score circle area
  const scoreCol = NAVY
  const sc = scoreColor(scan.score)

  // Score block
  doc.setFillColor(...hexToRgb(NAVY))
  doc.roundedRect(margin, y, 80, 55, 4, 4, 'F')

  // Score circle
  doc.setFillColor(...hexToRgb(sc))
  doc.circle(margin + 28, y + 27, 20, 'F')

  doc.setTextColor(...hexToRgb(NAVY))
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  const scoreStr = String(scan.score)
  const scoreX = scan.score >= 100 ? margin + 18 : margin + 21
  doc.text(scoreStr, scoreX, y + 30)

  doc.setTextColor(...hexToRgb(WHITE))
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('out of 100', margin + 16, y + 38)

  doc.setTextColor(...hexToRgb(GOLD))
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(scoreLabel(scan.score), margin + 12, y + 48)

  // Score description
  doc.setTextColor(...hexToRgb(DARK_GRAY))
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const descX = margin + 88
  const descW = contentW - 88

  doc.setTextColor(...hexToRgb(NAVY))
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text('AI Readiness Score', descX, y + 12)

  doc.setTextColor(...hexToRgb(DARK_GRAY))
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')

  const passedPct = Math.round((scan.passed / scan.total) * 100)
  const descText = `This score reflects how well your business is optimized for AI-powered search engines like ChatGPT, Claude, and Perplexity. A score of ${scan.score}/100 means you're passing ${scan.passed} of ${scan.total} checks (${passedPct}%).`
  const lines = doc.splitTextToSize(descText, descW)
  doc.text(lines, descX, y + 20)

  y += 62

  // Section header: Checks
  doc.setFillColor(...hexToRgb(NAVY))
  doc.rect(margin, y, contentW, 9, 'F')
  doc.setTextColor(...hexToRgb(GOLD))
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Detailed Check Results', margin + 4, y + 6)
  y += 14

  // Render checks
  y = renderChecks(doc, scan.checks, y, margin, contentW, pageW, pageH)

  return y
}

function renderChecks(
  doc: any,
  checks: CheckResult[],
  startY: number,
  margin: number,
  contentW: number,
  pageW: number,
  pageH: number
): number {
  let y = startY
  const footerH = 20

  // Sort: failed first, then passed
  const sorted = [...checks].sort((a, b) => {
    if (a.passed === b.passed) return b.weight - a.weight
    return a.passed ? 1 : -1
  })

  for (const check of sorted) {
    // Estimate height needed
    const fixLines = check.passed ? [] : doc.splitTextToSize(check.fix, contentW - 24)
    const detailLines = doc.splitTextToSize(check.details, contentW - 24)
    const estimatedH = 8 + (detailLines.length * 4.5) + (fixLines.length * 4.5) + (fixLines.length > 0 ? 8 : 0) + 6

    if (y + estimatedH > pageH - footerH - margin) {
      doc.addPage()
      y = 20
      // Re-add section header after page break
      doc.setFillColor(...hexToRgb(NAVY))
      doc.rect(margin, y, contentW, 9, 'F')
      doc.setTextColor(...hexToRgb(GOLD))
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('Detailed Check Results (continued)', margin + 4, y + 6)
      y += 14
    }

    const bgColor = check.passed ? '#F0FDF4' : '#FFF5F5'
    const borderColor = check.passed ? GREEN : RED
    const checkH = estimatedH + 4

    doc.setFillColor(...hexToRgb(bgColor))
    doc.roundedRect(margin, y, contentW, checkH, 2, 2, 'F')

    // Status indicator bar
    doc.setFillColor(...hexToRgb(borderColor))
    doc.rect(margin, y, 3, checkH, 'F')

    // Status icon text
    const icon = check.passed ? '✓' : '✗'
    doc.setTextColor(...hexToRgb(borderColor))
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(icon, margin + 7, y + 8)

    // Label
    doc.setTextColor(...hexToRgb(DARK_GRAY))
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(check.label, margin + 16, y + 8)

    // Weight badge
    doc.setFillColor(...hexToRgb(check.passed ? GREEN : RED))
    doc.setTextColor(...hexToRgb(WHITE))
    doc.setFontSize(7)
    doc.text(`w:${check.weight}`, pageW - margin - 14, y + 7)

    let lineY = y + 13

    // Details
    doc.setTextColor(...hexToRgb(MID_GRAY))
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    const dLines = doc.splitTextToSize(check.details, contentW - 24)
    doc.text(dLines, margin + 16, lineY)
    lineY += dLines.length * 4.5

    // Fix recommendation (only for failed)
    if (!check.passed && check.fix) {
      lineY += 3
      doc.setFillColor(...hexToRgb('#FEF3C7'))
      const fixH = fixLines.length * 4.5 + 5
      doc.roundedRect(margin + 16, lineY - 3, contentW - 20, fixH, 1, 1, 'F')

      doc.setTextColor(...hexToRgb('#92400E'))
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'bold')
      doc.text('Fix: ', margin + 18, lineY + 2)

      doc.setFont('helvetica', 'normal')
      const fLines = doc.splitTextToSize(check.fix, contentW - 32)
      doc.text(fLines, margin + 26, lineY + 2)
      lineY += fixH
    }

    y += checkH + 3
  }

  return y
}

function renderComparisonScan(
  doc: any,
  target: ScanResult,
  targetName: string,
  competitor: ScanResult,
  competitorName: string,
  startY: number,
  margin: number,
  contentW: number,
  pageW: number,
  pageH: number
): number {
  let y = startY
  const colW = (contentW - 6) / 2
  const col1X = margin
  const col2X = margin + colW + 6

  // Title
  doc.setTextColor(...hexToRgb(NAVY))
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Competitive Comparison', margin, y + 6)
  y += 12

  // Score cards
  renderScoreCard(doc, target, targetName, col1X, y, colW, true)
  renderScoreCard(doc, competitor, competitorName, col2X, y, colW, false)
  y += 48

  // Winner banner
  const targetWins = target.score > competitor.score
  const tied = target.score === competitor.score
  const bannerColor = tied ? AMBER : (targetWins ? GREEN : RED)
  const bannerText = tied
    ? 'Scores are tied!'
    : targetWins
    ? `${targetName} leads by ${target.score - competitor.score} points`
    : `${competitorName} leads by ${competitor.score - target.score} points — close the gap!`

  doc.setFillColor(...hexToRgb(bannerColor))
  doc.roundedRect(margin, y, contentW, 10, 2, 2, 'F')
  doc.setTextColor(...hexToRgb(WHITE))
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text(bannerText, pageW / 2, y + 6.5, { align: 'center' })
  y += 16

  // Section header
  doc.setFillColor(...hexToRgb(NAVY))
  doc.rect(margin, y, contentW, 9, 'F')
  doc.setTextColor(...hexToRgb(GOLD))
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Check-by-Check Comparison', margin + 4, y + 6)
  y += 14

  // Comparison table
  y = renderComparisonTable(doc, target, targetName, competitor, competitorName, y, margin, contentW, colW, col1X, col2X, pageW, pageH)

  return y
}

function renderScoreCard(
  doc: any,
  scan: ScanResult,
  name: string,
  x: number,
  y: number,
  w: number,
  isTarget: boolean
) {
  const sc = scoreColor(scan.score)

  doc.setFillColor(...hexToRgb(NAVY))
  doc.roundedRect(x, y, w, 44, 3, 3, 'F')

  if (isTarget) {
    // Gold border for target
    doc.setDrawColor(...hexToRgb(GOLD))
    doc.setLineWidth(0.8)
    doc.roundedRect(x, y, w, 44, 3, 3, 'S')
    doc.setLineWidth(0.2)
  }

  // Name
  doc.setTextColor(...hexToRgb(GOLD))
  doc.setFontSize(8.5)
  doc.setFont('helvetica', 'bold')
  const nameLines = doc.splitTextToSize(name, w - 8)
  doc.text(nameLines, x + 4, y + 7)

  // URL
  doc.setTextColor(...hexToRgb(MID_GRAY))
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'normal')
  const urlLines = doc.splitTextToSize(scan.url, w - 8)
  doc.text(urlLines[0], x + 4, y + 13)

  // Score circle
  doc.setFillColor(...hexToRgb(sc))
  doc.circle(x + w / 2, y + 29, 11, 'F')

  doc.setTextColor(...hexToRgb(NAVY))
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  const scoreX = scan.score >= 100 ? x + w / 2 - 7 : x + w / 2 - 5
  doc.text(String(scan.score), scoreX, y + 32)

  doc.setTextColor(...hexToRgb(WHITE))
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text(scoreLabel(scan.score), x + w / 2, y + 41, { align: 'center' })
}

function renderComparisonTable(
  doc: any,
  target: ScanResult,
  targetName: string,
  competitor: ScanResult,
  competitorName: string,
  startY: number,
  margin: number,
  contentW: number,
  colW: number,
  col1X: number,
  col2X: number,
  pageW: number,
  pageH: number
): number {
  let y = startY

  // Column headers
  doc.setFillColor(...hexToRgb(LIGHT_GRAY))
  doc.rect(margin, y, contentW, 8, 'F')

  doc.setTextColor(...hexToRgb(NAVY))
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('Check', margin + 4, y + 5.5)
  doc.text(targetName.substring(0, 20), col1X + colW * 0.45, y + 5.5, { align: 'center' })
  doc.text(competitorName.substring(0, 20), col2X + colW * 0.45, y + 5.5, { align: 'center' })
  y += 11

  // Build a map of competitor checks by id
  const compChecks = new Map(competitor.checks.map(c => [c.id, c]))

  // Sort: show where target is losing first
  const sorted = [...target.checks].sort((a, b) => {
    const ca = compChecks.get(a.id)
    const cb = compChecks.get(b.id)
    // Target loses: target failed, competitor passed → show first
    const aLosing = !a.passed && ca?.passed
    const bLosing = !b.passed && cb?.passed
    if (aLosing && !bLosing) return -1
    if (!aLosing && bLosing) return 1
    // Both failed or both passed → sort by weight
    return b.weight - a.weight
  })

  const footerH = 20
  let alt = false

  for (const check of sorted) {
    const compCheck = compChecks.get(check.id)
    const targetLosing = !check.passed && compCheck?.passed
    const targetWinning = check.passed && !compCheck?.passed

    // Row height
    const rowH = 10

    if (y + rowH > pageH - footerH - margin) {
      doc.addPage()
      y = 20
      // Re-render table header
      doc.setFillColor(...hexToRgb(NAVY))
      doc.rect(margin, y, contentW, 9, 'F')
      doc.setTextColor(...hexToRgb(GOLD))
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('Check-by-Check Comparison (continued)', margin + 4, y + 6)
      y += 14

      doc.setFillColor(...hexToRgb(LIGHT_GRAY))
      doc.rect(margin, y, contentW, 8, 'F')
      doc.setTextColor(...hexToRgb(NAVY))
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text('Check', margin + 4, y + 5.5)
      doc.text(targetName.substring(0, 20), col1X + colW * 0.45, y + 5.5, { align: 'center' })
      doc.text(competitorName.substring(0, 20), col2X + colW * 0.45, y + 5.5, { align: 'center' })
      y += 11
      alt = false
    }

    // Row background
    if (targetLosing) {
      doc.setFillColor(255, 240, 240)
    } else if (targetWinning) {
      doc.setFillColor(240, 253, 244)
    } else {
      doc.setFillColor(alt ? 249 : 255, alt ? 250 : 255, alt ? 251 : 255)
    }
    doc.rect(margin, y, contentW, rowH, 'F')

    // Check label
    doc.setTextColor(...hexToRgb(DARK_GRAY))
    doc.setFontSize(7.5)
    doc.setFont('helvetica', targetLosing ? 'bold' : 'normal')
    const labelLines = doc.splitTextToSize(check.label, colW - 2)
    doc.text(labelLines[0], margin + 4, y + 6.5)

    // Target status
    const tIcon = check.passed ? '✓' : '✗'
    const tColor = check.passed ? GREEN : RED
    doc.setTextColor(...hexToRgb(tColor))
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(tIcon, col1X + colW * 0.45, y + 6.5, { align: 'center' })

    // Competitor status
    if (compCheck) {
      const cIcon = compCheck.passed ? '✓' : '✗'
      const cColor = compCheck.passed ? GREEN : RED
      doc.setTextColor(...hexToRgb(cColor))
      doc.text(cIcon, col2X + colW * 0.45, y + 6.5, { align: 'center' })
    }

    // Losing indicator
    if (targetLosing) {
      doc.setTextColor(...hexToRgb(RED))
      doc.setFontSize(6.5)
      doc.setFont('helvetica', 'bold')
      doc.text('← You lose here', pageW - margin - 28, y + 6.5)
    } else if (targetWinning) {
      doc.setTextColor(...hexToRgb(GREEN))
      doc.setFontSize(6.5)
      doc.setFont('helvetica', 'bold')
      doc.text('← You win here', pageW - margin - 28, y + 6.5)
    }

    y += rowH + 1
    alt = !alt
  }

  y += 8

  // Gap analysis section — show fixes for where target is losing
  const losingChecks = sorted.filter(c => !c.passed && compChecks.get(c.id)?.passed)
  if (losingChecks.length > 0) {
    if (y + 30 > pageH - footerH - margin) {
      doc.addPage()
      y = 20
    }

    doc.setFillColor(...hexToRgb(RED))
    doc.rect(margin, y, contentW, 9, 'F')
    doc.setTextColor(...hexToRgb(WHITE))
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`${losingChecks.length} Areas Where You're Losing to ${competitorName}`, margin + 4, y + 6)
    y += 14

    for (const check of losingChecks) {
      const fixLines = doc.splitTextToSize(check.fix, contentW - 24)
      const cardH = 8 + fixLines.length * 4.5 + 6

      if (y + cardH > pageH - footerH - margin) {
        doc.addPage()
        y = 20
      }

      doc.setFillColor(...hexToRgb('#FFF5F5'))
      doc.roundedRect(margin, y, contentW, cardH, 2, 2, 'F')
      doc.setFillColor(...hexToRgb(RED))
      doc.rect(margin, y, 3, cardH, 'F')

      doc.setTextColor(...hexToRgb(DARK_GRAY))
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text(`✗  ${check.label}`, margin + 7, y + 7)

      if (check.fix) {
        doc.setFillColor(...hexToRgb('#FEF3C7'))
        const fixBoxH = fixLines.length * 4.5 + 5
        doc.roundedRect(margin + 16, y + 10, contentW - 20, fixBoxH, 1, 1, 'F')
        doc.setTextColor(...hexToRgb('#92400E'))
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'bold')
        doc.text('Fix: ', margin + 18, y + 14)
        doc.setFont('helvetica', 'normal')
        doc.text(fixLines, margin + 26, y + 14)
      }

      y += cardH + 3
    }
  }

  return y
}

// ---- CLI Entry Point ----
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args[0] === '--help') {
    console.log(`
LocalBeacon AEO PDF Report Generator

Usage:
  npx tsx scripts/generate-report.ts <url> --name "Business Name"
  npx tsx scripts/generate-report.ts <url> --name "Business" --competitor <url2> --competitor-name "Rival"

Options:
  --name               Business name for the target URL (required)
  --competitor         Competitor URL (enables comparison mode)
  --competitor-name    Competitor business name (required with --competitor)

Examples:
  npx tsx scripts/generate-report.ts "https://example.com" --name "Example Co"
  npx tsx scripts/generate-report.ts "https://mybiz.com" --name "My Biz" \\
    --competitor "https://rival.com" --competitor-name "Rival Co"
`)
    process.exit(0)
  }

  const targetUrl = args[0]
  let targetName = ''
  let competitorUrl = ''
  let competitorName = ''

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--name') targetName = args[++i]
    else if (args[i] === '--competitor') competitorUrl = args[++i]
    else if (args[i] === '--competitor-name') competitorName = args[++i]
  }

  if (!targetName) {
    console.error('Error: --name is required')
    process.exit(1)
  }

  if (competitorUrl && !competitorName) {
    console.error('Error: --competitor-name is required when using --competitor')
    process.exit(1)
  }

  console.log(`\n🔦 LocalBeacon Report Generator`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

  try {
    let targetScan: ScanResult
    let competitorScan: ScanResult | undefined

    if (competitorUrl) {
      console.log(`\nRunning comparison scan...`)
      ;[targetScan, competitorScan] = await Promise.all([
        scanUrl(targetUrl),
        scanUrl(competitorUrl),
      ])
      console.log(`  ${targetName}: ${targetScan.score}/100`)
      console.log(`  ${competitorName}: ${competitorScan.score}/100`)
    } else {
      console.log(`\nRunning scan...`)
      targetScan = await scanUrl(targetUrl)
      console.log(`  Score: ${targetScan.score}/100 (${targetScan.passed}/${targetScan.total} checks passed)`)
    }

    console.log(`\nGenerating PDF...`)
    const outputPath = await generatePDF(targetScan, targetName, competitorScan, competitorName || undefined)

    console.log(`\n✅ Report saved: ${outputPath}`)
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
  } catch (err) {
    console.error(`\n❌ Error: ${err instanceof Error ? err.message : err}`)
    process.exit(1)
  }
}

main()
