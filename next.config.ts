import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  turbopack: {},
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, must-revalidate' },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/finance/take-home-pay-calculator-:state/',
        destination: '/finance/take-home-pay-calculator/:state/',
      },
    ]
  },
}

export default nextConfig
