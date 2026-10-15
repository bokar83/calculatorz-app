import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CATEGORIES, allPairs, getCategory } from '../lib/converters/index.ts'
import { convert, convertIngredient, getUnit, pairSlug, formatNumber } from '../lib/converters/engine.ts'
import { convertNumeral, toRoman, fromRoman } from '../lib/converters/numerals.ts'

const near = (a: number, b: number, rel = 1e-9) => Math.abs(a - b) <= rel * Math.max(1, Math.abs(a), Math.abs(b))
const cat = (id: string) => getCategory(id)!
const c = (id: string, f: string, t: string, v: number) => convert(cat(id), f, t, v)

test('round-trip identity for every ordered unit pair in every units category', () => {
  let pairs = 0
  for (const category of CATEGORIES.filter(k => k.kind === 'units')) {
    for (const a of category.units) {
      for (const b of category.units) {
        for (const v of [1, 0.001, 1234.5678, 0, 42]) {
          if (category.id === 'fuel-economy' && v === 0) continue
          const there = convert(category, a.id, b.id, v)
          const back = convert(category, b.id, a.id, there)
          assert.ok(near(back, v, 1e-9), `${category.id}: ${v} ${a.id} -> ${b.id} -> ${a.id} = ${back}`)
        }
        pairs++
      }
    }
  }
  assert.ok(pairs > 500, `expected many pairs, got ${pairs}`)
  console.log(`round-trip checked ${pairs} ordered unit pairs`)
})

test('temperature anchors and offset formulas', () => {
  assert.ok(near(c('temperature', 'c', 'f', 0), 32))
  assert.ok(near(c('temperature', 'c', 'k', 0), 273.15))
  assert.ok(near(c('temperature', 'f', 'c', -40), -40))
  assert.ok(near(c('temperature', 'c', 'f', 100), 212))
  assert.ok(near(c('temperature', 'f', 'c', 98.6), 37))
  assert.ok(near(c('temperature', 'k', 'c', 0), -273.15))
  assert.ok(near(c('temperature', 'f', 'r', 0), 459.67))
})

