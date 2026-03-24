/**
 * IMPORTANT: This in-memory rate limiter is NOT effective in serverless environments
 * (Vercel, AWS Lambda, etc.) because each function instance has its own memory and
 * cold starts are frequent. The Map resets on every cold start.
 *
 * TODO: Replace with a Redis-backed rate limiter for production use.
 * Recommended: Upstash Redis + @upstash/ratelimit
 * See: https://github.com/upstash/ratelimit-js
 *
 * This implementation provides rate limiting within a single function instance only.
 * It is better than nothing for low-traffic scenarios.
 */

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

  // Prune old entries to prevent memory growth
  const cutoff = now - windowMs
  for (const [key, timestamps] of rateLimitMap.entries()) {
    const fresh = timestamps.filter(t => t > cutoff)
    if (fresh.length === 0) rateLimitMap.delete(key)
    else rateLimitMap.set(key, fresh)
  }

  return true
}
