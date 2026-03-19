import { NextResponse } from 'next/server'

/**
 * Unified API error response helper.
 * Usage: return apiError('Unauthorized', 401)
 */
export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status })
}
