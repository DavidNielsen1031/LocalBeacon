export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendAeoReportEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
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
    sendAeoReportEmail({
      to: email,
      url: url_scanned,
      score,
      checks,
    }).then(result => {
      console.log(JSON.stringify({
        event: result.success ? 'aeo_report_email_sent' : 'aeo_report_email_failed',
        email,
        url_scanned,
        emailId: result.success ? result.id : undefined,
        error: result.success ? undefined : result.error,
        timestamp: new Date().toISOString(),
      }))
    }).catch(err => {
      console.error('[leads] AEO report email error:', err)
    })
  }

  return NextResponse.json({ ok: true })
}
