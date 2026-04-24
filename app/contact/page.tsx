import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact CalcFlow — Questions, Feedback, and Support',
  description: 'Contact the CalcFlow team with questions, calculator feedback, error reports, or suggestions.',
  alternates: { canonical: 'https://calculatorz.tools/contact/' },
}

export default function ContactPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36]">Contact</span>
      </nav>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h1 className="text-[28px] font-extrabold text-[#1A1F36] mb-4" style={{ letterSpacing: '-0.02em' }}>
          Get in Touch
        </h1>

        <p className="text-[15px] text-[#6B7280] leading-relaxed mb-8">
          Have a question about a calculator, spotted an error, or want to suggest a tool? We read every message. Use the options below to reach us.
        </p>

        <div className="space-y-4 mb-8">

          <div className="p-5 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB]">
            <p className="text-[13px] font-semibold text-[#1A1F36] uppercase tracking-wide mb-1">General Questions</p>
            <p className="text-[14px] text-[#6B7280] mb-2">Not sure where to start? Send us a note.</p>
            <a
              href="mailto:hello@calculatorz.tools"
              className="text-[#0F766E] font-medium hover:underline text-[15px]"
            >
              hello@calculatorz.tools
            </a>
          </div>

          <div className="p-5 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB]">
            <p className="text-[13px] font-semibold text-[#1A1F36] uppercase tracking-wide mb-1">Report an Error or Calculator Bug</p>
            <p className="text-[14px] text-[#6B7280] mb-2">Wrong result, broken input, or missing formula? Tell us and we will fix it.</p>
            <a
              href="mailto:feedback@calculatorz.tools"
              className="text-[#0F766E] font-medium hover:underline text-[15px]"
            >
              feedback@calculatorz.tools
            </a>
          </div>

          <div className="p-5 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB]">
            <p className="text-[13px] font-semibold text-[#1A1F36] uppercase tracking-wide mb-1">Legal and Privacy</p>
            <p className="text-[14px] text-[#6B7280] mb-2">Questions about our privacy policy, terms, or data practices.</p>
            <a
              href="mailto:legal@calculatorz.tools"
              className="text-[#0F766E] font-medium hover:underline text-[15px]"
            >
              legal@calculatorz.tools
            </a>
          </div>

        </div>

        <p className="text-[14px] text-[#6B7280] mb-6">
          We typically respond within 1-3 business days.
        </p>

        <div className="p-4 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB] text-[13px] text-[#9CA3AF] leading-relaxed">
          CalcFlow does not provide financial, tax, legal, or medical advice. For questions about your specific situation, please consult a qualified professional.
        </div>

      </div>

      <div className="mt-6 text-center text-[13px] text-[#9CA3AF]">
        <Link href="/privacy" className="hover:text-[#0F766E]">Privacy Policy</Link>
        <span className="mx-3">·</span>
        <Link href="/terms" className="hover:text-[#0F766E]">Terms of Use</Link>
        <span className="mx-3">·</span>
        <Link href="/" className="hover:text-[#0F766E]">Back to CalcFlow</Link>
      </div>
    </div>
  )
}
