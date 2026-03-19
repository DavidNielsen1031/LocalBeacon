export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/email'

/**
 * POST /api/user/init
 * Called on first dashboard visit. Creates user record if new and sends welcome email.
 * Safe to call multiple times — idempotent.
 */
export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ ok: true, isNew: false })

  // Check if user already exists
  const { data: existing } = await supabase
    .from('users')
    .select('id, plan')
    .eq('clerk_id', userId)
    .single()

  if (existing) {
    // Already initialized — return plan info
    return NextResponse.json({ ok: true, isNew: false, plan: existing.plan })
  }

  // New user — fetch Clerk profile for email and name
  const clerkUser = await currentUser()
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? ''
  const firstName = clerkUser?.firstName ?? 'there'

  // Insert new user
  await supabase.from('users').insert({
    clerk_id: userId,
    email,
    plan: 'free',
  })

  // Send welcome email (best-effort)
  if (email) {
    await sendWelcomeEmail({ to: email, name: firstName }).catch((err) =>
      console.error('[user/init] Failed to send welcome email:', err)
    )
  }

  console.log(JSON.stringify({
    event: 'user_first_visit',
    clerk_id: userId,
    email,
    timestamp: new Date().toISOString(),
  }))

  return NextResponse.json({ ok: true, isNew: true, plan: 'free' })
}
