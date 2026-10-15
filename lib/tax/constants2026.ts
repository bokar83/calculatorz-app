// SINGLE SOURCE OF TRUTH for US tax-year constants used by take-home-pay, income-tax,
// capital-gains-tax, the 401(k) calculator, the 51 state paycheck pages and the
// salary-negotiation engine. Change a number here and every calculator follows.
//
// Every value below was re-read from the PRIMARY source on 2026-10-15 (not from memory):
// - Federal brackets, standard deductions, capital-gains thresholds:
//   IRS Revenue Procedure 2025-32, https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
//   and IRS news release IR-2025-103 (Oct. 9, 2025),
//   https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
//   (checked 2026-10-15). The Head of Household 10%/12% thresholds (17,700 / 67,450) are not
//   printed in the excerpt that was read; they are derived from the printed 22%-band base tax
//   in Rev. Proc. 2025-32 Table 2 ($16,155 at $105,700: 1,770 + 5,970 + 8,415 = 16,155) and
//   are marked TODO-UNVERIFIED until the table rows are read directly.
// - Social Security wage base 2026 = $184,500:
//   SSA Contribution and Benefit Base table, https://www.ssa.gov/oact/cola/cbb.html (checked 2026-10-15).
//   OASDI rate 6.2% employee, Medicare 1.45% employee, no wage cap on Medicare: same SSA page.
// - Additional Medicare Tax 0.9% over $200,000 single / $250,000 MFJ (fixed by statute,
//   IRC 3101(b)(2), not indexed): TODO-UNVERIFIED against irs.gov Topic 560 in this pass
//   (value carried over from lib/salaryNegotiation/federal.ts, audited correct 2026-10-15).
// - 401(k) elective deferral limit 2026 = $24,500, catch-up (age 50+) $8,000:
//   IRS news release IR-2025-111, https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500
//   (checked 2026-10-15).

export const TAX_YEAR = 2026

export type FilingStatus = 'single' | 'married' | 'hoh'

export interface Bracket {
  upTo: number
  rate: number
}

// Rev. Proc. 2025-32 section 1(j)(2): Table 1 (single), Table 3 (MFJ), Table 2 (HoH).
export const BRACKETS: Record<FilingStatus, readonly Bracket[]> = {
  single: [
    { upTo: 12400, rate: 0.10 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married: [
    { upTo: 24800, rate: 0.10 },
    { upTo: 100800, rate: 0.12 },
    { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 },
    { upTo: 512450, rate: 0.32 },
    { upTo: 768700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  hoh: [
    { upTo: 17700, rate: 0.10 }, // TODO-UNVERIFIED (derived, see header)
    { upTo: 67450, rate: 0.12 }, // TODO-UNVERIFIED (derived, see header)
    { upTo: 105700, rate: 0.22 },
    { upTo: 201750, rate: 0.24 },
    { upTo: 256200, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
}

// IR-2025-103: standard deduction 2026.
export const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 16100,
  married: 32200,
  hoh: 24150,
}

// SSA cbb.html (2026) and statute.
export const SS_WAGE_BASE = 184500
export const SS_RATE = 0.062
export const MEDICARE_RATE = 0.0145
export const ADDITIONAL_MEDICARE_RATE = 0.009
export const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  married: 250000,
  hoh: 200000,
}

// IR-2025-111.
export const LIMIT_401K = 24500
export const LIMIT_401K_CATCHUP = 8000

// Rev. Proc. 2025-32 section 3.03 (maximum zero rate / maximum 15 percent rate amounts), taxable income.
export const LTCG_THRESHOLDS: Record<FilingStatus, { zeroUpTo: number; fifteenUpTo: number }> = {
  single: { zeroUpTo: 49450, fifteenUpTo: 545500 },
  married: { zeroUpTo: 98900, fifteenUpTo: 613700 },
  hoh: { zeroUpTo: 66200, fifteenUpTo: 579600 },
}

/** Progressive tax on a taxable-income amount for the given bracket table. */
export function progressiveTax(taxable: number, brackets: readonly Bracket[]): number {
  if (!(taxable > 0)) return 0
  let tax = 0
  let prev = 0
  for (const b of brackets) {
    if (taxable <= prev) break
    tax += (Math.min(taxable, b.upTo) - prev) * b.rate
    prev = b.upTo
  }
  return tax
}

export function federalIncomeTax(taxable: number, status: FilingStatus): number {
  return progressiveTax(taxable, BRACKETS[status] ?? BRACKETS.single)
}

/** Employee-side FICA on W-2 wages, including Additional Medicare Tax. */
export function w2Fica(gross: number, status: FilingStatus) {
  const socialSecurity = Math.min(gross, SS_WAGE_BASE) * SS_RATE
  const medicare = gross * MEDICARE_RATE
  const additionalMedicare = Math.max(0, gross - ADDITIONAL_MEDICARE_THRESHOLD[status]) * ADDITIONAL_MEDICARE_RATE
  return { socialSecurity, medicare, additionalMedicare, total: socialSecurity + medicare + additionalMedicare }
}
