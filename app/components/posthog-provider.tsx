'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initPostHog, capturePageview } from '@/lib/posthog'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize PostHog once
  useEffect(() => {
    initPostHog()
  }, [])

  // Track pageviews on route change (Next.js client-side navigation)
  useEffect(() => {
    if (pathname) {
      const url = searchParams?.toString()
        ? `${window.location.origin}${pathname}?${searchParams.toString()}`
        : `${window.location.origin}${pathname}`
      capturePageview(url)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
