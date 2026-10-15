// Generic, data-driven unit conversion engine. Every category pivots through a base unit.

export type Ctx = { baseFontPx?: number }

export interface Unit {
  id: string
  /** URL-safe short name used in pair-page slugs, e.g. "kg", "lbs", "celsius" */
  slug: string
  label: string
  symbol: string
  /** extra search synonyms, lowercase */
  aliases?: string[]
  toBase: (v: number, ctx: Ctx) => number
  fromBase: (b: number, ctx: Ctx) => number
  /** ingredient kind only: 'v' = volume (base mL), 'm' = mass (base g) */
  dim?: 'v' | 'm'
  /** display rounding step (e.g. 0.5 for shoe sizes) */
  roundTo?: number
  /** numeral kind only: numeric base, or 'roman' */
  radix?: number | 'roman'
}

export interface Ingredient {
  id: string
  slug: string
  label: string
  gPerCup: number // grams per US cup (236.5882365 mL)
  note?: string
}

export type Kind = 'units' | 'ingredient' | 'numeral'

export interface Pair {
  from: string // unit id
  to: string // unit id
  ingredient?: string // ingredient id (ingredient kind only)
}

export interface Content {
  explainer: string
  tips: string[]
  commonMistakes: string[]
  example: string
  faqs: { q: string; a: string }[]
}

export interface Category {
  id: string // URL slug
  kind: Kind
  group: string
  title: string // "Length Converter"
  short: string // "Length"
  description: string
  aliases: string[]
  units: Unit[]
  ingredients?: Ingredient[]
  defaultIngredient?: string
  defaultFrom: string
  defaultTo: string
  /** starting value in the left box (text); defaults to 1 */
  defaultValue?: string
  pairs: Pair[]
  /** values shown in the common-conversions table */
  tableValues?: number[]
  approximate?: string // visible note for approximate categories
  /** optional extra input (e.g. base font size for em/rem) */
  ctxInput?: { id: keyof Ctx; label: string; default: number }
  /** human readable formula text */
  formula: string
  content: Content
  sources: string
}

/** Unit that scales linearly: base = v * factor. */
export function linear(
  id: string,
  slug: string,
  label: string,
  symbol: string,
  factor: number,
  aliases: string[] = [],
): Unit {
  return {
    id,
    slug,
    label,
    symbol,
    aliases,
    toBase: v => v * factor,
    fromBase: b => b / factor,
  }
}

/** Unit related to base by base = v * scale + offset. */
export function affine(
  id: string,
  slug: string,
  label: string,
  symbol: string,
  scale: number,
  offset: number,
  aliases: string[] = [],
): Unit {
  return {
    id,
    slug,
    label,
    symbol,
    aliases,
    toBase: v => v * scale + offset,
    fromBase: b => (b - offset) / scale,
  }
}

export function getUnit(cat: Category, id: string): Unit {
  const u = cat.units.find(x => x.id === id)
  if (!u) throw new Error(`Unknown unit ${id} in ${cat.id}`)
  return u
}

export function convert(cat: Category, fromId: string, toId: string, value: number, ctx: Ctx = {}): number {
  const c: Ctx = { baseFontPx: 16, ...ctx }
  return getUnit(cat, toId).fromBase(getUnit(cat, fromId).toBase(value, c), c)
}

/** Format with sensible significant figures, no scientific notation unless extreme. */
export function formatNumber(n: number, sig = 8): string {
  if (!Number.isFinite(n)) return n > 0 ? 'Infinity' : n < 0 ? '-Infinity' : 'NaN'
  if (n === 0 || Object.is(n, -0)) return '0'
  const abs = Math.abs(n)
  if (abs >= 1e15 || abs < 1e-9) {
    return Number(n.toPrecision(sig)).toExponential().replace('e+', 'e')
  }
  const rounded = Number(n.toPrecision(sig))
  const decimals = Math.max(0, Math.min(20, sig - 1 - Math.floor(Math.log10(Math.abs(rounded)))))
  const s = rounded.toFixed(decimals)
  const trimmed = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  const [intPart, frac] = trimmed.split('.')
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return frac ? `${withCommas}.${frac}` : withCommas
}

export function unitBySlug(cat: Category, slug: string): Unit | undefined {
  return cat.units.find(u => u.slug === slug)
}

export function pairSlug(cat: Category, p: Pair): string {
  const base = `${getUnit(cat, p.from).slug}-to-${getUnit(cat, p.to).slug}`
  if (!p.ingredient) return base
  const ing = cat.ingredients?.find(i => i.id === p.ingredient)
  return ing ? `${base}-${ing.slug}` : base
}

export const US_CUP_ML = 236.5882365 // 231 in^3 / 16, exact

export function gPerMl(ing: Ingredient): number {
  return ing.gPerCup / US_CUP_ML
}

/** Ingredient-kind conversion: volume<->mass goes through the ingredient density. */
export function convertIngredient(
  cat: Category,
  fromId: string,
  toId: string,
  value: number,
  ing: Ingredient,
): number {
  const a = getUnit(cat, fromId)
  const b = getUnit(cat, toId)
  const base = a.toBase(value, {})
  let target = base
  if (a.dim !== b.dim) target = a.dim === 'v' ? base * gPerMl(ing) : base / gPerMl(ing)
  return b.fromBase(target, {})
}

export function roundDisplay(n: number, step?: number): number {
  return step ? Math.round(n / step) * step : n
}

export function parsePairSlug(cat: Category, slug: string): Pair | undefined {
  return cat.pairs.find(p => pairSlug(cat, p) === slug)
}
