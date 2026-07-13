"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "pharma-stocks",
  crumbCategory: "Sector",
  title: "Pharma Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "Pharma stocks represent India\'s pharmaceutical and healthcare companies engaged in drug manufacturing, generics, and research. India is one of the world\'s largest suppliers of generic medicines, and this sector is closely tracked for regulatory approvals, export demand, and R&D pipelines.",
  stocks: [
    { name: "Sun Pharmaceutical", symbol: "SUNPHARMA", ltp: 5689.86, chg: 2.21, volume: "62,73,570", mcap: "490,462", pe: 21.04, industryPe: 17.9, high52: 6317.51, low52: 3717.24, ret1m: -6.03, ret3m: -3.53, ret1y: 29.11, ret3y: 193.48, ret5y: 195.23, pb: 8.66, divYield: 2.72, roe: 14.77, roce: 32.29, eps: 270.43, dma50: 5834.87, dma200: 6534.46, rsi: 62.25, mtf: 70.0, pledge: 81.42 },
    { name: "Alkem Laboratories", symbol: "ALKEM", ltp: 213.32, chg: -1.79, volume: "1,36,146", mcap: "483,669", pe: 17.19, industryPe: 13.48, high52: 248.08, low52: 172.76, ret1m: -2.28, ret3m: -2.26, ret1y: 28.47, ret3y: 216.53, ret5y: 49.94, pb: 5.06, divYield: 3.11, roe: 17.72, roce: 11.59, eps: 12.41, dma50: 205.51, dma200: 184.0, rsi: 71.96, mtf: 72.0, pledge: 75.53 },
    { name: "Metropolis Healthcare", symbol: "METROPOLIS", ltp: 4633.65, chg: 2.34, volume: "18,92,329", mcap: "463,024", pe: 36.21, industryPe: 16.91, high52: 6476.34, low52: 2894.84, ret1m: 2.09, ret3m: -2.32, ret1y: 1.19, ret3y: 191.42, ret5y: 491.58, pb: 9.11, divYield: 2.21, roe: 30.71, roce: 11.09, eps: 127.97, dma50: 4553.24, dma200: 3949.02, rsi: 59.14, mtf: 71.0, pledge: 90.67 },
    { name: "Lupin", symbol: "LUPIN", ltp: 2507.56, chg: 1.83, volume: "91,32,184", mcap: "301,732", pe: 34.0, industryPe: 25.01, high52: 3562.57, low52: 1869.95, ret1m: 5.05, ret3m: -3.36, ret1y: -2.85, ret3y: 216.08, ret5y: 87.35, pb: 3.18, divYield: 0.4, roe: 4.16, roce: 34.91, eps: 73.75, dma50: 2589.74, dma200: 2195.74, rsi: 34.82, mtf: 74.0, pledge: 90.8 },
    { name: "Dr Reddy\'s Laboratories", symbol: "DRREDDY", ltp: 3755.88, chg: 1.3, volume: "86,84,870", mcap: "287,076", pe: 19.55, industryPe: 27.03, high52: 4259.05, low52: 3079.21, ret1m: 10.09, ret3m: -3.67, ret1y: 88.9, ret3y: 88.73, ret5y: 248.53, pb: 1.6, divYield: 1.21, roe: 10.26, roce: 25.27, eps: 192.12, dma50: 3669.76, dma200: 3752.15, rsi: 65.46, mtf: 60.0, pledge: 83.34 },
    { name: "Torrent Pharmaceuticals", symbol: "TORNTPHARM", ltp: 4782.72, chg: -1.29, volume: "18,68,712", mcap: "187,935", pe: 35.35, industryPe: 37.48, high52: 5779.89, low52: 3743.8, ret1m: 4.34, ret3m: -9.63, ret1y: 19.81, ret3y: 12.75, ret5y: 61.01, pb: 1.56, divYield: 2.86, roe: 37.44, roce: 27.29, eps: 135.3, dma50: 4508.39, dma200: 5114.31, rsi: 52.21, mtf: 73.0, pledge: 79.03 },
    { name: "Divi\'s Laboratories", symbol: "DIVISLAB", ltp: 655.6, chg: 1.79, volume: "55,10,326", mcap: "184,556", pe: 37.61, industryPe: 27.9, high52: 794.22, low52: 499.86, ret1m: 3.07, ret3m: -14.45, ret1y: 81.83, ret3y: 245.14, ret5y: 185.36, pb: 1.89, divYield: 0.07, roe: 14.7, roce: 36.86, eps: 17.43, dma50: 662.62, dma200: 733.18, rsi: 28.04, mtf: 58.0, pledge: 82.05 },
    { name: "Cipla", symbol: "CIPLA", ltp: 2437.09, chg: -2.92, volume: "15,63,729", mcap: "154,399", pe: 28.71, industryPe: 36.96, high52: 2872.35, low52: 1538.25, ret1m: 1.19, ret3m: 0.6, ret1y: -29.74, ret3y: 141.89, ret5y: 348.54, pb: 4.36, divYield: 1.76, roe: 31.98, roce: 13.57, eps: 84.89, dma50: 2502.77, dma200: 2360.26, rsi: 51.45, mtf: 59.0, pledge: 75.49 },
    { name: "Biocon", symbol: "BIOCON", ltp: 2787.36, chg: -2.95, volume: "61,51,791", mcap: "127,687", pe: 14.78, industryPe: 15.44, high52: 3299.46, low52: 1869.79, ret1m: 3.05, ret3m: 15.5, ret1y: 80.7, ret3y: 5.83, ret5y: 417.2, pb: 8.36, divYield: 2.73, roe: 39.63, roce: 5.58, eps: 188.59, dma50: 2701.57, dma200: 3023.26, rsi: 33.41, mtf: 57.0, pledge: 84.42 },
    { name: "Aurobindo Pharma", symbol: "AUROPHARMA", ltp: 3973.25, chg: 2.72, volume: "40,76,191", mcap: "79,924", pe: 43.32, industryPe: 12.48, high52: 5582.42, low52: 3079.68, ret1m: 11.2, ret3m: 17.97, ret1y: 27.72, ret3y: 67.67, ret5y: 341.24, pb: 3.28, divYield: 2.86, roe: 40.5, roce: 36.19, eps: 91.72, dma50: 4197.24, dma200: 3421.15, rsi: 48.21, mtf: 71.0, pledge: 85.27 },
    { name: "Abbott India", symbol: "ABBOTINDIA", ltp: 5571.94, chg: 2.43, volume: "26,33,122", mcap: "73,693", pe: 10.64, industryPe: 11.79, high52: 8390.18, low52: 4320.62, ret1m: 11.12, ret3m: 13.38, ret1y: 74.73, ret3y: 44.46, ret5y: 501.03, pb: 6.37, divYield: 2.28, roe: 18.69, roce: 18.41, eps: 523.68, dma50: 5733.92, dma200: 5295.66, rsi: 57.88, mtf: 74.0, pledge: 79.95 },
    { name: "Zydus Lifesciences", symbol: "ZYDUSLIFE", ltp: 1561.63, chg: -1.18, volume: "56,49,357", mcap: "35,133", pe: 26.34, industryPe: 10.13, high52: 2414.79, low52: 1043.7, ret1m: -1.23, ret3m: -3.23, ret1y: -18.9, ret3y: 190.75, ret5y: 514.22, pb: 9.93, divYield: 0.87, roe: 38.55, roce: 39.16, eps: 59.29, dma50: 1518.05, dma200: 1349.17, rsi: 38.86, mtf: 74.0, pledge: 84.01 },
  ],
}

export default function PharmaStocksPage() {
  return <StockListPage data={DATA} />
}
