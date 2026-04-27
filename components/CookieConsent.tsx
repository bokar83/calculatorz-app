'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('cookie_consent')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1F36] text-white px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 shadow-lg"
    >
      <p className="text-[13px] text-white/80 flex-1 leading-relaxed">
        We use cookies to analyze site traffic via Google Analytics. No personal data is sold or shared.{' '}
        <Link href="/privacy" className="underline text-white/90 hover:text-white">
          Privacy Policy
        </Link>
      </p>
      <button
        onClick={accept}
        className="shrink-0 bg-[#0F766E] hover:bg-[#0d6560] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Got it
      </button>
    </div>
  )
}
