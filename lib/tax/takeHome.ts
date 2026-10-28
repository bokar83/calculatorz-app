// Pure take-home-pay engine: pay frequencies, per-line pre-tax deductions ($ per paycheck OR % of gross
// pay), and the three different "wage bases" those deductions do or do not reduce.
//
// Wage-base rules used (2026 law, planning estimates, not tax advice):
// - Traditional 401(k)/403(b): reduces FEDERAL income-tax wages, does NOT reduce Social Security / Medicare
//   (FICA) wages (IRC 3121(v)(1)(A); IRS Pub 15-B / Topic 424).
// - Health / dental / vision premiums paid through a Section 125 cafeteria plan: reduce federal income-tax
//   wages AND FICA wages (IRC 125(a), 3121(a)(5)(G)).
// - HSA contributions made through payroll (cafeteria plan): reduce federal wages AND FICA wages.
//   State exception: California and New Jersey do not conform and still tax HSA contributions.
// - Other Section 125 items (health-care FSA, dependent-care FSA up to the limit, commuter benefits):
//   reduce federal and FICA wages.
// - State wages: 401(k) deferrals reduce state wages in most states. Pennsylvania and New Jersey tax
//   401(k) deferrals (they are included in state wages). California and New Jersey tax HSA contributions.
//   This is a planning model; individual state treatment can change.

import { STANDARD_DEDUCTIONS, federalIncomeTax, w2Fica } from './constants2026.ts'
import { calcStateTax } from '../salaryNegotiation/stateTax.ts'

export type PayFrequency = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly'
export type DeductionMode = 'amount' | 'percent'
export type DeductionKind = 'retirement' | 'hsa' | 'health' | 'other125'

export const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
}

export interface DeductionLine {
  kind: DeductionKind
  /** The number the user typed: dollars per paycheck when mode = 'amount', percent of gross pay when 'percent'. */
  value: number
  mode: DeductionMode
}

export interface TakeHomeInput {
  grossAnnual: number
  filing: 'single' | 'married'
  payFrequency: PayFrequency
  /** A state slug from lib/states.ts, or 'custom' / '' to use customStateRatePct. */
  stateSlug: string
  customStateRatePct: number
  lines: DeductionLine[]
  /** Legacy annual-dollar pre-tax figure (old single field). Treated like a 401(k) deferral. */
  legacyAnnualPretax?: number
}

// States that do NOT let a 401(k) / HSA deferral reduce state wages (see header).
const STATE_TAXES_401K = new Set(['pennsylvania', 'new-jersey'])
const STATE_TAXES_HSA = new Set(['california', 'new-jersey'])

/** Annual dollars for one line. Percent is of gross pay for the pay period, so it equals that share of annual gross. */
export function lineAnnual(line: DeductionLine, grossAnnual: number, payFrequency: PayFrequency): number {
  const v = Number.isFinite(line.value) && line.value > 0 ? line.value : 0
  if (line.mode === 'percent') return grossAnnual * Math.min(v, 100) / 100
  return v * PERIODS_PER_YEAR[payFrequency]
}

export interface TakeHomeResult {
  grossAnnual: number
  federalTax: number
  stateTax: number
  fica: number
  retirement: number
  hsa: number
  health: number
  other125: number
  totalPretax: number
  federalWages: number
  ficaWages: number
  stateWages: number
  netAnnual: number
  stateLabel: string
  stateTier: string
}

export function computeTakeHome(i: TakeHomeInput): TakeHomeResult {
  const gross = Math.max(0, i.grossAnnual)
  const annual: Record<DeductionKind, number> = { retirement: 0, hsa: 0, health: 0, other125: 0 }
  for (const l of i.lines) annual[l.kind] += lineAnnual(l, gross, i.payFrequency)
  annual.retirement += Math.max(0, i.legacyAnnualPretax ?? 0)

  // Never deduct more than the paycheck: scale all lines down proportionally if they exceed gross.
  const raw = annual.retirement + annual.hsa + annual.health + annual.other125
  if (raw > gross && raw > 0) {
    const k = gross / raw
    for (const key of Object.keys(annual) as DeductionKind[]) annual[key] *= k
  }
  const totalPretax = annual.retirement + annual.hsa + annual.health + annual.other125
  const section125 = annual.hsa + annual.health + annual.other125

  const status = i.filing
  const federalWages = Math.max(0, gross - totalPretax)
  const taxable = Math.max(0, federalWages - STANDARD_DEDUCTIONS[status])
  const federalTax = federalIncomeTax(taxable, status)

  const ficaWages = Math.max(0, gross - section125) // 401(k) does NOT reduce FICA wages
  const fica = w2Fica(ficaWages, status).total

  const slug = i.stateSlug
  const custom = !slug || slug === 'custom'
  const stateWages = Math.max(
    0,
    gross
      - annual.health - annual.other125
      - (slug && STATE_TAXES_401K.has(slug) ? 0 : annual.retirement)
      - (slug && STATE_TAXES_HSA.has(slug) ? 0 : annual.hsa),
  )
  let stateTax: number
  let stateLabel: string
  let stateTier: string
  if (custom) {
    stateTax = stateWages * Math.max(0, i.customStateRatePct) / 100
    stateLabel = 'Custom flat rate you entered'
    stateTier = 'custom'
  } else {
    const r = calcStateTax(slug, stateWages, status)
    stateTax = r.tax
    stateLabel = r.label
    stateTier = r.tier
  }

  const netAnnual = gross - totalPretax - federalTax - stateTax - fica
  return {
    grossAnnual: gross,
    federalTax, stateTax, fica,
    retirement: annual.retirement, hsa: annual.hsa, health: annual.health, other125: annual.other125,
    totalPretax, federalWages, ficaWages, stateWages, netAnnual, stateLabel, stateTier,
  }
}
