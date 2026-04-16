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

        {/* Mobile: hamburger only — search lives in the dropdown */}
        <div className="flex md:hidden items-center gap-3 ml-auto">
          <button
            className="p-1.5 rounded focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
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
        <div className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-1 text-[14px] font-medium">
          <input
            type="search"
            placeholder="Search calculators..."
            className="w-full bg-white/10 border border-white/15 rounded-md px-3 py-2 text-[13px] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0F766E] mb-1"
          />
          <Link href="/finance" className="text-white/80 hover:text-white px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setMenuOpen(false)}>Finance</Link>
          <Link href="/health" className="text-white/80 hover:text-white px-2 py-2 rounded hover:bg-white/10 transition-colors" onClick={() => setMenuOpen(false)}>Health</Link>
        </div>
      )}
    </nav>
  )
}
