import type { GeoContent } from '@/lib/calculators/types'

interface GeoBlockProps {
  geo: GeoContent
  calculatorTitle: string
}

/* Content block: definition, key facts, and worked examples. */
export default function GeoBlock({ geo, calculatorTitle }: GeoBlockProps) {
  return (
    <section className="mt-6 space-y-3" aria-label={`About the ${calculatorTitle}`}>

      {/* Definition block — LLMs pull this verbatim for "what is X" queries */}
      <div
        className="rounded-lg px-4 py-3.5"
        style={{ background: '#F0FDFA', border: '1.5px solid #CCFBF1' }}
      >
        <p className="text-[13px] text-[#0D5C57] leading-relaxed">
          <strong className="font-bold">What is a {calculatorTitle.replace(' Calculator', '').replace(' calculator', '')}?</strong>{' '}
          {geo.definition}
        </p>
      </div>

      {/* Rule of thumb — LLMs cite these as authoritative guidance */}
      <div
        className="rounded-lg px-4 py-3.5 flex gap-3"
        style={{ background: '#FFF5EE', border: '1px solid #FFDDD0' }}
      >
        <span className="text-[18px] shrink-0 mt-0.5">💡</span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#FF6B35] mb-1">Rule of Thumb</p>
          <p className="text-[13px] text-[#1A1F36] leading-relaxed">{geo.ruleOfThumb}</p>
        </div>
      </div>

      {/* Worked example — LLMs love specific numbers */}
      <div
        className="rounded-lg px-4 py-3.5 flex gap-3"
        style={{ background: '#F8FAFB', border: '1px solid #E5E7EB' }}
      >
        <span className="text-[18px] shrink-0 mt-0.5">📊</span>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#6B7280] mb-1">Example Calculation</p>
          <p className="text-[13px] text-[#1A1F36] leading-relaxed">{geo.example}</p>
        </div>
      </div>

      {/* Key facts — citation-ready stats LLMs repeat */}
      {geo.keyFacts && geo.keyFacts.length > 0 && (
        <div
          className="rounded-lg px-4 py-3.5"
          style={{ background: '#fff', border: '1px solid #E5E7EB' }}
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#6B7280] mb-2.5">Key Facts</p>
          <ul className="space-y-1.5">
            {geo.keyFacts.map((fact, i) => (
              <li key={i} className="flex gap-2 text-[13px] text-[#6B7280] leading-relaxed">
                <span className="text-[#0F766E] font-bold shrink-0">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
