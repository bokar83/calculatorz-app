// v3.2 regression tests. Every expected value below is hand-computed from the 2026 constants
// (IRS Rev. Proc. 2025-32, SSA wage base 184,500) or from the published formulas, NOT read back from the code.
process.env.TZ = 'America/Denver' // the date-difference bug only shows in a DST time zone
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { takeHomePay } from '../lib/calculators/finance/take-home-pay.ts'
import { incomeTax } from '../lib/calculators/finance/income-tax.ts'
import { capitalGainsTax } from '../lib/calculators/finance/capital-gains-tax.ts'
import { inflation } from '../lib/calculators/finance/inflation.ts'
import { dateDifference } from '../lib/calculators/finance/date-difference.ts'
import { loanPayment } from '../lib/calculators/finance/loan-payment.ts'
import { debtPayoff } from '../lib/calculators/finance/debt-payoff.ts'
import { hexToRgb, parseColorCode } from '../lib/calculators/finance/hex-to-rgb.ts'
import { bmi } from '../lib/calculators/health/bmi.ts'
import { idealBodyWeight } from '../lib/calculators/health/ideal-body-weight.ts'
import { calorieDeficit } from '../lib/calculators/health/calorie-deficit.ts'
import { todayPart } from '../lib/todayDefaults.ts'
import { US_STATES } from '../lib/states.ts'
import { NO_TAX_STATE_SLUGS } from '../lib/salaryNegotiation/stateTax.ts'

const USD = { code: 'USD', symbol: '$', label: 'US Dollar' }
const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const val = (res: { values: { label: string; value: string }[] }, label: string) => {
  const v = res.values.find(x => x.label.includes(label))
  assert.ok(v, `missing result "${label}" in ${JSON.stringify(res.values.map(x => x.label))}`)
  return v.value
}

// ---- take-home pay -------------------------------------------------------------------------
const thp = (o: Record<string, number | string>) =>
  takeHomePay.calculate({ grossSalary: 100000, filingStatus: 'single', stateRate: 0, pretaxDeductions: 0, ...o }, USD)

test('take-home: $100k single, no state tax, 2026 law', () => {
  // taxable 83,900: 1,240 + 38,000*.12 + 33,500*.22 = 13,170. FICA 7,650. Net 79,180.
  const r = thp({})
  assert.equal(val(r, 'Federal Tax'), '$13,170')
  assert.equal(val(r, 'FICA'), '$7,650')
  assert.equal(val(r, 'Net Annual Pay'), '$79,180')
})

test('take-home: $200k single uses the 184,500 SS wage base and 0.9% Additional Medicare', () => {
  // fed 36,734; FICA = 184,500*.062 (11,439) + 200,000*.0145 (2,900) + 0 over 200k = 14,339
  const r = thp({ grossSalary: 200000 })
  assert.equal(val(r, 'Federal Tax'), '$36,734')
  assert.equal(val(r, 'FICA'), '$14,339')
  // $300k: 11,439 + 4,350 + 100,000*.009 (900) = 16,689
  assert.equal(val(thp({ grossSalary: 300000 }), 'FICA'), '$16,689')
})

test('take-home: married filing jointly $100k', () => {
  // taxable 67,800: 2,480 + 43,000*.12 (5,160) = 7,640
  assert.equal(val(thp({ filingStatus: 'married' }), 'Federal Tax'), '$7,640')
})

