interface EducationalBlockProps {
  educational: {
    explainer: string
    tips: string[]
    commonMistakes: string[]
    example: string
  }
  title: string
}

export default function EducationalBlock({ educational, title }: EducationalBlockProps) {
  return (
    <div className="mt-6 space-y-5">
      {/* Explainer */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 className="text-[17px] font-bold text-[#1A1F36] mb-3">
          Understanding {title}
        </h2>
        <p className="text-[14px] text-[#6B7280] leading-relaxed">{educational.explainer}</p>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 className="text-[17px] font-bold text-[#1A1F36] mb-4">Tips and Best Practices</h2>
        <ul className="space-y-3">
          {educational.tips.map((tip, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                style={{ background: '#0F766E' }}
              >
                {i + 1}
              </span>
              <span className="text-[14px] text-[#6B7280] leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Real-world example */}
      <div className="rounded-xl border border-[#E5E7EB] p-5" style={{ background: '#F0FFFE', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 className="text-[17px] font-bold text-[#1A1F36] mb-3">Real-World Example</h2>
        <p className="text-[14px] text-[#6B7280] leading-relaxed">{educational.example}</p>
      </div>

      {/* Common mistakes */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 className="text-[17px] font-bold text-[#1A1F36] mb-4">Common Mistakes to Avoid</h2>
        <ul className="space-y-3">
          {educational.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 mt-1 text-[#FF6B35]" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="#FF6B35" />
                  <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[14px] text-[#6B7280] leading-relaxed">{mistake}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
