import Link from 'next/link'

interface EmptyStateProps {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full mb-5"
        style={{ backgroundColor: 'rgba(255,107,53,0.12)' }}
      >
        <Icon size={28} className="text-[#FF6B35]" />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: '#1B2A4A' }}>
        {title}
      </h3>
      <p className="text-sm mb-6 max-w-xs leading-relaxed" style={{ color: '#636E72' }}>
        {description}
      </p>
      {actionLabel && (
        <>
          {actionHref ? (
            <Link href={actionHref}>
              <button
                className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#FF6B35', color: '#fff' }}
              >
                {actionLabel}
              </button>
            </Link>
          ) : onAction ? (
            <button
              onClick={onAction}
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: '#FF6B35', color: '#fff' }}
            >
              {actionLabel}
            </button>
          ) : null}
        </>
      )}
    </div>
  )
}
