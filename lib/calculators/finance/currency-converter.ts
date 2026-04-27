import { CalculatorConfig } from "../types"

const RATES: Record<string, number> = {
  USD: 1, EUR: 0.924, GBP: 0.790, JPY: 153.2, CAD: 1.362, AUD: 1.538,
  CHF: 0.902, CNY: 7.238, INR: 83.5, MXN: 17.15, BRL: 4.97, KRW: 1336,
  SGD: 1.343, HKD: 7.826, NOK: 10.55, SEK: 10.48, DKK: 6.89, NZD: 1.655,
  ZAR: 18.62, AED: 3.672,
}
const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen",
  CAD: "Canadian Dollar", AUD: "Australian Dollar", CHF: "Swiss Franc",
  CNY: "Chinese Yuan", INR: "Indian Rupee", MXN: "Mexican Peso",
  BRL: "Brazilian Real", KRW: "South Korean Won", SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar", NOK: "Norwegian Krone", SEK: "Swedish Krona",
  DKK: "Danish Krone", NZD: "New Zealand Dollar", ZAR: "South African Rand",
  AED: "UAE Dirham",
}
const currencyOptions = Object.keys(RATES).map(k => ({ value: k, label: k + " - " + CURRENCY_NAMES[k] }))

export const currencyConverter: CalculatorConfig = {
  slug: "currency-converter",
  title: "Currency Converter",
  category: "finance",
  description: "Convert amounts between major world currencies using indicative rates.",
  updatedDate: "April 2026",
  inputs: [
    { id: "amount", label: "Amount", type: "number", defaultValue: 100, min: 0, step: 1 },
    { id: "fromCurrency", label: "From Currency", type: "select", options: currencyOptions },
    { id: "toCurrency", label: "To Currency", type: "select", options: currencyOptions },
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount)
    const from = (inputs.fromCurrency as string) || "USD"
    const to = (inputs.toCurrency as string) || "EUR"
    const fromRate = RATES[from] ?? 1
    const toRate = RATES[to] ?? 1
    const converted = (amount / fromRate) * toRate
    const rate = toRate / fromRate
    const inverse = fromRate / toRate
    return {
      values: [
        { label: amount.toLocaleString() + " " + from + " =", value: converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }) + " " + to, primary: true },
        { label: "1 " + from + " =", value: rate.toFixed(4) + " " + to },
        { label: "1 " + to + " =", value: inverse.toFixed(4) + " " + from },
        { label: "Note", value: "Indicative rates, Apr 2026" },
      ],
      summary: amount.toLocaleString() + " " + from + " = " + converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + to,
    }
  },
  resultLabels: ["Converted Amount", "Exchange Rate", "Inverse Rate", "Note"],
  formula: "Converted = Amount / From Rate x To Rate (USD base)",
  content: {
    howTo: ["Enter the amount.", "Select source currency.", "Select target currency.", "Click Calculate."],
    faqs: [
      { q: "How often are rates updated?", a: "Live rates change continuously; this uses indicative rates." },
      { q: "What is the mid-market rate?", a: "The midpoint between buy and sell rates." },
      { q: "Why do banks charge different rates?", a: "Banks add a spread over the mid-market rate." },
      { q: "What affects exchange rates?", a: "Interest rates, inflation, and economic events." },
    ],
    related: ["inflation", "vat-calculator", "sales-tax", "percentage", "tip-calculator", "investment-return"],
  },
  geo: {
    definition: 'A currency converter calculates the equivalent value of one currency in another by applying the current exchange rate, expressed as units of the quote currency per unit of the base currency.',
    ruleOfThumb: 'Exchange rates change continuously. Always use a live rate for financial transactions. Airport and hotel exchange counters typically charge 5-15% above interbank rates; online transfer services like Wise charge 0.3-1.5%.',
    example: 'A traveler converts $1,000 USD to EUR at a mid-market rate of 0.92. Result: 920 EUR. At an airport kiosk offering a rate of 0.85, she receives only 850 EUR, a 70 EUR (7.6%) loss compared to the mid-market rate.',
    keyFacts: [
      'The global foreign exchange (forex) market trades approximately $7.5 trillion per day, making it the largest financial market in the world (Bank for International Settlements Triennial Survey, 2022).',
      'The US dollar is involved in approximately 88% of all forex transactions, reflecting its role as the world\'s primary reserve currency (BIS Triennial Survey, 2022).',
      'Exchange rate fluctuations are driven by interest rate differentials, inflation expectations, trade balances, and geopolitical events, according to the World Bank\'s International Finance guidance.',
      'Purchasing power parity (PPP) exchange rates, tracked by the World Bank, reflect what a currency can actually buy domestically rather than its market exchange rate, explaining why the same goods cost different amounts across countries.',
    ],
  },
  educational: {
    explainer: 'A currency exchange rate is the price of one currency expressed in another. When you see EUR/USD = 1.08, it means 1 Euro costs 1.08 US dollars. The currency listed first is the base currency; the one listed second is the quote currency. Exchange rates fluctuate continuously based on supply and demand in the forex market, driven by factors including central bank interest rate decisions, inflation data, trade balances, and geopolitical risk. The rate you see quoted is the mid-market rate, the midpoint between what buyers offer and sellers ask. Every commercial exchange adds a spread on top of that rate: banks typically add 2-3%, airport kiosks add 8-15%, and credit cards add 1-3% through a foreign transaction fee. For international money transfers, services like Wise or Revolut operate closer to the mid-market rate, typically adding only 0.3-1.5%. Exchange rate risk is real for anyone holding foreign-currency assets or receivables. A US company expecting a payment of 100,000 EUR in 90 days faces uncertainty: if the EUR weakens by 5% against the dollar in that window, the payment is worth $5,000 less than projected.',
    tips: [
      'Always compare the effective rate you are receiving, not just the advertised rate. The best way to benchmark is to check the mid-market rate on Google or XE.com, then calculate what percentage above that mid-market rate your exchange provider is charging.',
      'For international travel, use a no-foreign-transaction-fee credit card or a prepaid travel card loaded at a favorable rate. Avoid exchanging cash at airport kiosks, which consistently offer the worst rates.',
      'When sending money internationally, compare total cost including transfer fees, not just the exchange rate. A service offering a great rate with a $30 flat fee may be worse than one with a slightly lower rate and no fixed fee for small transfers.',
      'For business invoicing across currencies, consider including a currency risk clause or invoicing in your home currency to transfer exchange rate risk to the counterparty.',
    ],
    commonMistakes: [
      'Assuming the rate displayed on a currency converter is what you will actually receive. Mid-market rates are a reference point; every exchange provider adds a margin, and the gap between the mid-market rate and your actual rate is the hidden cost of conversion.',
      'Ignoring foreign transaction fees on credit cards. Many standard cards add 1-3% on every international charge, which accumulates quickly on a trip or for regular international purchasing.',
      'Waiting until arrival at a foreign destination to exchange currency. Airport kiosks and hotel desks offer consistently worse rates than banks, credit unions, or online transfer services used before departure.',
    ],
    example: 'David is sending $5,000 USD to his family in Germany. He checks the mid-market rate: 1 USD = 0.924 EUR, meaning $5,000 should deliver 4,620 EUR at the true rate. His bank offers a rate of 0.88 EUR per USD, delivering only 4,400 EUR, a 220 EUR shortfall equivalent to $238 at the mid-market rate. An online transfer service offers 0.916 EUR per dollar with a $5 flat fee, delivering 4,580 EUR minus the fee, netting 4,575 EUR: 175 EUR more than the bank transfer for the same $5,000 sent.',
  },
  jsonLd: {
    faqs: [
      { q: "How often are rates updated?", a: "Live rates change continuously." },
      { q: "What is the mid-market rate?", a: "Midpoint between buy and sell rates." },
      { q: "Why do banks charge different rates?", a: "They add a spread over the mid-market rate." },
      { q: "What affects exchange rates?", a: "Interest rates, inflation, and economic events." },
    ],
    howToSteps: ["Enter amount.", "Select currencies.", "Click Calculate."],
  },
}
