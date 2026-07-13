"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "small-cap-stocks",
  crumbCategory: "Market Cap",
  title: "Small Cap Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "Explore small-cap stocks listed on the NSE/BSE, generally ranked below the top 250 by market capitalization. Small-cap companies tend to carry higher volatility and liquidity risk but can offer significant long-term growth potential.",
  stocks: [
    { name: "Poly Medicure", symbol: "POLYMED", ltp: 2376.36, chg: -2.22, volume: "45,41,544", mcap: "23,881", pe: 41.12, industryPe: 39.27, high52: 3122.41, low52: 1967.02, ret1m: 6.32, ret3m: 10.85, ret1y: 57.8, ret3y: 163.48, ret5y: 20.33, pb: 7.13, divYield: 2.73, roe: 24.63, roce: 35.33, eps: 57.79, dma50: 2444.06, dma200: 2201.01, rsi: 41.18, mtf: 69.0, pledge: 89.99 },
    { name: "Elgi Equipments", symbol: "ELGIEQUIP", ltp: 2377.57, chg: 1.58, volume: "46,37,988", mcap: "22,637", pe: 36.87, industryPe: 17.92, high52: 3144.6, low52: 1463.15, ret1m: -6.67, ret3m: 7.16, ret1y: 41.26, ret3y: 186.85, ret5y: 542.97, pb: 9.77, divYield: 0.82, roe: 33.38, roce: 26.69, eps: 64.49, dma50: 2425.14, dma200: 2599.52, rsi: 65.7, mtf: 70.0, pledge: 85.71 },
    { name: "KPIT Technologies", symbol: "KPITTECH", ltp: 155.93, chg: 3.03, volume: "77,61,797", mcap: "21,837", pe: 41.11, industryPe: 33.8, high52: 203.16, low52: 128.1, ret1m: -5.64, ret3m: -6.24, ret1y: 36.46, ret3y: 170.72, ret5y: 59.47, pb: 5.72, divYield: 1.73, roe: 4.99, roce: 39.44, eps: 3.79, dma50: 156.72, dma200: 142.81, rsi: 51.25, mtf: 73.0, pledge: 83.02 },
    { name: "Aavas Financiers", symbol: "AAVAS", ltp: 289.29, chg: -2.3, volume: "52,96,765", mcap: "21,287", pe: 38.29, industryPe: 16.97, high52: 340.94, low52: 191.62, ret1m: -7.36, ret3m: -5.55, ret1y: 36.67, ret3y: 51.23, ret5y: 98.22, pb: 2.66, divYield: 1.93, roe: 35.73, roce: 36.02, eps: 7.56, dma50: 291.91, dma200: 249.77, rsi: 41.22, mtf: 61.0, pledge: 75.69 },
    { name: "Data Patterns", symbol: "DATAPATTNS", ltp: 1114.47, chg: -0.31, volume: "58,39,555", mcap: "20,289", pe: 42.36, industryPe: 13.58, high52: 1642.7, low52: 719.34, ret1m: 9.49, ret3m: 15.98, ret1y: 78.47, ret3y: 60.66, ret5y: 3.26, pb: 9.13, divYield: 1.59, roe: 17.23, roce: 13.67, eps: 26.31, dma50: 1149.57, dma200: 1051.73, rsi: 67.0, mtf: 73.0, pledge: 75.47 },
    { name: "Century Textiles", symbol: "CENTURYTEX", ltp: 2264.31, chg: -2.55, volume: "7,45,700", mcap: "18,182", pe: 26.36, industryPe: 36.42, high52: 2470.37, low52: 1382.28, ret1m: 7.06, ret3m: -8.89, ret1y: 51.32, ret3y: 140.01, ret5y: 359.82, pb: 5.64, divYield: 2.81, roe: 19.2, roce: 22.62, eps: 85.9, dma50: 2342.8, dma200: 1962.66, rsi: 29.65, mtf: 76.0, pledge: 77.7 },
    { name: "Sundram Fasteners", symbol: "SUNDRMFAST", ltp: 1808.78, chg: -0.75, volume: "6,27,222", mcap: "16,719", pe: 11.89, industryPe: 24.35, high52: 2591.95, low52: 1455.33, ret1m: 2.67, ret3m: 2.77, ret1y: 68.54, ret3y: 70.93, ret5y: 413.91, pb: 7.41, divYield: 2.99, roe: 12.7, roce: 16.08, eps: 152.13, dma50: 1806.89, dma200: 2072.33, rsi: 29.51, mtf: 61.0, pledge: 77.22 },
    { name: "Redington", symbol: "REDINGTON", ltp: 1740.59, chg: 0.69, volume: "3,61,253", mcap: "13,898", pe: 37.13, industryPe: 31.43, high52: 2086.42, low52: 1200.24, ret1m: -5.37, ret3m: 0.47, ret1y: 63.05, ret3y: 13.86, ret5y: 232.22, pb: 9.34, divYield: 0.52, roe: 9.71, roce: 28.92, eps: 46.88, dma50: 1844.9, dma200: 1598.35, rsi: 67.38, mtf: 73.0, pledge: 77.26 },
    { name: "Sonata Software", symbol: "SONATSOFTW", ltp: 1011.48, chg: 0.06, volume: "65,77,544", mcap: "11,606", pe: 36.46, industryPe: 24.4, high52: 1247.89, low52: 721.59, ret1m: -6.85, ret3m: 17.22, ret1y: 61.98, ret3y: 170.08, ret5y: 262.45, pb: 4.83, divYield: 1.09, roe: 30.96, roce: 31.26, eps: 27.74, dma50: 1042.91, dma200: 935.06, rsi: 34.5, mtf: 64.0, pledge: 89.93 },
    { name: "Metropolis Healthcare", symbol: "METROPOLIS", ltp: 2141.0, chg: 3.18, volume: "34,47,770", mcap: "11,320", pe: 21.89, industryPe: 28.04, high52: 2348.73, low52: 1641.0, ret1m: -1.2, ret3m: -9.51, ret1y: 39.18, ret3y: 180.47, ret5y: 207.4, pb: 4.92, divYield: 0.53, roe: 23.09, roce: 30.1, eps: 97.81, dma50: 2129.26, dma200: 1872.09, rsi: 40.01, mtf: 68.0, pledge: 87.28 },
    { name: "Route Mobile", symbol: "ROUTE", ltp: 789.72, chg: -0.81, volume: "54,48,582", mcap: "11,245", pe: 9.79, industryPe: 10.16, high52: 1186.39, low52: 623.46, ret1m: 8.38, ret3m: 5.25, ret1y: -13.32, ret3y: 190.77, ret5y: 323.64, pb: 7.46, divYield: 1.07, roe: 26.6, roce: 19.32, eps: 80.67, dma50: 809.49, dma200: 696.58, rsi: 58.25, mtf: 57.0, pledge: 87.32 },
    { name: "Aptus Value Housing", symbol: "APTUS", ltp: 1548.23, chg: 0.03, volume: "50,56,207", mcap: "11,157", pe: 18.07, industryPe: 33.74, high52: 2398.37, low52: 896.84, ret1m: 11.71, ret3m: -5.84, ret1y: -4.7, ret3y: 124.07, ret5y: 31.97, pb: 3.73, divYield: 0.24, roe: 4.59, roce: 9.27, eps: 85.68, dma50: 1639.98, dma200: 1403.08, rsi: 70.03, mtf: 62.0, pledge: 79.38 },
    { name: "Blue Star", symbol: "BLUESTARCO", ltp: 1630.61, chg: -2.18, volume: "82,41,978", mcap: "9,934", pe: 43.68, industryPe: 10.14, high52: 1850.92, low52: 1211.27, ret1m: -7.93, ret3m: 12.19, ret1y: 55.8, ret3y: 13.47, ret5y: 253.87, pb: 2.74, divYield: 1.3, roe: 10.22, roce: 25.44, eps: 37.33, dma50: 1671.29, dma200: 1582.29, rsi: 63.66, mtf: 78.0, pledge: 90.92 },
    { name: "JK Cement", symbol: "JKCEMENT", ltp: 2169.58, chg: 0.3, volume: "92,21,993", mcap: "6,632", pe: 9.37, industryPe: 27.1, high52: 2803.68, low52: 1828.45, ret1m: -3.9, ret3m: 9.79, ret1y: -18.75, ret3y: 126.65, ret5y: 333.96, pb: 7.42, divYield: 3.44, roe: 32.51, roce: 23.58, eps: 231.55, dma50: 2169.81, dma200: 2253.48, rsi: 65.5, mtf: 55.0, pledge: 81.52 },
    { name: "Suprajit Engineering", symbol: "SUPRAJIT", ltp: 1976.03, chg: -3.08, volume: "13,92,430", mcap: "3,894", pe: 33.94, industryPe: 25.22, high52: 2563.36, low52: 1258.04, ret1m: -1.28, ret3m: -5.4, ret1y: 56.22, ret3y: 115.63, ret5y: 66.12, pb: 6.79, divYield: 1.72, roe: 8.67, roce: 22.57, eps: 58.22, dma50: 1870.53, dma200: 1765.43, rsi: 38.88, mtf: 71.0, pledge: 77.6 },
  ],
}

export default function SmallCapStocksPage() {
  return <StockListPage data={DATA} />
}
