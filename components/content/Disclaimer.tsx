import Link from 'next/link'

export default function Disclaimer() {
  return (
    <div className="flex items-start gap-3 bg-[#F8FAFB] border-l-2 border-[#0F766E] rounded-md p-3 mt-4">
      <svg
        className="shrink-0 mt-0.5"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7.5" stroke="#9CA3AF" />
        <text
          x="8"
          y="12"
          textAnchor="middle"
          fontSize="10"
          fontFamily="serif"
          fontStyle="italic"
          fill="#9CA3AF"
        >
          i
        </text>
      </svg>
      <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
        Results shown are estimates for informational purposes only. Nothing on CalcFlow is financial, tax, legal, or medical{' '}
        <Link href="/terms" className="underline hover:text-[#6B7280] transition-colors">
          advice
        </Link>
        . Always consult a qualified professional before making important decisions.
      </p>
    </div>
  )
}
