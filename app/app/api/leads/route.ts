export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { email, url_scanned, score } = await req.json()

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
    return NextResponse.json({ ok: true })
  }

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
    // Still return OK — don't fail the user experience over a DB issue
    return NextResponse.json({ ok: true })
  }

  console.log(JSON.stringify({
    event: 'lead_captured',
    email,
    url_scanned,
    score,
    timestamp: new Date().toISOString(),
  }))

  return NextResponse.json({ ok: true })
}
