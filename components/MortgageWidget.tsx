'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MortgageWidget() {
  const [price, setPrice] = useState('400000')
  const [down, setDown] = useState('80000')
  const [rate, setRate] = useState('7.0')
  const [years, setYears] = useState('30')
  const [result, setResult] = useState<null | {
    monthly: string; principal: string; interest: string; total: string
  }>(null)

  const calculate = () => {
    const P = parseFloat(price) - parseFloat(down)
    const r = parseFloat(rate) / 100 / 12
    const n = parseFloat(years) * 12
    if (!P || P <= 0 || !r || !n) return
    const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const total = M * n
    const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US')
    setResult({
      monthly: fmt(M),
      principal: fmt(P),
      interest: fmt(total - P),
      total: fmt(total),
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
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 100%)' }}
      >
        <h3 className="text-[14px] font-bold text-white">Mortgage Calculator</h3>
        <span
          className="text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
          style={{ background: '#FF6B35' }}
        >
          Popular
        </span>
      </div>

      <div className="px-5 py-4">
        <p className="text-[12px] text-[#6B7280] mb-4 pb-3 border-b border-[#F8FAFB]">
          Estimate your monthly mortgage payment in seconds.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">Home Price</label>
            <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
              <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[13px] border-r border-[#E5E7EB]">$</span>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} onKeyDown={e => e.key === 'Enter' && calculate()}
                className="flex-1 px-2.5 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0" placeholder="400000" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">Down Payment</label>
            <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
              <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[13px] border-r border-[#E5E7EB]">$</span>
              <input type="number" value={down} onChange={e => setDown(e.target.value)} onKeyDown={e => e.key === 'Enter' && calculate()}
                className="flex-1 px-2.5 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0" placeholder="80000" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">Interest Rate</label>
            <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
              <input type="number" value={rate} onChange={e => setRate(e.target.value)} onKeyDown={e => e.key === 'Enter' && calculate()}
                className="flex-1 px-2.5 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0" placeholder="7.0" />
              <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[13px] border-l border-[#E5E7EB]">%</span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">Loan Term</label>
            <select value={years} onChange={e => setYears(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white">
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
              <option value="10">10 years</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full text-white font-bold text-[14px] py-3 rounded-lg transition-all"
          style={{ background: '#1D4ED8' }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#1E40AF'; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 4px 14px rgba(29,78,216,0.3)' }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = '#1D4ED8'; el.style.transform = ''; el.style.boxShadow = '' }}
        >
          Calculate Payment
        </button>

        {result ? (
          <div className="mt-3.5 rounded-xl p-4" style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 100%)' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Monthly', value: result.monthly, primary: true },
                { label: 'Principal', value: result.principal },
                { label: 'Interest', value: result.interest },
                { label: 'Total Cost', value: result.total },
              ].map(item => (
                <div key={item.label} className="rounded-lg py-3 px-1.5 text-center"
                  style={{ background: item.primary ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)' }}>
                  <div className="font-extrabold text-white leading-tight break-all"
                    style={{ fontSize: item.primary ? '16px' : '12px', letterSpacing: '-0.5px' }}>
                    {item.value}
                  </div>
                  <div className="text-[9px] text-white/60 uppercase tracking-wide mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3.5 rounded-xl py-4 text-center" style={{ background: '#F8FAFB', border: '1px dashed #E5E7EB' }}>
            <p className="text-[12px] text-[#9CA3AF]">Your mortgage breakdown will appear here</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <Link href="/finance/mortgage-payment" className="text-[12px] text-[#1D4ED8] hover:underline font-semibold">
            Full calculator with taxes &amp; insurance
          </Link>
          <Link href="/finance" className="text-[11px] text-[#9CA3AF] hover:text-[#1D4ED8]">All finance tools</Link>
        </div>
      </div>
    </div>
  )
}
