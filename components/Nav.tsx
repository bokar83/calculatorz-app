'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#0C3547] text-white" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
      <div className="max-w-[1160px] mx-auto px-6 h-[54px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-[20px] font-extrabold text-white tracking-tight shrink-0" style={{ letterSpacing: '-0.5px' }}>
          Calc<span className="text-[#FF6B35]">.</span>Flow
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 text-[13px] font-medium">
          <Link href="/finance" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded transition-all">Finance</Link>
          <Link href="/health" className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded transition-all">Health</Link>
        </div>

        {/* Search */}
        <div className="hidden md:block flex-1 max-w-[200px] mx-4">
          <input
            type="search"
            placeholder="Search calculators..."
            className="w-full bg-white/10 border border-white/15 rounded-md px-3 py-[5px] text-[13px] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />
        </div>

        {/* Go Pro CTA */}
        <Link
          href="/pro"
          className="shrink-0 hidden md:inline-flex items-center gap-1 bg-[#FF6B35] hover:bg-[#e55a27] text-white text-[13px] font-bold px-4 py-[7px] rounded-md transition-all"
          style={{ transition: 'all 0.15s' }}
        >
          Go Pro <span className="text-[10px]">✦</span>
        </Link>

        {/* Mobile: search + hamburger */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <input
            type="search"
            placeholder="Search..."
            className="w-[120px] bg-white/10 border border-white/15 rounded-md px-2.5 py-1 text-[12px] text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
          />
          <Link href="/pro" className="bg-[#FF6B35] text-white text-[11px] font-bold px-2.5 py-1 rounded-md">Pro</Link>
          <button
            className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-2 text-[13px] font-medium">
          <Link href="/finance" className="text-white/70 hover:text-white px-2 py-1" onClick={() => setMenuOpen(false)}>Finance</Link>
          <Link href="/health" className="text-white/70 hover:text-white px-2 py-1" onClick={() => setMenuOpen(false)}>Health</Link>
        </div>
      )}
    </nav>
  )
}
