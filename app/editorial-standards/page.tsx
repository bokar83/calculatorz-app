import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial Standards — CalcFlow',
  description: 'How CalcFlow builds, tests, fact-checks, and maintains every calculator and educational guide on the site.',
  alternates: { canonical: 'https://calculatorz.tools/editorial-standards/' },
}

export default function EditorialStandardsPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36]">Editorial Standards</span>
      </nav>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h1 className="text-[28px] font-extrabold text-[#1A1F36] mb-2" style={{ letterSpacing: '-0.02em' }}>
          Editorial Standards
        </h1>
        <p className="text-[13px] text-[#9CA3AF] mb-8">Last updated: April 19, 2026</p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-6">

          <section>
            <p className="text-[14px] leading-relaxed">
              This page explains how every calculator and educational guide on CalcFlow is built, reviewed, and kept current. Transparency about our process is part of how we earn your trust.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">Our Commitment</h2>
            <p className="text-[14px] leading-relaxed mb-3">
              CalcFlow was built because most calculator sites do the minimum: a formula, a button, a result. We decided that was not good enough. Our standard is that every tool on this site should help you understand your situation, not just produce a number.
            </p>
            <p className="text-[14px] leading-relaxed">
              That means every calculator comes with a plain-English explanation, practical tips, common mistake warnings, and a real-world example. And every one of them is built on validated, sourced methodology.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">Who Builds and Reviews Our Calculators</h2>
            <p className="text-[14px] leading-relaxed mb-3">
              CalcFlow&apos;s editorial team holds advanced degrees in business and finance, including MBAs, and brings more than 20 years of combined experience in financial analysis, business strategy, and operations. Our health calculators are reviewed against guidelines from recognized health authorities.
            </p>
            <p className="text-[14px] leading-relaxed">
              No calculator is published without going through our review process. No content is auto-generated.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">How We Build Each Calculator</h2>
            <ol className="list-decimal list-inside space-y-3 text-[14px]">
              <li className="leading-relaxed">
                <strong>Formula sourcing:</strong> We identify the authoritative formula or methodology for the calculation. For financial calculators, this means IRS publications, Federal Reserve guidance, and peer-reviewed finance research. For health calculators, this means CDC, NIH, WHO, and published clinical standards.
              </li>
              <li className="leading-relaxed">
                <strong>Implementation and testing:</strong> Our engineers build the calculator and test it against known benchmarks and real-world scenarios. Results are cross-checked against published reference tables and government calculators where available.
              </li>
              <li className="leading-relaxed">
                <strong>Specialist review:</strong> A team member with relevant expertise reviews the calculator logic, the educational content, and the field-level guidance for accuracy and clarity.
              </li>
              <li className="leading-relaxed">
                <strong>Educational layer:</strong> We write the plain-English explainer, tips, common mistakes, and real-world example that accompany every calculator. These are written for a general audience, not professionals.
              </li>
              <li className="leading-relaxed">
                <strong>Final quality check:</strong> Before publication, the full page is reviewed for accuracy, completeness, and adherence to our editorial standards.
              </li>
              <li className="leading-relaxed">
                <strong>Publication with date stamp:</strong> Every calculator is published with a clear &quot;Updated&quot; date so users know when it was last reviewed.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">Our Sources</h2>
            <p className="text-[14px] leading-relaxed mb-3">
              We reference authoritative, primary sources. For finance calculators, these include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px] mb-4">
              <li>Internal Revenue Service (IRS.gov)</li>
              <li>Federal Reserve (federalreserve.gov)</li>
              <li>Bureau of Labor Statistics (bls.gov)</li>
              <li>Social Security Administration (ssa.gov)</li>
              <li>Academic journals indexed in JSTOR and peer-reviewed finance research</li>
            </ul>
            <p className="text-[14px] leading-relaxed mb-3">
              For health calculators, these include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px]">
              <li>Centers for Disease Control and Prevention (CDC.gov)</li>
              <li>National Institutes of Health (NIH.gov)</li>
              <li>World Health Organization (WHO.int)</li>
              <li>Published clinical guidelines and peer-reviewed health research</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">How We Stay Current</h2>
            <p className="text-[14px] leading-relaxed">
              Tax laws change. Health guidelines evolve. Interest rates shift. We review our calculators quarterly against updated source material. When a significant regulatory or guideline change occurs (such as new IRS tax brackets), we update the affected calculators within 30 days and refresh the date stamp.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">How We Handle Errors</h2>
            <p className="text-[14px] leading-relaxed mb-3">
              We are human. If a calculator produces an incorrect result or our educational content contains an error, we want to know immediately. To report an error:
            </p>
            <div className="mt-3 p-4 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB] text-[14px]">
              Email: <a href="mailto:feedback@calculatorz.tools" className="text-[#0F766E] hover:underline">feedback@calculatorz.tools</a><br />
              Include: which calculator, what result you got, what you expected, and any supporting context.
            </div>
            <p className="text-[14px] leading-relaxed mt-3">
              We investigate all error reports within 5 business days. If we confirm an error, we correct it and update the page date stamp.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">What We Do Not Do</h2>
            <ul className="list-disc list-inside space-y-2 text-[14px]">
              <li>We do not use AI to auto-generate calculator logic or financial advice.</li>
              <li>We do not accept payment from financial institutions or health companies to rank their products.</li>
              <li>We do not publish content designed to promote a product over a more accurate result.</li>
              <li>We do not copy formulas or educational content from other sites without independent verification.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">Our Disclaimer</h2>
            <div className="p-4 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB] text-[14px] leading-relaxed">
              Everything on CalcFlow is for informational purposes only. Nothing here is financial, tax, legal, or medical advice. We are not licensed advisors, attorneys, or healthcare providers. Always verify important decisions with a qualified professional.
            </div>
          </section>

        </div>
      </div>

      <div className="mt-6 text-center text-[13px] text-[#9CA3AF]">
        <Link href="/about" className="hover:text-[#0F766E]">About</Link>
        <span className="mx-3">·</span>
        <Link href="/contact" className="hover:text-[#0F766E]">Contact</Link>
        <span className="mx-3">·</span>
        <Link href="/" className="hover:text-[#0F766E]">Back to CalcFlow</Link>
      </div>
    </div>
  )
}
