'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { PINNED_CURRENCY_CODES, CURRENCY_GROUPS, getCurrencyByCode } from '@/lib/currencies'
import type { Currency } from '@/lib/calculators/types'

interface CurrencySelectorProps {
  value: Currency
  onChange: (c: Currency) => void
}

export default function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setSearch('')
  }, [])

  useEffect(() => {
    if (!open) return
    setTimeout(() => searchRef.current?.focus(), 50)

    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) close()
    }
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, close])

  const pinnedCurrencies = PINNED_CURRENCY_CODES.map(code => getCurrencyByCode(code)).filter(Boolean) as Currency[]

  const filteredGroups = CURRENCY_GROUPS.map(group => ({
    ...group,
    currencies: group.currencies.filter(c =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(g => g.currencies.length > 0) as { region: string; currencies: Currency[] }[]

  const handleSelect = (c: Currency) => {
    onChange(c)
    close()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex flex-wrap gap-2 items-center">
        {pinnedCurrencies.map(c => (
          <button
            key={c.code}
            onClick={() => onChange(c)}
            className={`px-3 py-1 rounded-md text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${
              value.code === c.code
                ? 'bg-[#0F766E] text-white border-[#0F766E]'
                : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0F766E]'
            }`}
          >
            {c.code}
          </button>
        ))}
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1 rounded-md text-sm font-medium border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors"
        >
          More
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-30 overflow-hidden">
          <div className="p-2 border-b border-[#E5E7EB]">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search currencies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredGroups.map(group => (
              <div key={group.region}>
                <div className="px-3 py-1 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide bg-[#F8FAFB]">
                  {group.region}
                </div>
                {group.currencies.map(c => (
                  <button
                    key={c.code}
                    onClick={() => handleSelect(c)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-[#F0FDFA] transition-colors flex items-center gap-2 ${
                      value.code === c.code ? 'bg-[#F0FDFA] text-[#0F766E] font-medium' : 'text-[#1A1F36]'
                    }`}
                  >
                    <span className="font-mono text-xs w-8">{c.code}</span>
                    <span>{c.label}</span>
                    <span className="ml-auto text-[#9CA3AF]">{c.symbol}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
