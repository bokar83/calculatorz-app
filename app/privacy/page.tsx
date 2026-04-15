import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — CalcFlow',
  description: 'CalcFlow privacy policy covering data collection, cookies, advertising, and your rights.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36]">Privacy Policy</span>
      </nav>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h1 className="text-[28px] font-extrabold text-[#1A1F36] mb-2" style={{ letterSpacing: '-0.02em' }}>
          Privacy Policy
        </h1>
        <p className="text-[13px] text-[#9CA3AF] mb-8">Last updated: April 15, 2026</p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-6">

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">1. Who We Are</h2>
            <p className="leading-relaxed">
              CalcFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website at calculatorz.tools, providing free online calculators for finance, health, and everyday decisions. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">2. Information We Collect</h2>
            <p className="leading-relaxed mb-3">We collect minimal information necessary to operate the site:</p>
            <ul className="list-disc list-inside space-y-2 text-[14px]">
              <li><strong>Usage data:</strong> Pages visited, calculator interactions, time on site — collected automatically via analytics tools.</li>
              <li><strong>Device data:</strong> Browser type, operating system, screen size, IP address (anonymized).</li>
              <li><strong>Calculator inputs:</strong> Numbers you enter into calculators are processed locally in your browser. We do not store or transmit your calculator inputs to our servers.</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We do not require account registration and do not collect names, email addresses, or payment information unless you choose to contact us or subscribe to a paid plan.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">3. Cookies and Tracking</h2>
            <p className="leading-relaxed mb-3">
              We use cookies and similar tracking technologies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[14px]">
              <li><strong>Analytics cookies:</strong> To understand how visitors use the site and improve our calculators.</li>
              <li><strong>Advertising cookies:</strong> To serve relevant advertisements through Google AdSense (see Section 4).</li>
              <li><strong>Preference cookies:</strong> To remember your settings (e.g. currency selection, unit system).</li>
            </ul>
            <p className="leading-relaxed mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect some site functionality. Most browsers allow you to refuse new cookies, delete existing cookies, or be notified when cookies are set.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">4. Google AdSense and Advertising</h2>
            <p className="leading-relaxed mb-3">
              CalcFlow uses Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites on the Internet.
            </p>
            <p className="leading-relaxed mb-3">
              You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#0F766E] hover:underline">
                Google&apos;s Ads Settings
              </a>
              . You may also opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#0F766E] hover:underline">
                aboutads.info
              </a>
              .
            </p>
            <p className="leading-relaxed">
              Google&apos;s privacy policy is available at{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0F766E] hover:underline">
                policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">5. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-[14px]">
              <li>To operate, maintain, and improve the website and calculators.</li>
              <li>To analyze usage patterns and optimize user experience.</li>
              <li>To display relevant advertisements through Google AdSense.</li>
              <li>To respond to your inquiries if you contact us.</li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">6. Third-Party Services</h2>
            <p className="leading-relaxed mb-3">We use the following third-party services that may collect data independently:</p>
            <ul className="list-disc list-inside space-y-2 text-[14px]">
              <li><strong>Google AdSense</strong> — advertising (Google LLC, USA)</li>
              <li><strong>Google Analytics</strong> — usage analytics (Google LLC, USA)</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Each of these services has its own privacy policy governing their data collection and use. We encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">7. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              CalcFlow is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">8. Your Rights (GDPR / CCPA)</h2>
            <p className="leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-[14px]">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Data portability (receive your data in a machine-readable format).</li>
              <li>Opt out of the sale of personal information (California residents under CCPA).</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise any of these rights, contact us at the address below.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">9. Data Retention</h2>
            <p className="leading-relaxed">
              We retain anonymized usage analytics data for up to 26 months. We do not retain calculator inputs. If you contact us, we retain correspondence for up to 3 years for record-keeping purposes.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">10. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify users of material changes by updating the &quot;Last updated&quot; date at the top of this page. Continued use of CalcFlow after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold text-[#1A1F36] mb-3">11. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-[#F8FAFB] rounded-lg border border-[#E5E7EB] text-[14px]">
              <strong>CalcFlow</strong><br />
              Email: <a href="mailto:privacy@calculatorz.tools" className="text-[#0F766E] hover:underline">privacy@calculatorz.tools</a>
            </div>
          </section>

        </div>
      </div>

      <div className="mt-6 text-center text-[13px] text-[#9CA3AF]">
        <Link href="/terms" className="hover:text-[#0F766E]">Terms of Use</Link>
        <span className="mx-3">·</span>
        <Link href="/" className="hover:text-[#0F766E]">Back to CalcFlow</Link>
      </div>
    </div>
  )
}
