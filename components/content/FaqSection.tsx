interface FaqSectionProps {
  faqs: { q: string; a: string }[]
}

// Server-rendered open list: all answers visible in HTML for Googlebot and screen readers.
// Previously an accordion (use client + useState) which hid answers behind JS clicks.
export default function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <div className="mt-6">
      <h2 className="text-[17px] font-bold text-[#1A1F36] mb-4">Frequently Asked Questions</h2>
      <div className="divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-lg overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white px-4 py-4">
            <div className="flex items-start gap-3 mb-2">
              <span
                className="shrink-0 mt-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded"
                style={{ background: '#0F766E', color: '#fff', lineHeight: '1.4' }}
              >
                Q
              </span>
              <p className="flex-1 font-semibold text-[#1A1F36] text-[13px]">{faq.q}</p>
            </div>
            <div className="pl-[28px] text-[13px] text-[#6B7280] leading-relaxed">
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
