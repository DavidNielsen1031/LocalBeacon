interface BeaconIconProps {
  size?: number
  className?: string
}

export function BeaconIcon({ size = 32, className = '' }: BeaconIconProps) {
  const NAVY = '#1B2A4A'
  const ORANGE = '#FF6B35'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LocalBeacon"
    >
      {/* Radiating rays from the light */}
      <line x1="16" y1="1.5" x2="16" y2="3.5" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20.5" y1="3" x2="19.5" y2="4.5" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11.5" y1="3" x2="12.5" y2="4.5" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="7.5" x2="21" y2="7.5" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="7.5" x2="11" y2="7.5" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />

      {/* Light orb */}
      <circle cx="16" cy="8" r="3.5" fill={ORANGE} />

      {/* Lantern housing */}
      <rect x="11" y="11" width="10" height="4" rx="1" fill={NAVY} />

      {/* Tower body (trapezoid) */}
      <path d="M12 15 L10.5 26 H21.5 L20 15 Z" fill={NAVY} />

      {/* Decorative stripe */}
      <rect x="10.5" y="19.5" width="11" height="1.5" fill="rgba(255,255,255,0.15)" />

      {/* Base */}
      <rect x="7.5" y="26" width="17" height="5" rx="2" fill={NAVY} />
    </svg>
  )
}
