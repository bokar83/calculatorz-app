import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#0F766E',
          dark: '#0D5C57',
          pale: '#F0FDFA',
        },
        slate: {
          nav: '#0C3547',
        },
        orange: '#FF6B35',
        'off-white': '#F8FAFB',
        border: '#E5E7EB',
        text1: '#1A1F36',
        text2: '#6B7280',
        text3: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
