'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CompoundInterestWidget() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [result, setResult] = useState<null | {
    total: string; interest: string; multiplier: string; monthly: string
  }>(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const n = parseFloat(years)
    if (!P || !r || !n || P <= 0 || n <= 0) return
    const total = P * Math.pow(1 + r, n)
    const interest = total - P
    const multiplier = (total / P).toFixed(2)
    const fmt = (v: number) =>
      '$' + Math.round(v).toLocaleString('en-US')
    setResult({
      total: fmt(total),
      interest: fmt(interest),
      multiplier: multiplier + 'x',
      monthly: fmt(total / (n * 12)),
    })
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.06)',
        border: '1.5px solid #E5E7EB',
      }}
    >
      {/* Card header */}
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #0C3547 0%, #164E63 100%)' }}
      >
        <h3 className="text-[14px] font-bold text-white">Compound Interest Calculator</h3>
        <span
          className="text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
          style={{ background: '#FF6B35' }}
        >
          Popular
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-[12px] text-[#6B7280] mb-4 pb-3 border-b border-[#F8FAFB]">
          See how your money grows with the power of compound interest over time.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">
              Principal
            </label>
            <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
              <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[13px] border-r border-[#E5E7EB]">$</span>
              <input
                type="number"
                value={principal}
                onChange={e => setPrincipal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && calculate()}
                className="flex-1 px-2.5 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0"
                placeholder="10000"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">
              Rate / Yr
            </label>
            <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
              <input
                type="number"
                value={rate}
                onChange={e => setRate(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && calculate()}
                className="flex-1 px-2.5 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0"
                placeholder="7"
              />
              <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[13px] border-l border-[#E5E7EB]">%</span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">
              Years
            </label>
            <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
              <input
                type="number"
                value={years}
                onChange={e => setYears(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && calculate()}
                className="flex-1 px-2.5 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0"
                placeholder="10"
              />
              <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[13px] border-l border-[#E5E7EB]">yrs</span>
            </div>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full text-white font-bold text-[14px] py-3 rounded-lg transition-all"
          style={{ background: '#0F766E' }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background = '#0D5C57'
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 4px 14px rgba(15,118,110,0.25)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background = '#0F766E'
            el.style.transform = ''
            el.style.boxShadow = ''
          }}
        >
          Calculate Growth
        </button>

        {result ? (
          <div
            className="mt-3.5 rounded-xl p-4"
            style={{ background: 'linear-gradient(135deg, #0C3547 0%, #0F766E 100%)' }}
          >
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Total Value', value: result.total, primary: true },
                { label: 'Interest Earned', value: result.interest },
                { label: 'Growth', value: result.multiplier },
                { label: 'Monthly Equiv', value: result.monthly },
              ].map(item => (
                <div
                  key={item.label}
                  className="rounded-lg py-3 px-1.5 text-center"
                  style={{ background: item.primary ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="font-extrabold text-white leading-tight break-all"
                    style={{ fontSize: item.primary ? '16px' : '12px', letterSpacing: '-0.5px' }}
                  >
                    {item.value}
                  </div>
                  <div className="text-[9px] text-white/60 uppercase tracking-wide mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="mt-3.5 rounded-xl py-4 text-center"
            style={{ background: '#F8FAFB', border: '1px dashed #E5E7EB' }}
          >
            <p className="text-[12px] text-[#9CA3AF]">Your growth projection will appear here</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <Link href="/finance/compound-interest" className="text-[12px] text-[#0F766E] hover:underline font-semibold">
            Full calculator with monthly contributions
          </Link>
          <Link href="/finance" className="text-[11px] text-[#9CA3AF] hover:text-[#0F766E]">
            All finance tools
          </Link>
        </div>
      </div>
    </div>
  )
}
