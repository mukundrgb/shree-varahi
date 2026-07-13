"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "micro-cap-stocks",
  crumbCategory: "Market Cap",
  title: "Micro Cap Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "Micro-cap stocks are companies with the smallest market capitalization listed on the NSE/BSE. These stocks often carry the highest risk and volatility but can also present outsized growth opportunities for investors with a higher risk appetite.",
  stocks: [
    { name: "Rajratan Global Wire", symbol: "RAJRATAN", ltp: 547.65, chg: -1.71, volume: "93,36,151", mcap: "2,250", pe: 39.3, industryPe: 30.86, high52: 768.15, low52: 350.51, ret1m: -2.29, ret3m: 10.94, ret1y: 2.92, ret3y: 135.63, ret5y: 272.86, pb: 1.76, divYield: 3.45, roe: 38.59, roce: 5.8, eps: 13.94, dma50: 561.06, dma200: 620.98, rsi: 32.43, mtf: 76.0, pledge: 81.88 },
    { name: "Rane Holdings", symbol: "RANEHOLDIN", ltp: 43.67, chg: -0.99, volume: "72,54,846", mcap: "2,136", pe: 38.59, industryPe: 26.41, high52: 61.72, low52: 31.23, ret1m: -3.28, ret3m: 6.53, ret1y: -15.42, ret3y: 206.44, ret5y: 97.17, pb: 7.73, divYield: 1.03, roe: 8.39, roce: 20.66, eps: 1.13, dma50: 42.79, dma200: 49.1, rsi: 31.25, mtf: 76.0, pledge: 87.09 },
    { name: "Bhansali Engineering", symbol: "BEPL", ltp: 868.05, chg: -2.42, volume: "12,42,247", mcap: "2,073", pe: 43.22, industryPe: 37.56, high52: 954.21, low52: 722.17, ret1m: 10.82, ret3m: -6.09, ret1y: -19.34, ret3y: 177.33, ret5y: 546.47, pb: 9.8, divYield: 3.35, roe: 37.37, roce: 18.89, eps: 20.08, dma50: 878.13, dma200: 947.5, rsi: 61.24, mtf: 57.0, pledge: 83.46 },
    { name: "Uniparts India", symbol: "UNIPARTS", ltp: 354.04, chg: 2.98, volume: "75,26,281", mcap: "1,432", pe: 32.14, industryPe: 25.62, high52: 423.61, low52: 203.5, ret1m: 10.38, ret3m: -4.1, ret1y: -10.08, ret3y: 16.13, ret5y: 220.07, pb: 2.59, divYield: 0.87, roe: 35.09, roce: 26.07, eps: 11.02, dma50: 368.02, dma200: 382.51, rsi: 29.8, mtf: 57.0, pledge: 75.37 },
    { name: "Sarda Energy", symbol: "SARDAEN", ltp: 417.55, chg: 2.79, volume: "13,87,764", mcap: "1,421", pe: 43.56, industryPe: 18.14, high52: 504.92, low52: 342.27, ret1m: -1.58, ret3m: 13.9, ret1y: -27.96, ret3y: 82.17, ret5y: 153.79, pb: 5.26, divYield: 1.68, roe: 16.56, roce: 12.08, eps: 9.59, dma50: 421.95, dma200: 417.64, rsi: 31.67, mtf: 64.0, pledge: 77.0 },
    { name: "Genus Power Infra", symbol: "GENUSPOWER", ltp: 627.5, chg: -1.92, volume: "88,12,902", mcap: "1,408", pe: 17.71, industryPe: 15.16, high52: 953.03, low52: 508.82, ret1m: 8.3, ret3m: -9.24, ret1y: -0.85, ret3y: 93.21, ret5y: 232.17, pb: 7.29, divYield: 0.74, roe: 7.58, roce: 36.71, eps: 35.43, dma50: 643.7, dma200: 659.99, rsi: 45.63, mtf: 63.0, pledge: 84.32 },
    { name: "Rossari Biotech", symbol: "ROSSARI", ltp: 116.83, chg: -1.37, volume: "64,90,326", mcap: "1,171", pe: 22.24, industryPe: 17.01, high52: 161.33, low52: 99.96, ret1m: 3.31, ret3m: 8.25, ret1y: -28.52, ret3y: 66.63, ret5y: 93.66, pb: 5.73, divYield: 1.26, roe: 17.47, roce: 5.49, eps: 5.25, dma50: 123.47, dma200: 111.32, rsi: 48.64, mtf: 62.0, pledge: 81.28 },
    { name: "Ganesha Ecosphere", symbol: "GANECOS", ltp: 776.85, chg: -0.95, volume: "31,72,505", mcap: "1,061", pe: 39.02, industryPe: 14.58, high52: 1180.2, low52: 520.1, ret1m: -6.15, ret3m: 8.33, ret1y: 89.09, ret3y: 37.6, ret5y: 116.81, pb: 7.38, divYield: 3.27, roe: 9.57, roce: 6.41, eps: 19.91, dma50: 760.3, dma200: 809.23, rsi: 66.11, mtf: 63.0, pledge: 77.09 },
    { name: "Vaibhav Global", symbol: "VAIBHAVGBL", ltp: 526.33, chg: 0.07, volume: "92,81,281", mcap: "1,007", pe: 16.55, industryPe: 18.19, high52: 590.75, low52: 429.39, ret1m: 0.67, ret3m: 9.76, ret1y: 71.75, ret3y: 92.03, ret5y: 281.21, pb: 9.33, divYield: 3.01, roe: 26.2, roce: 14.85, eps: 31.8, dma50: 512.03, dma200: 513.82, rsi: 71.93, mtf: 64.0, pledge: 77.81 },
    { name: "Sirca Paints", symbol: "SIRCA", ltp: 67.26, chg: -0.53, volume: "94,10,908", mcap: "713", pe: 44.86, industryPe: 11.51, high52: 103.14, low52: 43.01, ret1m: 7.02, ret3m: 14.9, ret1y: 68.96, ret3y: 212.63, ret5y: 73.88, pb: 9.87, divYield: 3.14, roe: 24.8, roce: 7.61, eps: 1.5, dma50: 67.84, dma200: 59.59, rsi: 71.76, mtf: 62.0, pledge: 88.03 },
    { name: "MTAR Technologies", symbol: "MTARTECH", ltp: 770.86, chg: 0.64, volume: "68,93,810", mcap: "404", pe: 16.5, industryPe: 17.83, high52: 1124.67, low52: 515.98, ret1m: 8.87, ret3m: 9.0, ret1y: -31.86, ret3y: 141.52, ret5y: 366.32, pb: 2.19, divYield: 2.95, roe: 7.76, roce: 37.68, eps: 46.72, dma50: 750.47, dma200: 672.96, rsi: 49.27, mtf: 60.0, pledge: 77.37 },
    { name: "Shivalik Bimetal", symbol: "SHIVALIK", ltp: 654.11, chg: -1.4, volume: "41,61,255", mcap: "395", pe: 16.44, industryPe: 30.86, high52: 990.11, low52: 486.14, ret1m: -5.19, ret3m: -11.25, ret1y: 9.27, ret3y: -5.94, ret5y: 246.59, pb: 6.1, divYield: 0.9, roe: 16.91, roce: 5.59, eps: 39.79, dma50: 667.97, dma200: 574.3, rsi: 32.02, mtf: 65.0, pledge: 78.42 },
  ],
}

export default function MicroCapStocksPage() {
  return <StockListPage data={DATA} />
}
