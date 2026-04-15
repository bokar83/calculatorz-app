'use client'

import { useState } from 'react'

interface FaqSectionProps {
  faqs: { q: string; a: string }[]
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mt-6">
      <h2 className="text-[17px] font-bold text-[#1A1F36] mb-4">Frequently Asked Questions</h2>
      <div className="divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-lg overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-start gap-3 px-4 py-3.5 text-left bg-white hover:bg-[#F8FAFB] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0F766E]"
              aria-expanded={openIndex === i}
            >
              {/* Q badge from mockup */}
              <span
                className="shrink-0 mt-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded"
                style={{ background: '#0F766E', color: '#fff', lineHeight: '1.4' }}
              >
                Q
              </span>
              <span className="flex-1 font-semibold text-[#1A1F36] text-[13px] pr-4">{faq.q}</span>
              <svg
                className={`shrink-0 w-4 h-4 text-[#6B7280] transition-transform duration-200 mt-0.5 ${openIndex === i ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 pt-1 bg-white text-[13px] text-[#6B7280] leading-relaxed pl-[52px]">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
