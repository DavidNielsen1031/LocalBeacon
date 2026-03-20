import posthog from 'posthog-js'

let initialized = false

export function initPostHog() {
  if (typeof window === 'undefined') return
  if (initialized) return

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

  if (!key) return

  posthog.init(key, {
    api_host: host,
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') ph.debug()
    },
    // Disable auto pageview — we handle it manually with Next.js router
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',

    // Session replays — watch real user sessions
    enable_recording_console_log: true,

    // Autocapture clicks, form submissions, etc.
    autocapture: true,
  })

  initialized = true
}

export function capturePageview(url: string) {
  if (typeof window === 'undefined') return
  posthog.capture('$pageview', {
    $current_url: url,
  })
}

export function captureFunnelEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return
  posthog.capture(event, properties)
}

export { posthog }
