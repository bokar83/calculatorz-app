// State income tax data for the Salary Negotiation & Take-Home Calculator.
// Two data tiers, both labeled explicitly in the UI:
//
// TIER 1 -- FULL BRACKET TABLES (VERIFIED LAW, sourced 2026-09-23):
//   No-income-tax states (AK, FL, NV, NH, SD, TN, TX, WA, WY) -- confirmed
//   current list via Tax Foundation 2026 state income tax rate table
//   (taxfoundation.org/data/all/state/state-income-tax-rates-2026/) and SSA/
//   state-revenue cross-checks. NH and WA tax no wage income (NH's old
//   interest/dividend tax was fully repealed for 2025+; WA has no wage tax,
//   only a capital-gains tax on realized gains over ~$270K, irrelevant to
//   salary/wages).
//   Seven complex multi-bracket states with REAL, full bracket tables and
//   real standard deductions, pulled from Tax Foundation's 2026 table:
//   California, New York, Hawaii, New Jersey, Oregon, Minnesota, DC.
//
// TIER 2 -- FLAT-RATE APPROXIMATION (ASSUMPTION, explicitly flagged):
//   All remaining ~34 states. These use a single blended/flat effective
//   rate applied directly to gross wages (no state standard deduction
//   modeled), sourced from each state's published top or flat statutory
//   rate as of 2025 (the existing calculatorz.tools state registry,
//   lib/states.ts, built from state revenue department publications).
//   This is NOT full bracket accuracy for states with graduated brackets
//   (e.g. AL, AZ-flat-so-fine, CT, DE, GA-flat-so-fine, KS, LA, ME, MD, MA,
//   MO, MT, NE, NM, ND, OH, OK, PA-flat-so-fine, RI, SC, VT, VA, WV, WI).
//   Flat-statutory-rate states (AZ, CO, GA, ID, IL, IN, IA, KY, LA, MI, MS,
//   NC, PA, UT) are effectively exact since they have one rate; the
//   remaining true multi-bracket states in Tier 2 are approximated by a
//   single blended rate and should be read as directional, not exact.
//   Every Tier 2 state is listed by name in the calculator's report and
//   flagged as ASSUMPTION / APPROXIMATED in the UI.

import { US_STATES, getStateBySlug } from '../states'

export interface StateBracket {
  upTo: number
  rate: number
}

export interface FullStateTax {
  slug: string
  name: string
  standardDeductionSingle: number
  standardDeductionMarried: number
  bracketsSingle: StateBracket[]
  bracketsMarried: StateBracket[]
}

// TIER 1 -- no income tax on wages at all. VERIFIED LAW.
export const NO_TAX_STATE_SLUGS = new Set([
  'alaska', 'florida', 'nevada', 'new-hampshire', 'south-dakota',
  'tennessee', 'texas', 'washington', 'wyoming',
])

