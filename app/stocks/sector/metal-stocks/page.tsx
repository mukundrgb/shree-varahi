"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "metal-stocks",
  crumbCategory: "Sector",
  title: "Metal & Mining Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "Metal and mining stocks represent India\'s steel, aluminium, copper, and mining companies. This sector is cyclical and closely tied to global commodity prices, infrastructure spending, and industrial demand both domestically and internationally.",
  stocks: [
    { name: "SAIL", symbol: "SAIL", ltp: 1173.53, chg: 2.36, volume: "64,92,520", mcap: "280,198", pe: 16.18, industryPe: 29.67, high52: 1760.01, low52: 647.04, ret1m: 5.16, ret3m: 13.5, ret1y: 8.99, ret3y: 52.82, ret5y: 292.07, pb: 5.0, divYield: 1.24, roe: 32.11, roce: 28.83, eps: 72.53, dma50: 1174.9, dma200: 1089.82, rsi: 69.97, mtf: 66.0, pledge: 87.81 },
    { name: "Adani Enterprises", symbol: "ADANIENT", ltp: 1006.8, chg: -0.89, volume: "59,21,465", mcap: "279,743", pe: 33.57, industryPe: 36.69, high52: 1456.6, low52: 853.29, ret1m: 5.84, ret3m: 0.84, ret1y: 59.92, ret3y: 153.27, ret5y: 409.39, pb: 6.71, divYield: 1.13, roe: 25.97, roce: 36.34, eps: 29.99, dma50: 965.37, dma200: 921.72, rsi: 50.16, mtf: 73.0, pledge: 82.36 },
    { name: "Hindalco Industries", symbol: "HINDALCO", ltp: 433.66, chg: 2.12, volume: "13,23,752", mcap: "272,989", pe: 23.78, industryPe: 26.31, high52: 499.19, low52: 307.58, ret1m: 6.53, ret3m: 11.87, ret1y: 8.08, ret3y: 77.35, ret5y: 538.89, pb: 8.53, divYield: 2.97, roe: 6.78, roce: 13.12, eps: 18.24, dma50: 407.65, dma200: 440.76, rsi: 66.93, mtf: 56.0, pledge: 90.17 },
    { name: "Jindal Steel & Power", symbol: "JINDALSTEL", ltp: 987.01, chg: 3.03, volume: "34,67,402", mcap: "261,922", pe: 33.91, industryPe: 28.87, high52: 1188.92, low52: 685.7, ret1m: -2.86, ret3m: -6.34, ret1y: -12.44, ret3y: 173.23, ret5y: 348.1, pb: 7.64, divYield: 3.31, roe: 41.21, roce: 21.69, eps: 29.11, dma50: 1044.81, dma200: 1023.09, rsi: 31.6, mtf: 75.0, pledge: 83.22 },
    { name: "NMDC", symbol: "NMDC", ltp: 774.98, chg: 0.57, volume: "75,53,204", mcap: "257,635", pe: 22.12, industryPe: 18.45, high52: 1102.05, low52: 659.13, ret1m: 10.65, ret3m: 2.17, ret1y: 53.71, ret3y: 126.62, ret5y: 118.34, pb: 1.57, divYield: 0.76, roe: 12.49, roce: 30.4, eps: 35.04, dma50: 817.99, dma200: 748.09, rsi: 46.65, mtf: 59.0, pledge: 81.97 },
    { name: "APL Apollo Tubes", symbol: "APLAPOLLO", ltp: 183.38, chg: -1.56, volume: "26,71,676", mcap: "237,974", pe: 39.76, industryPe: 25.67, high52: 212.13, low52: 132.02, ret1m: -0.5, ret3m: -4.97, ret1y: -34.53, ret3y: 146.61, ret5y: 26.84, pb: 7.83, divYield: 2.61, roe: 30.75, roce: 32.64, eps: 4.61, dma50: 178.9, dma200: 167.62, rsi: 56.03, mtf: 74.0, pledge: 84.5 },
    { name: "NALCO", symbol: "NATIONALUM", ltp: 97.66, chg: -2.75, volume: "60,74,142", mcap: "182,650", pe: 34.8, industryPe: 30.9, high52: 116.23, low52: 67.72, ret1m: 8.76, ret3m: 14.21, ret1y: -34.45, ret3y: 6.96, ret5y: 129.87, pb: 9.03, divYield: 1.25, roe: 27.62, roce: 20.31, eps: 2.81, dma50: 99.11, dma200: 88.59, rsi: 34.58, mtf: 66.0, pledge: 76.06 },
    { name: "Coal India", symbol: "COALINDIA", ltp: 933.78, chg: -2.5, volume: "10,87,855", mcap: "173,764", pe: 27.15, industryPe: 26.89, high52: 1415.88, low52: 725.6, ret1m: 4.94, ret3m: 4.16, ret1y: 73.3, ret3y: -1.85, ret5y: 5.85, pb: 7.27, divYield: 2.29, roe: 27.09, roce: 17.12, eps: 34.39, dma50: 907.14, dma200: 1052.9, rsi: 70.79, mtf: 78.0, pledge: 76.75 },
    { name: "Tata Steel", symbol: "TATASTEEL", ltp: 106.39, chg: -2.04, volume: "88,46,227", mcap: "173,276", pe: 42.27, industryPe: 29.81, high52: 115.69, low52: 68.02, ret1m: 6.31, ret3m: 8.3, ret1y: 71.77, ret3y: 244.6, ret5y: 389.23, pb: 7.7, divYield: 0.86, roe: 15.34, roce: 30.59, eps: 2.52, dma50: 100.61, dma200: 100.72, rsi: 32.59, mtf: 58.0, pledge: 84.56 },
    { name: "JSW Steel", symbol: "JSWSTEEL", ltp: 221.51, chg: -0.64, volume: "8,80,409", mcap: "100,779", pe: 18.33, industryPe: 12.09, high52: 250.68, low52: 147.89, ret1m: 8.21, ret3m: -7.16, ret1y: 62.42, ret3y: 24.52, ret5y: 203.46, pb: 3.65, divYield: 1.16, roe: 5.84, roce: 35.4, eps: 12.08, dma50: 234.24, dma200: 244.71, rsi: 46.97, mtf: 72.0, pledge: 76.29 },
    { name: "Vedanta", symbol: "VEDL", ltp: 1373.54, chg: -0.59, volume: "78,30,102", mcap: "77,123", pe: 9.33, industryPe: 30.59, high52: 1689.02, low52: 824.39, ret1m: 8.77, ret3m: -7.59, ret1y: 17.53, ret3y: -10.05, ret5y: 44.83, pb: 5.83, divYield: 2.28, roe: 18.14, roce: 28.23, eps: 147.22, dma50: 1450.66, dma200: 1325.35, rsi: 53.53, mtf: 58.0, pledge: 84.15 },
    { name: "Hindustan Zinc", symbol: "HINDZINC", ltp: 1335.78, chg: 2.38, volume: "97,33,331", mcap: "61,090", pe: 23.48, industryPe: 31.99, high52: 1919.46, low52: 873.6, ret1m: -4.02, ret3m: 3.86, ret1y: -28.49, ret3y: 83.23, ret5y: 350.83, pb: 6.75, divYield: 1.83, roe: 35.29, roce: 10.66, eps: 56.89, dma50: 1396.64, dma200: 1492.84, rsi: 51.47, mtf: 73.0, pledge: 77.6 },
  ],
}

export default function MetalStocksPage() {
  return <StockListPage data={DATA} />
}
