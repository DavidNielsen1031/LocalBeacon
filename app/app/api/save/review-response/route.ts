export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const business_id = searchParams.get('business_id')

  if (!business_id) return NextResponse.json({ items: [] })

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!user) return NextResponse.json({ items: [] })

  // Verify business ownership
  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', business_id)
    .eq('user_id', user.id)
    .single()

  if (!biz) return NextResponse.json({ items: [] })

  const { data: items } = await supabase
    .from('content_items')
    .select('id, title, body, metadata, created_at')
    .eq('business_id', business_id)
    .eq('type', 'review_response')
    .order('created_at', { ascending: false })
    .limit(20)

  return NextResponse.json({ items: items || [] })
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { business_id, reviewer_name, rating, comment, response } = body

  if (!business_id || !response) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Verify the business belongs to this user
  const { data: biz } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', business_id)
    .eq('user_id', user.id)
    .single()

  if (!biz) return NextResponse.json({ error: 'Business not found' }, { status: 404 })

  const { data, error } = await supabase
    .from('content_items')
    .insert({
      business_id,
      type: 'review_response',
      status: 'draft',
      title: `Review response — ${reviewer_name || 'Customer'} (${rating}★)`,
      body: response,
      metadata: {
        reviewer_name: reviewer_name || 'Customer',
        rating,
        original_comment: comment,
        generated_response: response,
      },
    })
    .select('id')
    .single()

  if (error) {
    console.error('[save-review-response] Insert error:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data.id })
}
