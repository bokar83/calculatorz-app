import { CalculatorConfig } from '../types'

export const salesTax: CalculatorConfig = {
  slug: 'sales-tax',
  title: 'Sales Tax Calculator',
  category: 'finance',
  description: 'Calculate sales tax amount and total price including or excluding tax.',
  updatedDate: 'April 2026',
  tabs: [
    { id: 'add_tax', label: 'Add Tax to Price' },
    { id: 'remove_tax', label: 'Remove Tax from Price' },
  ],
  inputs: [
    { id: 'amount', label: 'Amount', type: 'number', defaultValue: 100, min: 0, step: 0.01, prefix: '$' },
    { id: 'taxRate', label: 'Sales Tax Rate', type: 'number', defaultValue: 8.25, min: 0, max: 25, step: 0.01, suffix: '%' },
  ],
  calculate: (inputs, currency, _u, activeTab) => {
    const amount = Number(inputs.amount)
    const rate = Number(inputs.taxRate) / 100
    const tab = activeTab || 'add_tax'
    const fmt = (v: number) => currency.symbol + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    if (tab === 'remove_tax') {
      const preTax = amount / (1 + rate)
      const taxAmount = amount - preTax
      return {
        values: [
          { label: 'Pre-Tax Price', value: fmt(preTax), primary: true },
          { label: 'Tax Amount', value: fmt(taxAmount) },
          { label: 'Original (with tax)', value: fmt(amount) },
          { label: 'Tax Rate', value: (rate * 100).toFixed(2) + '%' },
        ],
        summary: `${fmt(amount)} (tax included) = ${fmt(preTax)} pre-tax + ${fmt(taxAmount)} tax at ${Number(inputs.taxRate)}%.`,
      }
    }

    const taxAmount = amount * rate
    const total = amount + taxAmount
    return {
      values: [
        { label: 'Total Price', value: fmt(total), primary: true },
        { label: 'Tax Amount', value: fmt(taxAmount) },
        { label: 'Pre-Tax Price', value: fmt(amount) },
        { label: 'Tax Rate', value: (rate * 100).toFixed(2) + '%' },
      ],
      summary: `${fmt(amount)} + ${(rate * 100).toFixed(2)}% tax = ${fmt(taxAmount)} tax. Total: ${fmt(total)}.`,
    }
  },
  resultLabels: ['Total Price', 'Tax Amount', 'Pre-Tax Price', 'Tax Rate'],
  formula: 'Total = Price x (1 + Tax Rate / 100)',
  content: {
    howTo: ['Enter the price.', 'Enter the sales tax rate.', 'Use "Add Tax" for pre-tax prices; "Remove Tax" to find the pre-tax price from a tax-included total.', 'Click Calculate.'],
    faqs: [
      { q: 'What is sales tax?', a: 'A percentage added to the purchase price of goods and services by state/local governments.' },
      { q: 'Which states have no sales tax?', a: 'Oregon, Montana, New Hampshire, Delaware, and Alaska have no state sales tax.' },
      { q: 'What is the average US sales tax rate?', a: 'The average combined state and local rate is around 7-8%.' },
      { q: 'Are all items taxable?', a: 'Some items like groceries and prescription drugs may be exempt in certain states.' },
    ],
    related: ['vat-calculator', 'income-tax', 'tip-calculator', 'percentage', 'profit-margin', 'capital-gains-tax'],
  },
  geo: {
    definition: 'A sales tax calculator computes the tax amount and total price by applying a jurisdiction-specific percentage to the pre-tax purchase price, or derives the pre-tax price from a tax-inclusive total.',
    ruleOfThumb: 'The average combined state and local sales tax rate in the US is approximately 7.12% as of 2024. Five states have no state sales tax: Oregon, Montana, New Hampshire, Delaware, and Alaska.',
    example: 'Buying a $650 laptop in Tennessee (combined rate 9.75%): tax = $650 x 0.0975 = $63.38. Total cost = $713.38. The same purchase in Oregon costs exactly $650 with no sales tax.',
    keyFacts: [
      'Louisiana has the highest average combined state and local sales tax rate in the US at 9.56%, while Alaska has no state sales tax but allows localities to impose rates up to 7% (Tax Foundation, State and Local Sales Tax Rates, 2024).',
      'The average combined state and local sales tax rate across all US states is 7.12% as of January 2024, though rates vary widely from 0% in tax-free states to over 11% in some Tennessee localities (Tax Foundation, 2024).',
      'Forty-five states and Washington D.C. levy a state sales tax; the five with no state sales tax are Oregon, Montana, New Hampshire, Delaware, and Alaska, though Alaska allows local governments to impose their own (Tax Foundation, 2024).',
      'Most states exempt prescription drugs from sales tax, and 32 states fully or partially exempt groceries, though definitions of "grocery" vary significantly by state and can include or exclude items like candy, soda, and prepared food (Tax Foundation, Sales Tax Exemptions, 2023).',
    ],
  },
  educational: {
    explainer: 'Sales tax is a consumption tax collected at the point of sale by retailers, who then remit the collected funds to state and local governments. Unlike a value-added tax (VAT), which is collected at every stage of production, US sales tax is collected only once, at the final retail transaction. The rate you pay is almost always a combination of a state rate and one or more local rates from your county or city, which is why the total rate varies not just by state but sometimes by zip code. Not all purchases are taxable. Most states exempt prescription medications, and many exempt groceries, though definitions vary. Online purchases were long exempt if the retailer lacked a physical presence in your state, but a 2018 Supreme Court ruling in South Dakota v. Wayfair changed that, allowing states to require tax collection from out-of-state online sellers. Understanding your local combined rate helps you budget accurately, especially for large purchases like electronics, furniture, or vehicles where sales tax can add hundreds of dollars to the final cost.',
    tips: [
      'Look up your exact combined state and local sales tax rate using your zip code at a tool like the Tax Foundation\'s state tax calculator, since city and county rates can vary even within the same metropolitan area.',
      'Check your state\'s exemption list before making large purchases, particularly for medical equipment, farm supplies, or manufacturing materials, which are commonly exempt in many states.',
      'For major online purchases, compare total costs including shipping and applicable sales tax across retailers, since a seller with nexus in your state will charge tax while one without may not.',
      'If you own a business, track the difference between tax-exempt purchases you make for resale and taxable purchases for internal use, since misclassifying these creates audit risk and unexpected tax liability.',
    ],
    commonMistakes: [
      'Forgetting to add local city or county rates on top of the state rate when budgeting, since the combined rate can be 2-4 percentage points higher than the state rate alone in many urban areas.',
      'Assuming groceries are always sales-tax-exempt, when many states apply full or reduced sales tax to candy, soft drinks, prepared foods, and certain snack items even while exempting standard grocery staples.',
      'Not accounting for sales tax when setting a budget for large purchases, which means the actual out-of-pocket cost exceeds the budgeted amount by 7-10% and forces a last-minute adjustment.',
    ],
    example: 'Sarah sets a $500 budget for back-to-school shopping in Texas, where the combined state and local sales tax rate is 8.25%. If she spends her full $500, the tax alone is $500 x 0.0825 = $41.25, bringing her total to $541.25. To stay within her $500 all-in budget, she needs to calculate the pre-tax limit: $500 divided by 1.0825 = $461.95 in merchandise. Knowing this in advance, she can plan her shopping list around the $461.95 pre-tax ceiling rather than discovering a $41 shortfall at the register.',
  },
  jsonLd: {
    faqs: [
      { q: 'What is sales tax?', a: 'A percentage added to purchases by state/local governments.' },
      { q: 'Which states have no sales tax?', a: 'Oregon, Montana, New Hampshire, Delaware, and Alaska.' },
      { q: 'What is the average US rate?', a: 'Around 7-8% combined state and local.' },
      { q: 'Are all items taxable?', a: 'Groceries and prescriptions may be exempt in some states.' },
    ],
    howToSteps: ['Enter price.', 'Enter tax rate.', 'Select add or remove tab.', 'Click Calculate.'],
  },
}
