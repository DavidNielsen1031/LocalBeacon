'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface QueueActionsProps {
  businessId: string | null
  itemId?: string
  content?: string
  title?: string
  status?: 'draft' | 'ready' | 'posted'
  variant?: 'header' | 'empty' | 'item'
}

export function QueueActions({
  businessId,
  itemId,
  content,
  title,
  status,
  variant = 'header',
}: QueueActionsProps) {
  const [generating, setGenerating] = useState(false)
  const [copying, setCopying] = useState(false)
  const [marking, setMarking] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editText, setEditText] = useState(content ?? '')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleGenerate() {
    if (!businessId) {
      setError('No business found. Set up your business in Settings first.')
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
        if (data.error === 'limit_reached') {
          setError(`You've used all ${data.limit} posts this month. Upgrade to keep going — plans start at $49/mo.`)
          return
        }
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
    const textToCopy = editMode ? editText : (content ?? '')
    if (!textToCopy) return
    setCopying(true)
    try {
      await navigator.clipboard.writeText(textToCopy)
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
          className="bg-[#FF6B35] text-black hover:bg-[#FF6B35]/90 font-semibold"
        >
          {generating ? 'Writing…' : "Write My Post For This Week"}
        </Button>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm max-w-sm">
            <p className="text-red-400">{error}</p>
            {error.includes('Upgrade') && (
              <a href="/pricing" className="text-[#FF6B35] font-semibold text-xs hover:underline mt-1 inline-block">
                View Plans →
              </a>
            )}
          </div>
        )}
      </div>
    )
  }

  // Per-item actions: Expand, Edit, Copy, Mark as Posted
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Expand/collapse full content */}
      {expanded && (
        <div className="bg-white border border-[#DFE6E9] rounded-lg p-4 mb-2">
          <p className="text-xs text-[#636E72] mb-1 font-semibold">{title || 'Your Post'}</p>
          {editMode ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full bg-white0 border border-[#DFE6E9] rounded-lg p-3 text-[#2D3436] text-sm min-h-[120px] focus:outline-none focus:border-[#FF6B35]/50"
            />
          ) : (
            <p className="text-[#2D3436] text-sm whitespace-pre-wrap">{content}</p>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          onClick={() => { setExpanded(!expanded); if (!expanded) setEditText(content ?? '') }}
          className="border-[#DFE6E9] text-[#2D3436] hover:text-[#1B2A4A] hover:border-[#1B2A4A]/30 text-xs"
        >
          {expanded ? '▲ Collapse' : '▼ Read Full Post'}
        </Button>

        {expanded && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditMode(!editMode)}
            className="border-[#DFE6E9] text-[#2D3436] hover:text-[#1B2A4A] hover:border-[#1B2A4A]/30 text-xs"
          >
            {editMode ? '👁 Preview' : '✏️ Edit Before Copying'}
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="border-[#DFE6E9] text-[#2D3436] hover:text-[#1B2A4A] hover:border-[#1B2A4A]/30 text-xs"
        >
          {copying ? '✅ Copied!' : '📋 Copy Text'}
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
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-xs">
          <p className="text-red-400">{error}</p>
          {error.includes('Upgrade') && (
            <a href="/pricing" className="text-[#FF6B35] font-semibold hover:underline mt-1 inline-block">
              View Plans →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
