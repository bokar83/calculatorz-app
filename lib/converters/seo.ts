// Server-side helpers: tables, pair-page copy, metadata, JSON-LD for converter pages.
import type { Category } from './engine.ts'
import { convert, convertIngredient, formatNumber, getUnit, roundDisplay } from './engine.ts'
import { convertNumeral, toRoman } from './numerals.ts'
import { CATEGORIES, convertPair, pairTitleParts, type PairEntry } from './index.ts'

export const BASE_URL = 'https://calculatorz.tools'

export const categoryUrl = (id: string) => `${BASE_URL}/converters/${id}/`
export const pairUrl = (e: PairEntry) => `${BASE_URL}/converters/${e.category.id}/${e.slug}/`
export const categoryPath = (id: string) => `/converters/${id}/`
export const pairPath = (e: PairEntry) => `/converters/${e.category.id}/${e.slug}/`

export interface Table {
  headers: string[]
  rows: string[][]
}

function fmtUnits(cat: Category, from: string, to: string, v: number, ingredientId?: string): string {
  const u = getUnit(cat, to)
  if (cat.kind === 'ingredient') {
    const ing = cat.ingredients!.find(i => i.id === (ingredientId ?? cat.defaultIngredient))!
    return formatNumber(roundDisplay(convertIngredient(cat, from, to, v, ing), u.roundTo))
  }
  return formatNumber(roundDisplay(convert(cat, from, to, v, { baseFontPx: 16 }), u.roundTo))
}

function numeralInput(cat: Category, fromId: string, v: number): string {
  const r = getUnit(cat, fromId).radix!
  return r === 'roman' ? toRoman(v) : v.toString(r).toUpperCase()
}

function fmtNumeral(cat: Category, from: string, to: string, v: number): string {
  const rf = getUnit(cat, from).radix!
  const rt = getUnit(cat, to).radix!
  return convertNumeral(numeralInput(cat, from, v), rf, rt)
}

const NUMERAL_VALUES = [1, 2, 4, 8, 10, 16, 64, 100, 255, 1000]
const ROMAN_VALUES = [1, 4, 9, 14, 40, 90, 400, 1994, 2026, 3999]

/** Table converting `values` of `from` into each unit of `toIds`. */
export function unitTable(cat: Category, from: string, toIds: string[], values: number[], ingredientId?: string): Table {
  const f = getUnit(cat, from)
  return {
    headers: [f.label, ...toIds.map(id => getUnit(cat, id).label)],
    rows: values.map(v => [
      `${formatNumber(v)} ${f.symbol}`,
      ...toIds.map(id => (cat.kind === 'numeral' ? fmtNumeral(cat, from, id, v) : fmtUnits(cat, from, id, v, ingredientId))),
    ]),
  }
}

export function categoryTable(cat: Category): Table {
  if (cat.id === 'roman-numerals') {
    return { headers: ['Number', 'Roman numeral'], rows: ROMAN_VALUES.map(v => [String(v), toRoman(v)]) }
  }
  if (cat.id === 'number-bases') {
    return unitTable(cat, 'dec', ['bin', 'oct', 'hex'], NUMERAL_VALUES)
  }
  if (cat.id === 'cooking') {
    const rows = cat.ingredients!.filter(i => i.id !== 'water').map(i => [
      i.label,
      `${fmtUnits(cat, 'cup', 'g', 1, i.id)} g`,
      `${fmtUnits(cat, 'tbsp', 'g', 1, i.id)} g`,
      `${fmtUnits(cat, 'tsp', 'g', 1, i.id)} g`,
    ])
    return { headers: ['Ingredient', '1 cup', '1 tablespoon', '1 teaspoon'], rows }
  }
  if (cat.id === 'water-weight') {
    return {
      headers: ['Water volume', 'Kilograms', 'Pounds'],
      rows: [1, 5, 10, 20, 50, 100].flatMap(v => [
        [`${v} L`, fmtUnits(cat, 'l', 'kg', v), fmtUnits(cat, 'l', 'lb', v)],
      ]).concat([1, 5, 10, 50].map(v => [`${v} US gal`, fmtUnits(cat, 'gal', 'kg', v), fmtUnits(cat, 'gal', 'lb', v)])),
    }
  }
  const values = cat.tableValues ?? [1, 2, 5, 10, 50, 100]
  const targets = cat.units.filter(u => u.id !== cat.defaultFrom).slice(0, 5).map(u => u.id)
  // always include the default target and keep a short list
  const toIds = Array.from(new Set([cat.defaultTo, ...targets])).slice(0, 5)
  return unitTable(cat, cat.defaultFrom, toIds, values)
}

export interface PairContent {
  h1: string
  title: string
  description: string
  intro: string
  fwd: Table
  rev: Table
  example: string
  faqs: { q: string; a: string }[]
  howTo: string[]
}

