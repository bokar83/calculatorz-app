import { CalculatorConfig } from '../types'

export const hexToRgb: CalculatorConfig = {
  slug: 'hex-to-rgb',
  title: 'Hex to RGB Converter',
  category: 'finance',
  description: 'Convert hex color codes to RGB values instantly. Also outputs HSL and CSS-ready color values for designers and developers.',
  updatedDate: 'May 2026',
  inputs: [
    {
      id: 'hexInput',
      label: 'Hex Color Code (e.g. FF6B35 or #FF6B35)',
      type: 'number',
      defaultValue: 16737077,
      min: 0,
      max: 16777215,
      step: 1,
      hint: 'Enter the 6-digit hex color code as a number (without #). For example, FF6B35 = 16737077 in decimal. Or see the FAQ for how to use this.',
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
      // Use hex input (stored as decimal integer)
      const hexVal = Math.round(Number(inputs.hexInput))
      r = (hexVal >> 16) & 0xFF
      g = (hexVal >> 8) & 0xFF
      b = hexVal & 0xFF
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
      'To convert a hex code: enter the 6-digit hex value as a decimal number (e.g. #FF6B35 = 16737077), leave RGB fields at 0.',
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
        q: 'How do I convert a hex color code to decimal for this calculator?',
        a: 'Open your browser console (F12) and type: parseInt("FF6B35", 16) — it will output the decimal number (16737077). You can also use Windows Calculator in Programmer mode: switch to Hex, type FF6B35, then switch to Dec.',
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
      { q: 'How do I convert hex to decimal for this calculator?', a: 'Use parseInt("FF6B35", 16) in a browser console, or Windows Calculator in Programmer mode (Hex to Dec).' },
      { q: 'What is the difference between RGB and HSL?', a: 'RGB uses 0-255 channel values. HSL uses hue (0-360 degrees), saturation (%), and lightness (%).' },
      { q: 'What is WCAG contrast ratio?', a: 'A 4.5:1 contrast between text and background color meets WCAG AA accessibility standard.' },
      { q: 'Can I use the output in CSS?', a: 'Yes. rgb(), hsl(), and rgba() outputs can be pasted directly into CSS color properties.' },
    ],
    howToSteps: [
      'Enter hex color value as decimal, or enter Red/Green/Blue channel values.',
      'Click Calculate.',
      'Copy hex, RGB, HSL, or CSS rgba output for use in your design or code.',
    ],
  },
}
