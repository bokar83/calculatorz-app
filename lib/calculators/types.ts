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
  type: 'number' | 'select' | 'text'
  defaultValue?: number | string
  min?: number
  max?: number
  step?: number
  options?: { value: string; label: string }[]
  prefix?: string
  suffix?: string
  hint?: string
  /**
   * Marks a percent field that can ALSO be entered as an absolute amount.
   * Value is the id of the base field it is a percent of (e.g. 'homePrice').
   * The stored value stays the percent; the shell renders a $/% toggle and
   * keeps the two views in sync live. calculate() reads the percent unchanged.
   */
  percentOf?: string
  /**
   * Default that follows today's date instead of a fixed number, applied on the client after mount
   * (a static default goes stale the day after the site is built).
   * part: which piece of (today + offsetDays) to use.
   */
  todayDefault?: { part: 'year' | 'month' | 'day'; offsetDays: number }
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
  /**
   * Opt-in. Only calculators whose inputs/results are money set this to true; the shell then
   * shows the currency selector. Default (absent) = NO currency tabs, so a new calculator
   * cannot regress.
   */
  usesCurrency?: boolean
  /**
   * Display grouping (listings, hubs, search labels, breadcrumbs). Defaults to `category`.
   * The URL still follows `category`, so existing routes never move.
   */
  displayGroup?: 'converters' | 'tools'
  /**
   * Opt-in. Only calculators whose inputs actually read the metric/imperial unit system set this
   * to true; the shell then shows the unit toggle. Default (absent) = NO toggle.
   */
  usesUnits?: boolean
  /** Input defaults to load when the user switches to imperial (so the shown numbers match the unit). */
  imperialDefaults?: Record<string, number | string>
  /** Optional call-out link rendered under the page header. */
  crossLink?: { href: string; label: string; text: string }
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
