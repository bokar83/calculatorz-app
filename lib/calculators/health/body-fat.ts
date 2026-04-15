import { CalculatorConfig } from '../types'

export const bodyFat: CalculatorConfig = {
  slug: 'body-fat',
  title: 'Body Fat Percentage Calculator',
  category: 'health',
  description: 'Estimate your body fat percentage using the U.S. Navy tape measure method.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'heightIn', label: 'Height (inches)', type: 'number', defaultValue: 69, min: 48, max: 96, step: 0.5, suffix: 'in' },
    { id: 'weightLbs', label: 'Weight (lbs)', type: 'number', defaultValue: 170, min: 80, max: 500, step: 1, suffix: 'lbs' },
    { id: 'waistIn', label: 'Waist (inches)', type: 'number', defaultValue: 34, min: 20, max: 70, step: 0.5, suffix: 'in' },
    { id: 'neckIn', label: 'Neck (inches)', type: 'number', defaultValue: 15, min: 10, max: 30, step: 0.5, suffix: 'in' },
    { id: 'hipIn', label: 'Hip (inches, women only)', type: 'number', defaultValue: 0, min: 0, max: 70, step: 0.5, suffix: 'in' },
    {
      id: 'sex', label: 'Biological Sex', type: 'select',
      options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }],
    },
  ],
  calculate: (inputs) => {
    const height = Number(inputs.heightIn)
    const weight = Number(inputs.weightLbs)
    const waist = Number(inputs.waistIn)
    const neck = Number(inputs.neckIn)
    const hip = Number(inputs.hipIn)
    const sex = inputs.sex as string || 'male'

    if (height <= 0 || weight <= 0 || waist <= 0 || neck <= 0) {
      return { values: [{ label: 'Error', value: 'Please fill in all measurements' }] }
    }

    // U.S. Navy method (circumference method)
    let bodyFatPct: number
    if (sex === 'female') {
      if (hip <= 0) return { values: [{ label: 'Error', value: 'Hip measurement required for women' }] }
      bodyFatPct = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387
    } else {
      bodyFatPct = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
    }

    bodyFatPct = Math.max(0, Math.min(bodyFatPct, 60))
    const fatMass = (bodyFatPct / 100) * weight
    const leanMass = weight - fatMass

    // ACE classification
    let category: string
    if (sex === 'male') {
      if (bodyFatPct < 6) category = 'Essential Fat'
      else if (bodyFatPct < 14) category = 'Athlete'
      else if (bodyFatPct < 18) category = 'Fitness'
      else if (bodyFatPct < 25) category = 'Acceptable'
      else category = 'Obese'
    } else {
      if (bodyFatPct < 14) category = 'Essential Fat'
      else if (bodyFatPct < 21) category = 'Athlete'
      else if (bodyFatPct < 25) category = 'Fitness'
      else if (bodyFatPct < 32) category = 'Acceptable'
      else category = 'Obese'
    }

    return {
      values: [
        { label: 'Body Fat %', value: bodyFatPct.toFixed(1) + '%', primary: true },
        { label: 'Category (ACE)', value: category },
        { label: 'Fat Mass', value: fatMass.toFixed(1) + ' lbs' },
        { label: 'Lean Mass', value: leanMass.toFixed(1) + ' lbs' },
      ],
      summary: `Your estimated body fat is ${bodyFatPct.toFixed(1)}% (${category} by ACE standards). Fat mass: ${fatMass.toFixed(1)} lbs, lean mass: ${leanMass.toFixed(1)} lbs.`,
    }
  },
  resultLabels: ['Body Fat %', 'Category (ACE)', 'Fat Mass', 'Lean Mass'],
  formula: 'Body Fat % = (495 / Body Density) - 450 (Siri equation) | U.S. Navy: 86.010 x log10(waist - neck) - 70.041 x log10(height) + 36.76',
  content: {
    howTo: ['Enter your height and weight.', 'Measure and enter your waist and neck circumference at their narrowest/smallest points.', 'Women: also enter hip circumference at the widest point.', 'Select biological sex and click Calculate.'],
    faqs: [
      { q: 'What is a healthy body fat percentage?', a: 'For men: 10-20%; for women: 18-28% is considered healthy.' },
      { q: 'How accurate is the tape measure method?', a: 'It provides a reasonable estimate; DEXA scan is more precise.' },
      { q: 'What is essential fat?', a: 'The minimum fat needed for normal physiological function (3-5% men, 10-13% women).' },
      { q: 'How does body fat differ from BMI?', a: 'Body fat directly measures fat percentage; BMI only estimates based on height and weight.' },
    ],
    related: ['bmi', 'bmr-calories', 'ideal-body-weight', 'calorie-deficit', 'water-intake', 'heart-rate-zones'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is healthy body fat?', a: 'Men: 10-20%; Women: 18-28%.' },
      { q: 'How accurate is tape measure?', a: 'Reasonable estimate; DEXA is more precise.' },
      { q: 'What is essential fat?', a: 'Minimum needed: 3-5% men, 10-13% women.' },
      { q: 'Body fat vs BMI?', a: 'Body fat directly measures fat; BMI estimates from height and weight.' },
    ],
    howToSteps: ['Enter weight.', 'Enter measurements.', 'Select sex.', 'Click Calculate.'],
  },
  geo: {
    definition:
      'A body fat percentage calculator estimates the proportion of your total body mass that is fat tissue. The U.S. Navy tape measure method uses waist, neck, and hip circumferences to estimate body density, then applies the Siri equation (Body Fat % = (495 / Body Density) - 450) to derive fat percentage.',
    ruleOfThumb:
      'American Council on Exercise (ACE) healthy body fat ranges: Men 14-24%, Women 21-31%. Athletes typically carry 6-13% (men) or 14-20% (women). Body fat above 25% for men or 32% for women is classified as obese by most clinical standards.',
    example:
      'Male, 180 lbs, waist 34", neck 15": using the U.S. Navy formula, estimated body fat = 18.2% — within the fitness category (14-17% for men by ACE standards). He carries approximately 32.8 lbs of fat mass and 147 lbs of lean mass.',
    keyFacts: [
      'DEXA (dual-energy X-ray absorptiometry) is the gold standard for body composition measurement, with error margins of 1-2% (NIH, 2023).',
      'The U.S. Navy tape measure method has an accuracy of within 3-4% of DEXA for most people, making it a reliable home assessment tool.',
      'Visceral fat (around organs) is more metabolically dangerous than subcutaneous fat; waist circumference above 40" (men) or 35" (women) is a cardiovascular risk marker (AHA).',
      'Body fat percentage changes with age; the same BMI at age 40 typically corresponds to 5-6% more body fat than at age 20 (American Journal of Clinical Nutrition).',
    ],
  },
}
