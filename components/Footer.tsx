import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0C3547', marginTop: '8px' }}>
      <div className="max-w-[1160px] mx-auto px-6 pt-12 pb-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-9 mb-9">
          {/* Brand col */}
          <div>
            <div className="text-[22px] font-extrabold text-white mb-2.5" style={{ letterSpacing: '-0.5px' }}>
              Calc<span style={{ color: '#FF6B35' }}>.</span>Flow
            </div>
            <p className="text-[13px] leading-relaxed mb-4 max-w-[200px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Every number, answered. Free calculators for finance, health, and everyday decisions.
            </p>
            <div className="flex flex-wrap gap-2">
              {['No Ads on Pro', 'No Sign-Up', '100% Free'].map(badge => (
                <span
                  key={badge}
                  className="text-[11px] px-2.5 py-1 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Finance col */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wide mb-3.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Finance
            </h4>
            <ul className="space-y-2">
              {[
                ['Hourly to Salary', '/finance/hourly-to-salary'],
                ['Loan Payment', '/finance/loan-payment'],
                ['Mortgage Payment', '/finance/mortgage-payment'],
                ['Compound Interest', '/finance/compound-interest'],
                ['Income Tax', '/finance/income-tax'],
                ['Tip Calculator', '/finance/tip-calculator'],
                ['ROI Calculator', '/finance/roi-calculator'],
                ['Savings Goal', '/finance/savings-goal'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] transition-colors hover:text-white/80"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Health col */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wide mb-3.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Health
            </h4>
            <ul className="space-y-2">
              {[
                ['BMI Calculator', '/health/bmi'],
                ['BMR Calories', '/health/bmr-calories'],
                ['Body Fat %', '/health/body-fat'],
                ['Ideal Body Weight', '/health/ideal-body-weight'],
                ['Water Intake', '/health/water-intake'],
                ['Sleep Calculator', '/health/sleep-calculator'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] transition-colors hover:text-white/80"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / company col */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wide mb-3.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Company
            </h4>
            <ul className="space-y-2">
              {[
                ['About', '/about'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Use', '/terms'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] transition-colors hover:text-white/80"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pro" className="text-[13px] font-semibold" style={{ color: '#FF6B35' }}>
                  Go Pro ✦
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.28)' }}
        >
          <span>&copy; 2026 CalcFlow. All rights reserved.</span>
          <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.16)' }}>Built by Catalyst Works</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/65 transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>Privacy</Link>
            <Link href="/terms" className="hover:text-white/65 transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
