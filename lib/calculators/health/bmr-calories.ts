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
  description: 'Calculate your Basal Metabolic Rate and daily calorie needs using the Mifflin-St Jeor equation. Find your maintenance, deficit, and surplus targets.',
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
      { q: 'How accurate is the BMR calculator?', a: 'The Mifflin-St Jeor equation is accurate within 10% for most people. Individual variation in metabolic rate, body composition, and hormones means your actual BMR may differ. Use the result as a starting point and adjust based on real-world results.' },
      { q: 'What happens to BMR as you age?', a: 'BMR decreases with age, roughly 1-2% per decade after age 20, primarily due to loss of muscle mass. This is why maintaining muscle through resistance training becomes increasingly important for weight management as you age.' },
      { q: 'Can you increase your BMR?', a: 'Yes. Building muscle mass raises BMR because muscle burns more calories at rest than fat. High-intensity exercise temporarily raises metabolic rate. Eating adequate protein prevents muscle loss that would lower BMR.' },
      { q: 'What is the difference between BMR and RMR?', a: 'BMR (Basal Metabolic Rate) is measured under strict conditions: lying still, fully rested, fasted. RMR (Resting Metabolic Rate) is measured at rest but without the strict conditions. RMR is about 10-20% higher than BMR and is more commonly used in practice.' },
    ],
    related: ['bmi', 'calorie-deficit', 'body-fat', 'ideal-body-weight', 'water-intake', 'heart-rate-zones'],
  },
  jsonLd: {
    faqs: [
      { q: 'What is BMR?', a: 'Calories burned at rest to maintain basic body functions.' },
      { q: 'What is TDEE?', a: 'BMR plus activity level calories.' },
      { q: 'How to use BMR to lose weight?', a: 'Eat fewer calories than your TDEE.' },
      { q: 'Does muscle affect BMR?', a: 'Yes, more muscle increases BMR.' },
      { q: 'How accurate is the BMR calculator?', a: 'The Mifflin-St Jeor equation is accurate within 10% for most people. Use the result as a starting point and adjust based on real-world results.' },
      { q: 'What happens to BMR as you age?', a: 'BMR decreases roughly 1-2% per decade after age 20, primarily due to loss of muscle mass.' },
      { q: 'Can you increase your BMR?', a: 'Yes. Building muscle raises BMR. High-intensity exercise temporarily raises metabolic rate. Adequate protein prevents muscle loss.' },
      { q: 'What is the difference between BMR and RMR?', a: 'BMR is measured under strict resting conditions (lying still, fasted). RMR is measured at rest without strict conditions and runs about 10-20% higher.' },
    ],
    howToSteps: ['Enter weight, height, and age.', 'Select sex and activity level.', 'Click Calculate.'],
  },
  educational: {
    explainer: `Your Basal Metabolic Rate (BMR) is the number of calories your body burns just to stay alive: breathing, circulating blood, maintaining body temperature, and running every organ. It is the floor of your calorie needs, calculated as if you were lying completely still all day. Most adults burn 1,300-2,000 calories at rest depending on size, sex, and age. BMR alone is not your daily calorie target. Your Total Daily Energy Expenditure (TDEE) multiplies your BMR by an activity factor to account for how much you move. The result is your maintenance calorie level, the number where your weight stays flat. Eating below TDEE causes weight loss; eating above causes weight gain. The practical formula: a 500-calorie daily deficit leads to about one pound of fat loss per week, since one pound of fat contains roughly 3,500 calories. This is the scientific basis for nearly all structured weight management programs.`,
    tips: [
      'Be honest about your activity level. Most people select "moderate" but live largely sedentary lives. An overestimated activity multiplier inflates TDEE and makes it seem like you can eat more than you actually can while losing weight.',
      'Protein intake preserves muscle during weight loss, which matters because muscle raises your BMR. Aim for 0.7-1 gram of protein per pound of body weight when in a calorie deficit.',
      'Do not cut below 1,200 calories (women) or 1,500 calories (men) without medical supervision. Severe restriction often causes muscle loss, slows metabolism, and is difficult to sustain.',
      'TDEE changes as you lose weight because a smaller body requires fewer calories. Recalculate every 10-15 pounds lost to keep your targets accurate.',
    ],
    commonMistakes: [
      'Treating calorie counts as precise. TDEE estimates carry a 10-15% margin of error depending on the equation and individual variation. Two people with identical stats may have meaningfully different actual metabolic rates.',
      'Choosing the wrong activity multiplier. "Moderate" exercise means structured cardio or strength training 3-5 days per week, not an active job. If you have a desk job and exercise 3x/week, you are probably "light," not "moderate."',
      'Eating back all exercise calories. Many fitness apps add exercise calories back to your daily budget, but people consistently overestimate calories burned during workouts. This often erases the deficit entirely.',
    ],
    example: `Nina is a 32-year-old woman, 145 lbs, 5\'5", working out 3 days per week. The Mifflin-St Jeor equation gives her a BMR of 1,471 kcal/day. At the "light" activity multiplier (1.375), her TDEE is 2,023 kcal/day. To lose 1 pound per week, she targets 1,523 kcal/day. After 12 weeks at a consistent 500-calorie daily deficit, she can expect to lose approximately 12 pounds, assuming no changes in activity and accurate tracking.`,
  },
  affiliate: {
    partner: 'MyFitnessPal',
    label: 'Track your calories with MyFitnessPal',
    url: 'https://www.myfitnesspal.com',
    description: 'The largest food database online. Log meals, track macros, and hit your goals.',
  },
  geo: {
    definition:
      'A BMR calculator uses the Mifflin-St Jeor equation to estimate the calories your body burns at complete rest, then multiplies by an activity factor to give your Total Daily Energy Expenditure (TDEE) — the number of calories needed to maintain your current weight.',
    ruleOfThumb:
      'A general estimate: multiply your body weight in pounds by 15 for a moderately active person. To lose weight, subtract 500 calories per day from your TDEE to lose approximately 1 lb per week.',
    example:
      'A 35-year-old male, 180 lbs, 5\'10", lightly active: BMR = 1,882 kcal/day. TDEE at light activity (BMR x 1.375) = 2,588 kcal/day. To lose 1 lb/week, target 2,088 kcal/day.',
    keyFacts: [
      'The Mifflin-St Jeor equation is considered the most accurate for most people, endorsed by the Academy of Nutrition and Dietetics. (Source: Academy of Nutrition and Dietetics)',
      'BMR accounts for 60-75% of total daily calorie expenditure for sedentary individuals. (Source: Harvard Health)',
      'A 500-calorie daily deficit creates roughly a 1 lb/week weight loss; a 1,000-calorie deficit targets 2 lbs/week. (Source: Academy of Nutrition and Dietetics)',
      'Muscle tissue burns approximately 6 kcal/lb/day at rest, versus fat tissue at 2 kcal/lb/day, making lean mass a key factor in BMR. (Source: Harvard Health)',
    ],
  },
}
