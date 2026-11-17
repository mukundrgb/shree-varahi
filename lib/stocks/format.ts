// Display formatting shared by the market data pages. Times are shown in IST.

export const NO_VALUE = "—"

const IST = "Asia/Kolkata"

export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) return NO_VALUE
  return value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatRupees(value: number | null | undefined): string {
  return value === null || value === undefined ? NO_VALUE : `₹${formatPrice(value)}`
}

export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return NO_VALUE
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

export function formatVolume(value: number | null | undefined): string {
  if (value === null || value === undefined) return NO_VALUE
  if (value >= 1e7) return `${(value / 1e7).toFixed(2)} Cr`
  if (value >= 1e5) return `${(value / 1e5).toFixed(2)} L`
  return value.toLocaleString("en-IN")
}

/** Accepts "2026-11-13", "2026-11-13T00:00:00" or "2026-11-13T09:15:00+05:30". */
function toDate(value: string): Date {
  // A bare date or a time without an offset is IST.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(`${value}T00:00:00+05:30`)
  if (/T\d{2}:\d{2}(:\d{2})?$/.test(value)) return new Date(`${value}+05:30`)
  return new Date(value)
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return NO_VALUE
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return NO_VALUE
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: IST })
}

/** End-of-day quotes carry a midnight time, so those show the date only. */
export function formatQuoteTime(value: string | null | undefined): string {
  if (!value) return NO_VALUE
  if (/T00:00:00(\+05:30)?$/.test(value)) return formatDate(value)
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return NO_VALUE
  return date.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: IST })
}
