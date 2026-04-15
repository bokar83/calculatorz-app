import { CalculatorConfig } from '../types'

export const waterIntake: CalculatorConfig = {
  slug: 'water-intake',
  title: 'Water Intake Calculator',
  category: 'health',
  description: 'Calculate your recommended daily water intake based on weight and activity.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'weightLbs', label: 'Weight (lbs)', type: 'number', defaultValue: 165, min: 50, max: 500, step: 1 },
    {
      id: 'activity', label: 'Activity Level', type: 'select',
      options: [
        { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
        { value: 'light', label: 'Light (1-3 days/week)' },
        { value: 'moderate', label: 'Moderate (3-5 days/week)' },
        { value: 'active', label: 'Active (6-7 days/week)' },
        { value: 'very_active', label: 'Very Active (hard daily exercise)' },
      ],
    },
    {
      id: 'climate', label: 'Climate', type: 'select',
      options: [
        { value: 'cool', label: 'Cool / Temperate' },
        { value: 'warm', label: 'Warm / Humid' },
        { value: 'hot', label: 'Hot (tropical or desert)' },
      ],
    },
  ],
  calculate: (inputs) => {
    const weight = Number(inputs.weightLbs)
    const activity = inputs.activity as string || 'sedentary'
    const climate = inputs.climate as string || 'cool'

    const baseOz = weight / 2
    const activityAdd: Record<string, number> = { sedentary: 0, light: 8, moderate: 16, active: 24, very_active: 32 }
    const climateAdd: Record<string, number> = { cool: 0, warm: 8, hot: 16 }
    const totalOz = baseOz + (activityAdd[activity] ?? 0) + (climateAdd[climate] ?? 0)
    const liters = totalOz * 0.0295735
    const cups = totalOz / 8
    const glasses8oz = Math.round(totalOz / 8)

    return {
      values: [
        { label: 'Daily Water Target', value: Math.round(totalOz) + ' oz', primary: true },
        { label: 'In Liters', value: liters.toFixed(1) + ' L' },
        { label: '8-oz Glasses', value: glasses8oz + ' glasses' },
        { label: 'In Cups', value: cups.toFixed(1) + ' cups' },
      ],
      summary: 'Recommended: ' + Math.round(totalOz) + ' oz (' + liters.toFixed(1) + ' liters / ' + glasses8oz + ' glasses of water per day).',
    }
  },
  resultLabels: ['Daily Water Target', 'In Liters', '8-oz Glasses', 'In Cups'],
  formula: 'Water (oz) = Body Weight (lbs) / 2 + Activity Adjustment + Climate Adjustment',
  content: {
    howTo: ['Enter your weight.', 'Select your activity level.', 'Select your climate.', 'Click Calculate.'],
    faqs: [
      { q: 'How much water should I drink per day?', a: 'A common guideline is half your body weight in ounces; activity and heat increase the need.' },
      { q: 'Does coffee count toward water intake?', a: 'Caffeinated drinks have mild diuretic effects; plain water is best.' },
      { q: 'Can you drink too much water?', a: 'Yes, hyponatremia (water intoxication) can occur with extreme overconsumption.' },
      { q: 'How does exercise affect water needs?', a: 'Add about 12 oz for every 30 minutes of moderate exercise.' },
    ],
    related: ['bmi', 'bmr-calories', 'calorie-deficit', 'body-fat', 'heart-rate-zones', 'sleep-calculator'],
  },
  jsonLd: {
    faqs: [
      { q: 'How much water per day?', a: 'Half your body weight in ounces is a common guideline.' },
      { q: 'Does coffee count?', a: 'Caffeinated drinks have mild diuretic effects; plain water is best.' },
      { q: 'Can you drink too much?', a: 'Yes, extreme overconsumption can cause hyponatremia.' },
      { q: 'Exercise and water needs?', a: 'Add 12 oz per 30 minutes of moderate exercise.' },
    ],
    howToSteps: ['Enter weight.', 'Select activity level.', 'Click Calculate.'],
  },
}