test('state page preset: Texas and California now DIFFER and match hand calculation', () => {
  const base = { grossSalary: 65000, pretaxDeductions: 3000 }
  const tx = thp({ ...base, stateSlug: 'texas', stateRate: 0 })
  const ca = thp({ ...base, stateSlug: 'california', stateRate: 9.3 })
  // Federal: taxable 65,000-3,000-16,100 = 45,900 -> 1,240 + 33,500*.12 = 5,260. FICA 4,972.50 -> $4,973.
  assert.equal(val(tx, 'Federal Tax'), '$5,260')
  assert.equal(val(tx, 'State Tax'), '$0')
  assert.equal(val(tx, 'Net Annual Pay'), '$51,768') // 65,000 - 5,260 - 4,972.5 - 3,000 = 51,767.5
  // CA wages 62,000 - std ded 5,540 = 56,460: 110.79 + 303.70 + 607.52 + 900.48 = 1,922.49
  assert.equal(val(ca, 'State Tax'), '$1,922')
  assert.equal(val(ca, 'Net Annual Pay'), '$49,845') // 51,767.5 - 1,922.49 = 49,845.01
  assert.notEqual(val(tx, 'Net Annual Pay'), val(ca, 'Net Annual Pay'))
})

test('every no-income-tax state computes $0 state tax; list is the nine statutory states', () => {
  assert.deepEqual([...NO_TAX_STATE_SLUGS].sort(), ['alaska', 'florida', 'nevada', 'new-hampshire', 'south-dakota', 'tennessee', 'texas', 'washington', 'wyoming'])
  for (const slug of NO_TAX_STATE_SLUGS) {
    assert.equal(val(thp({ stateSlug: slug, stateRate: 5 }), 'State Tax'), '$0', slug)
  }
})

test('generic page still honors the manual state rate field', () => {
  // (65,000 - 3,000) * 5% = 3,100
  assert.equal(val(thp({ grossSalary: 65000, pretaxDeductions: 3000, stateRate: 5 }), 'State Tax'), '$3,100')
})

test('corrected state rates (confirmed on state revenue department sites 2026-10-15)', () => {
  const rate = (slug: string) => US_STATES.find(s => s.slug === slug)!.stateTaxRate
  assert.equal(rate('idaho'), 5.3)
  assert.equal(rate('utah'), 4.5)
  assert.equal(rate('north-carolina'), 3.99)
  assert.equal(rate('indiana'), 2.95)
  assert.equal(rate('georgia'), 4.99)
  assert.equal(rate('ohio'), 2.75)
  assert.equal(rate('kentucky'), 3.5)
  assert.equal(rate('nebraska'), 4.55)
})

test('no stale 2025 constants remain in source', () => {
  const files = ['lib/calculators/finance/take-home-pay.ts', 'lib/calculators/finance/income-tax.ts', 'app/finance/take-home-pay-calculator/[state]/page.tsx', 'lib/calculators/finance/401k-calculator.ts']
  for (const f of files) {
    const t = read(f)
    assert.doesNotMatch(t, /168,?600/, f)
    assert.doesNotMatch(t, /\b15000\b|\$15,000|\$30,000/, f)
  }
})

// ---- income tax ----------------------------------------------------------------------------
test('income-tax: $100k single = $13,170; head of household $100k = $9,588', () => {
  const run = (filingStatus: string) => incomeTax.calculate({ annualIncome: 100000, filingStatus, deductions: 0 }, USD)
  assert.equal(val(run('single'), 'Estimated Federal Tax'), '$13,170')
  // HoH taxable 75,850: 1,770 + 49,750*.12 (5,970) + 8,400*.22 (1,848) = 9,588
  assert.equal(val(run('hoh'), 'Estimated Federal Tax'), '$9,588')
  assert.equal(val(run('single'), 'Taxable Income'), '$83,900')
})

// ---- capital gains -------------------------------------------------------------------------
const cg = (holdingPeriod: string, annualIncome: number, filingStatus = 'single') =>
  capitalGainsTax.calculate({ salePrice: 20000, costBasis: 10000, holdingPeriod, annualIncome, filingStatus }, USD)

test('capital gains: short-term uses ordinary brackets stacked on income, not a flat 22%', () => {
  assert.equal(val(cg('short', 30000), 'Tax Owed'), '$1,200.00') // 10,000 all in the 12% band
  // income 48,000: 2,400 at 12% (to 50,400) = 288 + 7,600 at 22% = 1,672 -> 1,960
  assert.equal(val(cg('short', 48000), 'Tax Owed'), '$1,960.00')
})

