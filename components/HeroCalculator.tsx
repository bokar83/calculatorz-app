'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HeroCalculator() {
  const [hourly, setHourly] = useState('25')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [result, setResult] = useState<null | {
    annual: string; monthly: string; weekly: string; daily: string
  }>(null)

  const calculate = () => {
    const h = parseFloat(hourly)
    const w = parseFloat(hoursPerWeek)
    if (!h || !w || h <= 0 || w <= 0) return
    const annual = h * w * 52
    const fmt = (n: number) =>
      '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    setResult({
      annual: fmt(annual),
      monthly: fmt(annual / 12),
      weekly: fmt(h * w),
      daily: fmt((h * w) / 5),
    })
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#fff',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)',
      }}
    >
      {/* Card header */}
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #0F766E 0%, #0D5C57 100%)' }}
      >
        <h3 className="text-[14px] font-bold text-white">Hourly to Salary Calculator</h3>
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
          Enter your hourly rate to see your full salary breakdown instantly.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Hourly rate */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">
              Hourly Rate
            </label>
            <div
              className="flex items-center rounded-md overflow-hidden transition-all"
              style={{ border: '1.5px solid #E5E7EB' }}
            >
              <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-[14px] border-r border-[#E5E7EB]">$</span>
              <input
                type="number"
                value={hourly}
                onChange={e => setHourly(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && calculate()}
                className="flex-1 px-3 py-2 text-[15px] text-[#1A1F36] focus:outline-none bg-white w-0"
                placeholder="25"
              />
            </div>
          </div>
          {/* Hours/week */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">
              Hrs / Week
            </label>
            <div
              className="flex items-center rounded-md overflow-hidden transition-all"
              style={{ border: '1.5px solid #E5E7EB' }}
            >
              <input
                type="number"
                value={hoursPerWeek}
                onChange={e => setHoursPerWeek(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && calculate()}
                className="flex-1 px-3 py-2 text-[15px] text-[#1A1F36] focus:outline-none bg-white w-0"
                placeholder="40"
              />
              <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-[13px] border-l border-[#E5E7EB]">hrs</span>
            </div>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full text-white font-bold text-[14px] py-3 rounded-lg transition-all"
          style={{
            background: '#0F766E',
            transition: 'all 0.15s',
          }}
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
          Calculate My Salary
        </button>

        {/* Results — dark gradient block */}
        {result ? (
          <div
            className="mt-3.5 rounded-xl p-4"
            style={{ background: 'linear-gradient(135deg, #0C3547 0%, #0F766E 100%)' }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Annual', value: result.annual, primary: true },
                { label: 'Monthly', value: result.monthly },
                { label: 'Weekly', value: result.weekly },
                { label: 'Daily', value: result.daily },
              ].map(item => (
                <div
                  key={item.label}
                  className="rounded-lg py-3 px-1.5 text-center"
                  style={{ background: item.primary ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="font-extrabold text-white leading-tight break-all"
                    style={{ fontSize: item.primary ? '16px' : '14px', letterSpacing: '-0.5px' }}
                  >
                    {item.value}
                  </div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wide mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="mt-3.5 rounded-xl py-4 text-center"
            style={{ background: '#F8FAFB', border: '1px dashed #E5E7EB' }}
          >
            <p className="text-[12px] text-[#9CA3AF]">Your salary breakdown will appear here</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <Link href="/finance/hourly-to-salary" className="text-[12px] text-[#0F766E] hover:underline font-semibold">
            Full calculator with more options
          </Link>
          <Link href="/finance" className="text-[11px] text-[#9CA3AF] hover:text-[#0F766E]">
            All finance tools
          </Link>
        </div>
      </div>
    </div>
  )
}
