import type { AffiliateConfig } from '@/lib/calculators/types'

interface AffiliateStripProps {
  affiliate: AffiliateConfig | undefined
  show: boolean
}

export default function AffiliateStrip({ affiliate, show }: AffiliateStripProps) {
  if (!show || !affiliate) return null

  return (
    <div
      className="mt-3 rounded-lg px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      style={{ background: '#FFF5EE', border: '1px solid #FFDDD0' }}
    >
      <div className="flex-1">
        <p className="text-[12px] text-[#6B7280] mb-3 px-1">
          <strong className="text-[#374151]">Affiliate Disclosure:</strong> CalcFlow may earn a commission if you sign up through links on this page. This does not affect our editorial independence or the tools we recommend. We only feature products we believe provide genuine value.
        </p>
        <div className="text-[12px] font-semibold text-[#1A1F36]">{affiliate.label}</div>
        <div className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">{affiliate.description}</div>
      </div>
      <a
        href={affiliate.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="shrink-0 text-white text-[11px] font-bold px-3.5 py-[7px] rounded-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-orange-400 hover:opacity-90 transition-opacity"
        style={{ background: '#FF6B35' }}
      >
        Visit {affiliate.partner}
      </a>
    </div>
  )
}
