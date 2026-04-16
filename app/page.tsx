import type { Metadata } from 'next'
import Link from 'next/link'
import { getCalculatorsByCategory } from '@/lib/registry'
import AdZone from '@/components/AdZone'
import HeroCalculator from '@/components/HeroCalculator'
import MortgageWidget from '@/components/MortgageWidget'
import BMIWidget from '@/components/BMIWidget'

export const metadata: Metadata = {
  title: 'CalcFlow — Free Online Calculators for Finance and Health',
  description: 'Free online calculators for salary, loans, mortgages, BMI, calories, and more. Fast, accurate, mobile-friendly.',
}

// Ordered by traffic volume (high → low)
const topFinanceLinks = [
  { slug: 'hourly-to-salary', label: 'Hourly to Salary' },
  { slug: 'compound-interest', label: 'Compound Interest' },
  { slug: 'mortgage-payment', label: 'Mortgage Payment' },
  { slug: 'take-home-pay', label: 'Take-Home Pay' },
  { slug: 'loan-payment', label: 'Loan Payment' },
  { slug: 'income-tax', label: 'Income Tax' },
]

const topHealthLinks = [
  { slug: 'bmi', label: 'BMI' },
  { slug: 'bmr-calories', label: 'Calories & BMR' },
  { slug: 'body-fat', label: 'Body Fat %' },
  { slug: 'calorie-deficit', label: 'Calorie Deficit' },
  { slug: 'ideal-body-weight', label: 'Ideal Weight' },
  { slug: 'due-date', label: 'Due Date' },
]

// Trust signals
const trustItems = [
  { icon: '🔒', text: 'No sign-up required' },
  { icon: '📱', text: 'Mobile-friendly' },
  { icon: '⚡', text: 'Instant results' },
  { icon: '✅', text: 'Updated for 2024' },
  { icon: '🆓', text: '100% free forever' },
]

