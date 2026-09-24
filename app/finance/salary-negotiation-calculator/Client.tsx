'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { US_STATES } from '@/lib/states'
import {
  computeTakeHome, computeMETR, solveMinimumGrossForNetGain, solveBreakEvenOffer, compareStates,
  type FilingStatus, type EmploymentType, type TakeHomeInputs,
} from '@/lib/salaryNegotiation/engine'
import Disclaimer from '@/components/content/Disclaimer'

const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US')
const pct = (v: number) => (v * 100).toFixed(1) + '%'

const TIER_LABEL: Record<string, string> = {
  'no-tax': 'No state income tax',
  'full-bracket': 'Full bracket table (verified)',
  'flat-exact': 'Flat statutory rate (verified)',
  'flat-approx': 'Blended flat-rate assumption',
}

export default function SalaryNegotiationClient() {
  const [currentSalary, setCurrentSalary] = useState(150000)
  const [offerSalary, setOfferSalary] = useState(160000)
  const [stateSlug, setStateSlug] = useState('texas')
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [dependents, setDependents] = useState(0)
  const [employmentType, setEmploymentType] = useState<EmploymentType>('w2')
  const [targetGainMode, setTargetGainMode] = useState<'annual' | 'monthly'>('annual')
  const [targetGain, setTargetGain] = useState(10000)
  const [compareSlugs, setCompareSlugs] = useState<string[]>(['texas', 'california', 'new-york', 'utah'])

  const currentInputs: TakeHomeInputs = useMemo(() => ({
    gross: currentSalary, stateSlug, filingStatus, dependents, employmentType,
  }), [currentSalary, stateSlug, filingStatus, dependents, employmentType])

  const current = useMemo(() => computeTakeHome(currentInputs), [currentInputs])
  const offer = useMemo(() => computeTakeHome({ ...currentInputs, gross: offerSalary }), [currentInputs, offerSalary])
  const metr = useMemo(() => computeMETR(currentInputs, offerSalary), [currentInputs, offerSalary])
  const breakEven = useMemo(() => solveBreakEvenOffer(currentInputs), [currentInputs])
  const targetAnnualGain = targetGainMode === 'monthly' ? targetGain * 12 : targetGain
  const negotiationTarget = useMemo(
    () => solveMinimumGrossForNetGain(currentInputs, targetAnnualGain),
    [currentInputs, targetAnnualGain],
  )

  const comparisonStates = useMemo(
    () => compareSlugs.map(slug => US_STATES.find(s => s.slug === slug)).filter(Boolean) as typeof US_STATES,
    [compareSlugs],
  )
  const stateComparison = useMemo(
    () => compareStates(
      { gross: offerSalary || currentSalary, filingStatus, dependents, employmentType },
      comparisonStates.map(s => ({ slug: s.slug, name: s.name })),
    ),
    [offerSalary, currentSalary, filingStatus, dependents, employmentType, comparisonStates],
  )

  const isWorthTaking = offer.takeHomeAnnual > current.takeHomeAnnual
  const netGainOnOffer = offer.takeHomeAnnual - current.takeHomeAnnual

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-[#6B7280] mb-4">
        <Link href="/" className="hover:text-[#0F766E]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/finance" className="hover:text-[#0F766E]">Finance</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A1F36] font-medium">Salary Negotiation Calculator</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-[#1A1F36] mb-2">Salary Negotiation &amp; Take-Home Calculator</h1>
      <p className="text-[#6B7280] mb-6 max-w-2xl">
        A raise that pushes you into a higher tax bracket almost never reduces your take-home pay &mdash;
        only your <em>new dollars</em> are taxed at the higher rate, not your whole salary. This tool computes what
        an offer is actually worth after federal tax, FICA/self-employment tax, and state tax, and solves backward
        for the minimum offer you should actually accept.
      </p>

      {/* INPUTS */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-1">Current Salary <span className="text-[10px] text-[#9CA3AF]">USER INPUT</span></label>
            <div className="flex items-center border border-[#E5E7EB] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
              <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-r border-[#E5E7EB]">$</span>
              <input type="number" value={currentSalary} min={0} step={1000}
                onChange={e => setCurrentSalary(Number(e.target.value))}
                className="flex-1 px-3 py-2 text-sm text-[#1A1F36] focus:outline-none bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-1">New Offer <span className="text-[10px] text-[#9CA3AF]">USER INPUT</span></label>
            <div className="flex items-center border border-[#E5E7EB] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
              <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-r border-[#E5E7EB]">$</span>
              <input type="number" value={offerSalary} min={0} step={1000}
                onChange={e => setOfferSalary(Number(e.target.value))}
                className="flex-1 px-3 py-2 text-sm text-[#1A1F36] focus:outline-none bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-1">State</label>
            <select value={stateSlug} onChange={e => setStateSlug(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-sm text-[#1A1F36] focus:outline-none focus:ring-2 focus:ring-teal-400">
              {US_STATES.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-1">Filing Status</label>
            <select value={filingStatus} onChange={e => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-sm text-[#1A1F36] focus:outline-none focus:ring-2 focus:ring-teal-400">
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-1">Dependents (qualifying children)</label>
            <input type="number" value={dependents} min={0} max={10} step={1}
              onChange={e => setDependents(Math.max(0, Math.min(10, Number(e.target.value))))}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-sm text-[#1A1F36] focus:outline-none focus:ring-2 focus:ring-teal-400" />
            <p className="text-[11px] text-[#9CA3AF] mt-1">ASSUMPTION: $2,200/child, no income phase-out modeled (2026 Child Tax Credit).</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-1">Employment Type</label>
            <div className="flex rounded-md border border-[#E5E7EB] overflow-hidden text-sm">
              {(['w2', 'self-employed'] as const).map(t => (
                <button key={t} type="button" onClick={() => setEmploymentType(t)}
                  className={`flex-1 px-3 py-2 font-medium transition-colors focus:outline-none ${employmentType === t ? 'bg-[#0F766E] text-white' : 'bg-white text-[#6B7280] hover:text-[#1A1F36]'}`}>
                  {t === 'w2' ? 'W-2 Employee' : 'Self-Employed / 1099'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HEADLINE VERDICT */}
      <div className="rounded-xl p-5 mb-6" style={{ background: 'linear-gradient(135deg, #0C3547 0%, #0F766E 100%)' }}>
        <div className="text-white/70 text-xs uppercase tracking-wide mb-1">MODEL OUTPUT</div>
        <div className="text-2xl font-extrabold text-white mb-1">
          {isWorthTaking
            ? `Yes -- the offer is worth ${fmt(netGainOnOffer)}/year more in real take-home pay.`
            : `No -- this offer is not worth taking. Take-home pay actually ${netGainOnOffer === 0 ? 'stays flat' : 'drops'} by ${fmt(Math.abs(netGainOnOffer))}/year.`}
        </div>
        <div className="text-white/80 text-sm">
          Current take-home: {fmt(current.takeHomeAnnual)}/yr ({fmt(current.takeHomeMonthly)}/mo) &rarr; Offer take-home: {fmt(offer.takeHomeAnnual)}/yr ({fmt(offer.takeHomeMonthly)}/mo)
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          <Stat label="Marginal Effective Tax Rate" value={pct(metr.metr)} />
          <Stat label="Retention Rate on the Raise" value={pct(metr.retentionRate)} />
          <Stat label="Break-Even Offer" value={fmt(breakEven.requiredGross)} />
          <Stat label="Net Gain on This Offer" value={fmt(netGainOnOffer)} />
        </div>
      </div>

      {/* SIDE BY SIDE BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Breakdown title={`Current -- ${fmt(currentSalary)}`} b={current} />
        <Breakdown title={`Offer -- ${fmt(offerSalary)}`} b={offer} />
      </div>

      {/* NEGOTIATION SOLVER */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-[#1A1F36] mb-3">Negotiation Target Solver</h2>
        <p className="text-sm text-[#6B7280] mb-3">Tell it how much MORE real take-home pay you actually want, and it solves backward for the minimum gross salary that delivers it.</p>
        <div className="flex flex-wrap items-end gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-[#1A1F36] mb-1">Target net gain</label>
            <div className="flex items-center border border-[#E5E7EB] rounded-md overflow-hidden">
              <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-r border-[#E5E7EB]">$</span>
              <input type="number" value={targetGain} min={0} step={500}
                onChange={e => setTargetGain(Number(e.target.value))}
                className="px-3 py-2 text-sm text-[#1A1F36] focus:outline-none bg-white w-32" />
            </div>
          </div>
          <div className="flex rounded-md border border-[#E5E7EB] overflow-hidden text-sm">
            {(['annual', 'monthly'] as const).map(m => (
              <button key={m} type="button" onClick={() => setTargetGainMode(m)}
                className={`px-3 py-2 font-medium transition-colors focus:outline-none ${targetGainMode === m ? 'bg-[#0F766E] text-white' : 'bg-white text-[#6B7280]'}`}>
                {m === 'annual' ? '/year' : '/month'}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-lg p-4" style={{ background: '#F8FAFB' }}>
          <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-1">MODEL OUTPUT -- Minimum gross salary required</div>
          <div className="text-2xl font-extrabold text-[#0F766E]">{fmt(negotiationTarget.requiredGross)}</div>
          <div className="text-xs text-[#6B7280] mt-1">Solved by binary search on take-home pay ({negotiationTarget.iterations} iterations to converge within $1).</div>
        </div>
      </div>

      {/* STATE COMPARISON */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-[#1A1F36] mb-1">State Comparison</h2>
        <p className="text-sm text-[#6B7280] mb-3">Same salary ({fmt(offerSalary || currentSalary)}), side-by-side take-home across the states you pick.</p>
        <div className="mb-3">
          <select multiple value={compareSlugs}
            onChange={e => setCompareSlugs(Array.from(e.target.selectedOptions).map(o => o.value))}
            className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-sm text-[#1A1F36] h-28 focus:outline-none focus:ring-2 focus:ring-teal-400">
            {US_STATES.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
          <p className="text-[11px] text-[#9CA3AF] mt-1">Ctrl/Cmd-click to select multiple states.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#6B7280] border-b border-[#E5E7EB]">
                <th className="py-2 pr-3">State</th>
                <th className="py-2 pr-3">Take-Home /yr</th>
                <th className="py-2 pr-3">Take-Home /mo</th>
                <th className="py-2 pr-3">Effective Rate</th>
                <th className="py-2">Data Quality</th>
              </tr>
            </thead>
            <tbody>
              {stateComparison.map(row => (
                <tr key={row.stateSlug} className="border-b border-[#F1F5F9]">
                  <td className="py-2 pr-3 font-medium text-[#1A1F36]">{row.stateName}</td>
                  <td className="py-2 pr-3">{fmt(row.takeHomeAnnual)}</td>
                  <td className="py-2 pr-3">{fmt(row.takeHomeMonthly)}</td>
                  <td className="py-2 pr-3">{pct(row.effectiveTaxRate)}</td>
                  <td className="py-2 text-[11px] text-[#6B7280]">{TIER_LABEL[row.tier]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LABELING KEY */}
      <div className="bg-[#F8FAFB] rounded-xl border border-[#E5E7EB] p-4 mb-6 text-[12px] text-[#6B7280] leading-relaxed">
        <strong className="text-[#1A1F36]">How to read every number on this page:</strong>{' '}
        <span className="font-semibold">VERIFIED LAW</span> = sourced to irs.gov/ssa.gov or a state revenue department for tax year 2026.{' '}
        <span className="font-semibold">ASSUMPTION</span> = a stated simplification (no CTC phase-out, standard deduction only, no retirement/HSA/RSU modeling, blended flat rate for some states).{' '}
        <span className="font-semibold">USER INPUT</span> = what you typed in.{' '}
        <span className="font-semibold">MODEL OUTPUT</span> = computed from the above. Not in v1: retirement contributions, HSA/FSA, equity/RSUs, itemized deductions, ACA subsidies, local/city taxes.
      </div>

      <Disclaimer />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg py-3 px-2 text-center" style={{ background: 'rgba(255,255,255,0.14)' }}>
      <div className="font-extrabold text-white text-[18px] leading-tight">{value}</div>
      <div className="text-[10px] text-white/60 uppercase tracking-wide mt-1">{label}</div>
    </div>
  )
}

function Breakdown({ title, b }: { title: string; b: ReturnType<typeof computeTakeHome> }) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm">
      <h3 className="text-sm font-bold text-[#1A1F36] mb-3">{title}</h3>
      <Row label="Standard deduction" value={fmt(b.standardDeduction)} tag="VERIFIED LAW" />
      {b.aboveTheLineDeduction > 0 && <Row label="SE-tax above-the-line deduction" value={fmt(b.aboveTheLineDeduction)} tag="VERIFIED LAW" />}
      <Row label="Taxable income" value={fmt(b.taxableIncome)} tag="MODEL OUTPUT" />
      <Row label="Federal tax (before CTC)" value={fmt(b.federalTaxBeforeCredit)} tag="VERIFIED LAW" />
      {b.childTaxCredit > 0 && <Row label="Child Tax Credit applied" value={'-' + fmt(b.childTaxCredit)} tag="ASSUMPTION" />}
      <Row label="Federal tax (final)" value={fmt(b.federalTax)} tag="MODEL OUTPUT" />
      <Row label={b.payrollTaxLabel.split('(')[0].trim()} value={fmt(b.payrollTax)} tag="VERIFIED LAW" />
      <Row label="State tax" value={fmt(b.stateTax)} tag={b.stateTaxInfo.tier === 'flat-approx' ? 'ASSUMPTION' : 'VERIFIED LAW'} />
      <div className="border-t border-[#E5E7EB] mt-2 pt-2 flex justify-between text-sm font-bold text-[#0F766E]">
        <span>Take-home /year</span><span>{fmt(b.takeHomeAnnual)}</span>
      </div>
      <div className="flex justify-between text-xs text-[#6B7280]">
        <span>Take-home /month</span><span>{fmt(b.takeHomeMonthly)}</span>
      </div>
      <div className="flex justify-between text-xs text-[#6B7280]">
        <span>Effective tax rate</span><span>{pct(b.effectiveTaxRate)}</span>
      </div>
    </div>
  )
}

function Row({ label, value, tag }: { label: string; value: string; tag: string }) {
  return (
    <div className="flex justify-between items-center text-[13px] text-[#1A1F36] py-0.5">
      <span className="text-[#6B7280]">{label} <span className="text-[9px] text-[#9CA3AF] align-middle">{tag}</span></span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
