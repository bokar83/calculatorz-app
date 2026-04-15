import type { CalculatorResult } from '@/lib/calculators/types'

interface ResultsBlockProps {
  result: CalculatorResult | null
}

export default function ResultsBlock({ result }: ResultsBlockProps) {
  if (!result) {
    return (
      <div
        className="mt-4 py-7 rounded-xl text-center text-[13px] text-[#9CA3AF]"
        style={{ background: '#F8FAFB', border: '1px dashed #E5E7EB' }}
      >
        Enter values above and click Calculate to see your results.
      </div>
    )
  }

  return (
    <div
      className="mt-4 rounded-xl p-4"
      style={{ background: 'linear-gradient(135deg, #0C3547 0%, #0F766E 100%)' }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {result.values.map((item, i) => (
          <div
            key={i}
            className="rounded-lg py-3 px-2 text-center"
            style={{ background: (item.primary || i === 0) ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)' }}
          >
            <div
              className="font-extrabold text-white break-all leading-tight"
              style={{ fontSize: (item.primary || i === 0) ? '20px' : '15px', letterSpacing: '-0.5px' }}
            >
              {item.value}
            </div>
            <div className="text-[10px] text-white/60 uppercase tracking-wide mt-1.5">{item.label}</div>
          </div>
        ))}
      </div>
      {result.summary && (
        <p className="mt-3 text-[12px] text-white/60 text-center">{result.summary}</p>
      )}
    </div>
  )
}