test('capital gains: long-term 2026 thresholds (0% to 49,450, 15% to 545,500 single)', () => {
  assert.equal(val(cg('long', 30000), 'Tax Owed'), '$0.00')
  assert.equal(val(cg('long', 45000), 'Tax Owed'), '$832.50') // 5,550 * 15%
  assert.equal(val(cg('long', 540000), 'Tax Owed'), '$1,725.00') // 5,500*.15 + 4,500*.20
  assert.equal(val(cg('long', 90000, 'married'), 'Tax Owed'), '$165.00') // 0% to 98,900: 8,900 free, 1,100 * 15%
})

// ---- inflation -----------------------------------------------------------------------------
test('inflation: no longer returns $0.00', () => {
  const rate = inflation.calculate({ amount: 100, startYear: 2015, endYear: 2025, annualRate: 3 }, USD)
  assert.equal(val(rate, 'Adjusted Value'), '$134.39') // 100 * 1.03^10 = 134.3916
  const cpi = inflation.calculate({ amount: 1000, startYear: 2015, endYear: 2025, annualRate: 0 }, USD)
  assert.equal(val(cpi, 'Adjusted Value'), '$1,358.23') // 1000 * 321.9 / 237.0
})

test('inflation: out-of-range CPI year gives a clear message, not NaN or $0.00', () => {
  const r = inflation.calculate({ amount: 1000, startYear: 1900, endYear: 2025, annualRate: 0 }, USD)
  assert.match(val(r, 'Adjusted Value'), /Years must be 1913 to 2025/)
})

// ---- date difference -----------------------------------------------------------------------
test('date-difference: 1 to 31 March 2026 is 30 days in a DST time zone', () => {
  const r = dateDifference.calculate({ startYear: 2026, startMonth: 3, startDay: 1, endYear: 2026, endMonth: 3, endDay: 31 }, USD)
  assert.equal(val(r, 'Total Days'), '30')
})

test('date-difference: default range 2020-01-01 to 2026-04-16 is 2,297 days', () => {
  const inputs = Object.fromEntries(dateDifference.inputs.map(f => [f.id, f.defaultValue as number]))
  assert.equal(val(dateDifference.calculate(inputs, USD), 'Total Days'), '2,297')
})

// ---- loans ---------------------------------------------------------------------------------
test('loan-payment: term 0 shows a clear message, never NaN or Infinity', () => {
  const r = loanPayment.calculate({ loanAmount: 10000, interestRate: 6.5, loanTermYears: 0 }, USD)
  for (const v of r.values) assert.doesNotMatch(v.value, /NaN|Infinity/)
  assert.match(r.summary ?? '', /term/i)
})

test('loan-payment: $300k at 6.5% for 30 years is still $1,896.20', () => {
  assert.equal(val(loanPayment.calculate({ loanAmount: 300000, interestRate: 6.5, loanTermYears: 30 }, USD), 'Monthly Payment'), '$1,896.20')
})

