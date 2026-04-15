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
