import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/content/JsonLd'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    template: '%s | CalcFlow',
    default: 'CalcFlow — Every number, answered.',
  },
  description: 'Free online calculators for finance, health, math, and more. Over 40 calculators, mobile-friendly.',
  metadataBase: new URL('https://calculatorz.tools'),
}

const GA_ID = 'G-W83XRJE997'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0F766E" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          // GA4 init — hardcoded static string, no user input
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');` }}
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
        />
        <JsonLd schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'CalcFlow',
          url: 'https://calculatorz.tools',
          logo: 'https://calculatorz.tools/icon.png',
          description: 'Free online calculators for finance and health, paired with plain-English education to help you understand your numbers.',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            email: 'hello@calculatorz.tools',
          },
          sameAs: [],
        }} />
      </head>
      <body className="bg-[#F8FAFB] min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
