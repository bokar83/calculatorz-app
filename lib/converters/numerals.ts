// Number-base and Roman-numeral conversion (whole numbers only).

export const MAX_SAFE = Number.MAX_SAFE_INTEGER // 9007199254740991

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 3999) throw new RangeError('Roman numerals cover whole numbers from 1 to 3,999.')
  let out = ''
  let rest = n
  for (const [v, s] of ROMAN) {
    while (rest >= v) {
      out += s
      rest -= v
    }
  }
  return out
}

export function fromRoman(input: string): number {
  const s = input.trim().toUpperCase()
  if (!/^[MDCLXVI]+$/.test(s)) throw new SyntaxError('Use only the letters I, V, X, L, C, D and M.')
  let total = 0
  let i = 0
  for (const [v, sym] of ROMAN) {
    while (s.startsWith(sym, i)) {
      total += v
      i += sym.length
    }
  }
  if (i !== s.length || toRoman(total) !== s) throw new SyntaxError('That is not a valid Roman numeral in standard form.')
  return total
}

const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz'

export function parseRadix(input: string, radix: number): number {
  const s = input.trim().toLowerCase().replace(/[\s,_]/g, '')
  if (s === '') throw new SyntaxError('Enter a number.')
  const allowed = DIGITS.slice(0, radix)
  for (const ch of s) {
    if (!allowed.includes(ch)) throw new SyntaxError(`"${ch.toUpperCase()}" is not a valid digit in base ${radix}.`)
  }
  const n = parseInt(s, radix)
  if (!Number.isSafeInteger(n)) throw new RangeError('That number is larger than 9,007,199,254,740,991, the largest value this tool can convert exactly.')
  return n
}

export function formatRadix(n: number, radix: number): string {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('Only whole non-negative numbers are supported.')
  return n.toString(radix).toUpperCase()
}

export function convertNumeral(input: string, from: number | 'roman', to: number | 'roman'): string {
  const n = from === 'roman' ? fromRoman(input) : parseRadix(input, from)
  return to === 'roman' ? toRoman(n) : formatRadix(n, to)
}
