import type { AffiliateConfig } from '@/lib/calculators/types'

interface AffiliateCardProps {
  affiliate: AffiliateConfig
}

export default function AffiliateCard({ affiliate }: AffiliateCardProps) {
  return (
    <div
      className="mt-6 rounded-xl border border-[#0F766E]/20 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      style={{ background: 'linear-gradient(135deg, #F0FFFE 0%, #F8FAFB 100%)' }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0F766E] mb-1">
          Sponsored
        </p>
        <p className="text-[15px] font-bold text-[#1A1F36] leading-snug mb-1">
          {affiliate.label}
        </p>
        <p className="text-[13px] text-[#6B7280] leading-relaxed">
          {affiliate.description}
        </p>
      </div>
      <a
        href={affiliate.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="shrink-0 inline-flex items-center gap-2 bg-[#0F766E] hover:bg-[#0d6560] text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
      >
        {affiliate.partner}
        <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}
