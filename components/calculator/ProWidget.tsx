import Link from 'next/link'

export default function ProWidget() {
  return (
    <div className="rounded-xl bg-gradient-to-b from-[#0C3547] to-[#0D5C57] text-white p-5">
      <div className="text-lg font-bold mb-1">CalcFlow Pro</div>
      <div className="text-sm text-white/70 mb-3">$7/mo &middot; $49/yr &middot; $79 lifetime</div>
      <ul className="space-y-1.5 text-sm text-white/80 mb-4">
        {['No ads', 'PDF export', 'Calculation history', 'API access', 'Batch calculations'].map(f => (
          <li key={f} className="flex items-center gap-2">
            <span className="text-teal-300">&#10003;</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/pro"
        className="block w-full text-center bg-[#FF6B35] hover:bg-orange-500 text-white text-sm font-semibold py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Upgrade to Pro
      </Link>
    </div>
  )
}
