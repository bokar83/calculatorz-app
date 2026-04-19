import { CalculatorConfig, Currency } from '../types'

export const macronutrient: CalculatorConfig = {
  slug: 'macronutrient',
  title: 'Macronutrient Calculator',
  category: 'health',
  description: 'Calculate your daily protein, carbohydrate, and fat targets based on your calorie goals and diet preferences.',
  updatedDate: 'April 2026',
  inputs: [
    {
      id: 'calories',
      label: 'Daily Calorie Target (kcal)',
      type: 'number',
      defaultValue: 2000,
      min: 800,
      max: 6000,
      step: 50,
      hint: 'Use the BMR & Calorie Calculator to find your calorie target before setting macros.',
    },
    {
      id: 'goal',
      label: 'Diet Goal',
      type: 'select',
      defaultValue: 'balanced',
      options: [
        { value: 'balanced', label: 'Balanced (40/30/30)' },
        { value: 'low_carb', label: 'Low Carb (20/40/40)' },
        { value: 'high_protein', label: 'High Protein (30/40/30)' },
        { value: 'keto', label: 'Ketogenic (5/35/60)' },
        { value: 'custom', label: 'Custom' },
      ],
    },
    { id: 'customCarbs', label: 'Custom Carbs (%)', type: 'number', defaultValue: 40, min: 5, max: 70, step: 5, suffix: '%' },
    { id: 'customProtein', label: 'Custom Protein (%)', type: 'number', defaultValue: 30, min: 10, max: 60, step: 5, suffix: '%' },
  ],
  calculate: (inputs, _currency: Currency) => {
    const calories = Number(inputs.calories)
    const goal = String(inputs.goal)
    const customCarbs = Number(inputs.customCarbs)
    const customProtein = Number(inputs.customProtein)

    const ratios: Record<string, [number, number, number]> = {
      balanced:     [0.40, 0.30, 0.30],
      low_carb:     [0.20, 0.40, 0.40],
      high_protein: [0.30, 0.40, 0.30],
      keto:         [0.05, 0.35, 0.60],
      custom:       [customCarbs / 100, customProtein / 100, (100 - customCarbs - customProtein) / 100],
    }

    const [carbPct, proteinPct, fatPct] = ratios[goal] ?? ratios.balanced

    const fatPctClamped = Math.max(0, fatPct)
    const carbGrams = Math.round(calories * carbPct / 4)
    const proteinGrams = Math.round(calories * proteinPct / 4)
    const fatGrams = Math.round(calories * fatPctClamped / 9)

    const carbCals = Math.round(calories * carbPct)
    const proteinCals = Math.round(calories * proteinPct)
    const fatCals = Math.round(calories * fatPctClamped)

    const goalLabel: Record<string, string> = {
      balanced: 'Balanced',
      low_carb: 'Low Carb',
      high_protein: 'High Protein',
      keto: 'Ketogenic',
      custom: 'Custom',
    }

    return {
      values: [
        { label: 'Protein', value: `${proteinGrams}g / day (${proteinCals} kcal)`, primary: true },
        { label: 'Carbohydrates', value: `${carbGrams}g / day (${carbCals} kcal)` },
        { label: 'Fat', value: `${fatGrams}g / day (${fatCals} kcal)` },
        { label: 'Diet Plan', value: `${goalLabel[goal] ?? 'Balanced'} — ${Math.round(carbPct * 100)}% carbs / ${Math.round(proteinPct * 100)}% protein / ${Math.round(fatPctClamped * 100)}% fat` },
      ],
      summary: `On a ${goalLabel[goal] ?? 'Balanced'} plan with ${calories} kcal/day: ${proteinGrams}g protein, ${carbGrams}g carbs, ${fatGrams}g fat.`,
    }
  },
  resultLabels: ['Protein (g/day)', 'Carbohydrates (g/day)', 'Fat (g/day)', 'Diet Plan'],
  formula: 'Protein & Carbs = 4 kcal/g | Fat = 9 kcal/g',
  content: {
    howTo: [
      'Enter your daily calorie target. Use the BMR & Calorie Calculator if you are unsure.',
      'Select your diet goal from the dropdown menu.',
      'If using Custom, enter your desired carb and protein percentages.',
      'Click Calculate to see your daily gram targets for each macronutrient.',
    ],
    refTable: {
      headers: ['Macronutrient', 'Calories per Gram', 'Primary Function'],
      rows: [
        ['Protein', '4', 'Muscle repair, immune function, enzymes'],
        ['Carbohydrates', '4', 'Energy, brain function, fiber'],
        ['Fat', '9', 'Hormones, brain health, fat-soluble vitamins'],
      ],
    },
    faqs: [
      {
        q: 'What are macronutrients?',
        a: 'Macronutrients are the three primary nutrients that provide calories: protein, carbohydrates, and fat. Protein and carbohydrates each provide 4 calories per gram. Fat provides 9 calories per gram. Alcohol provides 7 calories per gram but is not a macronutrient. Every food is composed of some combination of these three macros plus water, fiber, and micronutrients.',
      },
      {
        q: 'How much protein do I need per day?',
        a: 'The RDA for protein is 0.8g per kilogram of body weight for sedentary adults. For muscle building or preservation during a calorie deficit, research supports 1.6-2.2g per kilogram (or 0.7-1.0g per pound). For a 150 lb person, this is 105-150g of protein per day. Higher protein intakes are safe for healthy adults and help preserve muscle during weight loss.',
      },
      {
        q: 'Is low-carb better for weight loss?',
        a: 'Studies show that low-carb and low-fat diets produce similar weight loss over 12 months when calories are matched. Low-carb diets often produce faster initial weight loss due to glycogen and water depletion, which can be motivating. However, the best diet is the one you can adhere to consistently. Both approaches work; the macro split matters less than the total calorie balance.',
      },
      {
        q: 'What is the ketogenic diet?',
        a: 'The ketogenic diet is a very low carbohydrate diet (typically 5% of calories from carbs, or under 50g/day) that shifts the body from burning glucose to burning ketones derived from fat. This metabolic state is called ketosis. The keto diet is used for weight loss, epilepsy management, and metabolic health. It requires strict adherence and may not be suitable for everyone.',
      },
      {
        q: 'What is the difference between net carbs and total carbs?',
        a: 'Net carbs are total carbohydrates minus dietary fiber (and sometimes sugar alcohols). Fiber is not digested and does not raise blood sugar or contribute to calorie intake in the same way as digestible carbs. Low-carb and ketogenic dieters typically track net carbs rather than total carbs. On a standard balanced diet, tracking total carbs is sufficient.',
      },
      {
        q: 'Can I build muscle on a high-carb diet?',
        a: 'Yes. Carbohydrates are the primary fuel for anaerobic exercise like weightlifting. Higher carb intakes support better training performance, glycogen replenishment, and recovery. Most powerlifters and bodybuilders in calorie surplus use balanced or high-carb macros (40-50% carbs) while keeping protein intake at 1.6-2.2g/kg.',
      },
      {
        q: 'How much fat is too much?',
        a: 'Dietary guidelines from the WHO and USDA do not set an upper limit on total fat but recommend limiting saturated fat to under 10% of total calories and avoiding trans fats entirely. Unsaturated fats from sources like olive oil, avocado, nuts, and fish are associated with cardiovascular health benefits. Fat is an essential macronutrient and should not drop below 15-20% of total calories.',
      },
      {
        q: 'Should I track macros or just calories?',
        a: 'For weight loss or gain, total calories are the primary lever. Tracking macros adds a layer of precision that is useful for body composition goals (building muscle, preserving muscle during a cut) or specific dietary approaches (keto, high protein). Beginners often start with calorie tracking and add macro targets as they become more experienced.',
      },
    ],
    related: ['bmr-calories', 'bmi', 'body-fat', 'water-intake', 'ideal-body-weight'],
  },
  geo: {
    definition: 'A macronutrient calculator determines the daily gram targets for protein, carbohydrates, and fat based on a calorie goal and macro ratio, using the energy density values of 4 kcal/g for protein and carbohydrates and 9 kcal/g for fat to convert percentage targets into gram amounts.',
    ruleOfThumb: 'For muscle building or preservation, target 1g of protein per pound of body weight (2.2g per kg). For general health, the USDA Dietary Guidelines recommend 45-65% carbohydrates, 10-35% protein, and 20-35% fat. The specific ratio matters less than meeting protein targets and staying within calorie budget.',
    example: 'A 2,000 kcal/day balanced diet (40% carbs / 30% protein / 30% fat): 200g carbohydrates (800 kcal), 150g protein (600 kcal), 67g fat (600 kcal). On a high-protein plan (30/40/30): 150g carbs, 200g protein, 67g fat. The protein increases by 50g while carbs decrease by 50g, with the same fat and total calories.',
    keyFacts: [
      'The Academy of Nutrition and Dietetics recommends 1.2-2.0g of protein per kg of body weight for athletes, and 1.6-2.2g/kg for those focused on muscle gain or preservation during calorie restriction. (Source: Academy of Nutrition and Dietetics)',
      'The World Health Organization recommends that dietary fat provide 20-35% of total energy intake, with saturated fats kept below 10% of total calories. (Source: WHO)',
      'USDA Dietary Guidelines 2020-2025 recommend 45-65% of calories from carbohydrates, 20-35% from fat, and 10-35% from protein for healthy adults. (Source: USDA)',
      'Meta-analysis of 48 randomized trials found no significant difference in weight loss between low-fat and low-carbohydrate diets when protein intake was matched, confirming that total calories are the primary determinant of weight change. (Source: JAMA Internal Medicine, 2015)',
    ],
  },
  educational: {
    explainer: `Macronutrients are the three energy-providing nutrients: protein, carbohydrates, and fat. Every calorie you consume comes from one or more of these three sources. Protein and carbohydrates both provide 4 calories per gram. Fat provides 9 calories per gram, which is why fat-dense foods are calorie-dense even in small portions. The macronutrient calculator converts your calorie goal and macro ratio into grams by dividing the calorie allocation for each macro by its calorie density. For example: 30% of 2,000 calories = 600 calories from protein; 600 divided by 4 = 150 grams of protein. Choosing your macro split depends on your goals, health status, food preferences, and training demands. The most important variable for body weight is total calories. The macro split within that budget affects body composition (muscle vs fat), satiety, energy levels, and training performance.`,
    tips: [
      'Prioritize protein first. It is the most satiating macronutrient, the most thermogenic (burning more calories in digestion), and the most important for muscle preservation during a calorie deficit. Set protein target first, then fill remaining calories with carbs and fat.',
      'Do not fear dietary fat. Fat is essential for hormone production, brain function, and absorption of fat-soluble vitamins (A, D, E, K). Dropping fat below 15-20% of calories can impair testosterone and estrogen production over time.',
      'Adjust carbs based on your activity level. Carbohydrates are fuel for high-intensity exercise. If you train intensely 4-5 days per week, higher carb intakes (40-50%) support better performance. If you are sedentary, a moderate intake (30-40%) is appropriate.',
      'Use this calculator alongside the BMR & Calorie Calculator. Setting macros without first knowing your maintenance calorie level is like budgeting without knowing your income. Get your calorie target right first, then use this tool to split it into macros.',
    ],
    commonMistakes: [
      'Setting protein too low during a calorie deficit. When cutting calories, the body can break down muscle for energy if protein intake is insufficient. Research consistently shows that higher protein intakes (1.6-2.2g/kg) preserve lean mass during weight loss far better than standard recommendations (0.8g/kg).',
      'Treating all carbohydrates the same. 50g of carbs from oats, vegetables, and beans behaves very differently from 50g of carbs from candy or white bread. Focus on fiber-rich, minimally processed carbohydrate sources for better energy regulation and satiety.',
      'Obsessing over macro precision at the expense of overall diet quality. Hitting exact macro targets while eating primarily processed food is less beneficial than a slightly off macro split from whole, minimally processed foods. Macro tracking is a tool, not a substitute for food quality.',
    ],
    example: `Alex weighs 170 lbs (77 kg) and has a maintenance calorie level of 2,400 kcal/day. Alex wants to lose fat while preserving muscle, so targets a 300 kcal deficit (2,100 kcal/day) with a high-protein split (30% carbs / 40% protein / 30% fat). Calculation: protein = 2,100 x 0.40 / 4 = 210g/day (well above the 1g/lb bodyweight target at 170g, giving extra buffer); carbs = 2,100 x 0.30 / 4 = 158g/day; fat = 2,100 x 0.30 / 9 = 70g/day. After 8 weeks of tracking at these targets with a strength training program, Alex maintained lean mass while losing approximately 1 lb/week of fat mass.`,
  },
  jsonLd: {
    faqs: [
      { q: 'What are macronutrients?', a: 'The three energy-providing nutrients: protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g).' },
      { q: 'How much protein do I need per day?', a: 'RDA: 0.8g/kg for sedentary adults. For muscle building: 1.6-2.2g/kg (0.7-1.0g per pound).' },
      { q: 'Is low-carb better for weight loss?', a: 'Studies show similar weight loss at 12 months for low-carb and low-fat when calories are matched. Adherence matters more than macro split.' },
      { q: 'What is the ketogenic diet?', a: 'A very low carb diet (under 5% carbs or 50g/day) that shifts metabolism to burning ketones from fat, entering ketosis.' },
      { q: 'What is the difference between net carbs and total carbs?', a: 'Net carbs = total carbs minus fiber. Fiber is not digested and does not raise blood sugar. Low-carb dieters typically track net carbs.' },
      { q: 'Can I build muscle on a high-carb diet?', a: 'Yes. Carbs fuel anaerobic exercise and glycogen replenishment. Most strength athletes use 40-50% carbs with high protein intake.' },
      { q: 'How much fat is too much?', a: 'No upper limit on total fat per WHO/USDA. Limit saturated fat to under 10% of calories. Avoid trans fats. Do not drop below 15-20% fat.' },
      { q: 'Should I track macros or just calories?', a: 'Calories are the primary lever for weight. Macros add precision for body composition goals and specific diets like keto or high protein.' },
    ],
    howToSteps: [
      'Enter your daily calorie target.',
      'Select your diet goal (balanced, low carb, high protein, ketogenic, or custom).',
      'If using custom, enter your desired carb and protein percentages.',
      'Click Calculate to see your daily gram and calorie targets for protein, carbohydrates, and fat.',
    ],
  },
}
