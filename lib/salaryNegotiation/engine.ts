// Core calculation engine for the Salary Negotiation & Take-Home Calculator.
// Combines federal.ts (federal income tax, FICA, SE tax, CTC) and
// stateTax.ts (state income tax) into take-home pay, marginal effective tax
// rate (METR), a negotiation-target solver, and a break-even-offer solver.

import {
  type FilingStatus, STANDARD_DEDUCTION, calcFederalTax, calcW2FICA, calcSETax, calcChildTaxCredit,
} from './federal'
import { calcStateTax, type StateTaxResult } from './stateTax'

export type { FilingStatus } from './federal'

export type EmploymentType = 'w2' | 'self-employed'

export interface TakeHomeInputs {
  gross: number
  stateSlug: string
  filingStatus: FilingStatus
  dependents: number
  employmentType: EmploymentType
}

export interface TakeHomeBreakdown {
  gross: number
  standardDeduction: number
  aboveTheLineDeduction: number // SE-tax half-deduction, 0 for W-2
  taxableIncome: number
  federalTaxBeforeCredit: number
  childTaxCredit: number
  federalTax: number
  stateTax: number
  stateTaxInfo: StateTaxResult
  payrollTax: number // FICA (W-2) or SE tax (self-employed)
  payrollTaxLabel: string
  takeHomeAnnual: number
  takeHomeMonthly: number
  totalTaxAndPayroll: number
  effectiveTaxRate: number // total tax / gross
}

/** Full take-home computation for one gross-salary scenario. */
export function computeTakeHome(inputs: TakeHomeInputs): TakeHomeBreakdown {
  const { gross, stateSlug, filingStatus, dependents, employmentType } = inputs
  const standardDeduction = STANDARD_DEDUCTION[filingStatus]
  const ctc = calcChildTaxCredit(dependents)

  let aboveTheLineDeduction = 0
  let payrollTax = 0
  let payrollTaxLabel = ''
  let stateTaxableBase = gross

  if (employmentType === 'self-employed') {
    const se = calcSETax(gross, filingStatus)
    aboveTheLineDeduction = se.aboveTheLineDeduction
    payrollTax = se.seTax
    payrollTaxLabel = 'Self-employment tax (Schedule SE, both FICA halves)'
    stateTaxableBase = Math.max(0, gross - aboveTheLineDeduction)
  } else {
    const fica = calcW2FICA(gross, filingStatus)
    payrollTax = fica.total
    payrollTaxLabel = 'FICA (Social Security + Medicare + Additional Medicare Tax where applicable)'
    stateTaxableBase = gross
  }

  const taxableIncome = Math.max(0, gross - aboveTheLineDeduction - standardDeduction)
  const federalTaxBeforeCredit = calcFederalTax(taxableIncome, filingStatus)
  const federalTax = Math.max(0, federalTaxBeforeCredit - ctc)

  const stateTaxInfo = calcStateTax(stateSlug, stateTaxableBase, filingStatus)
  const stateTax = stateTaxInfo.tax

  const totalTaxAndPayroll = federalTax + stateTax + payrollTax
  const takeHomeAnnual = gross - totalTaxAndPayroll

  return {
    gross,
    standardDeduction,
    aboveTheLineDeduction,
    taxableIncome,
    federalTaxBeforeCredit,
    childTaxCredit: Math.min(ctc, federalTaxBeforeCredit),
    federalTax,
    stateTax,
    stateTaxInfo,
    payrollTax,
    payrollTaxLabel,
    takeHomeAnnual,
    takeHomeMonthly: takeHomeAnnual / 12,
    totalTaxAndPayroll,
    effectiveTaxRate: gross > 0 ? totalTaxAndPayroll / gross : 0,
  }
}

export interface METRResult {
  currentGross: number
  newGross: number
  deltaGross: number
  currentTakeHome: number
  newTakeHome: number
  deltaTakeHome: number
  metr: number // marginal effective tax rate on the raise
  retentionRate: number // fraction of the raise you actually keep
}

