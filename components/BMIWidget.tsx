'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BMIWidget() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial')
  const [weight, setWeight] = useState('160')
  const [height, setHeight] = useState('69')
  const [weightKg, setWeightKg] = useState('70')
  const [heightCm, setHeightCm] = useState('175')
  const [result, setResult] = useState<null | { bmi: string; category: string; color: string; tip: string }>(null)

  const calculate = () => {
    let bmi: number
    if (unit === 'imperial') {
      const w = parseFloat(weight)
      const h = parseFloat(height)
      if (!w || !h || w <= 0 || h <= 0) return
      bmi = (703 * w) / (h * h)
    } else {
      const w = parseFloat(weightKg)
      const h = parseFloat(heightCm) / 100
      if (!w || !h || w <= 0 || h <= 0) return
      bmi = w / (h * h)
    }

    let category: string
    let color: string
    let tip: string
    if (bmi < 18.5) {
      category = 'Underweight'; color = '#3B82F6'; tip = 'Consider increasing caloric intake with nutrient-dense foods.'
    } else if (bmi < 25) {
      category = 'Normal weight'; color = '#10B981'; tip = 'You are in the healthy BMI range. Maintain your lifestyle.'
    } else if (bmi < 30) {
      category = 'Overweight'; color = '#F59E0B'; tip = 'A modest calorie reduction and more movement can help.'
    } else {
      category = 'Obese'; color = '#EF4444'; tip = 'Consult a healthcare provider for a personalized plan.'
    }

    setResult({ bmi: bmi.toFixed(1), category, color, tip })
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
      {/* Header */}
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' }}
      >
        <h3 className="text-[14px] font-bold text-white">BMI Calculator</h3>
        <span
          className="text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
          style={{ background: '#FF6B35' }}
        >
          #1 Health
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-[12px] text-[#6B7280] mb-3 pb-3 border-b border-[#F8FAFB]">
          Body Mass Index — the most widely used health screening tool.
        </p>

        {/* Unit toggle */}
        <div className="flex rounded-md overflow-hidden border border-[#E5E7EB] mb-4 w-fit">
          {(['imperial', 'metric'] as const).map(u => (
            <button
              key={u}
              onClick={() => { setUnit(u); setResult(null) }}
              className="px-4 py-1.5 text-[12px] font-semibold transition-colors"
              style={unit === u
                ? { background: '#6D28D9', color: '#fff' }
                : { background: '#fff', color: '#6B7280' }
              }
            >
              {u === 'imperial' ? 'lbs / in' : 'kg / cm'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {unit === 'imperial' ? (
            <>
              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">Weight</label>
                <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
                  <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && calculate()}
                    className="flex-1 px-3 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0"
                    placeholder="160"
                  />
                  <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[12px] border-l border-[#E5E7EB]">lbs</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">Height</label>
                <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
                  <input
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && calculate()}
                    className="flex-1 px-3 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0"
                    placeholder="69"
                  />
                  <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[12px] border-l border-[#E5E7EB]">in</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">Weight</label>
                <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={e => setWeightKg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && calculate()}
                    className="flex-1 px-3 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0"
                    placeholder="70"
                  />
                  <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[12px] border-l border-[#E5E7EB]">kg</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5">Height</label>
                <div className="flex items-center rounded-md overflow-hidden" style={{ border: '1.5px solid #E5E7EB' }}>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={e => setHeightCm(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && calculate()}
                    className="flex-1 px-3 py-2 text-[14px] text-[#1A1F36] focus:outline-none bg-white w-0"
                    placeholder="175"
                  />
                  <span className="px-2.5 py-2 bg-[#F8FAFB] text-[#6B7280] text-[12px] border-l border-[#E5E7EB]">cm</span>
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={calculate}
          className="w-full text-white font-bold text-[14px] py-3 rounded-lg transition-all"
          style={{ background: '#7C3AED' }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background = '#6D28D9'
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 4px 14px rgba(124,58,237,0.3)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background = '#7C3AED'
            el.style.transform = ''
            el.style.boxShadow = ''
          }}
        >
          Calculate BMI
        </button>

        {result ? (
          <div
            className="mt-3.5 rounded-xl p-4"
            style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)' }}
          >
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg py-3 px-2 text-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  <div className="font-extrabold text-white leading-tight" style={{ fontSize: '22px', letterSpacing: '-0.5px' }}>
                    {result.bmi}
                  </div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wide mt-1">BMI Score</div>
                </div>
                <div className="rounded-lg py-3 px-2 text-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="font-bold leading-tight text-center" style={{ fontSize: '14px', color: result.color }}>
                    {result.category}
                  </div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wide mt-1">Category</div>
                </div>
              </div>
              <div className="rounded-lg py-2.5 px-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <p className="text-[12px] text-white/75 leading-snug">{result.tip}</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="mt-3.5 rounded-xl py-4 text-center"
            style={{ background: '#F8FAFB', border: '1px dashed #E5E7EB' }}
          >
            <p className="text-[12px] text-[#9CA3AF]">Your BMI result will appear here</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <Link href="/health/bmi" className="text-[12px] text-[#7C3AED] hover:underline font-semibold">
            Full BMI calculator with more detail
          </Link>
          <Link href="/health" className="text-[11px] text-[#9CA3AF] hover:text-[#7C3AED]">
            All health tools
          </Link>
        </div>
      </div>
    </div>
  )
}
