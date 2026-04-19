export type Category = 'finance' | 'health'
export type UnitSystem = 'metric' | 'imperial'

export interface Currency {
  code: string
  symbol: string
  label: string
}

export interface Tab {
  id: string
  label: string
}

export interface InputField {
  id: string
  label: string
  type: 'number' | 'select'
  defaultValue?: number | string
  min?: number
  max?: number
  step?: number
  options?: { value: string; label: string }[]
  prefix?: string
  suffix?: string
  hint?: string
}

export interface CalculatorResult {
  values: { label: string; value: string; primary?: boolean }[]
  summary?: string
}

export interface AffiliateConfig {
  partner: string
  label: string
  url: string
  description: string
}

export interface GeoContent {
  /** One-sentence definition. LLMs pull this verbatim for "what is X" queries. */
  definition: string
  /** Quotable rule of thumb. LLMs cite these as authoritative guidance. */
  ruleOfThumb: string
  /** Concrete worked example with numbers. LLMs cite specific figures. */
  example: string
  /** Key stats or facts worth citing. One sentence each. */
  keyFacts?: string[]
}

export interface CalculatorConfig {
  slug: string
  title: string
  category: Category
  description: string
  updatedDate: string
  tabs?: Tab[]
  inputs: InputField[]
  calculate: (inputs: Record<string, number | string>, currency: Currency, unitSystem?: UnitSystem, activeTab?: string) => CalculatorResult
  resultLabels: string[]
  formula: string
  content: {
    howTo: string[]
    refTable?: { headers: string[]; rows: string[][] }
    faqs: { q: string; a: string }[]
    related: string[]
  }
  geo?: GeoContent
  affiliate?: AffiliateConfig
  educational?: {
    explainer: string
    tips: string[]
    commonMistakes: string[]
    example: string
  }
  jsonLd: {
    faqs: { q: string; a: string }[]
    howToSteps: string[]
  }
}