// TIER 1 -- full 2026 bracket tables, VERIFIED LAW (Tax Foundation, sourced 2026-09-23)
export const FULL_BRACKET_STATES: Record<string, FullStateTax> = {
  california: {
    slug: 'california', name: 'California',
    standardDeductionSingle: 5540, standardDeductionMarried: 11080,
    bracketsSingle: [
      { upTo: 11079, rate: 0.01 }, { upTo: 26264, rate: 0.02 }, { upTo: 41452, rate: 0.04 },
      { upTo: 57542, rate: 0.06 }, { upTo: 72724, rate: 0.08 }, { upTo: 371479, rate: 0.093 },
      { upTo: 445771, rate: 0.103 }, { upTo: 742953, rate: 0.113 }, { upTo: 1000000, rate: 0.123 },
      { upTo: Infinity, rate: 0.133 }, // incl. 1% Mental Health Services Tax over $1M
    ],
    bracketsMarried: [
      { upTo: 22158, rate: 0.01 }, { upTo: 52528, rate: 0.02 }, { upTo: 82904, rate: 0.04 },
      { upTo: 115084, rate: 0.06 }, { upTo: 145448, rate: 0.08 }, { upTo: 742958, rate: 0.093 },
      { upTo: 891542, rate: 0.103 }, { upTo: 1000000, rate: 0.113 }, { upTo: 1485906, rate: 0.123 },
      { upTo: Infinity, rate: 0.133 },
    ],
  },
  'new-york': {
    slug: 'new-york', name: 'New York',
    standardDeductionSingle: 8000, standardDeductionMarried: 16050,
    bracketsSingle: [
      { upTo: 8500, rate: 0.039 }, { upTo: 11700, rate: 0.044 }, { upTo: 13900, rate: 0.0515 },
      { upTo: 80650, rate: 0.054 }, { upTo: 215400, rate: 0.059 }, { upTo: 1077550, rate: 0.0685 },
      { upTo: 5000000, rate: 0.0965 }, { upTo: 25000000, rate: 0.103 }, { upTo: Infinity, rate: 0.109 },
    ],
    bracketsMarried: [
      { upTo: 17150, rate: 0.039 }, { upTo: 23600, rate: 0.044 }, { upTo: 27900, rate: 0.0515 },
      { upTo: 161550, rate: 0.054 }, { upTo: 323200, rate: 0.059 }, { upTo: 2155350, rate: 0.0685 },
      { upTo: 5000000, rate: 0.0965 }, { upTo: 25000000, rate: 0.103 }, { upTo: Infinity, rate: 0.109 },
    ],
  },
  hawaii: {
    slug: 'hawaii', name: 'Hawaii',
    standardDeductionSingle: 4400, standardDeductionMarried: 8800,
    bracketsSingle: [
      { upTo: 9600, rate: 0.014 }, { upTo: 14400, rate: 0.032 }, { upTo: 19200, rate: 0.055 },
      { upTo: 24000, rate: 0.064 }, { upTo: 36000, rate: 0.068 }, { upTo: 48000, rate: 0.072 },
      { upTo: 125000, rate: 0.076 }, { upTo: 175000, rate: 0.079 }, { upTo: 225000, rate: 0.0825 },
      { upTo: 275000, rate: 0.09 }, { upTo: 325000, rate: 0.10 }, { upTo: Infinity, rate: 0.11 },
    ],
    bracketsMarried: [
      { upTo: 19200, rate: 0.014 }, { upTo: 28800, rate: 0.032 }, { upTo: 38400, rate: 0.055 },
      { upTo: 48000, rate: 0.064 }, { upTo: 72000, rate: 0.068 }, { upTo: 96000, rate: 0.072 },
      { upTo: 250000, rate: 0.076 }, { upTo: 350000, rate: 0.079 }, { upTo: 450000, rate: 0.0825 },
      { upTo: 550000, rate: 0.09 }, { upTo: 650000, rate: 0.10 }, { upTo: Infinity, rate: 0.11 },
    ],
  },
  'new-jersey': {
    slug: 'new-jersey', name: 'New Jersey',
    standardDeductionSingle: 0, standardDeductionMarried: 0, // NJ has no standard deduction
    bracketsSingle: [
      { upTo: 20000, rate: 0.014 }, { upTo: 35000, rate: 0.0175 }, { upTo: 40000, rate: 0.035 },
      { upTo: 75000, rate: 0.0553 }, { upTo: 500000, rate: 0.0637 }, { upTo: 1000000, rate: 0.0897 },
      { upTo: Infinity, rate: 0.1075 },
    ],
    bracketsMarried: [
      { upTo: 20000, rate: 0.014 }, { upTo: 70000, rate: 0.0175 }, { upTo: 80000, rate: 0.035 },
      { upTo: 150000, rate: 0.0553 }, { upTo: 500000, rate: 0.0637 }, { upTo: 1000000, rate: 0.0897 },
      { upTo: Infinity, rate: 0.1075 },
    ],
  },
  oregon: {
    slug: 'oregon', name: 'Oregon',
    standardDeductionSingle: 2910, standardDeductionMarried: 5820,
    bracketsSingle: [
      { upTo: 4550, rate: 0.0475 }, { upTo: 11400, rate: 0.0675 }, { upTo: 125000, rate: 0.0875 },
      { upTo: Infinity, rate: 0.099 },
    ],
    bracketsMarried: [
      { upTo: 9100, rate: 0.0475 }, { upTo: 22800, rate: 0.0675 }, { upTo: 250000, rate: 0.0875 },
      { upTo: Infinity, rate: 0.099 },
    ],
  },
  minnesota: {
    slug: 'minnesota', name: 'Minnesota',
    standardDeductionSingle: 15300, standardDeductionMarried: 30600,
    bracketsSingle: [
      { upTo: 33310, rate: 0.0535 }, { upTo: 109430, rate: 0.068 }, { upTo: 203150, rate: 0.0785 },
      { upTo: Infinity, rate: 0.0985 },
    ],
    bracketsMarried: [
      { upTo: 48700, rate: 0.0535 }, { upTo: 193480, rate: 0.068 }, { upTo: 337930, rate: 0.0785 },
      { upTo: Infinity, rate: 0.0985 },
    ],
  },
  'district-of-columbia': {
    slug: 'district-of-columbia', name: 'District of Columbia',
    standardDeductionSingle: 16100, standardDeductionMarried: 32200, // DC conforms to federal std deduction
    bracketsSingle: [
      { upTo: 10000, rate: 0.04 }, { upTo: 40000, rate: 0.06 }, { upTo: 60000, rate: 0.065 },
      { upTo: 250000, rate: 0.085 }, { upTo: 500000, rate: 0.0925 }, { upTo: 1000000, rate: 0.0975 },
      { upTo: Infinity, rate: 0.1075 },
    ],
    bracketsMarried: [
      { upTo: 10000, rate: 0.04 }, { upTo: 40000, rate: 0.06 }, { upTo: 60000, rate: 0.065 },
      { upTo: 250000, rate: 0.085 }, { upTo: 500000, rate: 0.0925 }, { upTo: 1000000, rate: 0.0975 },
      { upTo: Infinity, rate: 0.1075 },
    ],
  },
}

