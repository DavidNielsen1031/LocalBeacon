export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/**
 * GET /api/unsubscribe?email=user@example.com
 * CAN-SPAM compliant one-click unsubscribe
 */
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) {
    return new NextResponse(unsubPage('Missing email parameter.', false), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const supabase = createServerClient()
  if (supabase) {
    await supabase.from('outreach_unsubscribes').upsert(
      { email: email.toLowerCase(), unsubscribed_at: new Date().toISOString() },
      { onConflict: 'email' }
    )
  }

  return new NextResponse(unsubPage(email, true), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  })
}

/**
 * POST /api/unsubscribe — List-Unsubscribe-Post one-click
 */
export async function POST(req: NextRequest) {
  const body = await req.text()
  const params = new URLSearchParams(body)
  const email = params.get('email') || req.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  const supabase = createServerClient()
  if (supabase) {
    await supabase.from('outreach_unsubscribes').upsert(
      { email: email.toLowerCase(), unsubscribed_at: new Date().toISOString() },
      { onConflict: 'email' }
    )
  }

  return NextResponse.json({ ok: true, message: 'Unsubscribed successfully' })
}

function unsubPage(emailOrError: string, success: boolean): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${success ? 'Unsubscribed' : 'Error'} — LocalBeacon</title></head>
<body style="margin:0;padding:48px 24px;font-family:-apple-system,sans-serif;background:#FAFAF7;text-align:center;">
<div style="max-width:400px;margin:0 auto;background:white;padding:32px;border-radius:12px;border:1px solid #DFE6E9;">
<h1 style="font-size:24px;color:#1B2A4A;margin:0 0 12px;">${success ? '✅ Unsubscribed' : '⚠️ Error'}</h1>
<p style="color:#636E72;line-height:1.6;">${success
    ? `<strong>${emailOrError}</strong> has been removed from our outreach list. You won't receive any more emails from us.`
    : emailOrError
}</p>
<p style="margin-top:24px;"><a href="https://localbeacon.ai" style="color:#FF6B35;">← Back to LocalBeacon.ai</a></p>
</div>
</body></html>`
}
