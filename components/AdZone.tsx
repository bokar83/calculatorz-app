'use client'

import { useEffect } from 'react'

interface AdZoneProps {
  zone: 0 | 1 | 2 | 3 | 4 | 5
  className?: string
}

// Zone definitions — IAB standard units, AdSense policy compliant placement:
//   zone 0 — mobile sticky footer (320x50), sits below all content, never overlapping UI
//   zone 1 — leaderboard (728x90), between page sections, desktop only
//   zone 2/3 — medium rectangle (300x250), within article content flow
//   zone 4 — sidebar medium rectangle (300x250)
//   zone 5 — sidebar half-page (300x600)
const ZONE_CONFIG: Record<number, { format: string; fullWidth: boolean; classes: string }> = {
  0: { format: 'auto', fullWidth: true,  classes: 'fixed bottom-0 left-0 right-0 z-40 md:hidden flex justify-center bg-white border-t border-[#E5E7EB] py-1' },
  1: { format: 'auto', fullWidth: false, classes: 'hidden md:flex justify-center' },
  2: { format: 'auto', fullWidth: false, classes: 'flex justify-center' },
  3: { format: 'auto', fullWidth: false, classes: 'flex justify-center' },
  4: { format: 'auto', fullWidth: false, classes: 'hidden lg:flex justify-center' },
  5: { format: 'auto', fullWidth: false, classes: 'hidden lg:flex justify-center' },
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdZone({ zone, className = '' }: AdZoneProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
  const config = ZONE_CONFIG[zone]

  useEffect(() => {
    if (!publisherId) return
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // script not yet loaded
    }
  }, [publisherId])

  if (!config || !publisherId) return null

  return (
    <div className={`${config.classes} ${className}`} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={`ca-${publisherId}`}
        data-ad-slot="auto"
        data-ad-format={config.format}
        data-full-width-responsive={config.fullWidth ? 'true' : 'false'}
      />
    </div>
  )
}
