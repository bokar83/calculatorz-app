import { CalculatorConfig } from '../types'

const ACTIVITY_MULT: Record<string, number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
}

export const calorieDeficit: CalculatorConfig = {
  slug: 'calorie-deficit',
  title: 'Calorie Deficit Calculator',
  category: 'health',
  description: 'Calculate the calorie deficit needed to reach your weight loss goal.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'currentWeightLbs', label: 'Current Weight (lbs)', type: 'number', defaultValue: 190, min: 50, max: 600, step: 1 },
    { id: 'goalWeightLbs', label: 'Goal Weight (lbs)', type: 'number', defaultValue: 170, min: 50, max: 600, step: 1 },
    { id: 'heightFt', label: 'Height (ft)', type: 'number', defaultValue: 5, min: 3, max: 8, step: 1 },
    { id: 'heightIn', label: 'Height (in)', type: 'number', defaultValue: 9, min: 0, max: 11, step: 1 },
    { id: 'age', label: 'Age', type: 'number', defaultValue: 35, min: 15, max: 100, step: 1 },
    {
      id: 'sex', label: 'Biological Sex', type: 'select',
      options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }],
    },
    {
      id: 'activity', label: 'Activity Level', type: 'select',
      options: [
        { value: 'sedentary', label: 'Sedentary' },
        { value: 'light', label: 'Lightly Active (1-3 days/wk)' },
        { value: 'moderate', label: 'Moderately Active (3-5 days/wk)' },
        { value: 'active', label: 'Very Active (6-7 days/wk)' },
        { value: 'very_active', label: 'Extra Active (physical job)' },
      ],
    },
  ],
  calculate: (inputs) => {
    const currentLbs = Number(inputs.currentWeightLbs)
    const goalLbs = Number(inputs.goalWeightLbs)
    const heightCm = ((Number(inputs.heightFt) * 12) + Number(inputs.heightIn)) * 2.54
    const currentKg = currentLbs * 0.453592
    const age = Number(inputs.age)
    const sex = inputs.sex as string || 'male'
    const activity = (inputs.activity as string) || 'moderate'

    const bmr = sex === 'female'
      ? (10 * currentKg) + (6.25 * heightCm) - (5 * age) - 161
      : (10 * currentKg) + (6.25 * heightCm) - (5 * age) + 5

    const tdee = bmr * (ACTIVITY_MULT[activity] ?? 1.55)
    const lbsToLose = currentLbs - goalLbs
    const targetCalories1lb = tdee - 500
    const targetCalories2lb = tdee - 1000
    const weeksAt1lb = lbsToLose > 0 ? Math.round(lbsToLose) : 0
    const weeksAt2lb = lbsToLose > 0 ? Math.ceil(lbsToLose / 2) : 0

    return {
      values: [
        { label: 'Daily Target (lose 1 lb/wk)', value: Math.round(targetCalories1lb) + ' kcal', primary: true },
        { label: 'Daily Target (lose 2 lb/wk)', value: Math.round(targetCalories2lb) + ' kcal' },
        { label: 'TDEE (maintenance)', value: Math.round(tdee) + ' kcal' },
        { label: 'Time to Goal (1 lb/wk)', value: weeksAt1lb > 0 ? weeksAt1lb + ' weeks' : 'Already at goal' },
      ],
      summary: 'Maintenance: ' + Math.round(tdee) + ' kcal/day. To lose ' + (lbsToLose > 0 ? lbsToLose : 0) + ' lbs: target ' + Math.round(targetCalories1lb) + ' kcal/day (1 lb/wk) or ' + Math.round(targetCalories2lb) + ' kcal/day (2 lb/wk).',
    }
  },
  resultLabels: ['Daily Target (1 lb/wk)', 'Daily Target (2 lb/wk)', 'TDEE', 'Time to Goal'],
  formula: 'To lose 1 lb/week: Deficit = 500 calories/day (3,500 cal = 1 lb fat)',
  content: {
    howTo: ['Enter current and goal weight.', 'Enter height, age, and sex.', 'Select activity level.', 'Click Calculate.'],
    faqs: [
      { q: 'How many calories to lose 1 pound?', a: 'A 3,500 calorie deficit equals approximately 1 pound of fat loss.' },
      { q: 'Is it safe to eat very few calories?', a: 'Very low calorie diets under 1,200 calories can be harmful without medical supervision.' },
      { q: 'Does exercise count toward the deficit?', a: 'Yes, calories burned through exercise increase your total daily deficit.' },
      { q: 'How fast is safe weight loss?', a: '1-2 pounds per week is considered safe and sustainable.' },
    ],
    related: ['bmr-calories', 'bmi', 'body-fat', 'ideal-body-weight', 'water-intake', 'heart-rate-zones'],
  },
  jsonLd: {
    faqs: [
      { q: 'How many calories to lose 1 pound?', a: '3,500 calorie deficit equals approximately 1 pound.' },
      { q: 'Is very low calorie safe?', a: 'Under 1,200 cal can be harmful without supervision.' },
      { q: 'Does exercise count?', a: 'Yes, exercise calories increase your daily deficit.' },
      { q: 'How fast is safe weight loss?', a: '1-2 pounds per week.' },
    ],
    howToSteps: ['Enter weights.', 'Enter height/age/sex.', 'Select activity.', 'Click Calculate.'],
  },
}
