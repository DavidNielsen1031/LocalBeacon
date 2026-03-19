const rateLimitMap = new Map<string, number[]>()

/**
 * Simple in-memory rate limiter.
 * @param ip - Client IP address
 * @param limit - Max requests allowed in window
 * @param windowMs - Time window in milliseconds
 * @returns true if request is allowed, false if rate limited
 */
export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recent = timestamps.filter(t => now - t < windowMs)
  if (recent.length >= limit) return false
  recent.push(now)
  rateLimitMap.set(ip, recent)
  return true
}
