// Maps dividend, bonus and split records to the Corp. Actions tab.

import type { CmotsBonus, CmotsDividend, CmotsSplit } from "../types/corporate-actions"
import type { CorporateAction } from "@/lib/stocks/types"

export function toCorporateActions(
  dividends: CmotsDividend[],
  bonuses: CmotsBonus[],
  splits: CmotsSplit[],
): CorporateAction[] {
  const actions: CorporateAction[] = [
    ...dividends.map((item) => ({
      type: "Dividend" as const,
      detail:
        [item.DivAmount === null ? null : `₹${item.DivAmount} per share`, item.remark?.trim() || null]
          .filter(Boolean)
          .join(" · ") || "Dividend",
      date: item.DivDate ?? item.RecordDate ?? item.AnnouncementDate,
    })),
    ...bonuses.map((item) => ({
      type: "Bonus" as const,
      detail: item.remark?.trim() || (item.BonusRatio ? `${item.BonusRatio} Bonus Issue` : "Bonus Issue"),
      date: item.BonusDate ?? item.RecordDate ?? item.AnnouncementDate,
    })),
    ...splits.map((item) => ({
      type: "Split" as const,
      detail: item.remark?.trim() || (item.SplitRatio ? `${item.SplitRatio} Stock Split` : "Stock Split"),
      date: item.SplitDate ?? item.RecordDate ?? item.AnnouncementDate,
    })),
  ]

  return actions.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
}
