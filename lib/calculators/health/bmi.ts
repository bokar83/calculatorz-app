import { CalculatorConfig, Currency, UnitSystem } from '../types'

export const bmi: CalculatorConfig = {
  slug: 'bmi',
  title: 'BMI Calculator',
  category: 'health',
  description: 'Calculate your Body Mass Index (BMI) and find out what your result means for your health.',
  updatedDate: 'April 2026',
  inputs: [
    { id: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70, min: 1, max: 500, step: 0.5, suffix: 'kg' },
    { id: 'height', label: 'Height (cm)', type: 'number', defaultValue: 170, min: 50, max: 300, step: 1, suffix: 'cm' },
    {
      id: 'sex',
      label: 'Sex',
      type: 'select',
      defaultValue: 'any',
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
    ],
    related: ['bmr-calories', 'body-fat', 'ideal-body-weight', 'calorie-deficit', 'water-intake', 'heart-rate-zones'],
  },
  geo: {
    definition: 'BMI (Body Mass Index) is a numerical measure of body weight relative to height, calculated by dividing weight in kilograms by height in meters squared (kg/m²), or in imperial units: 703 × weight(lbs) / height(in)².',
    ruleOfThumb: 'The WHO standard BMI classification: below 18.5 is underweight, 18.5-24.9 is healthy weight, 25.0-29.9 is overweight, and 30.0 or above is obese. However, BMI does not account for muscle mass, age, or body fat distribution.',
    example: 'A person weighing 70 kg (154 lbs) and standing 170 cm (5\'7") has a BMI of 70 ÷ (1.70)² = 24.2 — in the healthy weight range. Their healthy weight range is 53.5-71.9 kg (118-158 lbs).',
    keyFacts: [
      'BMI was developed by Belgian mathematician Adolphe Quetelet in the 1830s and was not designed as a medical diagnostic tool.',
      'Approximately 42% of US adults were classified as obese (BMI 30+) in 2024, according to the CDC.',
      'BMI tends to overestimate body fat in athletes and underestimate it in older adults and those with low muscle mass.',
      'A healthy BMI range of 18.5-24.9 applies to most adults; different ranges apply for children and some ethnic groups.',
    ],
  },
  jsonLd: {
    faqs: [
      { q: 'What is BMI?', a: 'Body Mass Index: weight in kg divided by height in meters squared. A screening tool for weight-related health risks.' },
      { q: 'Is BMI accurate for everyone?', a: 'No. It does not account for muscle mass, age, or fat distribution. Use as a general guide.' },
      { q: 'What is a healthy BMI?', a: 'Between 18.5 and 24.9 for most adults.' },
      { q: 'How do I lower my BMI?', a: 'Through weight loss via reduced caloric intake and increased physical activity.' },
    ],
    howToSteps: [
      'Select Metric or Imperial unit system.',
      'Enter your weight and height.',
      'Click Calculate.',
    ],
  },
}
