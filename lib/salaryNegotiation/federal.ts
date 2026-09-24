// Federal tax engine for the Salary Negotiation & Take-Home Calculator.
// All figures are VERIFIED LAW for tax year 2026 unless marked ASSUMPTION.
//
// SOURCES (checked live 2026-09-23):
// - Federal brackets + standard deduction: IRS Revenue Procedure 2025-32,
//   "IRS releases tax inflation adjustments for tax year 2026" (irs.gov),
//   cross-checked against Tax Foundation's 2026 bracket table
//   (taxfoundation.org/data/all/federal/2026-tax-brackets/).
// - Social Security wage base $184,500 (2026): SSA COLA announcement
//   (ssa.gov / reported via thetaxadviser.com, kiplinger.com, paycor.com,
//   Oct 2025 SSA press release; up from $176,100 in 2025).
// - Medicare rate 1.45% employee / 1.45% employer: SSA/IRS, unchanged by statute.
// - Additional Medicare Tax 0.9% over $200,000 single / $250,000 MFJ: IRC
//   Section 3101(b)(2), a fixed statutory threshold NOT indexed for inflation
//   (irs.gov Topic 560) — same number since 2013.
// - Self-employment tax structure (92.35% net-earnings factor, 15.3% combined
//   rate, half-of-SE-tax above-the-line deduction): IRC Section 1401/164(f),
//   irs.gov Self-Employment Tax (Schedule SE) instructions.
// - Child Tax Credit $2,200/child (2026): One Big Beautiful Bill Act (OBBBA),
//   made permanent + indexed starting 2026, reported via IRS-adjacent trackers
//   (Jackson Hewitt, H&R Block, ITEP) citing the statute. The $1,700/child
//   refundable (Additional CTC) portion is not modeled separately in v1 --
//   this tool treats the full $2,200 as a nonrefundable-style reduction of
//   federal tax, which is an ASSUMPTION (see below).

export const TAX_YEAR = 2026

// VERIFIED LAW -- IRS Rev. Proc. 2025-32 / Tax Foundation 2026 bracket table
export const FEDERAL_BRACKETS_SINGLE = [
  { upTo: 12400, rate: 0.10 },
  { upTo: 50400, rate: 0.12 },
  { upTo: 105700, rate: 0.22 },
  { upTo: 201775, rate: 0.24 },
  { upTo: 256225, rate: 0.32 },
  { upTo: 640600, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
] as const

export const FEDERAL_BRACKETS_MFJ = [
  { upTo: 24800, rate: 0.10 },
  { upTo: 100800, rate: 0.12 },
  { upTo: 211400, rate: 0.22 },
  { upTo: 403550, rate: 0.24 },
  { upTo: 512450, rate: 0.32 },
  { upTo: 768700, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
] as const

// VERIFIED LAW -- IRS Rev. Proc. 2025-32
export const STANDARD_DEDUCTION = { single: 16100, married: 32200 } as const

// VERIFIED LAW -- SSA 2026 COLA announcement (Oct 2025)
export const SS_WAGE_BASE_2026 = 184500
export const SS_RATE = 0.062 // employee share
export const MEDICARE_RATE = 0.0145 // employee share, all wages, no cap

// VERIFIED LAW -- IRC 3101(b)(2), fixed by statute since 2013, not indexed
export const ADDITIONAL_MEDICARE_THRESHOLD = { single: 200000, married: 250000 } as const
export const ADDITIONAL_MEDICARE_RATE = 0.009

// VERIFIED LAW -- IRC 1401/1402; SE net-earnings haircut and combined rate
export const SE_NET_EARNINGS_FACTOR = 0.9235
export const SE_SS_RATE = 0.124 // both halves
export const SE_MEDICARE_RATE = 0.029 // both halves

// VERIFIED LAW -- One Big Beautiful Bill Act (OBBBA), CTC made permanent + indexed from 2026
export const CHILD_TAX_CREDIT_PER_CHILD = 2200

export type FilingStatus = 'single' | 'married'

export function federalBrackets(status: FilingStatus) {
  return status === 'married' ? FEDERAL_BRACKETS_MFJ : FEDERAL_BRACKETS_SINGLE
}

/** Progressive federal tax on a given taxable-income amount. */
export function calcFederalTax(taxableIncome: number, status: FilingStatus): number {
  if (taxableIncome <= 0) return 0
  const brackets = federalBrackets(status)
  let tax = 0
  let prevCap = 0
  for (const b of brackets) {
    if (taxableIncome <= prevCap) break
    tax += (Math.min(taxableIncome, b.upTo) - prevCap) * b.rate
    prevCap = b.upTo
  }
  return tax
}

/** W-2 employee FICA: Social Security (capped) + Medicare + Additional Medicare Tax. */
export function calcW2FICA(grossWages: number, status: FilingStatus) {
  const socialSecurity = Math.min(grossWages, SS_WAGE_BASE_2026) * SS_RATE
  const medicare = grossWages * MEDICARE_RATE
  const threshold = ADDITIONAL_MEDICARE_THRESHOLD[status]
  const additionalMedicare = Math.max(0, grossWages - threshold) * ADDITIONAL_MEDICARE_RATE
  return {
    socialSecurity,
    medicare,
    additionalMedicare,
    total: socialSecurity + medicare + additionalMedicare,
  }
}

/**
 * Self-employment tax (Schedule SE) on business net profit.
 * Returns the full SE tax AND the above-the-line deduction (half of the
 * SS + Medicare portion -- the Additional Medicare Tax has no employer-half
 * to deduct, per IRC 164(f)).
 */
export function calcSETax(netProfit: number, status: FilingStatus) {
  const netEarnings = Math.max(0, netProfit) * SE_NET_EARNINGS_FACTOR
  const ssPortion = Math.min(netEarnings, SS_WAGE_BASE_2026) * SE_SS_RATE
  const medicarePortion = netEarnings * SE_MEDICARE_RATE
  const threshold = ADDITIONAL_MEDICARE_THRESHOLD[status]
  // Additional Medicare Tax threshold for SE income is reduced by any W-2 wages,
  // but this tool models SE-only or W-2-only income, not combined, so we apply
  // the full threshold directly against SE net earnings (ASSUMPTION, stated in UI).
  const additionalMedicare = Math.max(0, netEarnings - threshold) * ADDITIONAL_MEDICARE_RATE
  const seTax = ssPortion + medicarePortion + additionalMedicare
  const aboveTheLineDeduction = (ssPortion + medicarePortion) / 2
  return { netEarnings, ssPortion, medicarePortion, additionalMedicare, seTax, aboveTheLineDeduction }
}

/** Simplified Child Tax Credit: $2,200/child, no phase-out modeling (ASSUMPTION, stated in UI). */
export function calcChildTaxCredit(numDependents: number): number {
  return Math.max(0, Math.round(numDependents)) * CHILD_TAX_CREDIT_PER_CHILD
}
