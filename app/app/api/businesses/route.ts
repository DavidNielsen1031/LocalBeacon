export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
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

  // Check if business already exists for this user
  const { data: existing } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (existing) {
    // Update existing business
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
      .eq('id', existing.id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ business })
  } else {
    // Create new business
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
        address: body.address || '',
        zip: body.zip || '',
        description: body.description || '',
        specialties: body.specialties || '',
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ business })
  }
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
