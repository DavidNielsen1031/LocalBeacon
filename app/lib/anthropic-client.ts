import Anthropic from '@anthropic-ai/sdk'

const apiKey = process.env.LB_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY
const client = apiKey
  ? new Anthropic({ apiKey })
  : null

interface AnthropicResult {
  success: boolean
  text?: string
  error?: string
  errorCode?: string
  isDegraded: boolean
}

// In-memory failure tracking for circuit breaker pattern.
// IMPORTANT: This state is NOT shared across serverless function instances and resets
// on every cold start. It provides degradation detection within a single instance only.
// TODO: Replace with a Redis-backed counter for true cross-instance circuit breaking.
let failureCount = 0
let lastFailureAt: string | null = null
let lastFailureError: string | null = null

// Number of failures within the window required to mark the client as degraded.
const FAILURE_THRESHOLD = 3

export async function generateText(
  prompt: string,
  options: {
    model?: string
    maxTokens?: number
    system?: string
  } = {}
): Promise<AnthropicResult> {
  const { model = 'claude-haiku-4-5-20250414', maxTokens = 2000, system } = options

  if (!client) {
    console.log(JSON.stringify({
      event: 'anthropic_call_skipped',
      reason: 'no_api_key',
      timestamp: new Date().toISOString(),
    }))
    return { success: false, error: 'API key not configured', isDegraded: true }
  }

  try {
    const message = await client.messages.create({
      model,
      max_tokens: maxTokens,
      ...(system ? { system } : {}),
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    console.log(JSON.stringify({
      event: 'anthropic_call_success',
      model,
      inputLength: prompt.length,
      outputLength: text.length,
      timestamp: new Date().toISOString(),
    }))

    return { success: true, text, isDegraded: false }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    const errorCode = (err as Record<string, unknown>)?.status?.toString()
      || (err as Record<string, unknown>)?.error?.toString()
      || 'unknown'

    failureCount++
    lastFailureAt = new Date().toISOString()
    lastFailureError = errorMessage

    console.error(JSON.stringify({
      event: 'anthropic_call_failed',
      model,
      errorCode,
      errorMessage,
      failureCount,
      timestamp: new Date().toISOString(),
    }))

    return {
      success: false,
      error: errorMessage,
      errorCode,
      isDegraded: failureCount >= FAILURE_THRESHOLD,
    }
  }
}

export function getAnthropicStatus() {
  return {
    configured: !!client,
    failureCount,
    lastFailureAt,
    lastFailureError,
    isDegraded: !client || (failureCount >= FAILURE_THRESHOLD && lastFailureAt !== null && (Date.now() - new Date(lastFailureAt).getTime()) < 300_000),
  }
}