export default function HomePage() {
  const financeCalcs = getCalculatorsByCategory('finance')
  const healthCalcs = getCalculatorsByCategory('health')

  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden px-4 sm:px-8 py-10 sm:py-14"
        style={{
          background: 'linear-gradient(150deg, #0C3547 0%, #164E63 45%, #0F766E 100%)',
        }}
      >
        {/* Dot texture overlay + radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 70% 40%, rgba(15,118,110,0.3) 0%, transparent 60%), url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M20 20h2v2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Two-column hero */}
        <div className="relative max-w-[1060px] mx-auto flex flex-col lg:flex-row items-center gap-10">

          {/* Left: headline */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/18 text-white/88 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wide mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] pulse-dot inline-block" />
              Free · Accurate · No Sign-Up
            </div>

            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold text-white leading-[1.1] mb-4" style={{ letterSpacing: '-0.03em' }}>
              The Smarter<br />Calculator for<br />
              <span className="text-[#FF6B35]">Everything</span>
            </h1>

            <p className="text-[15px] sm:text-[16px] text-white/70 mb-6 max-w-[380px] leading-relaxed">
              40+ free calculators for finance and health. Accurate results, no account needed.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-5 sm:gap-8 mb-6">
              {[['40+', 'Calculators'], ['100%', 'Free'], ['0', 'Sign-ups']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-[22px] sm:text-[28px] font-extrabold text-white" style={{ letterSpacing: '-0.02em' }}>{num}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/55 uppercase tracking-wide mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Category shortcut pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Finance', href: '/finance', active: true },
                { label: 'Health', href: '/health', active: false },
                { label: 'Salary', href: '/finance/hourly-to-salary', active: false },
                { label: 'Mortgage', href: '/finance/mortgage-payment', active: false },
                { label: 'BMI', href: '/health/bmi', active: false },
              ].map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all"
                  style={item.active
                    ? { background: '#FF6B35', color: '#fff' }
                    : { background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)' }
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: live calculator card */}
          <div className="w-full lg:w-[420px] shrink-0">
            <HeroCalculator />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1060px] mx-auto px-4 py-2.5 flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
          {trustItems.map(item => (
            <div key={item.text} className="flex items-center gap-1 text-[11px] sm:text-[12px] text-[#6B7280]">
              <span>{item.icon}</span>
              <span className="whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LEADERBOARD AD */}
      <AdZone zone={1} className="bg-white border-b border-[#E5E7EB]" />

      {/* PAGE CONTENT */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-9">

        {/* Quick-access calculator shortcuts */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold text-[#1A1F36] mb-3">Most Used Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {[...topFinanceLinks, ...topHealthLinks].map(item => (
              <Link
                key={item.slug}
                href={`/${topFinanceLinks.find(f => f.slug === item.slug) ? 'finance' : 'health'}/${item.slug}`}
                className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-center text-[12px] font-semibold text-[#1A1F36] hover:border-[#0F766E] hover:text-[#0F766E] transition-all"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Calculators — two most searched side by side */}
        <div className="mb-10">
          <h2 className="text-[18px] font-bold text-[#1A1F36] mb-5">Try Our Most Popular Calculators</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <MortgageWidget />
            <BMIWidget />
          </div>
        </div>

        {/* Main content + sidebar layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_264px] gap-7">
          <div>
            {/* Finance section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[18px] font-bold text-[#1A1F36] flex items-center gap-2">
                  Finance Calculators
                </h2>
                <Link href="/finance" className="text-[13px] font-semibold text-[#0F766E] hover:underline">View all 30</Link>
              </div>

              {/* Finance calc grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {financeCalcs
                  .slice(0, 9)
                  .map(calc => (
                    <Link
                      key={calc.slug}
                      href={`/finance/${calc.slug}`}
                      className="bg-white border-[1.5px] border-[#E5E7EB] rounded-xl p-[18px] text-[#1A1F36] hover:border-[#0F766E] group transition-all block"
                      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)' }}
                    >
                      <div
                        className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-[19px] mb-3"
                        style={{ background: '#F0FDFA' }}
                      >
                        💰
                      </div>
                      <div className="text-[14px] font-bold mb-1.5 group-hover:text-[#0F766E]">{calc.title}</div>
                      <div className="text-[12px] text-[#6B7280] leading-snug">{calc.description.slice(0, 68)}&hellip;</div>
                    </Link>
                  ))}
              </div>
            </div>


            <AdZone zone={2} className="mb-10" />

            {/* Health section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[18px] font-bold text-[#1A1F36]">
                  Health Calculators
                </h2>
                <Link href="/health" className="text-[13px] font-semibold text-[#0F766E] hover:underline">View all 10</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {healthCalcs.map(calc => (
                  <Link
                    key={calc.slug}
                    href={`/health/${calc.slug}`}
                    className="bg-white border-[1.5px] border-[#E5E7EB] rounded-xl p-[18px] text-[#1A1F36] hover:border-[#0F766E] group transition-all block"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)' }}
                  >
                    <div className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-[19px] mb-3" style={{ background: '#FFF5EE' }}>
                      ❤️
                    </div>
                    <div className="text-[14px] font-bold mb-1.5 group-hover:text-[#0F766E]">{calc.title}</div>
                    <div className="text-[12px] text-[#6B7280] leading-snug">{calc.description.slice(0, 68)}&hellip;</div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-4">
            <AdZone zone={4} />

            {/* Quick links sidebar */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <h4 className="text-[13px] font-bold text-[#1A1F36] mb-3">Popular Finance</h4>
              <div className="space-y-1.5">
                {topFinanceLinks.map(item => (
                  <Link
                    key={item.slug}
                    href={`/finance/${item.slug}`}
                    className="block text-[12px] text-[#6B7280] hover:text-[#0F766E] py-0.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <h4 className="text-[13px] font-bold text-[#1A1F36] mt-4 mb-3">Popular Health</h4>
              <div className="space-y-1.5">
                {topHealthLinks.map(item => (
                  <Link
                    key={item.slug}
                    href={`/health/${item.slug}`}
                    className="block text-[12px] text-[#6B7280] hover:text-[#0F766E] py-0.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <AdZone zone={5} />
          </aside>
        </div>
      </div>
    </>
  )
}
