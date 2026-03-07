export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })

  // Upsert user record
  await supabase.from('users').upsert(
    { clerk_id: userId, email: body.email || '' },
    { onConflict: 'clerk_id' }
  )

  // Get user id
  const { data: user } = await supabase.from('users').select('id').eq('clerk_id', userId).single()
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Get user's plan to check business limits
  const { data: userRecord } = await supabase.from('users').select('plan').eq('clerk_id', userId).single()
  const plan = (userRecord?.plan || 'free').toLowerCase()
  const businessLimit = plan === 'agency' ? null : plan === 'solo' ? 3 : 1

  // Count existing businesses
  const { data: existingBusinesses } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)

  const existingCount = existingBusinesses?.length || 0

  // If body.id is provided, this is an UPDATE to an existing business
  if (body.id) {
    const { data: business, error } = await supabase
      .from('businesses')
      .update({
        name: body.name || undefined,
        phone: body.phone || undefined,
        website: body.website || undefined,
        primary_city: body.city || body.primary_city || undefined,
        primary_state: body.state || body.primary_state || undefined,
        address: body.address || undefined,
        zip: body.zip || undefined,
        description: body.description || undefined,
        service_areas: body.service_areas
          ? (typeof body.service_areas === 'string'
              ? body.service_areas.split(',').map((s: string) => s.trim()).filter(Boolean)
              : body.service_areas)
          : undefined,
        specialties: body.specialties || undefined,
      })
      .eq('id', body.id)
      .eq('user_id', user.id)  // ensure ownership
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ business })
  }

  // For backward compatibility: if user has exactly 1 business and no body.id,
  // check if this looks like a settings update (has no category field).
  // Skip this path when force_new is set (e.g. from the Add Client wizard).
  if (!body.force_new && existingCount === 1 && !body.category) {
    const { data: business, error } = await supabase
      .from('businesses')
      .update({
        name: body.name || undefined,
        phone: body.phone || undefined,
        website: body.website || undefined,
        primary_city: body.city || body.primary_city || undefined,
        primary_state: body.state || body.primary_state || undefined,
        address: body.address || undefined,
        zip: body.zip || undefined,
        description: body.description || undefined,
        service_areas: body.service_areas
          ? (typeof body.service_areas === 'string'
              ? body.service_areas.split(',').map((s: string) => s.trim()).filter(Boolean)
              : body.service_areas)
          : undefined,
        specialties: body.specialties || undefined,
      })
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ business })
  }

  // CREATE new business — check plan limits
  if (businessLimit !== null && existingCount >= businessLimit) {
    return NextResponse.json({
      error: 'business_limit_reached',
      limit: businessLimit,
      current: existingCount,
      plan,
      upgrade_url: '/pricing',
    }, { status: 403 })
  }

  const { data: business, error } = await supabase
    .from('businesses')
    .insert({
      user_id: user.id,
      name: body.name || 'My Business',
      category: body.category || '',
      primary_city: body.city || body.primary_city || '',
      primary_state: body.state || body.primary_state || '',
      service_areas: body.service_areas
        ? (typeof body.service_areas === 'string'
            ? body.service_areas.split(',').map((s: string) => s.trim()).filter(Boolean)
            : body.service_areas)
        : [],
      phone: body.phone || '',
      website: body.website || '',
      google_listing: body.google_listing || '',
      address: body.address || '',
      zip: body.zip || '',
      description: body.description || '',
      specialties: body.specialties || '',
      gbp_connected: false,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ business, id: business.id })
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ business: null, businesses: [] })

  const { data: user } = await supabase.from('users').select('id').eq('clerk_id', userId).single()
  if (!user) return NextResponse.json({ business: null, businesses: [] })

  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return NextResponse.json({
    business: businesses?.[0] || null,
    businesses: businesses || [],
  })
}
