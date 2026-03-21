export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/**
 * GET /api/gsc/callback — Handle Google OAuth callback
 * Exchanges auth code for refresh token, stores in Supabase
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const error = req.nextUrl.searchParams.get('error')

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localbeacon.ai'

  if (error) {
    console.error('[gsc/callback] OAuth error:', error)
    return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=${error}`)
  }

  if (!code || !state) {
    return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=missing_params`)
  }

  // Decode state to get userId
  let userId: string
  try {
    const decoded = JSON.parse(Buffer.from(state, 'base64url').toString())
    userId = decoded.userId
    // Reject if state is older than 10 minutes
    if (Date.now() - decoded.ts > 600_000) {
      return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=expired`)
    }
  } catch {
    return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=invalid_state`)
  }

  const clientId = process.env.GOOGLE_GSC_CLIENT_ID
  const clientSecret = process.env.GOOGLE_GSC_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_GSC_REDIRECT_URI || `${baseUrl}/api/gsc/callback`

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=not_configured`)
  }

  // Exchange code for tokens
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenRes.json()
    if (!tokenRes.ok || !tokens.refresh_token) {
      console.error('[gsc/callback] Token exchange failed:', tokens)
      return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=token_failed`)
    }

    // Fetch the user's GSC sites to store which site they connected
    const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })
    const sitesData = await sitesRes.json()
    const sites = (sitesData.siteEntry || []).map((s: { siteUrl: string }) => s.siteUrl)

    // Store in Supabase
    const supabase = createServerClient()
    if (!supabase) {
      return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=db_error`)
    }

    // Get user record
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=user_not_found`)
    }

    // Upsert GSC connection
    await supabase.from('gsc_connections').upsert({
      user_id: user.id,
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      token_expiry: new Date(Date.now() + (tokens.expires_in || 3600) * 1000).toISOString(),
      sites: sites,
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    return NextResponse.redirect(`${baseUrl}/dashboard?gsc_connected=true`)
  } catch (err) {
    console.error('[gsc/callback] Error:', err)
    return NextResponse.redirect(`${baseUrl}/dashboard?gsc_error=unknown`)
  }
}
