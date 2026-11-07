// QuarterlyResults and Yearly-Results response shapes.

/** One line item. Period columns are dynamic keys such as Y202606. */
export interface CmotsResultRow {
  COLUMNNAME: string
  RID: number
  rowno: number
  [period: `Y${string}`]: number | null
}
