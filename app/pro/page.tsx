import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CalcFlow Pro — No Ads, PDF Export, History',
  description: 'Upgrade to CalcFlow Pro for an ad-free experience, PDF exports, calculation history, and API access.',
}

const PLANS = [
  { label: 'Monthly', price: '$7', period: '/month', subtext: 'Billed monthly' },
  { label: 'Annual', price: '$49', period: '/year', subtext: 'Save $35 vs monthly', highlight: true },
  { label: 'Lifetime', price: '$79', period: 'one-time', subtext: 'Pay once, own forever' },
]

const FEATURES = [
  { title: 'No ads', desc: 'Clean, distraction-free calculator experience.' },
  { title: 'PDF export', desc: 'Save and share your calculations as PDF reports.' },
  { title: 'Calculation history', desc: 'Review and reuse your past calculations.' },
  { title: 'API access', desc: 'Integrate CalcFlow calculations into your own apps.' },
  { title: 'Batch calculations', desc: 'Run multiple scenarios at once.' },
]

export default function ProPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-block bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
          Pro
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1F36] mb-3">
          Upgrade to CalcFlow Pro
        </h1>
        <p className="text-[#6B7280] max-w-lg mx-auto">
          Remove ads, export PDFs, access your history, and unlock the API. One upgrade, every calculator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {PLANS.map(plan => (
          <div
            key={plan.label}
            className={`rounded-xl border p-6 text-center ${
              plan.highlight
                ? 'border-[#0F766E] bg-[#F0FDFA] shadow-md'
                : 'border-[#E5E7EB] bg-white'
            }`}
          >
            {plan.highlight && (
              <div className="text-xs font-bold text-[#0F766E] uppercase tracking-wide mb-2">Most Popular</div>
            )}
            <div className="text-sm font-semibold text-[#6B7280] mb-1">{plan.label}</div>
            <div className="text-4xl font-extrabold text-[#1A1F36]">{plan.price}</div>
            <div className="text-sm text-[#6B7280] mb-1">{plan.period}</div>
            <div className="text-xs text-[#9CA3AF] mb-5">{plan.subtext}</div>
            <button
              disabled
              className="w-full bg-[#FF6B35] text-white font-semibold py-2.5 rounded-md opacity-60 cursor-not-allowed text-sm"
            >
              Coming Soon
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mb-8">
        <h2 className="text-xl font-bold text-[#1A1F36] mb-4">Everything in Pro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="text-[#0F766E] font-bold text-lg">&#10003;</span>
              <div>
                <div className="font-semibold text-sm text-[#1A1F36]">{f.title}</div>
                <div className="text-xs text-[#6B7280]">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-[#9CA3AF]">
        Pro subscriptions are coming soon. In the meantime,{' '}
        <Link href="/" className="text-[#0F766E] hover:underline">enjoy all calculators for free</Link>.
      </div>
    </div>
  )
}
