import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeTakeHome, lineAnnual, PERIODS_PER_YEAR } from '../lib/tax/takeHome.ts'
import type { TakeHomeInput } from '../lib/tax/takeHome.ts'
import { takeHomePay } from '../lib/calculators/finance/take-home-pay.ts'
import { US_STATES } from '../lib/states.ts'

const USD = { code: 'USD', symbol: '$', label: 'US Dollar' }
const base: TakeHomeInput = { grossAnnual: 100000, filing: 'single', payFrequency: 'biweekly', stateSlug: 'texas', customStateRatePct: 0, lines: [] }
const near = (a: number, b: number, eps = 0.01) => assert.ok(Math.abs(a - b) <= eps, `${a} vs ${b}`)

test('no-tax state (TX): state tax is 0', () => {
  assert.equal(computeTakeHome(base).stateTax, 0)
})

test('flat state (UT 4.5%): state tax = 4.5% of wages', () => {
  near(computeTakeHome({ ...base, stateSlug: 'utah' }).stateTax, 4500)
})

test('progressive state (CA): matches full bracket table with the $5,540 standard deduction', () => {
  // wages 100,000 - 5,540 = 94,460: 110.79 + 303.70 + 607.52 + 1,292.64 (8% of 16,...) computed independently below
  const taxable = 100000 - 5540
  const b = [[11079, .01], [26264, .02], [41452, .04], [57542, .06], [72724, .08], [371479, .093]] as const
  let tax = 0, prev = 0
  for (const [cap, rate] of b) { if (taxable <= prev) break; tax += (Math.min(taxable, cap) - prev) * rate; prev = cap }
  near(computeTakeHome({ ...base, stateSlug: 'california' }).stateTax, tax)
  assert.ok(tax > 4500 && tax < 9300)
})

test('every state and DC is selectable and computes a number', () => {
  assert.equal(US_STATES.length, 51)
  for (const s of US_STATES) {
    const r = computeTakeHome({ ...base, stateSlug: s.slug })
    assert.ok(Number.isFinite(r.stateTax) && r.stateTax >= 0, s.slug)
  }
})

test('biweekly = annual / 26 and semi-monthly = annual / 24 in the result values', () => {
  const res = takeHomePay.calculate({ grossSalary: 100000, filingStatus: 'single', payFrequency: 'biweekly', stateSlug: 'texas', stateRate: 0, dedRetirement: 0, dedRetirement__mode: 'percent', dedHealth: 0, dedHsa: 0, dedOther: 0 }, USD)
  const v = (l: string) => Number(res.values.find(x => x.label.includes(l))!.value.replace(/[$,]/g, ''))
  const annual = v('Net Annual Pay')
  assert.ok(Math.abs(v('Biweekly') - annual / 26) <= 1)
  assert.ok(Math.abs(v('Semi-Monthly') - annual / 24) <= 1)
  assert.ok(Math.abs(v('Weekly') - annual / 52) <= 1)
  assert.ok(Math.abs(v('Monthly') - annual / 12) <= 1)
})

test('$ and % give identical results when equivalent', () => {
  // 100,000 / 26 = 3,846.1538 gross per check; 5% = 192.3077 per check
  const perCheck = 100000 * 0.05 / PERIODS_PER_YEAR.biweekly
  const pct = computeTakeHome({ ...base, stateSlug: 'utah', lines: [{ kind: 'retirement', value: 5, mode: 'percent' }] })
  const amt = computeTakeHome({ ...base, stateSlug: 'utah', lines: [{ kind: 'retirement', value: perCheck, mode: 'amount' }] })
  near(pct.netAnnual, amt.netAnnual, 0.001)
  near(pct.federalTax, amt.federalTax, 0.001)
  near(lineAnnual({ kind: 'health', value: 5, mode: 'percent' }, 100000, 'weekly'), 5000)
  near(lineAnnual({ kind: 'health', value: 100, mode: 'amount' }, 100000, 'weekly'), 5200)
})

test('401(k) reduces income-tax wages but NOT FICA wages; Section 125 reduces both', () => {
  const none = computeTakeHome(base)
  const k = computeTakeHome({ ...base, lines: [{ kind: 'retirement', value: 10, mode: 'percent' }] })
  const h = computeTakeHome({ ...base, lines: [{ kind: 'health', value: 10, mode: 'percent' }] })
  assert.equal(k.fica, none.fica)
  assert.equal(k.federalWages, 90000)
  assert.ok(k.federalTax < none.federalTax)
  near(h.fica, none.fica * 0.9)
  assert.equal(h.federalWages, 90000)
})

test('state wage exceptions: PA/NJ tax 401(k); CA/NJ tax HSA', () => {
  const k = [{ kind: 'retirement' as const, value: 10, mode: 'percent' as const }]
  assert.equal(computeTakeHome({ ...base, stateSlug: 'pennsylvania', lines: k }).stateWages, 100000)
  assert.equal(computeTakeHome({ ...base, stateSlug: 'utah', lines: k }).stateWages, 90000)
  const hsa = [{ kind: 'hsa' as const, value: 4000, mode: 'amount' as const }]
  assert.equal(computeTakeHome({ ...base, stateSlug: 'california', payFrequency: 'monthly', lines: hsa }).stateWages, 100000)
})

test('deductions cannot exceed gross pay', () => {
  const r = computeTakeHome({ ...base, lines: [{ kind: 'health', value: 100000, mode: 'amount' }] })
  assert.ok(r.netAnnual >= 0)
  assert.ok(r.totalPretax <= 100000)
})

test('custom rate override still works', () => {
  near(computeTakeHome({ ...base, stateSlug: 'custom', customStateRatePct: 5 }).stateTax, 5000)
})

// ---- state rate fixes (sources: see lib/states.ts notes) ----
const rateOf = (slug: string) => US_STATES.find(s => s.slug === slug)!.stateTaxRate

test('GA 2026 flat rate is 4.99% (H.B. 463)', () => {
  assert.equal(rateOf('georgia'), 4.99)
  near(computeTakeHome({ ...base, stateSlug: 'georgia' }).stateTax, 4990)
})

test('SC 2026: 1.99% to $30,000 then 5.21% (SCDOR IL26-20: 5.21% x income - $966 at $30,000+)', () => {
  const r = computeTakeHome({ ...base, stateSlug: 'south-carolina' })
  near(r.stateTax, 0.0521 * 100000 - 966)
  const lo = computeTakeHome({ ...base, grossAnnual: 20000, stateSlug: 'south-carolina' })
  near(lo.stateTax, 20000 * 0.0199)
  assert.equal(r.stateTier, 'flat-approx') // SCIAD not modeled, labeled approximate
})

test('WV 2026 top rate 4.58%, bracket estimate labeled approximate', () => {
  assert.equal(rateOf('west-virginia'), 4.58)
  const r = computeTakeHome({ ...base, stateSlug: 'west-virginia' })
  const exp = 10000 * .0211 + 15000 * .0281 + 15000 * .0316 + 20000 * .0422 + 40000 * .0458
  near(r.stateTax, exp)
  assert.equal(r.stateTier, 'flat-approx')
})

test('ND: 0% below threshold, 1.95% above, labeled approximate', () => {
  const lo = computeTakeHome({ ...base, grossAnnual: 60000, stateSlug: 'north-dakota' })
  assert.equal(lo.stateTax, 0)
  const hi = computeTakeHome({ ...base, stateSlug: 'north-dakota' })
  near(hi.stateTax, (100000 - 16100 - 49575) * 0.0195)
  assert.equal(hi.stateTier, 'flat-approx')
})
