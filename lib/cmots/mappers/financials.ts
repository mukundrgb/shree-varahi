// Maps COLUMNNAME rows and dated columns to the Financials tab.

import type { CmotsResultRow } from "../types/financials"
import type { FinancialsPeriod, FinancialsTable } from "@/lib/stocks/types"

const MAX_PERIODS = 6
const PERIOD_KEY = /^Y(\d{4})(\d{2})$/
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const ROW_NAMES = {
  revenue: [/^Net Sales\/Income from operations/i],
  expenses: [/^Total Expenses/i],
  operatingProfit: [/^Profit from operations before other income/i],
  // Consolidated results list profit after minority interest on a separate row.
  netProfit: [/^Net Profit after taxes, minority interest/i, /^Net Profit after tax for the Period/i],
  eps: [/EPS after Exceptional\/Extraordinary items-Basic/i],
}

function periodLabel(key: string, period: FinancialsPeriod): string {
  const [, year, month] = PERIOD_KEY.exec(key) ?? []
  if (period === "yearly" && month === "03") return `FY${year}`
  return `${MONTHS[Number(month) - 1]} ${year}`
}

export function toFinancialsTable(rows: CmotsResultRow[], period: FinancialsPeriod): FinancialsTable {
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))]
    .filter((key) => PERIOD_KEY.test(key))
    .sort()
    .slice(-MAX_PERIODS)

  const valuesFor = (names: RegExp[]) => {
    for (const name of names) {
      const row = rows.find((item) => name.test(item.COLUMNNAME.trim()))
      if (row) {
        return keys.map((key) => {
          const value = row[key as `Y${string}`]
          return typeof value === "number" ? value : null
        })
      }
    }
    return keys.map(() => null)
  }

  const revenue = valuesFor(ROW_NAMES.revenue)
  const operatingProfit = valuesFor(ROW_NAMES.operatingProfit)
  const margin = keys.map((_, i) => {
    const sales = revenue[i]
    const profit = operatingProfit[i]
    return sales && profit !== null ? (profit / sales) * 100 : null
  })

  return {
    periods: keys.map((key) => periodLabel(key, period)),
    rows: [
      { label: "Net Revenue", format: "crore", values: revenue },
      { label: "Expenses", format: "crore", values: valuesFor(ROW_NAMES.expenses) },
      { label: "Op. Profit", format: "crore", values: operatingProfit },
      { label: "OPM %", format: "percent", values: margin },
      { label: "Net Profit", format: "crore", values: valuesFor(ROW_NAMES.netProfit) },
      { label: "EPS (₹)", format: "rupees", values: valuesFor(ROW_NAMES.eps) },
    ],
    revenue,
  }
}
