export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendAeoReportEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  // Rate limiting: 5 requests per minute per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const { email, url_scanned, score, checks } = await req.json()

  if (!email || !url_scanned) {
    return NextResponse.json({ error: 'Email and URL are required' }, { status: 400 })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    // If no DB, just acknowledge — don't block the user
    console.log(JSON.stringify({
      event: 'lead_captured_no_db',
      email,
      url_scanned,
      score,
      timestamp: new Date().toISOString(),
    }))
  } else {
    const { error } = await supabase.from('leads').insert({
      email,
      url_scanned,
      score: score ?? null,
    })

    if (error) {
      console.error(JSON.stringify({
        event: 'lead_save_failed',
        email,
        url_scanned,
        error: error.message,
        timestamp: new Date().toISOString(),
      }))
    } else {
      console.log(JSON.stringify({
        event: 'lead_captured',
        email,
        url_scanned,
        score,
        timestamp: new Date().toISOString(),
      }))
    }
  }

  // Send the AEO report email (best-effort, don't block response)
  if (checks && Array.isArray(checks) && score != null) {
    // Sanitize checks to prevent XSS in email HTML
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanitizedChecks = checks.map((c: any) => ({
      ...c,
      label: typeof c.label === 'string' ? escapeHtml(c.label) : '',
      details: typeof c.details === 'string' ? escapeHtml(c.details) : '',
      fix: typeof c.fix === 'string' ? escapeHtml(c.fix) : '',
    }))
    const emailResult = await sendAeoReportEmail({
      to: email,
      url: url_scanned,
      score,
      checks: sanitizedChecks,
    })
    console.log(JSON.stringify({
      event: emailResult.success ? 'aeo_report_email_sent' : 'aeo_report_email_failed',
      email,
      url_scanned,
      emailId: emailResult.success ? (emailResult as { success: true; id?: string }).id : undefined,
      error: emailResult.success ? undefined : (emailResult as { success: false; error: string }).error,
      timestamp: new Date().toISOString(),
    }))
  }

  return NextResponse.json({ ok: true, emailSent: true })
}
