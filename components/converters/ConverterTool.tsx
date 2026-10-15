'use client'

import { useMemo, useState } from 'react'
import { getCategory } from '@/lib/converters'
import { convert, convertIngredient, formatNumber, getUnit, roundDisplay } from '@/lib/converters/engine'
import { convertNumeral } from '@/lib/converters/numerals'

interface Props {
  categoryId: string
  initialFrom?: string
  initialTo?: string
  initialIngredient?: string
  initialValue?: string
}

const fieldCls =
  'w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2.5 text-[16px] text-[#1A1F36] focus:outline-none focus:ring-2 focus:ring-[#0F766E]'
const labelCls = 'block text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mb-1.5'

export default function ConverterTool({ categoryId, initialFrom, initialTo, initialIngredient, initialValue }: Props) {
  const cat = getCategory(categoryId)!
  const numeral = cat.kind === 'numeral'
  const [from, setFrom] = useState(initialFrom ?? cat.defaultFrom)
  const [to, setTo] = useState(initialTo ?? cat.defaultTo)
  const [ingId, setIngId] = useState(initialIngredient ?? cat.defaultIngredient ?? '')
  const [baseFont, setBaseFont] = useState(String(cat.ctxInput?.default ?? 16))
  const defaultLeft = initialValue ?? cat.defaultValue ?? '1'
  const [left, setLeft] = useState(defaultLeft)
  const [lastEdited, setLastEdited] = useState<'left' | 'right'>('left')
  const [rightRaw, setRightRaw] = useState('')
  const [copied, setCopied] = useState(false)

  const ingredient = cat.ingredients?.find(i => i.id === ingId)

  const compute = (text: string, a: string, b: string): { out: string; error?: string } => {
    const t = text.trim()
    if (t === '') return { out: '' }
    try {
      if (numeral) {
        const ra = getUnit(cat, a).radix!
        const rb = getUnit(cat, b).radix!
        return { out: convertNumeral(t, ra, rb) }
      }
      const v = Number(t.replace(/,/g, ''))
      if (!Number.isFinite(v)) return { out: '', error: 'Enter a valid number.' }
      let r: number
      if (cat.kind === 'ingredient') r = convertIngredient(cat, a, b, v, ingredient!)
      else r = convert(cat, a, b, v, { baseFontPx: Number(baseFont) > 0 ? Number(baseFont) : 16 })
      r = roundDisplay(r, getUnit(cat, b).roundTo)
      return { out: formatNumber(r) }
    } catch (e) {
      return { out: '', error: e instanceof Error ? e.message : 'Could not convert that value.' }
    }
  }

  // The "source" side is whichever field was edited last; the other side is derived.
  const derived = useMemo(() => {
    if (lastEdited === 'left') return compute(left, from, to)
    return compute(rightRaw, to, from)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, rightRaw, from, to, lastEdited, ingId, baseFont])

  const leftShown = lastEdited === 'left' ? left : derived.out
  const rightShown = lastEdited === 'left' ? derived.out : rightRaw
  const error = derived.error

  const fromU = getUnit(cat, from)
  const toU = getUnit(cat, to)
  const summary =
    leftShown && rightShown && !error ? `${leftShown} ${fromU.symbol} = ${rightShown} ${toU.symbol}` : ''

  const swap = () => {
    // keep the displayed numbers attached to their units
    setFrom(to)
    setTo(from)
    setLeft(rightShown)
    setRightRaw(leftShown)
    setLastEdited('left')
  }

  const copy = async () => {
    if (!summary) return
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section aria-label={cat.title} className="bg-white rounded-xl border border-[#E5E7EB] p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      {(cat.ingredients && cat.ingredients.length > 0) && (
        <div className="mb-4">
          <label htmlFor="ingredient" className={labelCls}>{cat.kind === 'ingredient' && cat.id === 'water-weight' ? 'Water type' : 'Ingredient'}</label>
          <select id="ingredient" className={fieldCls} value={ingId} onChange={e => setIngId(e.target.value)}>
            {cat.ingredients.map(i => (
              <option key={i.id} value={i.id}>{i.label}{i.id !== 'water' && cat.id === 'cooking' ? ` (${i.gPerCup} g per cup)` : ''}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label htmlFor="left-value" className={labelCls}>{fromU.label}</label>
          <input
            id="left-value"
            type="text"
            inputMode={numeral ? 'text' : 'decimal'}
            autoComplete="off"
            className={fieldCls}
            value={leftShown}
            onChange={e => { setLeft(e.target.value); setLastEdited('left') }}
            aria-describedby="converter-status"
          />
          <label htmlFor="from-unit" className="sr-only">From unit</label>
          <select id="from-unit" className={`${fieldCls} mt-2`} value={from} onChange={e => setFrom(e.target.value)}>
            {cat.units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>

        <button
          type="button"
          onClick={swap}
          aria-label="Swap units"
          className="h-11 w-11 mx-auto rounded-full border border-[#0F766E] text-[#0F766E] hover:bg-[#F0FDFA] focus:outline-none focus:ring-2 focus:ring-[#0F766E] flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />
          </svg>
        </button>

        <div>
          <label htmlFor="right-value" className={labelCls}>{toU.label}</label>
          <input
            id="right-value"
            type="text"
            inputMode={numeral ? 'text' : 'decimal'}
            autoComplete="off"
            className={fieldCls}
            value={rightShown}
            onChange={e => { setRightRaw(e.target.value); setLastEdited('right') }}
            aria-describedby="converter-status"
          />
          <label htmlFor="to-unit" className="sr-only">To unit</label>
          <select id="to-unit" className={`${fieldCls} mt-2`} value={to} onChange={e => setTo(e.target.value)}>
            {cat.units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {cat.ctxInput && (
        <div className="mt-4 max-w-[220px]">
          <label htmlFor="base-font" className={labelCls}>{cat.ctxInput.label}</label>
          <input id="base-font" type="text" inputMode="decimal" className={fieldCls} value={baseFont} onChange={e => setBaseFont(e.target.value)} />
        </div>
      )}

      <div id="converter-status" role="status" aria-live="polite" className="mt-5 min-h-[56px]">
        {error ? (
          <p className="text-[14px] font-semibold text-[#B91C1C]" data-testid="converter-error">{error}</p>
        ) : summary ? (
          <div className="rounded-lg px-4 py-3 flex items-center justify-between gap-3 flex-wrap" style={{ background: '#F0FFFE', border: '1px solid #B7E4DF' }}>
            <p className="text-[18px] font-extrabold text-[#0C3547] break-all" data-testid="converter-result">{summary}</p>
            <button
              type="button"
              onClick={copy}
              className="text-[13px] font-bold px-3.5 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F766E]"
              style={{ background: '#0F766E' }}
            >
              {copied ? 'Copied' : 'Copy result'}
            </button>
          </div>
        ) : (
          <p className="text-[14px] text-[#6B7280]">Type a number in either box to convert.</p>
        )}
      </div>

      {cat.approximate && (
        <p className="mt-3 text-[13px] text-[#92400E] bg-[#FFFBEB] border border-[#FDE68A] rounded-md px-3 py-2" data-testid="approx-note">
          <strong>Approximate:</strong> {cat.approximate}
        </p>
      )}
    </section>
  )
}
