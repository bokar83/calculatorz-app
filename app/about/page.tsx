import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About CalcFlow — Built for People Who Deserve More Than a Number',
  description: 'CalcFlow was built out of frustration with bare calculator sites. Every tool ships with plain-English explanations, real examples, and practical guidance.',
  alternates: { canonical: 'https://calculatorz.tools/about/' },
}

export default function AboutPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36]">About</span>
      </nav>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h1 className="text-[28px] font-extrabold text-[#1A1F36] mb-2" style={{ letterSpacing: '-0.02em' }}>
          About CalcFlow
        </h1>
        <p className="text-[13px] text-[#9CA3AF] mb-8">Built for people who deserve more than a number.</p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-6">

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">Why We Built This</h2>
            <p className="leading-relaxed mb-3">
              CalcFlow started from a simple frustration. Most calculator sites give you a box, a button, and a number. That&apos;s it. No explanation of what the number means. No guidance on what to actually enter in each field. No context for whether your result is something to celebrate or something to fix. You&apos;re left Googling the answer to the answer.
            </p>
            <p className="leading-relaxed mb-3">
              We thought that was wrong. If someone is calculating their mortgage payment, they deserve to understand what PITI means, how the interest-to-principal split works in the first year, and what the 28% rule actually tells them. If someone is checking their BMI, they deserve to know what the number does not tell them, not just a category label.
            </p>
            <p className="leading-relaxed">
              So we built CalcFlow differently. Every calculator ships with a plain-English explanation, practical tips, real-world examples, and clear guidance on what to do with your result.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">Who We Are</h2>
            <p className="leading-relaxed mb-3">
              CalcFlow is built and maintained by a small team of business and finance professionals. Our editorial team holds advanced degrees including MBAs and draws on more than 20 years of combined experience in financial analysis, business strategy, and operations across multiple industries and regions.
            </p>
            <p className="leading-relaxed">
              We are not a bank. We are not a financial advisor or a healthcare provider. We are practitioners who got tired of tools that treat users as inputs rather than people trying to make real decisions.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">What Makes CalcFlow Different</h2>
            <ul className="space-y-2 text-[14px]">
              <li className="leading-relaxed"><strong>Plain-English explanations:</strong> Every calculator includes a clear breakdown of what the calculation means and why it matters.</li>
              <li className="leading-relaxed"><strong>Field-level guidance:</strong> Each input tells you what to enter and flags common mistakes before you make them.</li>
              <li className="leading-relaxed"><strong>Real examples:</strong> We walk through realistic scenarios so you can see how the numbers play out in practice.</li>
              <li className="leading-relaxed"><strong>No jargon without definition:</strong> If we use a term, we explain it.</li>
              <li className="leading-relaxed"><strong>No sign-up, no tracking, no paywalls:</strong> Every tool is free. Always.</li>
              <li className="leading-relaxed"><strong>Updated regularly:</strong> We review calculators against current tax law, health guidelines, and financial standards on a quarterly basis.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">Our Standards</h2>
            <p className="leading-relaxed mb-3">
              Every calculator on CalcFlow is built using validated formulas from peer-reviewed research and authoritative sources including the IRS, CDC, Federal Reserve, and academic journals. Before publication, each tool goes through specialist review, accuracy testing against real-world scenarios, and a final quality check.
            </p>
            <p className="leading-relaxed">
              We maintain a clear editorial standards process. You can read the full details on our{' '}
              <Link href="/editorial-standards" className="text-[#0F766E] hover:underline">Editorial Standards</Link>{' '}
              page.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">A Note on Professional Advice</h2>
            <div className="p-5 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB] space-y-3 text-[14px]">
              <p className="leading-relaxed">
                CalcFlow provides calculators and educational content for informational purposes only. Nothing on this site is financial, tax, legal, or medical advice. We are not licensed advisors, attorneys, or healthcare providers. Our results are estimates based on the inputs you provide and standard formulas. They are a starting point, not a final answer.
              </p>
              <p className="leading-relaxed">
                For decisions that matter — buying a home, planning retirement, managing a health condition — always verify your numbers with a qualified professional.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">Contact</h2>
            <p className="leading-relaxed">
              Questions about a calculator, found an error, or want to suggest a tool? We read every message. Reach us at{' '}
              <a href="mailto:hello@calculatorz.tools" className="text-[#0F766E] hover:underline">hello@calculatorz.tools</a>{' '}
              or visit our{' '}
              <Link href="/contact" className="text-[#0F766E] hover:underline">Contact page</Link>.
            </p>
          </section>

        </div>
      </div>

      <div className="mt-6 text-center text-[13px] text-[#9CA3AF]">
        <Link href="/terms" className="hover:text-[#0F766E]">Terms of Use</Link>
        <span className="mx-3">·</span>
        <Link href="/privacy" className="hover:text-[#0F766E]">Privacy Policy</Link>
        <span className="mx-3">·</span>
        <Link href="/" className="hover:text-[#0F766E]">Back to CalcFlow</Link>
      </div>
    </div>
  )
}
