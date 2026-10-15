// Search items for the converters. Node-safe (no registry import) so tests can run it directly.
import { CATEGORIES, allPairs } from '../converters/index.ts'
import { getUnit, type Unit } from '../converters/engine.ts'
import type { SearchItem } from './search.ts'

function aliasesOf(u: Unit): string[] {
  return [u.label, u.symbol, u.slug.replace(/-/g, ' '), ...(u.aliases ?? [])].map(a => a.toLowerCase())
}

export function buildConverterItems(): SearchItem[] {
  const items: SearchItem[] = []
  for (const cat of CATEGORIES) {
    const unitAliases = cat.units.flatMap(aliasesOf).join(' ')
    items.push({
      t: cat.title,
      u: `/converters/${cat.id}/`,
      g: 'Converter',
      d: cat.description,
      k: `${cat.id.replace(/-/g, ' ')} ${cat.short} ${cat.aliases.join(' ')} ${unitAliases}`,
    })
  }

  for (const p of allPairs()) {
    const f = getUnit(p.category, p.pair.from)
    const t = getUnit(p.category, p.pair.to)
    const ing = p.pair.ingredient ? p.category.ingredients?.find(i => i.id === p.pair.ingredient)?.label : ''
    items.push({
      t: `${f.label} to ${t.label}${ing ? ` (${ing})` : ''}`,
      u: `/converters/${p.category.id}/${p.slug}/`,
      g: 'Converter',
      k: `${p.category.short} ${ing ?? ''} ${p.category.aliases.slice(0, 4).join(' ')} ${f.symbol} ${t.symbol}`,
      f: aliasesOf(f).join('|'),
      o: aliasesOf(t).join('|'),
    })
  }
  return items
}
