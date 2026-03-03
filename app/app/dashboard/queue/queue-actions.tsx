'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface QueueActionsProps {
  businessId: string | null
  itemId?: string
  content?: string
  status?: 'draft' | 'ready' | 'posted'
  variant?: 'header' | 'empty' | 'item'
}

export function QueueActions({
  businessId,
  itemId,
  content,
  status,
  variant = 'header',
}: QueueActionsProps) {
  const [generating, setGenerating] = useState(false)
  const [copying, setCopying] = useState(false)
  const [marking, setMarking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleGenerate() {
    if (!businessId) {
      setError('No business found. Set up your business first.')
      return
    }
    setGenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/generate/weekly-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business_id: businessId }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to generate post')
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setGenerating(false)
    }
  }

  async function handleCopy() {
    if (!content) return
    setCopying(true)
    try {
      await navigator.clipboard.writeText(content)
      setTimeout(() => setCopying(false), 1500)
    } catch {
      setCopying(false)
    }
  }

  async function handleMarkPosted() {
    if (!itemId) return
    setMarking(true)
    setError(null)
    try {
      const res = await fetch(`/api/content-queue/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'posted' }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update post')
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setMarking(false)
    }
  }

  // Header / empty state: show Generate button
  if (variant === 'header' || variant === 'empty') {
    return (
      <div className="flex flex-col items-end gap-2">
        <Button
          onClick={handleGenerate}
          disabled={generating || !businessId}
          className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
        >
          {generating ? 'Generating…' : "Generate This Week's Post"}
        </Button>
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    )
  }

  // Per-item actions: Copy + Mark as Posted
  return (
    <div className="flex flex-col gap-2 items-end">
      <Button
        size="sm"
        variant="outline"
        onClick={handleCopy}
        className="border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs"
      >
        {copying ? '✅ Copied!' : '📋 Copy to Google'}
      </Button>

      {status !== 'posted' && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleMarkPosted}
          disabled={marking}
          className="border-green-500/30 text-green-400 hover:bg-green-500/10 text-xs"
        >
          {marking ? 'Saving…' : '✅ Mark as Posted'}
        </Button>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}
