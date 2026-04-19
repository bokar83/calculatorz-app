import { CalculatorConfig, Currency, UnitSystem } from '../types'

export const bmi: CalculatorConfig = {
  slug: 'bmi',
  title: 'BMI Calculator',
  category: 'health',
  description: 'Calculate your BMI and understand what it means for your health. Supports metric and imperial units. Includes healthy weight range.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70, min: 1, max: 500, step: 0.5, suffix: 'kg', hint: 'Use your current weight, not a target weight. Results are only accurate with actual measurements.' },
    { id: 'height', label: 'Height (cm)', type: 'number', defaultValue: 170, min: 50, max: 300, step: 1, suffix: 'cm', hint: 'Stand straight, without shoes. Measure to the nearest centimeter or half-inch.' },
    {
      id: 'sex',
      label: 'Sex',
      type: 'select',
      defaultValue: 'any',
      hint: 'BMI ranges apply equally regardless of sex, but body composition differs. This is used for contextual information only.',
      options: [
        { value: 'any', label: 'Not specified' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
  ],
  calculate: (inputs, _currency: Currency, unitSystem: UnitSystem = 'metric') => {
    let weightKg: number
    let heightM: number

    if (unitSystem === 'imperial') {
      // inputs: weight in lbs, height in inches
      weightKg = Number(inputs.weight) * 0.453592
      heightM = Number(inputs.height) * 0.0254
    } else {
      weightKg = Number(inputs.weight)
      heightM = Number(inputs.height) / 100
    }

    if (heightM <= 0) {
      return {
        values: [
          { label: 'Your BMI', value: 'N/A' },
          { label: 'Category', value: 'Enter a valid height' },
          { label: 'Healthy Range', value: '18.5 - 24.9' },
          { label: 'Healthy Weight Range', value: 'N/A' },
        ],
        summary: 'Please enter a valid height.',
      }
    }

    const bmiValue = weightKg / (heightM * heightM)

    let category: string
    if (bmiValue < 18.5) {
      category = 'Underweight'
    } else if (bmiValue < 25) {
      category = 'Healthy Weight'
    } else if (bmiValue < 30) {
      category = 'Overweight'
    } else {
      category = 'Obese'
    }

    const idealMinKg = 18.5 * heightM * heightM
    const idealMaxKg = 24.9 * heightM * heightM

    const weightRange = unitSystem === 'imperial'
      ? `${(idealMinKg / 0.453592).toFixed(1)} - ${(idealMaxKg / 0.453592).toFixed(1)} lbs`
      : `${idealMinKg.toFixed(1)} - ${idealMaxKg.toFixed(1)} kg`

    return {
      values: [
        { label: 'Your BMI', value: bmiValue.toFixed(1) },
        { label: 'Category', value: category },
        { label: 'Healthy Range', value: '18.5 - 24.9' },
        { label: 'Healthy Weight Range', value: weightRange },
      ],
      summary: `BMI of ${bmiValue.toFixed(1)}: ${category}.`,
    }
  },
  resultLabels: ['Your BMI', 'Category', 'Healthy Range', 'Healthy Weight Range'],
  formula: 'BMI = weight (kg) / height\u00b2 (m\u00b2)  |  Imperial: BMI = 703 x weight (lbs) / height\u00b2 (in\u00b2)',
  content: {
    howTo: [
      'Select your preferred unit system (Metric or Imperial).',
      'Enter your weight and height.',
      'Click Calculate to see your BMI score and category.',
    ],
    refTable: {
      headers: ['BMI Range', 'Category', 'Health Risk'],
      rows: [
        ['Below 18.5', 'Underweight', 'Increased risk'],
        ['18.5 - 24.9', 'Healthy Weight', 'Low risk'],
        ['25.0 - 29.9', 'Overweight', 'Moderate risk'],
        ['30.0 - 34.9', 'Obese Class I', 'High risk'],
        ['35.0 - 39.9', 'Obese Class II', 'Very high risk'],
        ['40.0+', 'Obese Class III', 'Extremely high risk'],
      ],
    },
    faqs: [
      {
        q: 'What is BMI?',
        a: 'BMI (Body Mass Index) is a measure of body weight relative to height. It is used as a screening tool to identify potential weight problems.',
      },
      {
        q: 'Is BMI accurate for everyone?',
        a: 'BMI has limitations. It does not account for muscle mass, bone density, age, or distribution of fat. Use it as a general guide only.',
      },
      {
        q: 'What is a healthy BMI?',
        a: 'A BMI between 18.5 and 24.9 is considered healthy for most adults.',
      },
      {
        q: 'How do I lower my BMI?',
        a: 'BMI decreases when you lose body weight. A combination of reduced caloric intake and increased physical activity is most effective. Consult a healthcare provider for personalized advice.',
      },
      {
        q: 'Can BMI be wrong or inaccurate?',
        a: 'Yes. BMI does not measure body fat directly and cannot distinguish between muscle and fat. Athletes often show "overweight" BMI despite low body fat. Older adults may show "normal" BMI despite high fat. Always interpret BMI alongside other health markers.',
      },
      {
        q: 'What BMI is considered obese?',
        a: 'A BMI of 30.0 or above is classified as obese by the WHO. Obesity Class I is 30.0-34.9, Class II is 35.0-39.9, and Class III (severe obesity) is 40.0 or above.',
      },
      {
        q: 'Does BMI apply to children?',
        a: 'Not directly. BMI for children and teens uses age- and sex-specific percentile charts because body composition changes with growth. The adult BMI thresholds (18.5, 25, 30) do not apply to anyone under 18.',
      },
      {
        q: 'What is more accurate than BMI for measuring body fat?',
        a: 'More accurate methods include DEXA scans (dual-energy X-ray absorptiometry), hydrostatic weighing, body fat calipers, and waist-to-height ratio. Waist circumference combined with BMI gives a better risk picture than BMI alone.',
      },
    ],
    related: ['bmr-calories', 'body-fat', 'ideal-body-weight', 'calorie-deficit', 'water-intake', 'heart-rate-zones'],
  },
  geo: {
    definition: 'BMI (Body Mass Index) is a numerical measure of body weight relative to height, calculated by dividing weight in kilograms by height in meters squared (kg/m²), or in imperial units: 703 × weight(lbs) / height(in)².',
    ruleOfThumb: 'The WHO standard BMI classification: below 18.5 is underweight, 18.5-24.9 is healthy weight, 25.0-29.9 is overweight, and 30.0 or above is obese. However, BMI does not account for muscle mass, age, or body fat distribution.',
    example: 'A person weighing 70 kg (154 lbs) and standing 170 cm (5\'7") has a BMI of 70 ÷ (1.70)² = 24.2 — in the healthy weight range. Their healthy weight range is 53.5-71.9 kg (118-158 lbs).',
    keyFacts: [
      'BMI was developed by Belgian mathematician Adolphe Quetelet in the 1830s and was not designed as a medical diagnostic tool. (Source: WHO)',
      'Approximately 42% of US adults are classified as obese (BMI 30+), according to the CDC. (Source: CDC)',
      'BMI tends to overestimate body fat in athletes and underestimate it in older adults and those with low muscle mass. (Source: Harvard Health)',
      'A healthy BMI range of 18.5-24.9 applies to most adults; different ranges apply for children and some ethnic groups. (Source: WHO)',
    ],
  },
  affiliate: {
    partner: 'Noom',
    label: 'Ready to move toward a healthier BMI?',
    url: 'https://www.noom.com',
    description: 'Noom uses psychology-based coaching to help you build lasting habits. 14-day free trial available. (Note: CalcFlow earns a commission if you sign up through this link.)',
  },
  educational: {
    explainer: `BMI, or Body Mass Index, is a simple ratio of your weight to your height squared. It was designed in the 1830s as a population-level statistical tool, not as a medical diagnostic for individuals, and that context matters when reading your result. The calculation is the same for everyone: weight in kilograms divided by height in meters squared. A BMI between 18.5 and 24.9 is considered healthy for most adults. Below 18.5 is underweight. Between 25 and 29.9 is overweight. Above 30 is classified as obese. BMI is useful as a quick, free screening tool that flags potential weight-related health risks. Its main limitation is that it cannot distinguish between fat and muscle, so a very muscular person may have an "overweight" BMI while having excellent metabolic health, while someone with a "normal" BMI but very little muscle and high visceral fat may still face health risks. Use it as a starting point, not a verdict.`,
    tips: [
      'Pair your BMI result with a waist circumference measurement for better context. A waist above 40 inches (men) or 35 inches (women) is associated with increased metabolic and cardiovascular risk, regardless of BMI.',
      'If you are athletic or weight-train regularly, BMI will likely overstate your health risk because muscle is denser than fat. Ask your doctor about a body fat percentage measurement for a clearer picture.',
      'BMI ranges for children are age- and sex-specific and use different thresholds than adult ranges. Do not apply adult BMI categories to anyone under 18.',
      'Small changes compound over time. Losing just 5-10% of body weight, even if BMI stays in the overweight range, produces measurable improvements in blood pressure, blood sugar, and cholesterol (per the CDC).',
    ],
    commonMistakes: [
      'Treating BMI as a complete health assessment. BMI does not measure body fat distribution, fitness level, blood markers, or any other indicator of metabolic health. A normal BMI does not mean you are healthy, and a high BMI does not automatically mean you are not.',
      'Using different measurement standards across calculations. BMI requires consistent units: either kilograms and meters, or pounds and inches with the 703 conversion factor. Mixing metric weight with imperial height will give a completely wrong result.',
      'Ignoring the limitations for older adults. As people age, muscle mass decreases and body fat increases, often without weight change. A 60-year-old with a "normal" BMI may carry significantly more fat than their BMI suggests.',
    ],
    example: `Rachel is 5\'6" (168 cm) and weighs 155 lbs (70.3 kg). Her BMI is 70.3 / (1.68)^2 = 24.9, at the high end of the healthy range. Her doctor notes her waist circumference is 31 inches, well within the healthy range, and her body fat is 27%, also acceptable for her age. Despite being at the edge of the healthy BMI range, her overall picture is positive. The BMI gave the right general signal but not the full story.`,
  },
  jsonLd: {
    faqs: [
      { q: 'What is BMI?', a: 'Body Mass Index: weight in kg divided by height in meters squared. A screening tool for weight-related health risks.' },
      { q: 'Is BMI accurate for everyone?', a: 'No. It does not account for muscle mass, age, or fat distribution. Use as a general guide.' },
      { q: 'What is a healthy BMI?', a: 'Between 18.5 and 24.9 for most adults.' },
      { q: 'How do I lower my BMI?', a: 'Through weight loss via reduced caloric intake and increased physical activity.' },
      { q: 'Can BMI be wrong or inaccurate?', a: 'Yes. BMI does not measure body fat directly and cannot distinguish between muscle and fat. Athletes often show "overweight" BMI despite low body fat. Always interpret BMI alongside other health markers.' },
      { q: 'What BMI is considered obese?', a: 'A BMI of 30.0 or above is classified as obese by the WHO. Class I is 30.0-34.9, Class II is 35.0-39.9, Class III is 40.0+.' },
      { q: 'Does BMI apply to children?', a: 'Not directly. Children use age- and sex-specific percentile charts. Adult thresholds do not apply to anyone under 18.' },
      { q: 'What is more accurate than BMI for measuring body fat?', a: 'DEXA scans, hydrostatic weighing, body fat calipers, and waist-to-height ratio. Waist circumference combined with BMI gives a better risk picture.' },
    ],
    howToSteps: [
      'Select Metric or Imperial unit system.',
      'Enter your weight and height.',
      'Click Calculate.',
    ],
  },
}
