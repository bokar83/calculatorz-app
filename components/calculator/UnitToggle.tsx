'use client'

import type { UnitSystem } from '@/lib/calculators/types'

interface UnitToggleProps {
  value: UnitSystem
  onChange: (u: UnitSystem) => void
}

export default function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-[#F8FAFB] border border-[#E5E7EB] rounded-lg p-1 w-fit">
      {(['metric', 'imperial'] as UnitSystem[]).map(u => (
        <button
          key={u}
          onClick={() => onChange(u)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${
            value === u
              ? 'bg-[#0F766E] text-white shadow-sm'
              : 'text-[#6B7280] hover:text-[#1A1F36]'
          }`}
        >
          {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/in)'}
        </button>
      ))}
    </div>
  )
}
