"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "realty-stocks",
  crumbCategory: "Sector",
  title: "Realty Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "Realty stocks cover India\'s real estate developers involved in residential, commercial, and retail property development. The sector\'s performance is influenced by interest rates, urbanisation trends, and government housing policy.",
  stocks: [
    { name: "Oberoi Realty", symbol: "OBEROIRLTY", ltp: 1370.78, chg: -1.14, volume: "42,20,894", mcap: "213,549", pe: 15.65, industryPe: 33.98, high52: 1936.81, low52: 1136.73, ret1m: -7.05, ret3m: -14.6, ret1y: 19.87, ret3y: 24.81, ret5y: 124.81, pb: 1.06, divYield: 1.78, roe: 38.8, roce: 30.41, eps: 87.59, dma50: 1423.14, dma200: 1252.95, rsi: 51.53, mtf: 65.0, pledge: 79.94 },
    { name: "Godrej Properties", symbol: "GODREJPROP", ltp: 1135.68, chg: 0.24, volume: "97,28,930", mcap: "208,572", pe: 10.36, industryPe: 21.01, high52: 1386.62, low52: 868.63, ret1m: 10.03, ret3m: -13.36, ret1y: 73.99, ret3y: 95.28, ret5y: 230.36, pb: 1.31, divYield: 1.0, roe: 19.27, roce: 37.8, eps: 109.62, dma50: 1145.62, dma200: 1241.66, rsi: 32.12, mtf: 62.0, pledge: 85.74 },
    { name: "DLF", symbol: "DLF", ltp: 559.01, chg: -3.16, volume: "71,69,500", mcap: "205,256", pe: 32.6, industryPe: 19.0, high52: 667.67, low52: 387.16, ret1m: -1.73, ret3m: -14.14, ret1y: 76.44, ret3y: 170.78, ret5y: 104.97, pb: 5.11, divYield: 1.12, roe: 36.19, roce: 17.98, eps: 17.15, dma50: 548.7, dma200: 525.6, rsi: 48.2, mtf: 56.0, pledge: 82.66 },
    { name: "Phoenix Mills", symbol: "PHOENIXLTD", ltp: 1277.01, chg: 0.65, volume: "79,40,871", mcap: "177,515", pe: 33.35, industryPe: 16.88, high52: 1805.4, low52: 1135.48, ret1m: 7.09, ret3m: -5.01, ret1y: 48.74, ret3y: 208.21, ret5y: 22.7, pb: 6.21, divYield: 2.76, roe: 34.41, roce: 7.52, eps: 38.29, dma50: 1282.46, dma200: 1440.65, rsi: 67.88, mtf: 72.0, pledge: 88.53 },
    { name: "Sunteck Realty", symbol: "SUNTECK", ltp: 690.98, chg: -3.02, volume: "73,91,810", mcap: "115,480", pe: 43.8, industryPe: 10.33, high52: 1006.22, low52: 445.75, ret1m: 10.38, ret3m: 0.09, ret1y: 13.0, ret3y: 63.57, ret5y: 290.41, pb: 4.26, divYield: 1.28, roe: 22.91, roce: 15.14, eps: 15.78, dma50: 689.02, dma200: 602.6, rsi: 54.73, mtf: 69.0, pledge: 85.85 },
    { name: "Sobha", symbol: "SOBHA", ltp: 1657.7, chg: -0.37, volume: "39,25,893", mcap: "114,988", pe: 27.05, industryPe: 33.88, high52: 2452.2, low52: 1357.43, ret1m: 2.95, ret3m: 19.97, ret1y: 85.18, ret3y: 44.59, ret5y: 385.86, pb: 6.77, divYield: 1.94, roe: 31.4, roce: 9.24, eps: 61.28, dma50: 1756.91, dma200: 1737.17, rsi: 41.94, mtf: 55.0, pledge: 78.73 },
    { name: "Brigade Enterprises", symbol: "BRIGADE", ltp: 1269.88, chg: -3.16, volume: "79,95,547", mcap: "82,278", pe: 42.75, industryPe: 30.06, high52: 1852.19, low52: 1075.12, ret1m: 11.79, ret3m: 9.43, ret1y: 39.12, ret3y: 51.15, ret5y: 393.83, pb: 6.35, divYield: 2.34, roe: 36.48, roce: 37.56, eps: 29.7, dma50: 1321.97, dma200: 1250.63, rsi: 70.32, mtf: 62.0, pledge: 89.38 },
    { name: "Prestige Estates", symbol: "PRESTIGE", ltp: 144.29, chg: 0.61, volume: "73,55,455", mcap: "45,227", pe: 25.21, industryPe: 38.64, high52: 167.19, low52: 111.34, ret1m: 8.59, ret3m: -4.37, ret1y: 40.73, ret3y: -5.35, ret5y: 477.56, pb: 7.82, divYield: 0.42, roe: 41.1, roce: 37.83, eps: 5.72, dma50: 145.91, dma200: 146.75, rsi: 31.25, mtf: 77.0, pledge: 77.69 },
    { name: "Mahindra Lifespace", symbol: "MAHLIFE", ltp: 1195.14, chg: 0.04, volume: "81,46,766", mcap: "32,884", pe: 25.75, industryPe: 18.23, high52: 1735.82, low52: 994.29, ret1m: 0.38, ret3m: 14.84, ret1y: 18.14, ret3y: 175.47, ret5y: 39.13, pb: 1.74, divYield: 2.92, roe: 26.04, roce: 25.81, eps: 46.41, dma50: 1261.69, dma200: 1200.36, rsi: 50.29, mtf: 60.0, pledge: 80.28 },
    { name: "Macrotech Developers", symbol: "LODHA", ltp: 548.11, chg: 1.52, volume: "26,41,301", mcap: "15,653", pe: 24.3, industryPe: 32.77, high52: 626.47, low52: 421.49, ret1m: -0.97, ret3m: 17.25, ret1y: -11.18, ret3y: 15.58, ret5y: 390.9, pb: 6.19, divYield: 1.53, roe: 16.1, roce: 9.32, eps: 22.56, dma50: 557.29, dma200: 521.91, rsi: 47.44, mtf: 63.0, pledge: 78.62 },
  ],
}

export default function RealtyStocksPage() {
  return <StockListPage data={DATA} />
}
