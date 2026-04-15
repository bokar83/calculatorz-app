import { CalculatorConfig } from '../types'

export const heartRateZones: CalculatorConfig = {
  slug: 'heart-rate-zones',
  title: 'Heart Rate Zone Calculator',
  category: 'health',
  description: 'Calculate your 5 target heart rate zones for optimal training.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'age', label: 'Age (years)', type: 'number', defaultValue: 35, min: 10, max: 100, step: 1 },
    { id: 'restingHR', label: 'Resting Heart Rate (bpm)', type: 'number', defaultValue: 65, min: 30, max: 120, step: 1 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age)
    const resting = Number(inputs.restingHR)
    const maxHR = 220 - age
    const hrReserve = maxHR - resting

    const zones = [
      { name: 'Z1 Warm-Up', low: 0.50, high: 0.60, desc: 'Fat burn, recovery' },
      { name: 'Z2 Fat Burn', low: 0.60, high: 0.70, desc: 'Aerobic base' },
      { name: 'Z3 Aerobic', low: 0.70, high: 0.80, desc: 'Cardio fitness' },
      { name: 'Z4 Threshold', low: 0.80, high: 0.90, desc: 'Speed endurance' },
      { name: 'Z5 Max', low: 0.90, high: 1.00, desc: 'Peak performance' },
    ]

    const karvonen = (pct: number) => Math.round(resting + hrReserve * pct)

    return {
      values: [
        { label: 'Max Heart Rate', value: maxHR + ' bpm', primary: true },
        { label: 'Z1 (50-60%)', value: karvonen(0.50) + '-' + karvonen(0.60) + ' bpm' },
        { label: 'Z2 Fat Burn (60-70%)', value: karvonen(0.60) + '-' + karvonen(0.70) + ' bpm' },
        { label: 'Z3 Aerobic (70-80%)', value: karvonen(0.70) + '-' + karvonen(0.80) + ' bpm' },
        { label: 'Z4 Threshold (80-90%)', value: karvonen(0.80) + '-' + karvonen(0.90) + ' bpm' },
        { label: 'Z5 Max (90-100%)', value: karvonen(0.90) + '-' + maxHR + ' bpm' },
      ],
      summary: 'Max HR: ' + maxHR + ' bpm. Karvonen zones using resting HR ' + resting + ' bpm. Z2 fat burn: ' + karvonen(0.60) + '-' + karvonen(0.70) + ' bpm.',
    }
  },
  resultLabels: ['Max Heart Rate', 'Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'],
  formula: 'Max HR = 220 - Age | Karvonen Zone = Resting HR + (Max HR - Resting HR) x Zone %',
  content: {
    howTo: ['Enter your age.', 'Enter your resting heart rate (measure in the morning before getting up).', 'Click Calculate to see all 5 zones.'],
    faqs: [
      { q: 'What are heart rate zones?', a: 'Zones 1-5 represent intensity levels from light activity to maximum effort.' },
      { q: 'What zone burns the most fat?', a: 'Zone 2 (60-70% max HR) is often called the fat-burning zone.' },
      { q: 'How do I find my max heart rate?', a: 'A common estimate is 220 minus your age.' },
      { q: 'Is resting heart rate important?', a: 'Lower resting heart rate generally indicates better cardiovascular fitness.' },
    ],
    related: ['bmr-calories', 'bmi', 'calorie-deficit', 'body-fat', 'water-intake', 'sleep-calculator'],
  },
  jsonLd: {
    faqs: [
      { q: 'What are heart rate zones?', a: 'Zones 1-5 represent intensity from light to maximum effort.' },
      { q: 'Which zone burns the most fat?', a: 'Zone 2 (60-70% max HR) is the fat-burning zone.' },
      { q: 'How to find max heart rate?', a: '220 minus your age is a common estimate.' },
      { q: 'Is resting HR important?', a: 'Lower resting HR indicates better cardiovascular fitness.' },
    ],
    howToSteps: ['Enter age.', 'Enter resting heart rate.', 'Click Calculate.'],
  },
}
