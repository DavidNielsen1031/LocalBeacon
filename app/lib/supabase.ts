import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function safeCreateClient(url: string, key: string): SupabaseClient | null {
  try {
    if (!url || !key || !url.startsWith('http')) return null
    return createClient(url, key)
  } catch {
    return null
  }
}

export const supabase = safeCreateClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key (bypasses RLS — for API routes only)
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey || !url.startsWith('http')) return supabase
  try {
    return createClient(url, serviceKey)
  } catch {
    return supabase
  }
}
