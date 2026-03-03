import Anthropic from '@anthropic-ai/sdk'

const client = process.env.LB_ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.LB_ANTHROPIC_API_KEY })
  : null

interface AnthropicResult {
  success: boolean
  text?: string
  error?: string
  errorCode?: string
  isDegraded: boolean
}

// In-memory failure tracking (resets on cold start, acceptable for serverless)
let failureCount = 0
let lastFailureAt: string | null = null
let lastFailureError: string | null = null

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
      isDegraded: true,
    }
  }
}

export function getAnthropicStatus() {
  return {
    configured: !!client,
    failureCount,
    lastFailureAt,
    lastFailureError,
    isDegraded: !client || (lastFailureAt !== null && (Date.now() - new Date(lastFailureAt).getTime()) < 300_000),
  }
}
