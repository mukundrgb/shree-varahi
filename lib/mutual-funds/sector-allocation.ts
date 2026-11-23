// Sector allocation for the fund detail page.
// UI preview: every fund shows this sample `sectorDetails` list for now. The shape matches the API response,
// so when the API is integrated, pass the fund's own `sectorDetails` to <FundSectorAllocation /> and delete SAMPLE.

export interface SectorDetail {
  SectorId: number
  SectorName: string
  /** Share of the fund's total portfolio, in percent */
  Percentage: number
}

export const SAMPLE_SECTOR_DETAILS: SectorDetail[] = [
  { SectorId: 1,   SectorName: "Aerospace & Defense",                  Percentage: 1.023750020829279 },
  { SectorId: 9,   SectorName: "Auto Ancillaries",                     Percentage: 1.0283082589748318 },
  { SectorId: 11,  SectorName: "Automobile Manufacturers",             Percentage: 4.126582999899059 },
  { SectorId: 14,  SectorName: "Banks",                                Percentage: 19.20845803699173 },
  { SectorId: 15,  SectorName: "Beverages",                            Percentage: 0.293246884070331 },
  { SectorId: 21,  SectorName: "Cement",                               Percentage: 0.9147446874668527 },
  { SectorId: 23,  SectorName: "Coal & Consumable Fuels",              Percentage: 1.64141923938435 },
  { SectorId: 24,  SectorName: "Commercial Services",                  Percentage: 0.4262840455309893 },
  { SectorId: 29,  SectorName: "Construction",                         Percentage: 3.6561238248059005 },
  { SectorId: 36,  SectorName: "Consumer Durables",                    Percentage: 0.5617271601376204 },
  { SectorId: 50,  SectorName: "Electronic Equipment & Instruments",   Percentage: 0.7214521232153 },
  { SectorId: 54,  SectorName: "Fast Moving Consumer Goods",           Percentage: 0.4616672520620274 },
  { SectorId: 55,  SectorName: "Ferrous Metals",                       Percentage: 1.068416811116692 },
  { SectorId: 57,  SectorName: "Fertilizers & Agricultural Chemicals", Percentage: 0.06410449403516161 },
  { SectorId: 58,  SectorName: "Finance",                              Percentage: 5.845920950447475 },
  { SectorId: 61,  SectorName: "Financials",                           Percentage: 0.035472626277940504 },
  { SectorId: 64,  SectorName: "Gas",                                  Percentage: 0.9014349475649595 },
  { SectorId: 74,  SectorName: "Healthcare Services",                  Percentage: 0.00623128456774428 },
  { SectorId: 84,  SectorName: "Industrial Products",                  Percentage: 0.24567873354964279 },
  { SectorId: 90,  SectorName: "Interactive Home Entertainment",       Percentage: 0.0534177991013782 },
  { SectorId: 98,  SectorName: "IT Enabled Services - Software",       Percentage: 5.359006471566368 },
  { SectorId: 99,  SectorName: "Leisure Products",                     Percentage: 0.2420646772299786 },
  { SectorId: 113, SectorName: "Oil",                                  Percentage: 0.35434226066894914 },
  { SectorId: 122, SectorName: "Personal Products",                    Percentage: 0.0314793000946246 },
  { SectorId: 124, SectorName: "Petroleum Products",                   Percentage: 5.252182013861297 },
  { SectorId: 127, SectorName: "Power",                                Percentage: 2.9392762763194407 },
  { SectorId: 137, SectorName: "Retail",                               Percentage: 2.8499662583901695 },
  { SectorId: 148, SectorName: "Telecom - Services",                   Percentage: 3.6493371913580024 },
  { SectorId: 156, SectorName: "Transportation",                       Percentage: 1.2712866541918968 },
  { SectorId: 163, SectorName: "Printing & Publication",               Percentage: 0.00127405886352281 },
  { SectorId: 168, SectorName: "Real Estate",                          Percentage: 1.608034026889386 },
  { SectorId: 171, SectorName: "Pharmaceuticals & Biotechnology",      Percentage: 5.678463397503455 },
  { SectorId: 172, SectorName: "Agricultural Food & Other Products",   Percentage: 0.01832986505321916 },
  { SectorId: 173, SectorName: "Diversified FMCG",                     Percentage: 1.4379258242042332 },
  { SectorId: 174, SectorName: "Industrial Manufacturing",             Percentage: 1.5438528310206092 },
  { SectorId: 175, SectorName: "Paper,Forest & Jute Products",         Percentage: 0.00453536561933296 },
  { SectorId: 176, SectorName: "Transport Infrastructure",             Percentage: 0.9352606533666064 },
  { SectorId: 177, SectorName: "Cigarettes & Tobacco Products",        Percentage: 0.00833171202942914 },
]

/**
 * Sector names as shown on the page: the source uses " - " inside some names ("Telecom - Services"),
 * which the site doesn't use in labels, and has no space after commas ("Paper,Forest & Jute Products").
 */
export const sectorLabel = (name: string) =>
  name.replace(/\s+-\s+/g, " ").replace(/,(?=\S)/g, ", ").replace(/\s{2,}/g, " ").trim()
