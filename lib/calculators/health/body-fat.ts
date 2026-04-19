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
  educational: {
    explainer: `Body fat percentage is the proportion of your total body weight that is fat tissue, as opposed to muscle, bone, organs, and water. Unlike BMI, which only uses height and weight, body fat percentage actually distinguishes between fat and lean mass. This matters because two people can weigh exactly the same and have the same BMI while one has 15% body fat and the other has 30%. This calculator uses the U.S. Navy tape measure method, which estimates body density from waist, neck, and hip measurements, then converts that to a fat percentage. It is not as precise as a DEXA scan or hydrostatic weighing, but it is accurate within 3-4 percentage points for most people, making it a practical option for tracking trends over time. The American Council on Exercise classifies healthy body fat as 14-24% for men and 21-31% for women, with athletes typically much lower.`,
    tips: [
      'Measure consistently: same time of day, same measuring tape, same body posture. Morning measurements before eating or exercising reduce daily fluctuation and give you comparable readings over weeks.',
      'Track the trend, not the daily number. Body fat percentage from tape measures naturally varies by 1-2% based on hydration, food intake, and measuring technique. What matters is the direction over 4-6 week periods.',
      'Reducing body fat while maintaining or building muscle (body recomposition) is more meaningful than reducing weight alone. If you lose 5 lbs of fat and gain 2 lbs of muscle, your weight changes less than your body composition does.',
      'Visceral fat, the fat around your organs, is the metabolically dangerous type. Even if your total body fat percentage is acceptable, a large waist circumference is an independent cardiovascular risk factor worth discussing with a doctor.',
    ],
    commonMistakes: [
      'Measuring in the wrong spot. Waist circumference for this formula should be measured at the navel, not the narrowest point. Neck measurement goes just below the larynx. Incorrect placement can throw the estimate off by 3-5%.',
      'Treating the result as exact. The Navy method can be off by 3-4% compared to DEXA. If you calculate 22% body fat, your actual number could reasonably be anywhere from 18% to 26%. Use it for directional tracking.',
      'Comparing your number to athlete standards when that is not your goal. Elite athletes carry 6-13% body fat (men) partly because their sport demands it, often at the cost of hormonal health and energy availability. Fitness-level body fat (14-17% men, 21-24% women) is healthier for most people.',
    ],
    example: `Tom is 5\'9" (69 inches), weighs 185 lbs, with a waist of 36 inches and neck of 15.5 inches. Using the Navy formula, his estimated body fat is 22.4%, placing him in the "acceptable" category (18-25% for men by ACE standards). His fat mass is approximately 41.4 lbs and lean mass is 143.6 lbs. His goal is to reach 18% body fat. At 185 lbs and 18%, he would carry 33.3 lbs of fat. He needs to lose about 8 lbs of fat while preserving lean mass, achievable through a moderate calorie deficit of 300-400 calories per day over 10-12 weeks.`,
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
