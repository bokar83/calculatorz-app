import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

// PWA only in production, disabled during static export build to avoid webpack/turbopack conflict
if (isProd) {
  const withPWA = require('@ducanh2912/next-pwa').default({
    dest: 'public',
    register: true,
    skipWaiting: true,
  })
  module.exports = withPWA(nextConfig)
} else {
  module.exports = nextConfig
}
