import { CalculatorConfig, Currency } from '../types'

export const unitConverter: CalculatorConfig = {
  slug: 'unit-converter',
  title: 'Unit Converter',
  category: 'finance',
  description: 'Convert between common units of length, weight, temperature, and volume instantly.',
  updatedDate: 'April 2026',
  inputs: [
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      defaultValue: 'length',
      options: [
        { value: 'length', label: 'Length' },
        { value: 'weight', label: 'Weight' },
        { value: 'temperature', label: 'Temperature' },
        { value: 'volume', label: 'Volume' },
      ],
    },
    {
      id: 'fromUnit',
      label: 'From Unit',
      type: 'select',
      defaultValue: 'meters',
      options: [
        { value: 'meters', label: 'Meters (m)' },
        { value: 'feet', label: 'Feet (ft)' },
        { value: 'inches', label: 'Inches (in)' },
        { value: 'centimeters', label: 'Centimeters (cm)' },
        { value: 'kilometers', label: 'Kilometers (km)' },
        { value: 'miles', label: 'Miles (mi)' },
        { value: 'yards', label: 'Yards (yd)' },
        { value: 'kilograms', label: 'Kilograms (kg)' },
        { value: 'pounds', label: 'Pounds (lb)' },
        { value: 'ounces', label: 'Ounces (oz)' },
        { value: 'grams', label: 'Grams (g)' },
        { value: 'celsius', label: 'Celsius (C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (F)' },
        { value: 'kelvin', label: 'Kelvin (K)' },
        { value: 'liters', label: 'Liters (L)' },
        { value: 'gallons', label: 'Gallons (US gal)' },
        { value: 'quarts', label: 'Quarts (qt)' },
        { value: 'cups', label: 'Cups (US cup)' },
        { value: 'milliliters', label: 'Milliliters (mL)' },
      ],
    },
    {
      id: 'toUnit',
      label: 'To Unit',
      type: 'select',
      defaultValue: 'feet',
      options: [
        { value: 'meters', label: 'Meters (m)' },
        { value: 'feet', label: 'Feet (ft)' },
        { value: 'inches', label: 'Inches (in)' },
        { value: 'centimeters', label: 'Centimeters (cm)' },
        { value: 'kilometers', label: 'Kilometers (km)' },
        { value: 'miles', label: 'Miles (mi)' },
        { value: 'yards', label: 'Yards (yd)' },
        { value: 'kilograms', label: 'Kilograms (kg)' },
        { value: 'pounds', label: 'Pounds (lb)' },
        { value: 'ounces', label: 'Ounces (oz)' },
        { value: 'grams', label: 'Grams (g)' },
        { value: 'celsius', label: 'Celsius (C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (F)' },
        { value: 'kelvin', label: 'Kelvin (K)' },
        { value: 'liters', label: 'Liters (L)' },
        { value: 'gallons', label: 'Gallons (US gal)' },
        { value: 'quarts', label: 'Quarts (qt)' },
        { value: 'cups', label: 'Cups (US cup)' },
        { value: 'milliliters', label: 'Milliliters (mL)' },
      ],
    },
    {
      id: 'value',
      label: 'Value to Convert',
      type: 'number',
      defaultValue: 1,
      min: -9999999,
      max: 9999999,
      step: 0.001,
    },
  ],
  calculate: (_inputs: Record<string, number | string>, _currency: Currency) => {
    const from = String(_inputs.fromUnit)
    const to = String(_inputs.toUnit)
    const val = Number(_inputs.value)

    if (isNaN(val)) {
      return { values: [{ label: 'Result', value: 'N/A' }], summary: 'Enter a valid number.' }
    }

    if (from === to) {
      return {
        values: [{ label: 'Result', value: val.toLocaleString(), primary: true }],
        summary: `${val} ${from} = ${val} ${to} (same unit)`,
      }
    }

    // Convert to base unit, then to target
    const toBase: Record<string, number | null> = {
      // Length (base: meters)
      meters: 1,
      centimeters: 0.01,
      kilometers: 1000,
      inches: 0.0254,
      feet: 0.3048,
      yards: 0.9144,
      miles: 1609.344,
      // Weight (base: kilograms)
      kilograms: 1,
      grams: 0.001,
      pounds: 0.45359237,
      ounces: 0.028349523,
      // Temperature handled separately
      celsius: null,
      fahrenheit: null,
      kelvin: null,
      // Volume (base: liters)
      liters: 1,
      milliliters: 0.001,
      gallons: 3.785411784,
      quarts: 0.946352946,
      cups: 0.2365882365,
    }

    // Temperature special case
    const tempUnits = new Set(['celsius', 'fahrenheit', 'kelvin'])
    if (tempUnits.has(from) || tempUnits.has(to)) {
      if (!tempUnits.has(from) || !tempUnits.has(to)) {
        return { values: [{ label: 'Result', value: 'Incompatible' }], summary: 'Cannot mix temperature with other unit types.' }
      }
      let celsius: number
      if (from === 'celsius') celsius = val
      else if (from === 'fahrenheit') celsius = (val - 32) * 5 / 9
      else celsius = val - 273.15 // kelvin

      let result: number
      if (to === 'celsius') result = celsius
      else if (to === 'fahrenheit') result = celsius * 9 / 5 + 32
      else result = celsius + 273.15 // kelvin

      return {
        values: [
          { label: 'Result', value: result.toFixed(4).replace(/\.?0+$/, ''), primary: true },
          { label: 'From', value: `${val} ${from}` },
          { label: 'To', value: `${result.toFixed(4).replace(/\.?0+$/, '')} ${to}` },
          { label: 'Formula', value: from === 'celsius' && to === 'fahrenheit' ? '(C x 9/5) + 32' : from === 'fahrenheit' && to === 'celsius' ? '(F - 32) x 5/9' : 'See formula section' },
        ],
        summary: `${val} ${from} = ${result.toFixed(6).replace(/\.?0+$/, '')} ${to}`,
      }
    }

    const fromBase = toBase[from]
    const toBaseVal = toBase[to]

    if (fromBase === undefined || fromBase === null || toBaseVal === undefined || toBaseVal === null) {
      return { values: [{ label: 'Result', value: 'Incompatible' }], summary: 'These units cannot be converted to each other. Select units in the same category.' }
    }

    const inBaseUnits = val * fromBase
    const result = inBaseUnits / toBaseVal

    const formatted = Math.abs(result) >= 1000 ? result.toFixed(2) : result.toPrecision(6).replace(/\.?0+$/, '')

    return {
      values: [
        { label: 'Result', value: formatted, primary: true },
        { label: 'From', value: `${val} ${from}` },
        { label: 'To', value: `${formatted} ${to}` },
        { label: 'Rate', value: `1 ${from} = ${(fromBase / toBaseVal).toPrecision(4)} ${to}` },
      ],
      summary: `${val} ${from} = ${formatted} ${to}`,
    }
  },
  resultLabels: ['Result', 'From', 'To', 'Rate'],
  formula: 'Length: 1 ft = 0.3048 m | Weight: 1 lb = 0.4536 kg | Temp: F = (C x 9/5) + 32 | Volume: 1 gal = 3.785 L',
  geo: {
    definition: 'A unit converter is a tool that converts a measurement value from one unit of measure to another using a fixed conversion factor or formula.',
    ruleOfThumb: '1 mile = 1.609 km | 1 kg = 2.205 lb | 0°C = 32°F (freezing) | 100°C = 212°F (boiling) | 1 gallon = 3.785 liters | 1 inch = 2.54 cm.',
    example: 'A 6-foot person is 6 x 0.3048 = 1.83 meters tall. A 180-pound person weighs 180 x 0.4536 = 81.6 kilograms.',
    keyFacts: [
      'The US uses the Imperial system (miles, pounds, Fahrenheit) while most of the world uses metric (km, kg, Celsius).',
      'Temperature conversions are non-linear — you cannot simply multiply; Fahrenheit uses an offset (+32) as well as a scale factor.',
      'US liquid measurements (cups, quarts, gallons) differ slightly from UK Imperial equivalents.',
    ],
  },
  content: {
    howTo: [
      'Select the category (Length, Weight, Temperature, or Volume).',
      'Select the unit you are converting FROM.',
      'Select the unit you are converting TO.',
      'Enter the value you want to convert.',
      'Click Calculate to see the converted result.',
    ],
    refTable: {
      headers: ['Conversion', 'Exact Factor', 'Common Shorthand'],
      rows: [
        ['1 meter', '3.28084 feet', 'roughly 3.3 feet'],
        ['1 kilometer', '0.621371 miles', 'roughly 0.6 miles'],
        ['1 kilogram', '2.20462 pounds', 'roughly 2.2 lbs'],
        ['1 inch', '2.54 centimeters', 'exactly 2.54 cm'],
        ['1 liter', '0.264172 gallons', 'roughly 0.26 US gal'],
        ['0°C (Celsius)', '32°F (Fahrenheit)', 'freezing point of water'],
        ['100°C (Celsius)', '212°F (Fahrenheit)', 'boiling point of water'],
        ['1 US gallon', '3.78541 liters', 'roughly 3.8 liters'],
      ],
    },
    faqs: [
      {
        q: 'How do I convert Celsius to Fahrenheit?',
        a: 'Multiply the Celsius temperature by 9/5, then add 32. Formula: F = (C x 9/5) + 32. For example, 20°C = (20 x 1.8) + 32 = 68°F.',
      },
      {
        q: 'How do I convert kilometers to miles?',
        a: 'Multiply the number of kilometers by 0.621371. For example, 10 km x 0.621 = 6.21 miles. A quick shorthand: multiply by 0.6.',
      },
      {
        q: 'How do I convert pounds to kilograms?',
        a: 'Multiply the number of pounds by 0.453592. For example, 150 lbs x 0.4536 = 68 kg. Or divide by 2.205.',
      },
      {
        q: 'What is the difference between US gallons and UK gallons?',
        a: 'A US gallon is 3.785 liters. A UK (Imperial) gallon is 4.546 liters. This calculator uses US gallons.',
      },
    ],
    related: ['percentage', 'bmi', 'water-intake', 'ideal-body-weight', 'percentage-change'],
  },
  educational: {
    explainer: 'Unit conversion is a precision skill with real consequences when done incorrectly. The United States is one of only three countries that have not formally adopted the International System of Units (SI), or metric system, alongside Myanmar and Liberia (National Institute of Standards and Technology). This creates daily friction for Americans working in medicine, science, international trade, or travel. In healthcare, drug dosing is almost universally calculated in metric units: milligrams per kilogram of body weight. A patient\'s weight in pounds must be accurately converted to kilograms before computing a safe medication dose, and a rounding error in that conversion can result in under-dosing or overdose. In cooking and food manufacturing, fluid ounces measure volume while ounces also measure weight, a distinction that catches most people off guard because the names are identical. In international trade, a shipment quoted in metric tons is not equivalent to US short tons (1 metric ton = 2,204.6 lbs vs. 1 US ton = 2,000 lbs). Temperature conversion involves both a scale factor and an offset, making it non-linear: you cannot simply multiply Celsius by a factor to get Fahrenheit; you must apply the full formula (F = C x 9/5 + 32).',
    tips: [
      'Memorize the five most-used conversion anchors: 1 inch = 2.54 cm exactly, 1 kg = 2.205 lbs, 1 mile = 1.609 km, 1 US gallon = 3.785 liters, and 0 degrees C = 32 degrees F. These seven relationships cover 80% of everyday conversion needs.',
      'For temperature, remember two landmarks: water freezes at 0 degrees C (32 degrees F) and body temperature is approximately 37 degrees C (98.6 degrees F). Use these to sanity-check direction before accepting a conversion result.',
      'Never assume "gallon" means the same thing internationally. A UK Imperial gallon is 4.546 liters versus a US gallon of 3.785 liters. Fuel economy comparisons between US mpg and UK mpg are meaningless without accounting for this 20% difference in gallon size.',
      'For weight-based medication or supplement dosing, always use the exact kg figure rather than a rounded estimate. A 185-pound patient is 83.91 kg, not "about 84 kg." At 1 mg/kg dosing, the difference between 83 and 84 kg is a full milligram per dose.',
    ],
    commonMistakes: [
      'Confusing fluid ounces with weight ounces. A fluid ounce is a unit of volume (29.57 mL); a weight ounce is a unit of mass (28.35 grams). One cup of water happens to weigh close to 8 ounces, but one cup of honey weighs roughly 12 ounces because density differs.',
      'Using US gallons when UK gallons are specified, or vice versa. Because a UK gallon is about 20% larger than a US gallon, a recipe, fuel calculation, or trade shipment using the wrong gallon definition introduces a systematic 20% error in every line item.',
      'Applying the Celsius-to-Fahrenheit conversion in the wrong direction or forgetting the +32 offset. Multiplying Celsius by 1.8 without adding 32, or adding 32 without scaling, are the two most common temperature conversion errors, and both produce results that can differ from the correct answer by dozens of degrees.',
    ],
    example: 'Sarah is a nurse administering a weight-based antibiotic. The patient, James, weighs 185 lbs. The prescribed dose is 15 mg/kg. Step 1: convert weight. 185 lbs x 0.453592 = 83.91 kg. Step 2: calculate dose. 83.91 kg x 15 mg/kg = 1,258.65 mg, rounded to 1,259 mg per the clinical protocol. If Sarah had used a rough estimate of 180 lbs (81.6 kg), the calculated dose would be 1,224 mg, a 35 mg underdose per administration. Over a 7-day course of twice-daily dosing, that imprecision compounds to a 490 mg shortfall in total drug delivery.',
  },
  jsonLd: {
    faqs: [
      { q: 'How do I convert Celsius to Fahrenheit?', a: 'F = (C x 9/5) + 32. Example: 20°C = 68°F.' },
      { q: 'How do I convert kilometers to miles?', a: 'Multiply km by 0.621371. Example: 10 km = 6.21 miles.' },
      { q: 'How do I convert pounds to kilograms?', a: 'Multiply lbs by 0.453592. Example: 150 lbs = 68 kg.' },
      { q: 'What is the difference between US gallons and UK gallons?', a: 'US gallon = 3.785 L, UK Imperial gallon = 4.546 L. This calculator uses US gallons.' },
    ],
    howToSteps: [
      'Select the conversion category (Length, Weight, Temperature, or Volume).',
      'Select the unit to convert from and the unit to convert to.',
      'Enter the value you want to convert.',
      'Click Calculate to see the result.',
    ],
  },
}
