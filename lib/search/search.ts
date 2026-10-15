// Pure search over a small static index. No dependencies; works on server and client.

export interface SearchItem {
  /** title */
  t: string
  /** url (with trailing slash) */
  u: string
  /** group label shown next to the result */
  g: string
  /** short description */
  d?: string
  /** keywords, synonyms and unit aliases (space separated, any case) */
  k: string
  /** pair pages only: from-unit aliases joined by "|" */
  f?: string
  /** pair pages only: to-unit aliases joined by "|" */
  o?: string
}

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[°]/g, ' degrees ')
    .replace(/[^a-z0-9/ ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const STOP = new Set(['to', 'in', 'into', 'vs', 'and', 'the', 'a', 'of', 'calculator', 'calculators', 'converter', 'convert', 'conversion', 'how', 'many', 'much'])

function tokens(s: string): string[] {
  return normalize(s).split(' ').filter(Boolean)
}

/** Split "x to y" / "x in y" / "x into y" / "x vs y" / "x -> y" into two phrases. */
export function splitToPhrase(query: string): [string, string] | null {
  const q = ' ' + query.toLowerCase().replace(/->|=>|→/g, ' to ').replace(/\s+/g, ' ').trim() + ' '
  const m = q.match(/^ (.+?) (?:to|in|into|vs|versus|2) (.+?) $/)
  if (!m) return null
  const a = normalize(m[1])
  const b = normalize(m[2])
  return a && b ? [a, b] : null
}

function tokenScore(qt: string, hay: string[]): number {
  let best = 0
  for (const h of hay) {
    if (h === qt) return 1
    if (qt.length >= 2 && h.startsWith(qt)) best = Math.max(best, 0.7)
    else if (qt.length >= 4 && h.length >= 4 && (qt.startsWith(h) || qt.replace(/s$/, '') === h.replace(/s$/, ''))) best = Math.max(best, 0.6)
  }
  return best
}

function aliasMatch(phrase: string, aliases: string | undefined): boolean {
  if (!aliases) return false
  const p = normalize(phrase)
  return aliases.split('|').some(a => {
    const n = normalize(a)
    return n === p || (p.length >= 3 && n.startsWith(p)) || n.replace(/s$/, '') === p.replace(/s$/, '')
  })
}

export function scoreItem(item: SearchItem, query: string): number {
  const q = normalize(query)
  if (q.length < 2) return 0
  const title = normalize(item.t)
  let score = 0

  if (title === q) score += 100
  else if (title.startsWith(q)) score += 60
  else if (title.includes(q)) score += 35

  const phrase = splitToPhrase(query)
  if (phrase && item.f && item.o) {
    const fwd = aliasMatch(phrase[0], item.f) && aliasMatch(phrase[1], item.o)
    const rev = aliasMatch(phrase[0], item.o) && aliasMatch(phrase[1], item.f)
    if (fwd) score += 140
    else if (rev) score += 60 // reverse pair exists, tool swaps live
  }

  let qts = tokens(query).filter(t => !STOP.has(t))
  if (qts.length === 0) qts = tokens(query)
  const titleT = tokens(item.t)
  const keyT = tokens(item.k)
  const descT = tokens(item.d ?? '')

  let sum = 0
  for (const qt of qts) {
    const a = tokenScore(qt, titleT) * 10
    const b = tokenScore(qt, keyT) * 7
    const c = tokenScore(qt, descT) * 1.5
    const best = Math.max(a, b, c)
    if (best === 0) return score >= 60 ? score : 0 // every query word must match something, unless a strong phrase/pair match already did
    sum += best
  }
  return score + sum
}

export function search(items: SearchItem[], query: string, limit = 8): SearchItem[] {
  if (normalize(query).length < 2) return []
  const scored: { item: SearchItem; s: number }[] = []
  for (const item of items) {
    const s = scoreItem(item, query)
    if (s > 0) scored.push({ item, s })
  }
  scored.sort((a, b) => b.s - a.s || a.item.t.length - b.item.t.length)
  return scored.slice(0, limit).map(x => x.item)
}
