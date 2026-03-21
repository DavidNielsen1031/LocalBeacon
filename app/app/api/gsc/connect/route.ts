export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/gsc/connect — Redirect user to Google OAuth consent screen
 * Scopes: webmasters.readonly (read-only GSC access)
 */
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const clientId = process.env.GOOGLE_GSC_CLIENT_ID
  const redirectUri = process.env.GOOGLE_GSC_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'https://localbeacon.ai'}/api/gsc/callback`

  if (!clientId) {
    return NextResponse.json({ error: 'Google Search Console integration is not yet configured' }, { status: 503 })
  }

  const scope = 'https://www.googleapis.com/auth/webmasters.readonly'
  const state = Buffer.from(JSON.stringify({ userId, ts: Date.now() })).toString('base64url')

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', scope)
  authUrl.searchParams.set('access_type', 'offline')
  authUrl.searchParams.set('prompt', 'consent')
  authUrl.searchParams.set('state', state)

  return NextResponse.redirect(authUrl.toString())
}
