'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { search, type SearchItem } from '@/lib/search/search'

let indexPromise: Promise<SearchItem[]> | null = null

function loadIndex(): Promise<SearchItem[]> {
  if (!indexPromise) {
    indexPromise = fetch('/search-index/')
      .then(r => {
        if (!r.ok) throw new Error(`search index ${r.status}`)
        return r.json() as Promise<SearchItem[]>
      })
      .catch(err => {
        indexPromise = null // allow retry on next focus
        throw err
      })
  }
  return indexPromise
}

interface Props {
  inputClassName: string
  onNavigate?: () => void
}

export default function SearchBox({ inputClassName, onNavigate }: Props) {
  const router = useRouter()
  const uid = useId()
  const listId = `${uid}-list`
  const wrapRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [items, setItems] = useState<SearchItem[] | null>(null)
  const [failed, setFailed] = useState(false)

  const ensureIndex = () => {
    if (items || failed) return
    loadIndex().then(setItems).catch(() => setFailed(true))
  }

  const results = useMemo(() => (items ? search(items, query, 8) : []), [items, query])
  const showPanel = open && query.trim().length >= 2

  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [])

  const go = (url: string) => {
    setOpen(false)
    setQuery('')
    onNavigate?.()
    router.push(url)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive(a => Math.min(a + 1, Math.max(results.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      if (showPanel && results[active]) {
        e.preventDefault()
        go(results[active].u)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <input
        type="search"
        role="combobox"
        aria-label="Search calculators"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showPanel && results[active] ? `${uid}-opt-${active}` : undefined}
        autoComplete="off"
        enterKeyHint="search"
        placeholder="Search calculators..."
        className={inputClassName}
        value={query}
        onFocus={() => { ensureIndex(); setOpen(true) }}
        onChange={e => { ensureIndex(); setQuery(e.target.value); setActive(0); setOpen(true) }}
        onKeyDown={onKeyDown}
      />
      {showPanel && (
        <div
          className="absolute right-0 left-0 md:left-auto md:w-[420px] mt-1 z-[60] bg-white text-[#1A1F36] rounded-lg border border-[#E5E7EB] shadow-xl overflow-hidden"
          data-testid="search-panel"
        >
          {failed ? (
            <div className="p-3 text-[13px]">
              <p className="mb-2">Search is unavailable right now. Browse instead:</p>
              <div className="flex gap-2 flex-wrap">
                {[['/finance/', 'Finance'], ['/health/', 'Health'], ['/converters/', 'Converters'], ['/tools/', 'Tools']].map(([h, l]) => (
                  <Link key={h} href={h} onClick={() => { setOpen(false); onNavigate?.() }} className="px-3 py-2 rounded border border-[#E5E7EB] font-semibold text-[#0F766E]">{l}</Link>
                ))}
              </div>
            </div>
          ) : !items ? (
            <p className="p-3 text-[13px] text-[#6B7280]">Loading...</p>
          ) : results.length === 0 ? (
            <div className="p-3 text-[13px]" data-testid="search-empty">
              <p className="mb-2">No calculators found for &ldquo;{query.trim()}&rdquo;.</p>
              <div className="flex gap-2 flex-wrap">
                {[['/finance/', 'Finance'], ['/health/', 'Health'], ['/converters/', 'Converters'], ['/tools/', 'Tools']].map(([h, l]) => (
                  <Link key={h} href={h} onClick={() => { setOpen(false); onNavigate?.() }} className="px-3 py-2 rounded border border-[#E5E7EB] font-semibold text-[#0F766E]">{l}</Link>
                ))}
              </div>
            </div>
          ) : (
            <ul id={listId} role="listbox" aria-label="Search results" className="max-h-[60vh] overflow-y-auto">
              {results.map((r, i) => (
                <li
                  key={r.u}
                  id={`${uid}-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  className={i === active ? 'bg-[#F0FDFA]' : ''}
                >
                  <Link
                    href={r.u}
                    onClick={e => { e.preventDefault(); go(r.u) }}
                    className="flex items-center justify-between gap-3 px-3 min-h-[44px] py-2"
                  >
                    <span className="text-[14px] font-semibold leading-snug">{r.t}</span>
                    <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-[#0F766E]">{r.g}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