export function pairContent(entry: PairEntry): PairContent {
  const { category: cat, pair } = entry
  const from = getUnit(cat, pair.from)
  const to = getUnit(cat, pair.to)
  const parts = pairTitleParts(entry)
  const ingSuffix = parts.ingredient ? ` (${parts.ingredient})` : ''
  const ingId = pair.ingredient
  const numeral = cat.kind === 'numeral'

  const one = numeral ? fmtNumeral(cat, pair.from, pair.to, 10) : fmtUnits(cat, pair.from, pair.to, 1, ingId)
  const oneRev = numeral ? fmtNumeral(cat, pair.to, pair.from, 10) : fmtUnits(cat, pair.to, pair.from, 1, ingId)
  const lead = numeral ? `10 ${from.symbol}` : `1 ${from.symbol}`
  const leadRev = numeral ? `10 ${to.symbol}` : `1 ${to.symbol}`

  const h1 = `${from.label} to ${to.label} Converter${ingSuffix}`
  const title = `${from.label} to ${to.label}${ingSuffix} Converter (${from.symbol} to ${to.symbol})`
  const description = numeral
    ? `Convert ${from.label.toLowerCase()} to ${to.label.toLowerCase()} instantly. Example: ${lead} = ${one} ${to.symbol}.`
    : `Convert ${from.label.toLowerCase()} to ${to.label.toLowerCase()}${ingSuffix.toLowerCase()} instantly. ${lead} = ${one} ${to.symbol}. Free calculator, conversion table and formula.`

  const values = numeral ? (cat.id === 'roman-numerals' ? ROMAN_VALUES : NUMERAL_VALUES) : (cat.tableValues ?? [1, 2, 5, 10, 25, 50, 100])
  const rowFwd = (v: number) => [`${formatNumber(v)} ${from.symbol}`, `${numeral ? fmtNumeral(cat, pair.from, pair.to, v) : fmtUnits(cat, pair.from, pair.to, v, ingId)} ${to.symbol}`]
  const rowRev = (v: number) => [`${formatNumber(v)} ${to.symbol}`, `${numeral ? fmtNumeral(cat, pair.to, pair.from, v) : fmtUnits(cat, pair.to, pair.from, v, ingId)} ${from.symbol}`]
  const safe = (fn: (v: number) => string[], v: number): string[] | null => {
    try { return fn(v) } catch { return null }
  }
  const fwd = { headers: [from.label, to.label], rows: values.map(v => safe(rowFwd, v)).filter(Boolean) as string[][] }
  const rev = { headers: [to.label, from.label], rows: values.map(v => safe(rowRev, v)).filter(Boolean) as string[][] }

  const exampleValue = numeral ? 255 : (cat.tableValues?.find(v => v >= 10) ?? 10)
  const exampleOut = numeral
    ? (cat.id === 'roman-numerals' ? fmtNumeral(cat, pair.from, pair.to, 1994) : fmtNumeral(cat, pair.from, pair.to, exampleValue))
    : fmtUnits(cat, pair.from, pair.to, exampleValue, ingId)
  const exampleIn = numeral
    ? (cat.id === 'roman-numerals' ? `${numeralInput(cat, pair.from, 1994)}` : numeralInput(cat, pair.from, exampleValue))
    : formatNumber(exampleValue)
  const example = `Worked example: ${exampleIn} ${from.symbol} = ${exampleOut} ${to.symbol}${parts.ingredient ? ` for ${parts.ingredient.toLowerCase()}` : ''}. ${cat.content.example}`

  const intro = numeral
    ? `${cat.content.explainer.split('. ')[0]}. Use the converter below to turn ${from.label.toLowerCase()} into ${to.label.toLowerCase()} and back.`
    : `${lead} equals ${one} ${to.symbol}, and ${leadRev} equals ${oneRev} ${from.symbol}${parts.ingredient ? ` for ${parts.ingredient.toLowerCase()}` : ''}. Enter a value in either box to convert ${from.label.toLowerCase()} to ${to.label.toLowerCase()}${ingSuffix.toLowerCase()} and back. ${cat.formula}.`

  const faqs = [
    { q: `How many ${to.label.toLowerCase()} are in ${lead}?`, a: `${lead} equals ${one} ${to.symbol}${parts.ingredient ? ` for ${parts.ingredient.toLowerCase()}` : ''}.` },
    { q: `How many ${from.label.toLowerCase()} are in ${leadRev}?`, a: `${leadRev} equals ${oneRev} ${from.symbol}${parts.ingredient ? ` for ${parts.ingredient.toLowerCase()}` : ''}.` },
    { q: `What is the formula to convert ${from.label.toLowerCase()} to ${to.label.toLowerCase()}?`, a: `${cat.formula}.` },
    ...cat.content.faqs.slice(0, 1),
  ]
  const howTo = [
    `Type a number in the ${from.label} box.`,
    `The ${to.label} result appears instantly; you can also edit the ${to.label} box to convert backwards.`,
    'Use the swap button to reverse the direction and Copy result to copy the answer.',
  ]
  return { h1, title, description, intro, fwd, rev, example, faqs, howTo }
}

export function categoryFaqs(cat: Category): { q: string; a: string }[] {
  return cat.content.faqs
}

export function categoryHowTo(): string[] {
  return [
    `Pick the unit you have in the left selector and the unit you want in the right selector.`,
    `Type a number in either box; the other box updates instantly.`,
    `Use the swap button to reverse the direction and Copy result to copy the answer.`,
  ]
}

export function crumbs(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  }
}

export function pageSchemas(args: { name: string; description: string; url: string; faqs: { q: string; a: string }[]; howTo: string[]; trail: { name: string; url: string }[] }) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: args.name,
      description: args.description,
      dateModified: '2026-10-14',
      author: { '@type': 'Organization', name: 'CalcFlow Editorial Team', url: `${BASE_URL}/about/` },
      publisher: { '@type': 'Organization', name: 'CalcFlow', url: `${BASE_URL}/` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: args.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to use the ${args.name}`,
      step: args.howTo.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
    },
    crumbs(args.trail),
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      applicationCategory: 'UtilitiesApplication',
      name: args.name,
      description: args.description,
      url: args.url,
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ]
}

export function relatedCategories(cat: Category, n = 6): Category[] {
  const same = CATEGORIES.filter(c => c.group === cat.group && c.id !== cat.id)
  const rest = CATEGORIES.filter(c => c.group !== cat.group)
  return [...same, ...rest].slice(0, n)
}

export { convertPair }
