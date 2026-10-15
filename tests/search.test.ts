import { test } from 'node:test'
import assert from 'node:assert/strict'
import { search, splitToPhrase, type SearchItem } from '../lib/search/search.ts'
import { buildConverterItems } from '../lib/search/converter-items.ts'

// Stand-ins for registry calculators (the real index is checked by the live test below).
const calcs: SearchItem[] = [
  { t: 'Mortgage Payment Calculator', u: '/finance/mortgage-payment/', g: 'Finance', d: 'Estimate your monthly mortgage payment.', k: 'mortgage payment finance home loan house payment' },
  { t: 'Take-Home Pay Calculator', u: '/finance/take-home-pay/', g: 'Finance', d: 'Net income after federal tax.', k: 'take home pay finance paycheck pay check net pay' },
  { t: 'BMI Calculator', u: '/health/bmi/', g: 'Health', d: 'Body mass index.', k: 'bmi health body mass index' },
]
const items = [...calcs, ...buildConverterItems()]
const top = (q: string, n = 5) => search(items, q, n).map(r => r.u)

test('REGRESSION: queries that returned nothing with the stub now find results', () => {
  assert.equal(top('mortgage')[0], '/finance/mortgage-payment/')
  assert.equal(top('paycheck')[0], '/finance/take-home-pay/')
  assert.ok(top('kg').length > 0)
  assert.ok(top('kg').some(u => u.startsWith('/converters/weight/')))
  assert.equal(top('kg')[0], '/converters/weight/')
  assert.ok(top('kg', 8).includes('/converters/weight/kg-to-lbs/'), 'kg-to-lbs should be in the top 8 for "kg"')
})

test('x to y phrasing hits the matching pair page first', () => {
  assert.equal(top('kg to lbs')[0], '/converters/weight/kg-to-lbs/')
  assert.equal(top('celsius to fahrenheit')[0], '/converters/temperature/celsius-to-fahrenheit/')
  assert.equal(top('cm to inches')[0], '/converters/length/centimeters-to-inches/')
  assert.equal(top('gallons to liters')[0], '/converters/volume/gallons-to-liters/')
  assert.equal(top('cups to grams flour')[0], '/converters/cooking/cups-to-grams-flour/')
})

test('synonyms and spellings', () => {
  assert.ok(top('litres').some(u => u.startsWith('/converters/volume')))
  assert.ok(top('celsius').some(u => u.startsWith('/converters/temperature')))
  assert.ok(top('lbs').some(u => u.startsWith('/converters/weight')))
  assert.ok(top('kilos').some(u => u.startsWith('/converters/weight')))
  assert.ok(top('mass').some(u => u.startsWith('/converters/weight')))
  assert.ok(top('mph').some(u => u.startsWith('/converters/speed')))
  assert.ok(top('shoe size').some(u => u.startsWith('/converters/shoe-size')))
  assert.ok(top('roman numerals')[0].startsWith('/converters/roman-numerals'))
})

test('units without a curated pair still reach the category page', () => {
  assert.ok(top('feet to miles').some(u => u === '/converters/length/'))
})

test('nonsense and too-short queries return nothing', () => {
  assert.deepEqual(top('zzqxjw'), [])
  assert.deepEqual(top('k'), [])
  assert.deepEqual(top(''), [])
})

test('splitToPhrase', () => {
  assert.deepEqual(splitToPhrase('kg to lbs'), ['kg', 'lbs'])
  assert.deepEqual(splitToPhrase('5 ft in cm'), ['5 ft', 'cm'])
  assert.equal(splitToPhrase('mortgage'), null)
})

// Optional live check: SEARCH_INDEX_URL=http://localhost:3111/search-index/ npm test
test('live index (skipped unless SEARCH_INDEX_URL is set)', { skip: !process.env.SEARCH_INDEX_URL }, async () => {
  const res = await fetch(process.env.SEARCH_INDEX_URL!)
  assert.equal(res.status, 200)
  const live = (await res.json()) as SearchItem[]
  assert.ok(live.length > 150, `index size ${live.length}`)
  const t = (q: string) => search(live, q, 5).map(r => r.u)
  assert.equal(t('mortgage')[0], '/finance/mortgage-payment/')
  assert.ok(t('paycheck').includes('/finance/take-home-pay/'))
  assert.ok(t('kg').some(u => u.startsWith('/converters/weight/')))
  assert.equal(t('kg to lbs')[0], '/converters/weight/kg-to-lbs/')
  assert.ok(t('bmi')[0].startsWith('/health/bmi'))
  console.log(`live index entries: ${live.length}`)
})
