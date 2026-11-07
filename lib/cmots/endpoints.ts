// Every CMOTS URL path, defined once. Paths are relative to CMOTS_API_BASE_URL.

type ResultType = "S" | "C"

export const CMOTS_ENDPOINTS = {
  companyMaster: () => "/CompanyMaster",
  companyProfile: (coCode: number) => `/CompanyProfile/${coCode}`,
  quoteDetails: (coCode: number) => `/GetQuoteDetails/${coCode}`,
  quarterlyResults: (coCode: number, type: ResultType) => `/QuarterlyResults/${coCode}/${type}`,
  yearlyResults: (coCode: number, type: ResultType) => `/Yearly-Results/${coCode}/${type}`,
  dividends: (coCode: number, count: number) => `/DividendCocodewise/${coCode}/${count}`,
  bonuses: (coCode: number, count: number) => `/BonusCocodewise/${coCode}/${count}`,
  splits: (coCode: number, count: number) => `/SplitsCocodewise/${coCode}/${count}`,
  corporateNews: (count: number) => `/CapitalMarketLiveNews/corporate-news/${count}`,
  logo: (coCode: number) => `/CompanyLogo/${coCode}`,
} as const
