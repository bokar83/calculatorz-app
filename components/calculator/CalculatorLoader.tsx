'use client'

import { getCalculator } from '@/lib/registry'
import CalculatorShell from './CalculatorShell'
import type { Currency } from '@/lib/calculators/types'

interface CalculatorLoaderProps {
  slug: string
  initialCurrency?: Currency
  presets?: Record<string, number | string>
  hiddenInputs?: string[]
}

export default function CalculatorLoader({ slug, initialCurrency, presets, hiddenInputs }: CalculatorLoaderProps) {
  const config = getCalculator(slug)
  if (!config) return null
  return <CalculatorShell config={config} initialCurrency={initialCurrency} presets={presets} hiddenInputs={hiddenInputs} />
}
