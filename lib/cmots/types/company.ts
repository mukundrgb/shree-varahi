// CompanyMaster and CompanyProfile response shapes.

export interface CmotsCompany {
  co_code: number
  BSECode: string | null
  NSESymbol: string | null
  CompanyName: string
  CompanyShortName: string | null
  CategoryName: string | null
  isin: string | null
  BSEGroup: string | null
  mcaptype: string | null
  SectorCode: string | null
  SectorName: string | null
  BSEListed: string | null
  NSEListed: string | null
  industrycode: string | null
  industryname: string | null
  DisplayType: string | null
}

export interface CmotsCompanyProfile {
  LNAME: string | null
  HSE_S_NAME: string | null
  INC_DT: string | null
  REGADD1: string | null
  REGADD2: string | null
  REGDIST: string | null
  REGSTATE: string | null
  REGPIN: string | null
  TEL1: string | null
  AUDITOR: string | null
  FV: number | null
  MKT_LOT: number | null
  CHAIRMAN: string | null
  EMAIL: string | null
  INTERNET: string | null
}
