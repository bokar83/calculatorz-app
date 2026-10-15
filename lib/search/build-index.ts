// Builds the site search index from the calculator registry and the converter data.
import { getCalculatorsByCategory, getGroup } from '../registry.ts'
import { buildConverterItems } from './converter-items.ts'
import type { SearchItem } from './search.ts'

// Plain-language synonyms for existing calculators (what people type vs what the page is called).
const SYNONYMS: Record<string, string> = {
  'take-home-pay': 'paycheck pay check net pay after tax take home salary after taxes wages',
  'hourly-to-salary': 'wage hourly rate annual salary yearly pay income',
  'salary-to-hourly': 'hourly wage per hour pay rate',
  'mortgage-payment': 'home loan house payment monthly mortgage amortization',
  'loan-payment': 'loan emi installment monthly payment borrow',
  'auto-loan': 'car loan vehicle financing',
  'compound-interest': 'investing growth savings interest',
  'income-tax': 'federal tax irs tax bracket',
  'bmi': 'body mass index weight height obesity',
  'bmr-calories': 'calories burn metabolism tdee maintenance',
  'body-fat': 'body fat percentage navy method',
  'water-intake': 'hydration drink water how much water',
  'due-date': 'pregnancy pregnant baby due',
  'ovulation': 'fertility fertile window conception',
  'sleep-calculator': 'bedtime wake up sleep cycles',
  'unit-converter': 'convert units length weight temperature volume metric imperial',
  'cm-to-inches': 'centimeters inches height feet',
  'currency-converter': 'exchange rate forex money convert currency usd eur',
  'hex-to-rgb': 'color colour css code',
  'percentage': 'percent percentage of',
  'age-calculator': 'how old birthday date of birth',
  'date-difference': 'days between dates date calculator',
  'tip-calculator': 'gratuity restaurant bill split',
  'sales-tax': 'vat purchase tax',
  'gpa-calculator': 'grade point average college grades',
}

const SEARCH_LABEL = { finance: 'Finance', health: 'Health', converters: 'Converter', tools: 'Tool' } as const

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = []

  for (const category of ['finance', 'health'] as const) {
    for (const c of getCalculatorsByCategory(category)) {
      items.push({
        t: c.title,
        u: `/${category}/${c.slug}/`,
        g: SEARCH_LABEL[getGroup(c)],
        d: c.description,
        k: `${c.slug.replace(/-/g, ' ')} ${category} ${getGroup(c)} ${SYNONYMS[c.slug] ?? ''}`,
      })
    }
  }

  items.push({
    t: 'Salary Negotiation & Take-Home Calculator',
    u: '/finance/salary-negotiation-calculator/',
    g: 'Finance',
    d: 'Compare job offers by real take-home pay across states, filing status and W-2 vs self-employed.',
    k: 'job offer negotiate raise salary paycheck take home pay state tax',
  })
  items.push({ t: 'All Finance Calculators', u: '/finance/', g: 'Page', d: 'Browse every finance calculator.', k: 'finance money' })
  items.push({ t: 'Everyday Tools', u: '/tools/', g: 'Page', d: 'Age, date, GPA and percentage tools.', k: 'tools age date gpa percentage' })
  items.push({ t: 'All Health Calculators', u: '/health/', g: 'Page', d: 'Browse every health calculator.', k: 'health fitness' })
  items.push({
    t: 'Unit Converters',
    u: '/converters/',
    g: 'Converter',
    d: 'Every unit converter: length, weight, volume, temperature, cooking and more.',
    k: 'converters convert units metric imperial conversion',
  })

  items.push(...buildConverterItems())
  return items
}
