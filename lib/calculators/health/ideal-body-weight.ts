import { CalculatorConfig } from '../types'

export const idealBodyWeight: CalculatorConfig = {
  slug: 'ideal-body-weight',
  title: 'Ideal Body Weight Calculator',
  category: 'health',
  description: 'Calculate ideal body weight using Devine, Robinson, Miller, and Hamwi formulas.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'heightFt', label: 'Height (ft)', type: 'number', defaultValue: 5, min: 3, max: 8, step: 1 },
    { id: 'heightIn', label: 'Height (in)', type: 'number', defaultValue: 9, min: 0, max: 11, step: 1 },
    {
      id: 'sex', label: 'Biological Sex', type: 'select',
      options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }],
    },
  ],
  calculate: (inputs) => {
    const ft = Number(inputs.heightFt)
    const inches = Number(inputs.heightIn)
    const totalInches = ft * 12 + inches
    const inchesOver5Ft = Math.max(0, totalInches - 60)
    const sex = inputs.sex as string || 'male'

    let devine: number, robinson: number, miller: number, hamwi: number
    if (sex === 'male') {
      devine = 110.23 + 5.08 * inchesOver5Ft
      robinson = 114.64 + 4.19 * inchesOver5Ft
      miller = 124.23 + 2.84 * inchesOver5Ft
      hamwi = 106 + 6 * inchesOver5Ft
    } else {
      devine = 100.31 + 4.54 * inchesOver5Ft
      robinson = 105.82 + 3.75 * inchesOver5Ft
      miller = 116.85 + 2.64 * inchesOver5Ft
      hamwi = 100 + 5 * inchesOver5Ft
    }

    const avg = (devine + robinson + miller + hamwi) / 4
    const rangeLow = avg * 0.90
    const rangeHigh = avg * 1.10
    const fmtLbs = (v: number) => Math.round(v) + ' lbs'
    return {
      values: [
        { label: 'Average IBW', value: fmtLbs(avg), primary: true },
        { label: 'Healthy Range', value: fmtLbs(rangeLow) + ' - ' + fmtLbs(rangeHigh) },
        { label: 'Devine Formula', value: fmtLbs(devine) },
        { label: 'Hamwi Formula', value: fmtLbs(hamwi) },
      ],
      summary: 'At ' + ft + 'ft ' + inches + 'in, ideal weight (average of 4 formulas) = ' + fmtLbs(avg) + '. Healthy range: ' + fmtLbs(rangeLow) + ' to ' + fmtLbs(rangeHigh) + '.',
    }
  },
  resultLabels: ['Average IBW', 'Healthy Range', 'Devine Formula', 'Hamwi Formula'],
  formula: 'IBW (Devine) = 110 + 5.08 x inches over 5ft (men) / 100 + 4.54 x inches (women)',
  content: {
    howTo: ['Enter your height.', 'Select biological sex.', 'Click Calculate to see ideal weight estimates.'],
    faqs: [
      { q: 'What formulas are used for ideal weight?', a: 'Common ones include Devine, Robinson, Miller, and Hamwi formulas.' },
      { q: 'Is ideal weight the same as healthy weight?', a: 'Not exactly; BMI range and body composition provide a fuller picture.' },
      { q: 'Does frame size matter?', a: 'Yes, larger frames may support more weight while remaining healthy.' },
      { q: 'Should I aim for ideal body weight?', a: 'Use it as a general reference, not a strict target; consult a healthcare provider.' },
    ],
    related: ['bmi', 'body-fat', 'bmr-calories', 'calorie-deficit', 'water-intake', 'sleep-calculator'],
  },
  jsonLd: {
    faqs: [
      { q: 'What formulas are used?', a: 'Devine, Robinson, Miller, and Hamwi are common.' },
      { q: 'Same as healthy weight?', a: 'Not exactly; BMI and body composition add context.' },
      { q: 'Does frame size matter?', a: 'Yes, larger frames may support more weight healthily.' },
      { q: 'Should I aim for it?', a: 'Use as reference, not a strict target.' },
    ],
    howToSteps: ['Enter height.', 'Select sex.', 'Click Calculate.'],
  },
}
