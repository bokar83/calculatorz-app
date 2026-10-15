import type { CalculatorConfig } from '../types.ts'

/**
 * Parses '#FF6B35', 'FF6B35', '#F60' or a decimal number (0 to 16777215) into [r, g, b].
 * A value with # or a letter a-f is hex. A plain run of digits is hex when it is 3 or 6 long
 * (112233 is a valid hex code) and decimal otherwise. Returns null when it cannot be read.
 */
export function parseColorCode(raw: string): [number, number, number] | null {
  const t = raw.trim().replace(/^#/, '')
  if (!t) return null
  const hasMark = raw.trim().startsWith('#')
  const isHexChars = /^[0-9a-fA-F]+$/.test(t)
  const isDigits = /^[0-9]+$/.test(t)
  let hex: string | null = null
  if (isHexChars && (hasMark || !isDigits || t.length === 3 || t.length === 6)) {
    if (t.length === 3) hex = t.split('').map(c => c + c).join('')
    else if (t.length === 6) hex = t
    else return null
  } else if (isDigits) {
    const n = Number(t)
    if (!Number.isInteger(n) || n < 0 || n > 0xFFFFFF) return null
    return [(n >> 16) & 0xFF, (n >> 8) & 0xFF, n & 0xFF]
  } else return null
  const n = parseInt(hex, 16)
  return [(n >> 16) & 0xFF, (n >> 8) & 0xFF, n & 0xFF]
}

export const hexToRgb: CalculatorConfig = {
  slug: 'hex-to-rgb',
  title: 'Hex to RGB Converter',
  category: 'finance',
  displayGroup: 'converters',
  description: 'Convert hex color codes to RGB values instantly. Also outputs HSL and CSS-ready color values for designers and developers.',
  updatedDate: 'May 2026',
  inputs: [
    {
      id: 'hexInput',
      label: 'Color Code (hex like FF6B35 or #FF6B35, or a decimal number)',
      type: 'text',
      defaultValue: 'FF6B35',
      hint: 'Type a hex code with or without #, 3 or 6 digits (F60 or FF6600). A plain decimal such as 16739125 also works.',
    },
    {
      id: 'red',
      label: 'Red channel override (0-255, optional)',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 255,
      step: 1,
      hint: 'Set to 0 to use hex input above. Set a value to build RGB directly.',
    },
    {
      id: 'green',
      label: 'Green channel override (0-255, optional)',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 255,
      step: 1,
    },
    {
      id: 'blue',
      label: 'Blue channel override (0-255, optional)',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 255,
      step: 1,
    },
  ],
  calculate: (inputs) => {
    let r: number, g: number, b: number

    const redOverride = Number(inputs.red)
    const greenOverride = Number(inputs.green)
    const blueOverride = Number(inputs.blue)

    // If any RGB channel is non-zero, use RGB input mode
    if (redOverride > 0 || greenOverride > 0 || blueOverride > 0) {
      r = Math.min(255, Math.max(0, redOverride))
      g = Math.min(255, Math.max(0, greenOverride))
      b = Math.min(255, Math.max(0, blueOverride))
    } else {
      const parsed = parseColorCode(String(inputs.hexInput ?? ''))
      if (parsed === null) {
        return {
          values: [{ label: 'Hex Code', value: 'Invalid code', primary: true }],
          summary: 'Enter a hex code such as FF6B35 or #FF6B35 (3 or 6 digits), or a decimal number from 0 to 16777215.',
        }
      }
      ;[r, g, b] = parsed
    }

    // Build hex string
    const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('')

    // Compute HSL
    const rn = r / 255, gn = g / 255, bn = b / 255
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
    const delta = max - min
    let h = 0, s = 0
    const l = (max + min) / 2

    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1))
      if (max === rn) h = ((gn - bn) / delta) % 6
      else if (max === gn) h = (bn - rn) / delta + 2
      else h = (rn - gn) / delta + 4
      h = Math.round(h * 60)
      if (h < 0) h += 360
    }

    const hsl = `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
    const cssRgb = `rgb(${r}, ${g}, ${b})`
    const cssRgba = `rgba(${r}, ${g}, ${b}, 1.0)`

    // Contrast ratio against white and black for accessibility
    const luminance = (ch: number) => {
      const c = ch / 255
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    }
    const relLum = 0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b)
    const contrastWhite = ((1 + 0.05) / (relLum + 0.05)).toFixed(2)
    const contrastBlack = ((relLum + 0.05) / (0 + 0.05)).toFixed(2)
    const wcagRating = parseFloat(contrastWhite) >= 4.5 ? 'WCAG AA (white text ok)' : parseFloat(contrastBlack) >= 4.5 ? 'WCAG AA (black text ok)' : 'Low contrast (both fail AA)'

    return {
      values: [
        { label: 'Hex Code', value: hex, primary: true },
        { label: 'RGB', value: cssRgb },
        { label: 'HSL', value: hsl },
        { label: 'CSS rgba()', value: cssRgba },
        { label: 'Red', value: String(r) },
        { label: 'Green', value: String(g) },
        { label: 'Blue', value: String(b) },
        { label: 'Accessibility', value: wcagRating },
      ],
      summary: `${hex} = ${cssRgb} | ${hsl}. Accessibility: ${wcagRating}.`,
    }
  },
  resultLabels: ['Hex Code', 'RGB', 'HSL', 'CSS rgba()', 'Red', 'Green', 'Blue', 'Accessibility'],
  formula: 'R = (hex >> 16) & 0xFF | G = (hex >> 8) & 0xFF | B = hex & 0xFF | HSL conversion via standard formula',
  geo: {
    definition: 'A hex to RGB converter translates a 6-digit hexadecimal color code (like #FF6B35) into three decimal channel values for Red, Green, and Blue (0-255 each).',
    ruleOfThumb: '#000000 = black (0,0,0) | #FFFFFF = white (255,255,255) | #FF0000 = pure red | #00FF00 = pure green | #0000FF = pure blue.',
    example: '#FF6B35 converts to R:255, G:107, B:53 — an orange tone. In CSS: rgb(255, 107, 53) or hsl(20, 100%, 60%).',
    keyFacts: [
      'Hex codes use base-16: digits 0-9 and letters A-F. Each pair of characters represents one 8-bit color channel.',
      'The first two hex digits = Red, middle two = Green, last two = Blue.',
      'WCAG AA accessibility requires 4.5:1 contrast ratio for normal text against the background color.',
    ],
  },
  content: {
    howTo: [
      'To convert a hex code: type it into the color code field (for example #FF6B35 or FF6B35), leave the RGB fields at 0.',
      'To convert RGB to hex: enter 0 in the hex field and set Red, Green, and Blue channel values.',
      'Click Calculate to see hex, RGB, HSL, and CSS values.',
      'Use the Accessibility result to check if text will be readable on this background color.',
    ],
    refTable: {
      headers: ['Color Name', 'Hex Code', 'RGB Values'],
      rows: [
        ['Black', '#000000', 'rgb(0, 0, 0)'],
        ['White', '#FFFFFF', 'rgb(255, 255, 255)'],
        ['Red', '#FF0000', 'rgb(255, 0, 0)'],
        ['Green', '#00FF00', 'rgb(0, 255, 0)'],
        ['Blue', '#0000FF', 'rgb(0, 0, 255)'],
        ['Orange', '#FF6B35', 'rgb(255, 107, 53)'],
        ['Teal', '#0F766E', 'rgb(15, 118, 110)'],
        ['Gray', '#6B7280', 'rgb(107, 114, 128)'],
      ],
    },
    faqs: [
      {
        q: 'Can I type a hex code directly?',
        a: 'Yes. Type the code with or without the # sign, in 3 or 6 digits (FF6B35, #FF6B35 or F60). A plain decimal number such as 16739125 also works.',
      },
      {
        q: 'What is the difference between RGB and HSL?',
        a: 'RGB (Red, Green, Blue) uses three channel values (0-255) to define a color by how much of each light channel to mix. HSL (Hue, Saturation, Lightness) describes color by its position on the color wheel (0-360 degrees), how saturated it is, and how light or dark it is. Designers often prefer HSL because adjusting lightness alone does not shift the hue.',
      },
      {
        q: 'What is WCAG contrast ratio?',
        a: 'WCAG (Web Content Accessibility Guidelines) requires a contrast ratio of at least 4.5:1 between text and its background for normal body text (Level AA). High-contrast designs use 7:1 (Level AAA). This calculator checks whether white or black text would pass AA on this color as a background.',
      },
      {
        q: 'Can I use the output directly in CSS?',
        a: 'Yes. The RGB output (e.g. rgb(255, 107, 53)) and HSL output (e.g. hsl(20, 100%, 60%)) can be pasted directly into any CSS color property. Use rgba(255, 107, 53, 0.8) for semi-transparent versions.',
      },
    ],
    related: ['unit-converter', 'percentage', 'cm-to-inches'],
  },
  jsonLd: {
    faqs: [
      { q: 'Can I type a hex code directly?', a: 'Yes. Type it with or without the # sign, in 3 or 6 digits, or enter a plain decimal number.' },
      { q: 'What is the difference between RGB and HSL?', a: 'RGB uses 0-255 channel values. HSL uses hue (0-360 degrees), saturation (%), and lightness (%).' },
      { q: 'What is WCAG contrast ratio?', a: 'A 4.5:1 contrast between text and background color meets WCAG AA accessibility standard.' },
      { q: 'Can I use the output in CSS?', a: 'Yes. rgb(), hsl(), and rgba() outputs can be pasted directly into CSS color properties.' },
    ],
    howToSteps: [
      'Enter a hex color code, or enter Red/Green/Blue channel values.',
      'Click Calculate.',
      'Copy hex, RGB, HSL, or CSS rgba output for use in your design or code.',
    ],
  },
}
