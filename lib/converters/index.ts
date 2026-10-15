import type { Category, Pair } from './engine.ts'
import { getUnit, pairSlug, convert, convertIngredient, formatNumber, roundDisplay } from './engine.ts'
import { length, weight, volume, temperature, area, speed, time } from './data-physical.ts'
import {
  dataStorage, dataTransfer, energy, power, pressure, force, torque, density,
  fuelEconomy, angle, frequency, flowRate, rainfall, typography,
} from './data-more.ts'
import { cooking, waterWeight, shoeSize, womensClothing, mensSuit, numberBases, romanNumerals } from './data-special.ts'

export const GROUPS = ['Everyday', 'Science & engineering', 'Computing', 'Cooking & water', 'Sizes', 'Developer & design'] as const

// Council gate: curated pair pages capped per category, 150 in total. Pair lists are ordered by search demand.
const PAIR_LIMIT: Record<string, number> = {
  length: 10, weight: 9, volume: 9, temperature: 6, area: 6, speed: 6, time: 6, 'fuel-economy': 4,
  energy: 5, power: 6, pressure: 6, force: 3, torque: 3, density: 3, angle: 4, frequency: 4,
  'data-storage': 7, 'data-transfer': 4, cooking: 9, 'water-weight': 4, 'flow-rate': 5, rainfall: 3,
  'shoe-size': 7, 'womens-clothing-size': 4, 'mens-suit-size': 3, typography: 6, 'number-bases': 6, 'roman-numerals': 2,
}

const RAW: Category[] = [
  length, weight, volume, temperature, area, speed, time, fuelEconomy,
  energy, power, pressure, force, torque, density, angle, frequency,
  dataStorage, dataTransfer,
  cooking, waterWeight, flowRate, rainfall,
  shoeSize, womensClothing, mensSuit,
  typography, numberBases, romanNumerals,
]

export const CATEGORIES: Category[] = RAW.map(c => ({ ...c, pairs: c.pairs.slice(0, PAIR_LIMIT[c.id] ?? c.pairs.length) }))

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}

export interface PairEntry {
  category: Category
  pair: Pair
  slug: string
}

export function allPairs(): PairEntry[] {
  return CATEGORIES.flatMap(category => category.pairs.map(pair => ({ category, pair, slug: pairSlug(category, pair) })))
}

export function getPair(categoryId: string, slug: string): PairEntry | undefined {
  const category = getCategory(categoryId)
  if (!category) return undefined
  const pair = category.pairs.find(p => pairSlug(category, p) === slug)
  return pair ? { category, pair, slug } : undefined
}

/** Convert for a pair entry using default ingredient when needed (server-side tables and examples). */
export function convertPair(entry: PairEntry, value: number): number {
  const { category, pair } = entry
  const display = (n: number) => roundDisplay(n, getUnit(category, pair.to).roundTo)
  if (category.kind === 'ingredient') {
    const ing = category.ingredients!.find(i => i.id === (pair.ingredient ?? category.defaultIngredient))!
    return display(convertIngredient(category, pair.from, pair.to, value, ing))
  }
  return display(convert(category, pair.from, pair.to, value, {}))
}

export function pairTitleParts(entry: PairEntry): { from: string; to: string; ingredient?: string } {
  const { category, pair } = entry
  const ing = pair.ingredient ? category.ingredients?.find(i => i.id === pair.ingredient)?.label : undefined
  return { from: getUnit(category, pair.from).label, to: getUnit(category, pair.to).label, ingredient: ing }
}

export { formatNumber }
