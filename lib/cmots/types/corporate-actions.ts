// Dividend, Bonus and Split response shapes.

interface CmotsCorporateAction {
  AnnouncementDate: string | null
  RecordDate: string | null
  remark: string | null
}

export interface CmotsDividend extends CmotsCorporateAction {
  DivDate: string | null
  DivAmount: number | null
  DivPer: number | null
}

export interface CmotsBonus extends CmotsCorporateAction {
  BonusDate: string | null
  BonusRatio: string | null
}

/** CMOTS has not returned a split record yet, so only shared fields are relied on. */
export interface CmotsSplit extends CmotsCorporateAction {
  SplitDate?: string | null
  SplitRatio?: string | null
}