test('exact-definition anchors', () => {
  assert.ok(near(c('length', 'mi', 'km', 1), 1.609344))
  assert.ok(near(c('length', 'in', 'cm', 1), 2.54))
  assert.ok(near(c('length', 'ft', 'm', 1), 0.3048))
  assert.ok(near(c('length', 'nmi', 'm', 1), 1852))
  assert.ok(near(c('volume', 'gal', 'l', 1), 3.785411784))
  assert.ok(near(c('volume', 'gal-uk', 'l', 1), 4.54609))
  assert.ok(near(c('volume', 'cup', 'ml', 1), 236.5882365))
  assert.ok(near(c('volume', 'tbsp', 'tsp', 1), 3))
  assert.ok(near(c('volume', 'bbl', 'gal', 1), 42))
  assert.ok(near(c('weight', 'lb', 'kg', 1), 0.45359237))
  assert.ok(near(c('weight', 'lb', 'oz', 1), 16))
  assert.ok(near(c('weight', 'st', 'lb', 1), 14))
  assert.ok(near(c('weight', 'ton-us', 'lb', 1), 2000))
  assert.ok(near(c('area', 'ac', 'ft2', 1), 43560))
  assert.ok(near(c('area', 'ac', 'm2', 1), 4046.8564224, 1e-12))
  assert.ok(near(c('area', 'ha', 'm2', 1), 10000))
  assert.ok(near(c('speed', 'mph', 'ms', 1), 0.44704))
  assert.ok(near(c('speed', 'kmh', 'ms', 3.6), 1))
  assert.ok(near(c('time', 'd', 's', 1), 86400))
  assert.ok(near(c('time', 'yr', 'd', 1), 365.25))
  assert.ok(near(c('data-storage', 'GiB', 'B', 1), 1073741824))
  assert.ok(near(c('data-storage', 'GB', 'B', 1), 1e9))
  assert.ok(near(c('data-storage', 'B', 'bit', 1), 8))
  assert.ok(near(c('data-transfer', 'Mbps', 'MBps', 100), 12.5))
  assert.ok(near(c('energy', 'kWh', 'MJ', 1), 3.6))
  assert.ok(near(c('energy', 'kcal', 'J', 1), 4184))
  assert.ok(near(c('energy', 'BTU', 'J', 1), 1055.05585262))
  assert.ok(near(c('power', 'hp', 'W', 1), 745.6998715822702, 1e-12))
  assert.ok(near(c('power', 'PS', 'W', 1), 735.49875))
  assert.ok(near(c('pressure', 'atm', 'kPa', 1), 101.325))
  assert.ok(near(c('pressure', 'psi', 'Pa', 1), 6894.757293168, 1e-9))
  assert.ok(near(c('pressure', 'atm', 'mmHg', 1), 760, 1e-6))
  assert.ok(near(c('pressure', 'bar', 'kPa', 1), 100))
  assert.ok(near(c('force', 'kgf', 'N', 1), 9.80665))
  assert.ok(near(c('force', 'lbf', 'N', 1), 4.4482216152605, 1e-12))
  assert.ok(near(c('torque', 'lbfft', 'lbfin', 1), 12, 1e-12))
  assert.ok(near(c('density', 'gcm3', 'kgm3', 1), 1000))
  assert.ok(near(c('angle', 'deg', 'rad', 180), Math.PI))
  assert.ok(near(c('angle', 'turn', 'deg', 1), 360))
  assert.ok(near(c('angle', 'deg', 'arcsec', 1), 3600))
  assert.ok(near(c('frequency', 'rpm', 'Hz', 60), 1))
  assert.ok(near(c('flow-rate', 'gpm', 'Lmin', 1), 3.785411784))
  assert.ok(near(c('rainfall', 'in', 'mm', 1), 25.4))
  assert.ok(near(c('rainfall', 'mm', 'lm2', 1), 1))
  assert.ok(near(c('typography', 'in', 'px', 1), 96))
  assert.ok(near(c('typography', 'in', 'pt', 1), 72))
  assert.ok(near(c('typography', 'rem', 'px', 1), 16))
  assert.ok(near(convert(cat('typography'), 'px', 'rem', 24, { baseFontPx: 16 }), 1.5))
  assert.ok(near(convert(cat('typography'), 'rem', 'px', 1, { baseFontPx: 20 }), 20))
})

test('fuel economy is reciprocal and guards zero', () => {
  assert.ok(near(c('fuel-economy', 'mpgus', 'l100', 30), 235.2145833 / 30, 1e-7))
  assert.ok(near(c('fuel-economy', 'l100', 'mpgus', 10), 23.5214583, 1e-7))
  // 1 UK mpg covers a mile on a larger gallon, so the same car has MORE UK mpg than US mpg: mpgus = mpguk x (3.785411784 / 4.54609)
  assert.ok(near(c('fuel-economy', 'mpguk', 'mpgus', 1), 3.785411784 / 4.54609, 1e-9))
  assert.equal(c('fuel-economy', 'l100', 'mpgus', 0), Infinity)
})

test('ingredient conversions go through density', () => {
  const k = cat('cooking')
  const flour = k.ingredients!.find(i => i.id === 'ap-flour')!
  assert.ok(near(convertIngredient(k, 'cup', 'g', 1, flour), 120))
  assert.ok(near(convertIngredient(k, 'g', 'cup', 240, flour), 2))
  assert.ok(near(convertIngredient(k, 'cup', 'ml', 1, flour), 236.5882365))
  const w = cat('water-weight')
  const water = w.ingredients!.find(i => i.id === 'w20')!
  assert.ok(near(convertIngredient(w, 'gal', 'kg', 1, water), 3.785411784 * 0.998207, 1e-9))
  assert.ok(near(convertIngredient(w, 'l', 'kg', 1, water), 0.998207, 1e-9))
})

