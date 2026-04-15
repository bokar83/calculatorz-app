'use client'

import { getCalculator } from '@/lib/registry'
import CalculatorShell from './CalculatorShell'
import type { Currency } from '@/lib/calculators/types'

interface CalculatorLoaderProps {
  slug: string
  initialCurrency?: Currency
}

export default function CalculatorLoader({ slug, initialCurrency }: CalculatorLoaderProps) {
  const config = getCalculator(slug)
  if (!config) return null
  return <CalculatorShell config={config} initialCurrency={initialCurrency} />
}
