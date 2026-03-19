import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window === 'undefined') return

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

  if (!key) return

  posthog.init(key, {
    api_host: host,
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') ph.debug()
    },
    capture_pageview: true,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
  })
}

export { posthog }