test('shoe and clothing sizes are consistent and labelled approximate', () => {
  const s = cat('shoe-size')
  assert.ok(s.approximate && cat('womens-clothing-size').approximate && cat('mens-suit-size').approximate)
  const eu = convert(s, 'usm', 'eu', 10)
  assert.ok(eu > 43 && eu < 44, `US 10 -> EU ${eu}`)
  assert.ok(near(convert(s, 'usm', 'uk', 10), 9))
  assert.ok(near(convert(s, 'usm', 'usw', 8), 9.5))
  const w = cat('womens-clothing-size')
  assert.ok(near(convert(w, 'us', 'uk', 6), 10))
  assert.ok(near(convert(w, 'uk', 'eu', 10), 38))
  assert.ok(near(convert(w, 'us', 'it', 6), 42))
  assert.ok(near(convert(cat('mens-suit-size'), 'in', 'eu', 40), 50.8))
})

test('numerals', () => {
  assert.equal(toRoman(1994), 'MCMXCIV')
  assert.equal(toRoman(2026), 'MMXXVI')
  assert.equal(toRoman(3999), 'MMMCMXCIX')
  assert.equal(fromRoman('MCMXCIV'), 1994)
  for (let n = 1; n <= 3999; n++) assert.equal(fromRoman(toRoman(n)), n)
  assert.throws(() => toRoman(0))
  assert.throws(() => toRoman(4000))
  assert.throws(() => fromRoman('IIII'))
  assert.throws(() => fromRoman('IC'))
  assert.equal(convertNumeral('255', 10, 16), 'FF')
  assert.equal(convertNumeral('ff', 16, 10), '255')
  assert.equal(convertNumeral('1011', 2, 10), '11')
  assert.equal(convertNumeral('255', 10, 2), '11111111')
  assert.equal(convertNumeral('zz', 36, 10), '1295')
  assert.throws(() => convertNumeral('102', 2, 10))
  assert.throws(() => convertNumeral('9007199254740993', 10, 2))
})

test('pair slugs are unique per category, total <= 150, and reference real units', () => {
  const pairs = allPairs()
  assert.ok(pairs.length <= 150, `pairs ${pairs.length}`)
  const seen = new Set<string>()
  for (const p of pairs) {
    const key = `${p.category.id}/${p.slug}`
    assert.ok(!seen.has(key), `duplicate ${key}`)
    seen.add(key)
    getUnit(p.category, p.pair.from)
    getUnit(p.category, p.pair.to)
    assert.equal(pairSlug(p.category, p.pair), p.slug)
    assert.ok(/^[a-z0-9-]+$/.test(p.slug), p.slug)
  }
  console.log(`pair pages: ${pairs.length}, categories: ${CATEGORIES.length}`)
})

test('content has no em-dashes and every category is complete', () => {
  for (const k of CATEGORIES) {
    const text = JSON.stringify(k.content) + k.description + k.formula + (k.approximate ?? '')
    assert.ok(!text.includes('—'), `${k.id} contains an em-dash`)
    assert.ok(k.content.tips.length >= 3 && k.content.commonMistakes.length >= 3 && k.content.faqs.length >= 3, k.id)
    assert.ok(k.content.explainer.split(' ').length >= 50, `${k.id} explainer too short`)
    getUnit(k, k.defaultFrom)
    getUnit(k, k.defaultTo)
  }
})

test('formatNumber', () => {
  assert.equal(formatNumber(2.2046226218), '2.2046226')
  assert.equal(formatNumber(1234567.891), '1,234,567.9')
  assert.equal(formatNumber(0), '0')
  assert.equal(formatNumber(1e-12), '1e-12')
  assert.equal(formatNumber(0.1 + 0.2), '0.3')
})
