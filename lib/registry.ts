import type { CalculatorConfig } from './calculators/types'

// Finance — full implementations (stubs for now, replaced in Task 4)
import { hourlyToSalary } from './calculators/finance/hourly-to-salary'
import { compoundInterest } from './calculators/finance/compound-interest'
import { loanPayment } from './calculators/finance/loan-payment'
import { mortgagePayment } from './calculators/finance/mortgage-payment'

// Finance — stubs
import { salaryToHourly } from './calculators/finance/salary-to-hourly'
import { takeHomePay } from './calculators/finance/take-home-pay'
import { overtimePay } from './calculators/finance/overtime-pay'
import { raiseCalculator } from './calculators/finance/raise-calculator'
import { salaryComparison } from './calculators/finance/salary-comparison'
import { autoLoan } from './calculators/finance/auto-loan'
import { personalLoan } from './calculators/finance/personal-loan'
import { studentLoan } from './calculators/finance/student-loan'
import { debtPayoff } from './calculators/finance/debt-payoff'
import { calculator401k } from './calculators/finance/401k-calculator'
import { debtToIncome } from './calculators/finance/debt-to-income'
import { simpleInterest } from './calculators/finance/simple-interest'
import { savingsGoal } from './calculators/finance/savings-goal'
import { investmentReturn } from './calculators/finance/investment-return'
import { retirementSavings } from './calculators/finance/retirement-savings'
import { emergencyFund } from './calculators/finance/emergency-fund'
import { incomeTax } from './calculators/finance/income-tax'
import { capitalGainsTax } from './calculators/finance/capital-gains-tax'
import { salesTax } from './calculators/finance/sales-tax'
import { vatCalculator } from './calculators/finance/vat-calculator'
import { profitMargin } from './calculators/finance/profit-margin'
import { breakEven } from './calculators/finance/break-even'
import { roiCalculator } from './calculators/finance/roi-calculator'
import { inflation } from './calculators/finance/inflation'
import { currencyConverter } from './calculators/finance/currency-converter'
import { tipCalculator } from './calculators/finance/tip-calculator'
import { percentage } from './calculators/finance/percentage'
import { ageCalculator } from './calculators/finance/age-calculator'
import { gpaCalculator } from './calculators/finance/gpa-calculator'
import { dateDifference } from './calculators/finance/date-difference'
import { unitConverter } from './calculators/finance/unit-converter'
import { percentageChange } from './calculators/finance/percentage-change'

// Health
import { bmi } from './calculators/health/bmi'
import { bmrCalories } from './calculators/health/bmr-calories'
import { bodyFat } from './calculators/health/body-fat'
import { idealBodyWeight } from './calculators/health/ideal-body-weight'
import { calorieDeficit } from './calculators/health/calorie-deficit'
import { waterIntake } from './calculators/health/water-intake'
import { heartRateZones } from './calculators/health/heart-rate-zones'
import { dueDate } from './calculators/health/due-date'
import { ovulation } from './calculators/health/ovulation'
import { sleepCalculator } from './calculators/health/sleep-calculator'
import { macronutrient } from './calculators/health/macronutrient'

const registry: Record<string, CalculatorConfig> = {
  'hourly-to-salary': hourlyToSalary,
  'salary-to-hourly': salaryToHourly,
  'take-home-pay': takeHomePay,
  'overtime-pay': overtimePay,
  'raise-calculator': raiseCalculator,
  'salary-comparison': salaryComparison,
  'loan-payment': loanPayment,
  'mortgage-payment': mortgagePayment,
  'auto-loan': autoLoan,
  'personal-loan': personalLoan,
  'student-loan': studentLoan,
  'debt-payoff': debtPayoff,
  '401k-calculator': calculator401k,
  'debt-to-income': debtToIncome,
  'compound-interest': compoundInterest,
  'simple-interest': simpleInterest,
  'savings-goal': savingsGoal,
  'investment-return': investmentReturn,
  'retirement-savings': retirementSavings,
  'emergency-fund': emergencyFund,
  'income-tax': incomeTax,
  'capital-gains-tax': capitalGainsTax,
  'sales-tax': salesTax,
  'vat-calculator': vatCalculator,
  'profit-margin': profitMargin,
  'break-even': breakEven,
  'roi-calculator': roiCalculator,
  'inflation': inflation,
  'currency-converter': currencyConverter,
  'tip-calculator': tipCalculator,
  'percentage': percentage,
  'age-calculator': ageCalculator,
  'gpa-calculator': gpaCalculator,
  'date-difference': dateDifference,
  'unit-converter': unitConverter,
  'percentage-change': percentageChange,
  'bmi': bmi,
  'bmr-calories': bmrCalories,
  'body-fat': bodyFat,
  'ideal-body-weight': idealBodyWeight,
  'calorie-deficit': calorieDeficit,
  'water-intake': waterIntake,
  'heart-rate-zones': heartRateZones,
  'due-date': dueDate,
  'ovulation': ovulation,
  'sleep-calculator': sleepCalculator,
  'macronutrient': macronutrient,
}

export function getCalculator(slug: string): CalculatorConfig | undefined {
  return registry[slug]
}

export function getCalculatorsByCategory(category: 'finance' | 'health'): CalculatorConfig[] {
  return Object.values(registry).filter(c => c.category === category)
}

export function getAllSlugs(): { slug: string; category: string }[] {
  return Object.values(registry).map(c => ({ slug: c.slug, category: c.category }))
}
