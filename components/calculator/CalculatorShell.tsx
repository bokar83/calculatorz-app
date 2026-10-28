'use client'

import { useEffect, useState } from 'react'
import { todayPart } from '@/lib/todayDefaults'
import type { CalculatorConfig, CalculatorResult, UnitSystem } from '@/lib/calculators/types'
import { DEFAULT_CURRENCY } from '@/lib/currencies'
import CurrencySelector from './CurrencySelector'
import UnitToggle from './UnitToggle'
import ResultsBlock from './ResultsBlock'
import AffiliateStrip from './AffiliateStrip'
import type { Currency } from '@/lib/calculators/types'

interface CalculatorShellProps {
  config: CalculatorConfig
  initialCurrency?: Currency
  /** Values pre-filled into inputs (matching ids) and passed through to calculate() (any key), e.g. { stateSlug: 'texas' }. */
  presets?: Record<string, number | string>
  /** Input ids that are driven by presets and therefore not shown (e.g. the manual state-rate field on a state page). */
  hiddenInputs?: string[]
}

export default function CalculatorShell({ config, initialCurrency, presets, hiddenInputs }: CalculatorShellProps) {
  const [activeTab, setActiveTab] = useState(config.tabs?.[0]?.id ?? 'default')
  const [currency, setCurrency] = useState<Currency>(initialCurrency ?? DEFAULT_CURRENCY)
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric')
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [showAffiliate, setShowAffiliate] = useState(false)

  const baseDefaults = (): Record<string, number | string> => Object.fromEntries(
    config.inputs.map(f => [f.id, presets?.[f.id] ?? f.defaultValue ?? (f.options?.[0]?.value ?? '')])
  )
  const [inputs, setInputs] = useState<Record<string, number | string>>(baseDefaults)

  // Today-relative date defaults are applied after mount (the static HTML carries a fixed fallback).
  useEffect(() => {
    const dated = config.inputs.filter(f => f.todayDefault)
    if (dated.length === 0) return
    setInputs(prev => ({
      ...prev,
      ...Object.fromEntries(dated.map(f => {
        const v = todayPart(f.todayDefault!.part, f.todayDefault!.offsetDays)
        return [f.id, f.type === 'select' ? String(v) : v]
      })),
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // Per-field input mode for percent-or-amount fields (e.g. down payment). Stored value stays the percent.
  // Per-field $ / % mode for amountOrPercent fields (take-home pay deduction lines).
  const [dualModes, setDualModes] = useState<Record<string, 'amount' | 'percent'>>(() =>
    Object.fromEntries(config.inputs.filter(f => f.amountOrPercent).map(f => [f.id, f.amountOrPercent!.defaultMode])))
  const [pctModes, setPctModes] = useState<Record<string, 'percent' | 'amount'>>({})

  const handleChange = (id: string, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }))
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setResult(null)
  }

  const handleUnitChange = (u: UnitSystem) => {
    setUnitSystem(u)
    setInputs({ ...baseDefaults(), ...(u === 'imperial' ? config.imperialDefaults ?? {} : {}) })
    setResult(null)
  }

  const handleCalculate = () => {
    try {
      const parsed: Record<string, number | string> = { ...(presets ?? {}) }
      for (const [id, m] of Object.entries(dualModes)) parsed[`${id}__mode`] = m
      for (const field of config.inputs) {
        parsed[field.id] = field.type === 'number' ? Number(inputs[field.id]) : inputs[field.id]
      }
      const res = config.calculate(parsed, currency, unitSystem, activeTab)
      setResult(res)
      setShowAffiliate(true)
    } catch {
      // silently ignore calculation errors
    }
  }

  const hasTabs = config.tabs && config.tabs.length > 1
  const isImperial = config.usesUnits === true && unitSystem === 'imperial'

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
      {hasTabs && (
        <div className="flex gap-1 overflow-x-auto mb-4 border-b border-[#E5E7EB] pb-0">
          {config.tabs!.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap border-b-2 transition-colors focus:outline-none ${
                activeTab === tab.id
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent text-[#6B7280] hover:text-[#1A1F36]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {config.usesCurrency === true && (
        <div className="mb-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>
      )}

      {config.usesUnits === true && (
        <div className="mb-4">
          <UnitToggle value={unitSystem} onChange={handleUnitChange} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {config.inputs.filter(f => !hiddenInputs?.includes(f.id) && (!f.showWhen || String(inputs[f.showWhen.id]) === f.showWhen.equals)).map(field => {
          const displayLabel = isImperial
            ? field.label.replace('(kg)', '(lbs)').replace('(cm)', '(in)')
            : field.label
          const displaySuffix = isImperial
            ? (field.suffix === 'kg' ? 'lbs' : field.suffix === 'cm' ? 'in' : field.suffix)
            : field.suffix

          // Amount-or-percent field: per-line $ / % toggle. The typed number is kept as typed; the mode travels with it.
          if (field.amountOrPercent) {
            const mode = dualModes[field.id] ?? field.amountOrPercent.defaultMode
            return (
              <div key={field.id}>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <label htmlFor={`f-${field.id}`} className="block text-sm font-medium text-[#1A1F36]">{field.label}</label>
                  <div className="flex rounded-md border border-[#E5E7EB] overflow-hidden text-xs shrink-0" role="group" aria-label={`${field.label}: dollars or percent`}>
                    {(['amount', 'percent'] as const).map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setDualModes(prev => ({ ...prev, [field.id]: m }))}
                        className={`px-3 py-1.5 font-medium transition-colors focus:outline-none ${
                          mode === m ? 'bg-[#0F766E] text-white' : 'bg-white text-[#6B7280] hover:text-[#1A1F36]'
                        }`}
                        aria-pressed={mode === m}
                      >
                        {m === 'percent' ? '%' : currency.symbol}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center border border-[#E5E7EB] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
                  {mode === 'amount' && (
                    <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-r border-[#E5E7EB]">{currency.symbol}</span>
                  )}
                  <input
                    id={`f-${field.id}`}
                    type="number"
                    value={String(inputs[field.id])}
                    min={0}
                    max={mode === 'percent' ? 100 : undefined}
                    step={mode === 'percent' ? 0.5 : 5}
                    onChange={e => handleChange(field.id, e.target.value)}
                    className="flex-1 min-w-0 px-3 py-2 text-sm text-[#1A1F36] focus:outline-none bg-white"
                  />
                  {mode === 'percent' && (
                    <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-l border-[#E5E7EB]">%</span>
                  )}
                </div>
                {field.hint && (
                  <p className="text-[11px] text-[#9CA3AF] mt-1 leading-relaxed">{field.hint}</p>
                )}
              </div>
            )
          }

          // Percent-or-amount field: render a $/% toggle and keep both views in sync live.
          if (field.percentOf) {
            const base = Number(inputs[field.percentOf]) || 0
            const pct = Number(inputs[field.id]) || 0
            const amount = base > 0 ? Math.round(base * pct / 100) : 0
            const mode = pctModes[field.id] ?? 'percent'
            const setMode = (m: 'percent' | 'amount') =>
              setPctModes(prev => ({ ...prev, [field.id]: m }))
            return (
              <div key={field.id}>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-[#1A1F36]">{field.label}</label>
                  <div className="flex rounded-md border border-[#E5E7EB] overflow-hidden text-xs">
                    {(['percent', 'amount'] as const).map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`px-2.5 py-1 font-medium transition-colors focus:outline-none ${
                          mode === m ? 'bg-[#0F766E] text-white' : 'bg-white text-[#6B7280] hover:text-[#1A1F36]'
                        }`}
                        aria-pressed={mode === m}
                      >
                        {m === 'percent' ? '%' : currency.symbol}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center border border-[#E5E7EB] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
                  {mode === 'amount' && (
                    <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-r border-[#E5E7EB]">
                      {currency.symbol}
                    </span>
                  )}
                  <input
                    type="number"
                    value={mode === 'percent' ? String(inputs[field.id]) : String(amount)}
                    min={0}
                    max={mode === 'percent' ? 100 : (base || undefined)}
                    step={mode === 'percent' ? field.step : 1000}
                    onChange={e => {
                      if (mode === 'percent') {
                        handleChange(field.id, e.target.value)
                      } else {
                        const amt = Number(e.target.value) || 0
                        const newPct = base > 0 ? (amt / base) * 100 : 0
                        handleChange(field.id, String(Math.round(newPct * 1000) / 1000))
                      }
                    }}
                    className="flex-1 px-3 py-2 text-sm text-[#1A1F36] focus:outline-none bg-white"
                  />
                  {mode === 'percent' && (
                    <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-l border-[#E5E7EB]">%</span>
                  )}
                </div>
                <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                  {base > 0
                    ? (mode === 'percent'
                        ? `= ${currency.symbol}${amount.toLocaleString('en-US')} down payment`
                        : `= ${(Math.round(pct * 100) / 100).toLocaleString('en-US')}% of home price`)
                    : 'Enter the home price above to see the equivalent.'}
                </p>
                {field.hint && (
                  <p className="text-[11px] text-[#9CA3AF] mt-1 leading-relaxed">{field.hint}</p>
                )}
              </div>
            )
          }

          return (
            <div key={field.id}>
              <label className="block text-sm font-medium text-[#1A1F36] mb-1">
                {displayLabel}
              </label>
              {field.type === 'select' ? (
                <select
                  value={String(inputs[field.id])}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-sm text-[#1A1F36] focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'text' ? (
                <input
                  type="text"
                  value={String(inputs[field.id])}
                  onChange={e => handleChange(field.id, e.target.value)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 text-sm text-[#1A1F36] focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              ) : (
                <div className="flex items-center border border-[#E5E7EB] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
                  {field.prefix && (
                    <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-r border-[#E5E7EB]">
                      {field.prefix}
                    </span>
                  )}
                  <input
                    type="number"
                    value={String(inputs[field.id])}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    onChange={e => handleChange(field.id, e.target.value)}
                    className="flex-1 px-3 py-2 text-sm text-[#1A1F36] focus:outline-none bg-white"
                  />
                  {displaySuffix && (
                    <span className="px-3 py-2 bg-[#F8FAFB] text-[#6B7280] text-sm border-l border-[#E5E7EB]">
                      {displaySuffix}
                    </span>
                  )}
                </div>
              )}
              {field.hint && (
                <p className="text-[11px] text-[#9CA3AF] mt-1 leading-relaxed">{field.hint}</p>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={handleCalculate}
        className="mt-5 w-full text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F766E] hover:opacity-90 active:scale-[0.99] transition-all"
        style={{ background: '#0F766E', fontSize: '14px' }}
      >
        Calculate
      </button>

      <ResultsBlock result={result} />
      {config.footnote && (
        <p className="mt-3 text-[11px] text-[#6B7280] leading-relaxed">{config.footnote}</p>
      )}
      <AffiliateStrip affiliate={config.affiliate} show={showAffiliate} />
    </div>
  )
}
