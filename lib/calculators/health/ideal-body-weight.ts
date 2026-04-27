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
  geo: {
    definition: 'An ideal body weight calculator estimates a target weight range using established medical formulas including Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964), each designed to estimate the weight at which physiological function is optimal for a given height.',
    ruleOfThumb: 'The Devine formula (widely used in medication dosing) estimates ideal body weight as 50 kg plus 2.3 kg for each inch over 5 feet for men, and 45.5 kg plus 2.3 kg per inch for women. These are estimates, not targets for everyone.',
    example: 'A 5-foot-8-inch man. Devine IBW = 50 plus (8 x 2.3) = 68.4 kg = 150.7 lbs. Robinson formula gives 52 plus (8 x 1.9) = 67.2 kg = 148.1 lbs. The formulas agree within 5 lbs for most heights.',
    keyFacts: [
      'IBW formulas were originally developed for clinical pharmacology to calculate drug dosages and ventilator tidal volumes, not as personal fitness targets (Devine BJ, 1974, Drug Intelligence and Clinical Pharmacy).',
      'NIH defines a healthy weight as a BMI of 18.5 to 24.9, which often produces a wider range than IBW formulas, especially for taller or shorter individuals (NIH, National Heart, Lung, and Blood Institute).',
      'IBW formulas systematically underestimate healthy weight for individuals with above-average muscle mass, including athletes and strength trainers, because they do not account for body composition (NIH).',
      'A 10% range above and below IBW is commonly used in clinical settings to define an acceptable weight window, acknowledging individual variation in bone density and frame size (Robinson JD et al., 1983).',
    ],
  },
  educational: {
    explainer: 'Ideal body weight formulas were developed in the 1960s and 1970s primarily for clinical use, specifically to calculate medication doses and mechanical ventilator settings where drug distribution volume correlates with lean body mass rather than total weight. The four common formulas (Devine, Robinson, Miller, and Hamwi) produce similar estimates that vary by a few pounds for most heights, but can diverge more at the extremes of height. The Devine formula is the most frequently cited in medical literature; the Hamwi formula is popular in nutrition practice. IBW is distinct from BMI: BMI is a population-level screening tool that scales weight to height squared, while IBW is a single point estimate from a linear equation. Neither captures body composition, which is why a muscular person can be above IBW or BMI while carrying very little body fat. Clinicians use IBW as one data point alongside BMI, waist circumference, and body fat percentage for a complete picture.',
    tips: [
      'Use IBW as a reference range rather than a fixed target; it signals the ballpark appropriate for your height and sex without dictating an exact number on the scale.',
      'Pair IBW with body fat percentage measurement (DEXA scan, hydrostatic weighing, or skinfold calipers) to understand whether your weight reflects muscle or fat.',
      'Recognize that significant muscle mass legitimately raises your healthy weight above the IBW estimate; strength athletes and runners routinely carry 10 to 20 lbs more than their calculated IBW.',
      'Consult a healthcare provider before using IBW for clinical decisions such as medication dosing, bariatric evaluation, or refeeding protocols, where the correct formula matters.',
    ],
    commonMistakes: [
      'Treating IBW as a personal ideal regardless of individual build: a highly muscular person above IBW and an inactive person at IBW are not equally healthy, because body composition matters far more than the number.',
      'Ignoring that IBW formulas were developed on specific patient populations from the 1960s, which were not representative of diverse body types, ethnicities, or modern athletic builds.',
      'Using IBW instead of BMI for general health screening: IBW was designed for clinical dosing, not population health assessment; BMI paired with waist circumference is more appropriate for screening metabolic risk.',
    ],
    example: 'Sarah is 5 feet 4 inches and athletic, with significant muscle mass from three years of strength training. Her scale weight is 148 lbs. The Devine IBW for a 5\'4" woman = 45.5 kg + (4 x 2.3 kg) = 54.7 kg = 120.6 lbs, making her 27 lbs above IBW. However, a DEXA scan shows her body fat at 22 percent, placing her firmly in the athletic range (14 to 24 percent for women per ACE guidelines). Her IBW result reflects a formula limitation, not an unhealthy weight.',
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
