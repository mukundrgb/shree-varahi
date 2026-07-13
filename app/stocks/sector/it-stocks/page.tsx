"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "it-stocks",
  crumbCategory: "Sector",
  title: "IT Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "IT stocks represent India\'s information technology services companies that provide software development, consulting, and outsourcing services to clients globally. This sector is a major contributor to India\'s exports and GDP, and stock performance is closely tied to global technology spending and currency movements.",
  stocks: [
    { name: "Persistent Systems", symbol: "PERSISTENT", ltp: 3766.05, chg: 2.45, volume: "67,55,365", mcap: "796,923", pe: 33.01, industryPe: 30.71, high52: 4723.52, low52: 2485.39, ret1m: -4.88, ret3m: -3.0, ret1y: 6.5, ret3y: 250.89, ret5y: 65.88, pb: 7.89, divYield: 2.43, roe: 32.51, roce: 37.47, eps: 114.09, dma50: 3750.61, dma200: 3809.61, rsi: 46.05, mtf: 56.0, pledge: 85.3 },
    { name: "Sonata Software", symbol: "SONATSOFTW", ltp: 3786.74, chg: -2.82, volume: "10,85,314", mcap: "684,143", pe: 34.74, industryPe: 15.69, high52: 5689.23, low52: 3262.21, ret1m: -2.71, ret3m: -6.12, ret1y: -14.27, ret3y: 153.04, ret5y: 209.66, pb: 7.6, divYield: 1.22, roe: 34.25, roce: 29.25, eps: 109.0, dma50: 3664.72, dma200: 3959.57, rsi: 31.52, mtf: 68.0, pledge: 85.42 },
    { name: "Tata Consultancy Services", symbol: "TCS", ltp: 406.11, chg: -1.69, volume: "74,28,527", mcap: "617,633", pe: 43.61, industryPe: 21.22, high52: 615.8, low52: 300.0, ret1m: 1.08, ret3m: 14.81, ret1y: 45.16, ret3y: 29.57, ret5y: -7.55, pb: 5.53, divYield: 1.65, roe: 10.94, roce: 11.16, eps: 9.31, dma50: 421.92, dma200: 423.77, rsi: 65.46, mtf: 69.0, pledge: 90.92 },
    { name: "L&T Technology Services", symbol: "LTTS", ltp: 3025.59, chg: 1.28, volume: "79,70,101", mcap: "600,380", pe: 11.26, industryPe: 10.21, high52: 4397.37, low52: 2276.47, ret1m: 11.04, ret3m: -1.34, ret1y: 51.63, ret3y: 206.49, ret5y: 306.16, pb: 4.24, divYield: 1.43, roe: 30.49, roce: 9.56, eps: 268.7, dma50: 2993.13, dma200: 3360.05, rsi: 55.09, mtf: 65.0, pledge: 85.34 },
    { name: "HCL Technologies", symbol: "HCLTECH", ltp: 1711.73, chg: 2.45, volume: "45,40,584", mcap: "584,573", pe: 41.49, industryPe: 28.45, high52: 2415.77, low52: 1053.28, ret1m: 11.64, ret3m: -3.59, ret1y: 6.05, ret3y: 225.55, ret5y: 147.52, pb: 3.15, divYield: 2.33, roe: 29.79, roce: 11.42, eps: 41.26, dma50: 1666.18, dma200: 1848.67, rsi: 68.83, mtf: 76.0, pledge: 90.18 },
    { name: "Tech Mahindra", symbol: "TECHM", ltp: 3936.51, chg: -0.96, volume: "21,67,279", mcap: "508,809", pe: 33.45, industryPe: 35.6, high52: 5539.17, low52: 2794.32, ret1m: -4.71, ret3m: -13.66, ret1y: 61.36, ret3y: -5.46, ret5y: 454.85, pb: 6.74, divYield: 0.64, roe: 25.13, roce: 35.86, eps: 117.68, dma50: 4142.52, dma200: 3965.19, rsi: 55.25, mtf: 76.0, pledge: 79.27 },
    { name: "Mphasis", symbol: "MPHASIS", ltp: 3891.33, chg: -1.48, volume: "55,96,327", mcap: "370,219", pe: 29.33, industryPe: 34.6, high52: 5588.97, low52: 2670.55, ret1m: -3.93, ret3m: 6.17, ret1y: 9.07, ret3y: 163.02, ret5y: 80.94, pb: 3.54, divYield: 2.22, roe: 32.15, roce: 10.39, eps: 132.67, dma50: 3904.54, dma200: 3949.41, rsi: 49.4, mtf: 70.0, pledge: 87.0 },
    { name: "LTIMindtree", symbol: "LTIM", ltp: 2981.37, chg: -1.4, volume: "18,95,386", mcap: "348,046", pe: 37.1, industryPe: 22.46, high52: 3642.77, low52: 2052.04, ret1m: 10.45, ret3m: 15.68, ret1y: 56.32, ret3y: 52.5, ret5y: 522.03, pb: 4.49, divYield: 3.16, roe: 40.97, roce: 35.36, eps: 80.36, dma50: 3065.66, dma200: 2848.47, rsi: 39.24, mtf: 63.0, pledge: 87.4 },
    { name: "KPIT Technologies", symbol: "KPITTECH", ltp: 3416.69, chg: -1.52, volume: "5,69,386", mcap: "217,595", pe: 36.76, industryPe: 11.84, high52: 4393.64, low52: 2029.06, ret1m: -4.61, ret3m: 7.62, ret1y: 47.89, ret3y: 211.73, ret5y: 156.51, pb: 2.32, divYield: 3.0, roe: 18.44, roce: 16.83, eps: 92.95, dma50: 3275.14, dma200: 3540.99, rsi: 48.28, mtf: 63.0, pledge: 82.84 },
    { name: "Wipro", symbol: "WIPRO", ltp: 3427.95, chg: 2.61, volume: "31,13,362", mcap: "181,004", pe: 24.52, industryPe: 33.78, high52: 4621.68, low52: 2915.13, ret1m: -3.4, ret3m: 7.06, ret1y: 49.39, ret3y: 132.72, ret5y: 36.65, pb: 8.44, divYield: 3.22, roe: 40.41, roce: 39.14, eps: 139.8, dma50: 3438.2, dma200: 3104.68, rsi: 39.63, mtf: 63.0, pledge: 75.76 },
    { name: "Coforge", symbol: "COFORGE", ltp: 1703.98, chg: 2.14, volume: "52,26,675", mcap: "105,809", pe: 15.19, industryPe: 30.13, high52: 2106.71, low52: 974.51, ret1m: 9.27, ret3m: 13.35, ret1y: 14.3, ret3y: 226.59, ret5y: 149.95, pb: 3.32, divYield: 1.01, roe: 31.78, roce: 21.06, eps: 112.18, dma50: 1623.12, dma200: 1880.44, rsi: 30.15, mtf: 74.0, pledge: 75.83 },
    { name: "Infosys", symbol: "INFY", ltp: 485.26, chg: -0.12, volume: "93,20,839", mcap: "43,820", pe: 36.31, industryPe: 14.05, high52: 585.97, low52: 386.41, ret1m: 0.75, ret3m: 16.75, ret1y: 71.8, ret3y: 138.01, ret5y: 84.11, pb: 0.71, divYield: 0.69, roe: 36.29, roce: 30.84, eps: 13.36, dma50: 471.51, dma200: 442.1, rsi: 61.66, mtf: 64.0, pledge: 80.89 },
  ],
}

export default function ItStocksPage() {
  return <StockListPage data={DATA} />
}
