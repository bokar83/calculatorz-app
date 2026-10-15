// Today-relative defaults for date inputs (LMP year/month/day etc.), so a default never goes stale.
export type TodayPart = 'year' | 'month' | 'day'

/** The year, month (1-12) or day-of-month of (now + offsetDays), in the visitor's local calendar. */
export function todayPart(part: TodayPart, offsetDays: number, now: Date = new Date()): number {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offsetDays)
  if (part === 'year') return d.getFullYear()
  if (part === 'month') return d.getMonth() + 1
  return d.getDate()
}
