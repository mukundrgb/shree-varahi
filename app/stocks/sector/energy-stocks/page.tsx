"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "energy-stocks",
  crumbCategory: "Sector",
  title: "Energy & Power Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "Energy and power stocks represent India\'s oil & gas, power generation, and utility companies. This sector is critical to national infrastructure and is influenced by global crude prices, government policy, and the ongoing transition toward renewable energy.",
  stocks: [
    { name: "JSW Energy", symbol: "JSWENERGY", ltp: 1301.87, chg: 2.21, volume: "73,11,980", mcap: "1,562,560", pe: 24.22, industryPe: 21.45, high52: 1968.17, low52: 764.6, ret1m: 9.32, ret3m: 12.66, ret1y: 67.8, ret3y: 185.5, ret5y: 17.98, pb: 9.68, divYield: 3.23, roe: 17.13, roce: 25.7, eps: 53.75, dma50: 1361.2, dma200: 1250.21, rsi: 43.07, mtf: 65.0, pledge: 80.24 },
    { name: "Adani Energy Solutions", symbol: "ADANIENSOL", ltp: 1866.01, chg: -1.04, volume: "29,68,694", mcap: "1,536,821", pe: 15.3, industryPe: 33.08, high52: 2546.61, low52: 1627.58, ret1m: -5.17, ret3m: 18.21, ret1y: 39.47, ret3y: 175.92, ret5y: 400.48, pb: 7.66, divYield: 1.51, roe: 18.07, roce: 15.48, eps: 121.96, dma50: 1915.42, dma200: 1929.39, rsi: 60.52, mtf: 72.0, pledge: 88.11 },
    { name: "NHPC", symbol: "NHPC", ltp: 1788.0, chg: 1.62, volume: "29,70,606", mcap: "1,437,380", pe: 43.23, industryPe: 11.51, high52: 2443.35, low52: 1327.96, ret1m: 9.72, ret3m: -11.47, ret1y: -2.0, ret3y: 253.87, ret5y: 303.77, pb: 4.71, divYield: 0.57, roe: 19.94, roce: 16.94, eps: 41.36, dma50: 1720.06, dma200: 1761.82, rsi: 47.06, mtf: 69.0, pledge: 80.04 },
    { name: "Tata Power", symbol: "TATAPOWER", ltp: 806.35, chg: 1.97, volume: "41,79,267", mcap: "1,293,759", pe: 41.41, industryPe: 15.29, high52: 1003.84, low52: 601.13, ret1m: -1.44, ret3m: -11.71, ret1y: 18.12, ret3y: 13.94, ret5y: 19.67, pb: 4.61, divYield: 2.8, roe: 39.56, roce: 9.77, eps: 19.47, dma50: 787.79, dma200: 830.69, rsi: 37.34, mtf: 72.0, pledge: 90.49 },
    { name: "NTPC", symbol: "NTPC", ltp: 1481.71, chg: -1.27, volume: "44,47,671", mcap: "1,011,993", pe: 42.86, industryPe: 26.54, high52: 2239.52, low52: 953.7, ret1m: -6.47, ret3m: 17.4, ret1y: 31.41, ret3y: 111.18, ret5y: 518.21, pb: 5.9, divYield: 3.13, roe: 30.24, roce: 36.77, eps: 34.57, dma50: 1531.32, dma200: 1401.91, rsi: 30.45, mtf: 68.0, pledge: 86.08 },
    { name: "Reliance Industries", symbol: "RELIANCE", ltp: 1884.18, chg: 1.27, volume: "54,64,397", mcap: "908,863", pe: 29.07, industryPe: 37.35, high52: 2050.27, low52: 1200.81, ret1m: -5.35, ret3m: 10.9, ret1y: 36.86, ret3y: 62.74, ret5y: 60.45, pb: 4.6, divYield: 2.81, roe: 35.29, roce: 17.69, eps: 64.82, dma50: 1919.26, dma200: 1681.61, rsi: 57.75, mtf: 61.0, pledge: 82.16 },
    { name: "ONGC", symbol: "ONGC", ltp: 957.46, chg: -0.46, volume: "26,82,249", mcap: "838,426", pe: 21.36, industryPe: 22.42, high52: 1234.84, low52: 648.49, ret1m: 9.27, ret3m: 8.8, ret1y: 9.41, ret3y: 259.45, ret5y: 259.8, pb: 6.67, divYield: 0.93, roe: 12.74, roce: 24.89, eps: 44.82, dma50: 1009.32, dma200: 1003.8, rsi: 64.4, mtf: 72.0, pledge: 83.02 },
    { name: "Adani Power", symbol: "ADANIPOWER", ltp: 572.38, chg: 0.26, volume: "45,63,783", mcap: "512,739", pe: 38.91, industryPe: 37.9, high52: 731.83, low52: 480.16, ret1m: 5.22, ret3m: 10.56, ret1y: -20.76, ret3y: 69.99, ret5y: 546.98, pb: 8.46, divYield: 0.77, roe: 12.62, roce: 27.47, eps: 14.71, dma50: 580.46, dma200: 594.46, rsi: 55.05, mtf: 55.0, pledge: 75.05 },
    { name: "Adani Green Energy", symbol: "ADANIGREEN", ltp: 593.01, chg: -2.71, volume: "70,78,600", mcap: "342,807", pe: 26.37, industryPe: 33.25, high52: 819.97, low52: 492.0, ret1m: -4.0, ret3m: -4.92, ret1y: -14.98, ret3y: 198.93, ret5y: 496.74, pb: 7.85, divYield: 1.62, roe: 36.33, roce: 17.6, eps: 22.49, dma50: 604.27, dma200: 634.76, rsi: 66.22, mtf: 56.0, pledge: 85.7 },
    { name: "Indian Oil Corporation", symbol: "IOC", ltp: 2696.73, chg: -1.11, volume: "88,74,123", mcap: "319,273", pe: 31.91, industryPe: 14.45, high52: 3242.7, low52: 1741.26, ret1m: 11.65, ret3m: 7.83, ret1y: -0.62, ret3y: 89.32, ret5y: 85.31, pb: 1.24, divYield: 3.18, roe: 37.15, roce: 39.75, eps: 84.51, dma50: 2745.8, dma200: 2659.3, rsi: 41.38, mtf: 75.0, pledge: 87.64 },
    { name: "Coal India", symbol: "COALINDIA", ltp: 2489.25, chg: -2.41, volume: "88,55,807", mcap: "248,605", pe: 34.64, industryPe: 22.37, high52: 3288.91, low52: 1943.48, ret1m: 1.06, ret3m: 5.67, ret1y: 58.45, ret3y: 70.66, ret5y: 173.16, pb: 2.45, divYield: 2.1, roe: 35.52, roce: 18.0, eps: 71.86, dma50: 2498.92, dma200: 2304.53, rsi: 45.95, mtf: 71.0, pledge: 76.22 },
    { name: "Power Grid Corporation", symbol: "POWERGRID", ltp: 926.2, chg: -1.63, volume: "24,55,792", mcap: "41,527", pe: 12.54, industryPe: 15.56, high52: 1096.48, low52: 579.43, ret1m: 4.76, ret3m: -7.95, ret1y: -32.4, ret3y: 153.27, ret5y: 333.09, pb: 4.24, divYield: 3.17, roe: 23.19, roce: 16.19, eps: 73.86, dma50: 921.18, dma200: 1055.63, rsi: 38.0, mtf: 58.0, pledge: 76.6 },
  ],
}

export default function EnergyStocksPage() {
  return <StockListPage data={DATA} />
}
