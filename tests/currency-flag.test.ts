import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

// Money calculators opt in explicitly; everything else must never show currency tabs.
test('shell renders the currency selector only on an explicit usesCurrency flag', () => {
  const shell = read('components/calculator/CalculatorShell.tsx')
  assert.match(shell, /config\.usesCurrency === true\s*&&[\s\S]{0,80}<CurrencySelector/)
  assert.doesNotMatch(shell, /category === 'finance'\s*&&[\s\S]{0,80}<CurrencySelector/)
})

const flagged = (file: string) => /usesCurrency:\s*true/.test(read(`lib/calculators/finance/${file}.ts`))

test('money calculators have currency tabs', () => {
  for (const f of ['mortgage-payment', 'loan-payment', 'take-home-pay', 'compound-interest', 'salary-to-hourly', 'savings-goal']) {
    assert.equal(flagged(f), true, f)
  }
})

test('non-money calculators never have currency tabs', () => {
  for (const f of ['unit-converter', 'cm-to-inches', 'hex-to-rgb', 'age-calculator', 'date-difference', 'gpa-calculator', 'hours-worked-calculator', 'percentage', 'percentage-change', 'inflation']) {
    assert.equal(flagged(f), false, f)
  }
  for (const f of readdirSync(new URL('../lib/calculators/health/', import.meta.url))) {
    assert.doesNotMatch(read(`lib/calculators/health/${f}`), /usesCurrency/, f)
  }
})

test('non-finance tools are grouped away from Finance (URLs unchanged)', () => {
  const grp = (f: string) => (read(`lib/calculators/finance/${f}.ts`).match(/displayGroup:\s*'(\w+)'/) ?? [])[1]
  for (const f of ['unit-converter', 'cm-to-inches', 'hex-to-rgb']) assert.equal(grp(f), 'converters', f)
  for (const f of ['age-calculator', 'gpa-calculator', 'date-difference', 'percentage', 'percentage-change', 'hours-worked-calculator']) assert.equal(grp(f), 'tools', f)
  for (const f of ['mortgage-payment', 'tip-calculator', 'inflation', 'currency-converter']) assert.equal(grp(f), undefined, f)
})
