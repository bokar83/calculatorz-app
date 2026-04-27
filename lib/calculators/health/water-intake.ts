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
  geo: {
    definition: 'A daily water intake calculator estimates personalized hydration needs based on body weight, activity level, and climate, applying evidence-based formulas to derive a target fluid intake in ounces or liters per day.',
    ruleOfThumb: 'The National Academies of Sciences recommends total daily water intake of about 3.7 liters (125 oz) for men and 2.7 liters (91 oz) for women from all sources including food. A common body-weight formula: drink half your body weight in ounces per day as a baseline.',
    example: 'A 180-lb moderately active person in a hot climate. Baseline: 90 oz (half of 180). Add 12 oz per 30 minutes of exercise (45-minute run = 18 oz extra). Hot climate adds 16 oz. Total target: approximately 124 oz or 3.7 liters.',
    keyFacts: [
      'The National Academies of Sciences, Engineering, and Medicine set adequate daily fluid intake at 3.7 L (125 oz) for men and 2.7 L (91 oz) for women, including water from food and all beverages (NASEM, Dietary Reference Intakes for Water, 2004).',
      'Even mild dehydration of 1 to 2 percent body weight loss impairs cognitive performance, mood, and physical endurance, according to studies reviewed by the American Council on Exercise.',
      'About 20 percent of daily water intake comes from food, particularly fruits and vegetables; someone eating a diet rich in produce needs proportionally less from beverages (Mayo Clinic, Water: How much should you drink?).',
      'Endurance athletes can lose 1 to 2 liters of sweat per hour during intense exercise in heat; the American College of Sports Medicine recommends drinking to prevent more than 2 percent body weight loss during activity.',
    ],
  },
  educational: {
    explainer: 'The popular "8 glasses a day" rule is not based on scientific evidence; it originated from a 1945 U.S. Food and Nutrition Board recommendation that was widely misquoted. Actual hydration needs vary substantially with body size, activity, heat, altitude, and diet. The body loses water through urine, sweat, breathing, and stool, and these losses accelerate significantly with exercise and heat exposure. Thirst is a reliable hydration signal under normal conditions, but it lags behind actual fluid deficit by roughly 1 to 2 percent body weight loss, meaning you are already mildly dehydrated when you first feel thirsty during exercise or heat stress. The kidneys can process about 0.8 to 1 liter of water per hour; drinking far beyond needs can dilute blood sodium and cause hyponatremia, a risk during endurance events when athletes over-drink plain water without electrolyte replacement. Pale yellow urine is the practical marker of good hydration; dark yellow or amber signals the need for more fluid.',
    tips: [
      'Drink proactively before exercise and throughout the day rather than waiting for thirst; thirst lags behind actual fluid needs, especially during high-intensity activity or heat exposure.',
      'Monitor urine color as a practical hydration indicator: pale straw yellow signals good hydration, dark yellow signals mild dehydration, and clear urine may indicate over-hydration.',
      'Spread water intake across the day in regular intervals; consuming large amounts at once stresses the kidneys and increases urine output without improving hydration status.',
      'Account for water from food, particularly fruits, vegetables, soups, and yogurt, which collectively contribute roughly 20 percent of total daily fluid intake for most people.',
    ],
    commonMistakes: [
      'Waiting until thirsty to drink during exercise: thirst becomes apparent at 1 to 2 percent dehydration, at which point aerobic performance is already measurably reduced.',
      'Over-hydrating during long endurance events by drinking plain water without electrolytes: this dilutes blood sodium and can cause hyponatremia, which in severe cases is life-threatening.',
      'Not adjusting intake for air-conditioned or pressurized environments: aircraft cabins and air-conditioned offices have low humidity (10 to 20 percent), increasing insensible water loss through breathing compared to normal indoor conditions.',
    ],
    example: 'Sarah runs 5 miles each morning in summer heat and weighs 145 lbs. Baseline daily intake: 72.5 oz (145 divided by 2). Exercise adjustment: a 60-minute run at moderate intensity adds approximately 24 oz (12 oz per 30 min). Hot climate addition: 16 oz. Total daily target: 72.5 plus 24 plus 16 = 112.5 oz, approximately 3.3 liters or 14 standard 8-oz glasses. She should front-load 16 oz before her run, sip 6 to 8 oz every 15 to 20 minutes during it, and rehydrate within 30 minutes after finishing.',
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
