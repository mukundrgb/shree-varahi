// Display formatting shared by the stock pages.

export const NO_VALUE = "—"

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

export function formatDate(value: string | null | undefined): string {
  if (!value) return NO_VALUE
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return NO_VALUE
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

/** CMOTS sends a midnight time for end-of-day quotes, so those show the date only. */
export function formatQuoteTime(value: string | null | undefined): string {
  if (!value) return NO_VALUE
  if (value.endsWith("T00:00:00")) return formatDate(value)
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return NO_VALUE
  return date.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
}