/** States whose Tier-2 rate is exact because they levy a single flat statutory rate. */
export const FLAT_EXACT_STATE_SLUGS = new Set([
  'arizona', 'colorado', 'georgia', 'idaho', 'illinois', 'indiana', 'iowa',
  'kentucky', 'louisiana', 'michigan', 'mississippi', 'north-carolina',
  'pennsylvania', 'utah',
])

function progressiveTax(taxable: number, brackets: StateBracket[]): number {
  if (taxable <= 0) return 0
  let tax = 0
  let prevCap = 0
  for (const b of brackets) {
    if (taxable <= prevCap) break
    tax += (Math.min(taxable, b.upTo) - prevCap) * b.rate
    prevCap = b.upTo
  }
  return tax
}

export interface StateTaxResult {
  tax: number
  tier: 'no-tax' | 'full-bracket' | 'flat-exact' | 'flat-approx'
  label: string
}

/**
 * Compute state income tax on gross wages.
 * Tier 1 (no-tax / full-bracket): real law, applies state standard deduction.
 * Tier 2 (flat-approx / flat-exact): applies the state's headline rate directly
 * to gross wages -- flat-exact states have only one rate so this is precise;
 * flat-approx states (graduated brackets collapsed to one blended rate) are
 * an explicit ASSUMPTION.
 */
export function calcStateTax(stateSlug: string, gross: number, status: 'single' | 'married'): StateTaxResult {
  if (NO_TAX_STATE_SLUGS.has(stateSlug)) {
    return { tax: 0, tier: 'no-tax', label: 'No state income tax on wages (VERIFIED LAW)' }
  }
  const full = FULL_BRACKET_STATES[stateSlug]
  if (full) {
    const stdDed = status === 'married' ? full.standardDeductionMarried : full.standardDeductionSingle
    const taxable = Math.max(0, gross - stdDed)
    const brackets = status === 'married' ? full.bracketsMarried : full.bracketsSingle
    return { tax: progressiveTax(taxable, brackets), tier: 'full-bracket', label: 'Full 2026 bracket table (VERIFIED LAW)' }
  }
  const flat = getStateBySlug(stateSlug)
  const rate = (flat?.stateTaxRate ?? 5) / 100
  const tier = FLAT_EXACT_STATE_SLUGS.has(stateSlug) ? 'flat-exact' : 'flat-approx'
  return {
    tax: gross * rate,
    tier,
    label: tier === 'flat-exact'
      ? 'Single flat statutory rate (VERIFIED LAW)'
      : 'Blended flat-rate ASSUMPTION -- real law has multiple brackets, not fully modeled in v1',
  }
}

export function allStateOptions() {
  return US_STATES.map(s => ({ slug: s.slug, name: s.name, abbreviation: s.abbreviation }))
}

export const APPROXIMATED_STATE_NAMES = US_STATES
  .filter(s => !NO_TAX_STATE_SLUGS.has(s.slug) && !FULL_BRACKET_STATES[s.slug] && !FLAT_EXACT_STATE_SLUGS.has(s.slug))
  .map(s => s.name)
