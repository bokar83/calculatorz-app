import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use — CalcFlow',
  description: 'CalcFlow terms of use covering calculator accuracy, disclaimers, intellectual property, and acceptable use.',
}

export default function TermsPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36]">Terms of Use</span>
      </nav>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h1 className="text-[28px] font-extrabold text-[#1A1F36] mb-2" style={{ letterSpacing: '-0.02em' }}>
          Terms of Use
        </h1>
        <p className="text-[13px] text-[#9CA3AF] mb-8">Last updated: April 15, 2026</p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-6">

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">1. Site Operator</h2>
            <p className="leading-relaxed">
              CalcFlow is an independent web publisher and the sole operator of calculatorz.tools, based in Salt Lake City, UT. All content, tools, and services on this website are provided by the CalcFlow editorial team. For legal inquiries, contact us at <a href="mailto:legal@calculatorz.tools" className="text-[#0F766E] hover:underline">legal@calculatorz.tools</a>.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">2. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using CalcFlow (&quot;the Site&quot;), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">3. Calculator Accuracy and Disclaimer</h2>
            <p className="leading-relaxed mb-3">
              CalcFlow provides calculators for informational and educational purposes only. While we strive for accuracy, calculator results are estimates based on the inputs you provide and standard formulas.
            </p>
            <p className="leading-relaxed mb-3">
              <strong>Important:</strong> Calculator results are not financial, medical, legal, or professional advice. Do not make significant financial, health, or other decisions based solely on results from this site. Always consult a qualified professional (financial advisor, physician, attorney, etc.) before making important decisions.
            </p>
            <p className="leading-relaxed">
              CalcFlow is not responsible for errors in calculation results, outdated tax rates or legal thresholds, decisions made based on calculator outputs, or any losses or damages resulting from use of this site.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">4. Permitted Use</h2>
            <p className="leading-relaxed mb-3">You may use CalcFlow for personal, non-commercial purposes. You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-[14px]">
              <li>Scrape, crawl, or systematically download content from the Site.</li>
              <li>Reproduce, distribute, or commercially exploit any part of the Site without written permission.</li>
              <li>Attempt to reverse-engineer, decompile, or extract source code from the Site.</li>
              <li>Use the Site in any way that could harm, disable, or impair its operation.</li>
              <li>Use automated tools to interact with calculators at scale.</li>
              <li>Use the Site to transmit spam, malware, or any harmful content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">5. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on CalcFlow — including calculator logic, design, copy, and code — is the property of CalcFlow or its licensors and is protected by copyright and intellectual property law. You may not reproduce or distribute any content without express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">6. Advertising</h2>
            <p className="leading-relaxed">
              CalcFlow displays advertisements served by Google AdSense and potentially other advertising networks. Advertisements are clearly labeled and separated from calculator content. We are not responsible for the content of third-party advertisements. Clicking ads is entirely voluntary.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">7. Third-Party Links</h2>
            <p className="leading-relaxed">
              The Site may contain links to third-party websites. These links are provided for convenience only. We have no control over the content or practices of third-party sites and accept no responsibility for them. Visiting linked sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">8. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, CalcFlow and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site, including but not limited to loss of profits, data, or goodwill, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">9. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold harmless CalcFlow and its operators from any claims, damages, losses, or expenses (including attorney&apos;s fees) arising from your use of the Site or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">10. Changes to These Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes take effect when posted to the Site. Continued use of the Site after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">11. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles. Any disputes shall be resolved in the courts of California.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">12. Contact</h2>
            <p className="leading-relaxed">
              Questions about these Terms? Contact us at:
            </p>
            <div className="mt-3 p-4 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB] text-[14px]">
              <strong>CalcFlow</strong><br />
              Email: <a href="mailto:legal@calculatorz.tools" className="text-[#0F766E] hover:underline">legal@calculatorz.tools</a>
            </div>
          </section>

        </div>
      </div>

      <div className="mt-6 text-center text-[13px] text-[#9CA3AF]">
        <Link href="/privacy" className="hover:text-[#0F766E]">Privacy Policy</Link>
        <span className="mx-3">·</span>
        <Link href="/" className="hover:text-[#0F766E]">Back to CalcFlow</Link>
      </div>
    </div>
  )
}