test('debt-payoff: final payment is the smaller remainder, interest no longer overstated', () => {
  // independent month-by-month loop
  let bal = 5000, interest = 0
  while (bal > 1e-9) { const i = bal * 0.1999 / 12; interest += i; bal += i - 200 }
  assert.ok(interest > 1500 && interest < 1535, `hand loop gave ${interest}`)
  const r = debtPayoff.calculate({ balance: 5000, interestRate: 19.99, monthlyPayment: 200, extraPayment: 0 }, USD)
  assert.equal(val(r, 'Total Interest (Current)'), '$' + interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  // the old formula (payment x ceil(months) - balance) showed about $1,600
  assert.ok(interest < 1550)
})

// ---- hex -----------------------------------------------------------------------------------
test('hex-to-rgb: accepts FF6B35, #FF6B35, 3-digit and decimal; default is correct', () => {
  assert.deepEqual(parseColorCode('#FF6B35'), [255, 107, 53])
  assert.deepEqual(parseColorCode('ff6b35'), [255, 107, 53])
  assert.deepEqual(parseColorCode('16739125'), [255, 107, 53])
  assert.deepEqual(parseColorCode('F60'), [255, 102, 0])
  assert.equal(parseColorCode('zzz'), null)
  assert.equal(parseColorCode('99999999'), null)
  const defaults = Object.fromEntries(hexToRgb.inputs.map(f => [f.id, f.defaultValue as string | number]))
  assert.equal(hexToRgb.inputs.find(f => f.id === 'hexInput')!.type, 'text')
  assert.equal(val(hexToRgb.calculate(defaults, USD), 'Hex Code'), '#FF6B35')
  assert.equal(val(hexToRgb.calculate({ ...defaults, hexInput: 'not a color' }, USD), 'Hex Code'), 'Invalid code')
})

// ---- health --------------------------------------------------------------------------------
test('BMI: imperial toggle loads converted defaults (no more BMI 1.7)', () => {
  assert.equal(bmi.usesUnits, true)
  const d = bmi.imperialDefaults!
  // 154 lb = 69.85 kg, 67 in = 1.7018 m -> 24.1
  const r = bmi.calculate({ weight: d.weight, height: d.height, sex: 'any' }, USD, 'imperial')
  assert.equal(val(r, 'Your BMI'), '24.1')
})

test('unit toggle is shown only where the calculator reads it (BMI only)', () => {
  const shell = read('components/calculator/CalculatorShell.tsx')
  assert.match(shell, /config\.usesUnits === true\s*&&[\s\S]{0,80}<UnitToggle/)
  const dir = 'lib/calculators/health'
  const flagged = readdirSync(new URL(`../${dir}`, import.meta.url)).filter(f => /usesUnits:\s*true/.test(read(`${dir}/${f}`)))
  assert.deepEqual(flagged, ['bmi.ts'])
})

test('ideal body weight: Devine matches the published 45.5 / 50.0 kg + 2.3 kg per inch', () => {
  // woman 5ft5: (45.5 + 5*2.3) kg = 57.0 kg = 125.66 lb; man 5ft9: (50 + 9*2.3) = 70.7 kg = 155.87 lb
  const f = idealBodyWeight.calculate({ heightFt: 5, heightIn: 5, sex: 'female' }, USD)
  assert.equal(val(f, 'Devine Formula'), '126 lbs')
  const m = idealBodyWeight.calculate({ heightFt: 5, heightIn: 9, sex: 'male' }, USD)
  assert.equal(val(m, 'Devine Formula'), '156 lbs')
})

test('calorie-deficit: goal above current weight is a gain plan with a surplus', () => {
  const base = { heightFt: 5, heightIn: 9, age: 35, sex: 'male', activity: 'moderate' }
  const lose = calorieDeficit.calculate({ ...base, currentWeightLbs: 190, goalWeightLbs: 170 }, USD)
  const gain = calorieDeficit.calculate({ ...base, currentWeightLbs: 150, goalWeightLbs: 170 }, USD)
  assert.ok(lose.values.some(v => v.label.includes('lose 1 lb/wk')))
  assert.ok(gain.values.some(v => v.label.includes('gain 1 lb/wk')))
  assert.equal(val(gain, 'Time to Goal'), '20 weeks')
})

test('today-relative date defaults', () => {
  const now = new Date(2026, 9, 15) // 15 Oct 2026, local
  assert.equal(todayPart('year', -56, now), 2026)
  assert.equal(todayPart('month', -56, now), 8)
  assert.equal(todayPart('day', -56, now), 20) // 56 days before 15 Oct = 20 Aug
  assert.equal(todayPart('year', -300, now), 2025)
})
