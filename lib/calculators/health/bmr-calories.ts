import { CalculatorConfig } from '../types'

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

export const bmrCalories: CalculatorConfig = {
  slug: 'bmr-calories',
  title: 'BMR & Calorie Calculator',
  category: 'health',
  description: 'Calculate your Basal Metabolic Rate and daily calorie needs.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'weightLbs', label: 'Weight (lbs)', type: 'number', defaultValue: 160, min: 50, max: 500, step: 1 },
    { id: 'heightFt', label: 'Height (ft)', type: 'number', defaultValue: 5, min: 3, max: 8, step: 1 },
    { id: 'heightIn', label: 'Height (in)', type: 'number', defaultValue: 9, min: 0, max: 11, step: 1 },
    { id: 'age', label: 'Age', type: 'number', defaultValue: 30, min: 15, max: 100, step: 1 },
    {
      id: 'sex', label: 'Biological Sex', type: 'select',
      options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }],
    },
    {
      id: 'activity', label: 'Activity Level', type: 'select',
      options: [
        { value: 'sedentary', label: 'Sedentary (desk job, no exercise)' },
        { value: 'light', label: 'Light (1-3 days/week)' },
        { value: 'moderate', label: 'Moderate (3-5 days/week)' },
        { value: 'active', label: 'Active (6-7 days/week)' },
        { value: 'very_active', label: 'Very Active (hard exercise + physical job)' },
      ],
    },
  ],
  calculate: (inputs) => {
    const weightKg = Number(inputs.weightLbs) * 0.453592
    const heightCm = ((Number(inputs.heightFt) * 12) + Number(inputs.heightIn)) * 2.54
    const age = Number(inputs.age)
    const sex = inputs.sex as string
    const activity = (inputs.activity as string) || 'moderate'

    // Mifflin-St Jeor equation
    const bmr = sex === 'female'
      ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161
      : (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5

    const multiplier = ACTIVITY_MULTIPLIERS[activity] ?? 1.55
    const tdee = bmr * multiplier
    const loseWeight = tdee - 500
    const loseWeightFast = tdee - 1000
    const gainWeight = tdee + 500

    const fmt = (v: number) => Math.round(v).toLocaleString('en-US') + ' kcal'

    return {
      values: [
        { label: 'BMR (at rest)', value: fmt(bmr), primary: false },
        { label: 'TDEE (maintenance)', value: fmt(tdee), primary: true },
        { label: 'Lose 1 lb/week', value: fmt(loseWeight), primary: false },
        { label: 'Gain 1 lb/week', value: fmt(gainWeight), primary: false },
      ],
      summary: `Your BMR is ${Math.round(bmr).toLocaleString()} kcal/day. At your activity level you need ${Math.round(tdee).toLocaleString()} kcal/day to maintain weight. To lose 1 lb/week, target ${Math.round(loseWeight).toLocaleString()} kcal/day. Fast loss (2 lbs/week): ${Math.round(loseWeightFast).toLocaleString()} kcal/day.`,
    }
  },
  resultLabels: ['BMR (at rest)', 'TDEE (maintenance)', 'Lose 1 lb/week', 'Gain 1 lb/week'],
  formula: 'BMR (Mifflin-St Jeor) = 10 x weight(kg) + 6.25 x height(cm) - 5 x age + 5 (men) or -161 (women)',
  content: {
    howTo: ['Enter your weight, height, and age.', 'Select biological sex.', 'Select your activity level.', 'Click Calculate to see your BMR and daily calorie targets.'],
    faqs: [
      { q: 'What is BMR?', a: 'Basal Metabolic Rate is the calories your body burns at rest to maintain basic functions.' },
      { q: 'What is TDEE?', a: 'Total Daily Energy Expenditure accounts for BMR plus activity level.' },
      { q: 'How do I use BMR to lose weight?', a: 'Eat fewer calories than your TDEE to create a deficit and lose weight.' },
      { q: 'Does muscle mass affect BMR?', a: 'Yes, more muscle increases BMR because muscle burns more calories than fat.' },
    ],
    related: ['bmi', 'calorie-deficit', 'body-fat', 'ideal-body-weight', 'water-intake', 'heart-rate-zones'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is BMR?', a: 'Calories burned at rest to maintain basic body functions.' },
      { q: 'What is TDEE?', a: 'BMR plus activity level calories.' },
      { q: 'How to use BMR to lose weight?', a: 'Eat fewer calories than your TDEE.' },
      { q: 'Does muscle affect BMR?', a: 'Yes, more muscle increases BMR.' },
    ],
    howToSteps: ['Enter weight, height, and age.', 'Select sex and activity level.', 'Click Calculate.'],
  },
  geo: {
    definition:
      'A BMR calculator uses the Mifflin-St Jeor equation to estimate the calories your body burns at complete rest, then multiplies by an activity factor to give your Total Daily Energy Expenditure (TDEE) — the number of calories needed to maintain your current weight.',
    ruleOfThumb:
      'A general estimate: multiply your body weight in pounds by 15 for a moderately active person. To lose weight, subtract 500 calories per day from your TDEE to lose approximately 1 lb per week.',
    example:
      'A 35-year-old male, 180 lbs, 5\'10", lightly active: BMR = 1,882 kcal/day. TDEE at light activity (BMR x 1.375) = 2,588 kcal/day. To lose 1 lb/week, target 2,088 kcal/day.',
    keyFacts: [
      'The Mifflin-St Jeor equation is considered the most accurate for most people, endorsed by the Academy of Nutrition and Dietetics.',
      'BMR accounts for 60-75% of total daily calorie expenditure for sedentary individuals (Harvard Health, 2024).',
      'A 500-calorie daily deficit creates roughly a 1 lb/week weight loss; a 1,000-calorie deficit targets 2 lbs/week.',
      'Muscle tissue burns approximately 6 kcal/lb/day at rest, versus fat tissue at 2 kcal/lb/day, making lean mass a key factor in BMR.',
    ],
  },
}