/** Marginal Effective Tax Rate + retention rate between two gross-salary scenarios. */
export function computeMETR(currentInputs: TakeHomeInputs, newGross: number): METRResult {
  const current = computeTakeHome(currentInputs)
  const next = computeTakeHome({ ...currentInputs, gross: newGross })
  const deltaGross = next.gross - current.gross
  const deltaTakeHome = next.takeHomeAnnual - current.takeHomeAnnual
  const retentionRate = deltaGross !== 0 ? deltaTakeHome / deltaGross : 0
  const metr = 1 - retentionRate
  return {
    currentGross: current.gross,
    newGross: next.gross,
    deltaGross,
    currentTakeHome: current.takeHomeAnnual,
    newTakeHome: next.takeHomeAnnual,
    deltaTakeHome,
    metr,
    retentionRate,
  }
}

/**
 * Binary-search solver: minimum gross salary such that annual take-home
 * increases by at least `targetNetGain` versus the current-salary scenario.
 * targetNetGain = 0 solves the BREAK-EVEN offer (take-home unchanged).
 */
export function solveMinimumGrossForNetGain(
  currentInputs: TakeHomeInputs,
  targetNetGain: number,
): { requiredGross: number; requiredTakeHome: number; iterations: number } {
  const currentTakeHome = computeTakeHome(currentInputs).takeHomeAnnual
  const targetTakeHome = currentTakeHome + targetNetGain

  let lo = currentInputs.gross
  let hi = Math.max(currentInputs.gross * 3, currentInputs.gross + 500000)
  // Ensure hi actually clears the target (take-home is monotonically non-decreasing in gross
  // for realistic marginal rates < 100%; guard against pathological inputs anyway).
  let hiTakeHome = computeTakeHome({ ...currentInputs, gross: hi }).takeHomeAnnual
  let guard = 0
  while (hiTakeHome < targetTakeHome && guard < 10) {
    hi *= 2
    hiTakeHome = computeTakeHome({ ...currentInputs, gross: hi }).takeHomeAnnual
    guard++
  }

  let iterations = 0
  while (hi - lo > 1 && iterations < 100) {
    const mid = (lo + hi) / 2
    const midTakeHome = computeTakeHome({ ...currentInputs, gross: mid }).takeHomeAnnual
    if (midTakeHome >= targetTakeHome) {
      hi = mid
    } else {
      lo = mid
    }
    iterations++
  }

  const requiredGross = Math.ceil(hi)
  const requiredTakeHome = computeTakeHome({ ...currentInputs, gross: requiredGross }).takeHomeAnnual
  return { requiredGross, requiredTakeHome, iterations }
}

/** Break-even offer: minimum gross salary that leaves take-home unchanged vs. current salary. */
export function solveBreakEvenOffer(currentInputs: TakeHomeInputs) {
  return solveMinimumGrossForNetGain(currentInputs, 0)
}

export interface StateComparisonRow {
  stateSlug: string
  stateName: string
  takeHomeAnnual: number
  takeHomeMonthly: number
  totalTax: number
  effectiveTaxRate: number
  tier: StateTaxResult['tier']
}

/** Same gross salary, side-by-side take-home across a set of states. */
export function compareStates(
  baseInputs: Omit<TakeHomeInputs, 'stateSlug'>,
  stateSlugs: { slug: string; name: string }[],
): StateComparisonRow[] {
  return stateSlugs.map(({ slug, name }) => {
    const result = computeTakeHome({ ...baseInputs, stateSlug: slug })
    return {
      stateSlug: slug,
      stateName: name,
      takeHomeAnnual: result.takeHomeAnnual,
      takeHomeMonthly: result.takeHomeMonthly,
      totalTax: result.totalTaxAndPayroll,
      effectiveTaxRate: result.effectiveTaxRate,
      tier: result.stateTaxInfo.tier,
    }
  }).sort((a, b) => b.takeHomeAnnual - a.takeHomeAnnual)
}
