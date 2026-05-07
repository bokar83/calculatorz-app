import { CalculatorConfig } from '../types'

export const cmToInches: CalculatorConfig = {
  slug: 'cm-to-inches',
  title: 'CM to Inches Converter',
  category: 'finance',
  description: 'Convert centimeters to inches, feet, and meters instantly. Also converts inches to centimeters. Perfect for clothing sizes, heights, and measurements.',
  updatedDate: 'May 2026',
  inputs: [
    {
      id: 'mode',
      label: 'Conversion Direction',
      type: 'select',
      defaultValue: 'cm_to_in',
      options: [
        { value: 'cm_to_in', label: 'Centimeters to Inches / Feet' },
        { value: 'in_to_cm', label: 'Inches to Centimeters' },
        { value: 'ft_to_cm', label: 'Feet + Inches to Centimeters' },
      ],
    },
    {
      id: 'primaryValue',
      label: 'Value to Convert',
      type: 'number',
      defaultValue: 180,
      min: 0,
      max: 100000,
      step: 0.1,
      hint: 'For CM to Inches: enter centimeters. For Inches to CM: enter inches. For Feet to CM: enter feet here.',
    },
    {
      id: 'inchesExtra',
      label: 'Additional Inches (only for Feet + Inches mode)',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 11,
      step: 1,
      hint: 'Only used when converting Feet + Inches to CM. Enter the inches part of a measurement like 5 feet 10 inches.',
    },
  ],
  calculate: (inputs) => {
    const mode = String(inputs.mode)
    const primary = Number(inputs.primaryValue)
    const inchesExtra = Number(inputs.inchesExtra)

    const CM_PER_INCH = 2.54
    const INCHES_PER_FOOT = 12

    if (mode === 'cm_to_in') {
      const totalInches = primary / CM_PER_INCH
      const feet = Math.floor(totalInches / INCHES_PER_FOOT)
      const inchesRemainder = totalInches - feet * INCHES_PER_FOOT
      const meters = primary / 100

      return {
        values: [
          { label: 'Inches', value: totalInches.toFixed(4) + ' in', primary: true },
          { label: 'Feet + Inches', value: `${feet} ft ${inchesRemainder.toFixed(1)} in` },
          { label: 'Feet (decimal)', value: (totalInches / INCHES_PER_FOOT).toFixed(4) + ' ft' },
          { label: 'Meters', value: meters.toFixed(4) + ' m' },
          { label: 'Millimeters', value: (primary * 10).toFixed(0) + ' mm' },
        ],
        summary: `${primary} cm = ${totalInches.toFixed(2)} inches (${feet} ft ${inchesRemainder.toFixed(1)} in) = ${meters.toFixed(3)} m.`,
      }
    }

    if (mode === 'in_to_cm') {
      const cm = primary * CM_PER_INCH
      const feet = Math.floor(primary / INCHES_PER_FOOT)
      const inchesRemainder = primary % INCHES_PER_FOOT

      return {
        values: [
          { label: 'Centimeters', value: cm.toFixed(4) + ' cm', primary: true },
          { label: 'Meters', value: (cm / 100).toFixed(4) + ' m' },
          { label: 'Millimeters', value: (cm * 10).toFixed(0) + ' mm' },
          { label: 'In Feet + Inches', value: `${feet} ft ${inchesRemainder.toFixed(1)} in` },
        ],
        summary: `${primary} inches = ${cm.toFixed(2)} cm = ${(cm / 100).toFixed(4)} m.`,
      }
    }

    // ft_to_cm
    const totalInchesInput = primary * INCHES_PER_FOOT + inchesExtra
    const cm = totalInchesInput * CM_PER_INCH
    const meters = cm / 100

    return {
      values: [
        { label: 'Centimeters', value: cm.toFixed(2) + ' cm', primary: true },
        { label: 'Meters', value: meters.toFixed(4) + ' m' },
        { label: 'Total Inches', value: totalInchesInput.toFixed(1) + ' in' },
        { label: 'Millimeters', value: (cm * 10).toFixed(0) + ' mm' },
      ],
      summary: `${primary} ft ${inchesExtra} in = ${cm.toFixed(2)} cm = ${meters.toFixed(4)} m.`,
    }
  },
  resultLabels: ['Inches', 'Feet + Inches', 'Feet (decimal)', 'Centimeters', 'Meters'],
  formula: '1 inch = 2.54 cm exactly | cm to inches: cm / 2.54 | feet to cm: (feet x 12 + inches) x 2.54',
  geo: {
    definition: 'A centimeter to inches converter applies the exact ratio of 1 inch = 2.54 centimeters to convert measurements between the metric (SI) and US/Imperial unit systems.',
    ruleOfThumb: '1 inch = 2.54 cm | 1 foot = 30.48 cm | 1 meter = 39.37 inches = 3.28 feet | 5 feet 10 inches = 177.8 cm.',
    example: 'A person 180 cm tall is 180 / 2.54 = 70.87 inches = 5 feet 10.87 inches. A 12-inch ruler is exactly 30.48 cm long.',
    keyFacts: [
      'The inch was standardized internationally in 1959 as exactly 25.4 mm (2.54 cm), eliminating previous variations between countries.',
      'The US, Myanmar, and Liberia are the only countries that have not officially adopted the metric system for everyday use.',
      'Clothing sizes often mix both systems: US pants use inches (32x32) while European sizes use centimeters (size 82).',
    ],
  },
  content: {
    howTo: [
      'Select the conversion direction: CM to Inches, Inches to CM, or Feet+Inches to CM.',
      'Enter the value to convert.',
      'For Feet + Inches mode, enter feet in the first field and additional inches in the second field.',
      'Click Calculate to see the converted value in all formats.',
    ],
    refTable: {
      headers: ['Centimeters', 'Inches', 'Feet + Inches'],
      rows: [
        ['150 cm', '59.06 in', '4 ft 11.06 in'],
        ['155 cm', '61.02 in', '5 ft 1.02 in'],
        ['160 cm', '62.99 in', '5 ft 2.99 in'],
        ['165 cm', '64.96 in', '5 ft 4.96 in'],
        ['170 cm', '66.93 in', '5 ft 6.93 in'],
        ['175 cm', '68.90 in', '5 ft 8.90 in'],
        ['180 cm', '70.87 in', '5 ft 10.87 in'],
        ['185 cm', '72.83 in', '6 ft 0.83 in'],
        ['190 cm', '74.80 in', '6 ft 2.80 in'],
        ['30 cm', '11.81 in', '0 ft 11.81 in'],
        ['100 cm (1 m)', '39.37 in', '3 ft 3.37 in'],
      ],
    },
    faqs: [
      {
        q: 'How many centimeters are in one inch?',
        a: 'Exactly 2.54 centimeters = 1 inch. This has been the international standard since 1959. To convert inches to centimeters, multiply by 2.54. To convert centimeters to inches, divide by 2.54.',
      },
      {
        q: 'How do I convert my height from cm to feet and inches?',
        a: 'First divide your height in cm by 2.54 to get total inches. Then divide by 12 to get the feet component, and the remainder is the inches. Example: 175 cm / 2.54 = 68.90 inches. 68.90 / 12 = 5 feet with 8.90 inches remaining = 5 ft 8.9 in.',
      },
      {
        q: 'What is 5 feet 10 inches in centimeters?',
        a: '5 feet 10 inches = (5 x 12) + 10 = 70 inches total. Multiply by 2.54: 70 x 2.54 = 177.8 cm.',
      },
      {
        q: 'Why does the US still use inches instead of centimeters?',
        a: 'The US adopted the metric system in the Metric Conversion Act of 1975, but the transition was voluntary and never widely completed. Infrastructure, road signs, consumer product labeling, and cultural habits remained in Imperial/US customary units. Most US scientific and medical fields use metric.',
      },
    ],
    related: ['unit-converter', 'bmi', 'ideal-body-weight', 'hex-to-rgb', 'percentage'],
  },
  jsonLd: {
    faqs: [
      { q: 'How many centimeters in one inch?', a: 'Exactly 2.54 centimeters = 1 inch. To convert cm to inches, divide by 2.54.' },
      { q: 'How do I convert height from cm to feet and inches?', a: 'Divide cm by 2.54 to get total inches, then divide by 12 for feet and use the remainder as inches.' },
      { q: 'What is 5 feet 10 inches in centimeters?', a: '5 feet 10 inches = 70 total inches x 2.54 = 177.8 cm.' },
      { q: 'Why does the US use inches?', a: 'The 1975 Metric Conversion Act was voluntary and never fully adopted. Most daily life and infrastructure stayed in Imperial/US customary units.' },
    ],
    howToSteps: [
      'Select conversion direction (CM to Inches, Inches to CM, or Feet+Inches to CM).',
      'Enter the value to convert.',
      'For Feet+Inches mode, enter the inches part in the second field.',
      'Click Calculate to see all converted formats.',
    ],
  },
}
