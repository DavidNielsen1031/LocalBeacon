export const dynamic = 'force-dynamic'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { status } = body

  if (!status || !['draft', 'ready', 'posted'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const supabase = createServerClient()
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })

  // Verify ownership: content_queue item must belong to a business owned by the authenticated user
  const { data: queueItem, error: fetchError } = await supabase
    .from('content_queue')
    .select('id, business_id, businesses!inner(user_id)')
    .eq('id', id)
    .single()

  if (fetchError || !queueItem) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  // Supabase infers a complex union type for joined tables; cast via unknown to access user_id
  const business = queueItem.businesses as unknown as { user_id: string } | null
  if (business?.user_id !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('content_queue')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('content_queue update error:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }

  return NextResponse.json(data)
}
