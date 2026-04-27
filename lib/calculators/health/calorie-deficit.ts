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
  geo: {
    definition: 'A calorie deficit calculator determines the daily energy shortfall needed to achieve a target weight loss rate, by computing total daily energy expenditure (TDEE) from BMR and activity level, then subtracting the deficit corresponding to the desired weekly loss.',
    ruleOfThumb: 'A 500-calorie daily deficit produces approximately 1 pound of fat loss per week (3,500 calories per pound). A 1,000-calorie daily deficit produces approximately 2 pounds per week, which is the safe maximum recommended by most health authorities.',
    example: 'Maria weighs 175 lbs, is moderately active, and wants to lose 1 pound per week. Her TDEE is 2,200 calories. Her daily calorie target is 2,200 minus 500 = 1,700 calories, creating a 3,500-calorie weekly deficit.',
    keyFacts: [
      'The CDC recommends a weight loss rate of 1 to 2 pounds per week as safe and sustainable for long-term success (CDC, Healthy Weight).',
      'A 3,500-calorie deficit equals approximately 1 pound of fat; however, research shows this is an approximation that varies with metabolic adaptation (NIH, Hall et al., 2011).',
      'Very low calorie diets below 800 calories per day are associated with muscle loss, nutrient deficiencies, and gallstone formation without medical supervision (NIH, National Institute of Diabetes).',
      'Protein intake of 0.7 to 1.0 gram per pound of body weight during a deficit helps preserve lean muscle mass, according to peer-reviewed sports nutrition research (Journal of the International Society of Sports Nutrition).',
    ],
  },
  educational: {
    explainer: 'A calorie deficit occurs when you consume fewer calories than your body burns in a day. Your total daily energy expenditure (TDEE) combines your basal metabolic rate (BMR), the energy needed for basic organ function at rest, with a multiplier for physical activity. BMR is calculated using the Mifflin-St Jeor equation, which accounts for height, weight, age, and sex. The commonly cited rule that 3,500 calories equals 1 pound of fat is a useful approximation, but actual loss varies because your metabolism adapts as body weight decreases. A 20% deficit from TDEE is generally sustainable and minimizes muscle loss. Extreme deficits accelerate short-term weight loss but trigger metabolic slowdown and increase the risk of regaining weight. Spreading your deficit across both reduced food intake and increased exercise activity preserves lean mass better than diet restriction alone. Recalculating your TDEE every 10 to 15 pounds lost is important because a lighter body burns fewer calories at rest.',
    tips: [
      'Use a food scale and a tracking app for the first 2 to 4 weeks; research shows most people underestimate calorie intake by 20 to 40 percent.',
      'Combine a moderate dietary reduction with regular exercise rather than cutting calories alone to preserve muscle mass and metabolic rate.',
      'Keep your daily deficit at 500 to 750 calories rather than 1,000 or more; extreme restriction leads to fatigue, muscle loss, and dietary rebound.',
      'Recalculate your TDEE every 10 to 15 pounds lost, because a lighter body requires fewer calories and your original deficit will shrink over time.',
    ],
    commonMistakes: [
      'Overestimating calories burned during exercise: fitness trackers and cardio machines often overstate burn by 20 to 30 percent, leading people to eat back more than they earned.',
      'Underestimating calories consumed: cooking oils, condiments, beverages, and bites while cooking are frequently omitted and can add 200 to 500 calories per day.',
      'Choosing too aggressive a deficit: a deficit greater than 1,000 calories daily often causes muscle loss, hormonal disruption, and metabolic adaptation that makes continued loss harder.',
    ],
    example: 'David weighs 210 lbs and wants to lose 50 lbs. His TDEE is approximately 2,600 calories. At a 500-calorie daily deficit (2,100 calories per day), he needs a total reduction of 175,000 calories (50 lbs x 3,500). At 1 pound per week, that is 50 weeks. However, after losing 15 lbs his TDEE drops to roughly 2,450 calories, meaning the same 2,100 calorie intake now only creates a 350-calorie deficit, slowing progress to about 0.7 lbs per week. David should recalculate every 10 to 15 lbs to maintain the 500-calorie gap and stay on pace.',
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
