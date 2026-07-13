"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "fmcg-stocks",
  crumbCategory: "Sector",
  title: "FMCG Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "FMCG stocks represent India\'s fast-moving consumer goods companies producing everyday essentials like food, beverages, personal care, and household products. This sector is considered defensive, driven by consistent consumer demand across economic cycles.",
  stocks: [
    { name: "Colgate-Palmolive", symbol: "COLPAL", ltp: 1940.66, chg: 1.95, volume: "71,88,733", mcap: "510,497", pe: 12.03, industryPe: 13.3, high52: 2189.85, low52: 1513.31, ret1m: 8.53, ret3m: -3.74, ret1y: 78.46, ret3y: 120.73, ret5y: 392.85, pb: 3.14, divYield: 3.0, roe: 6.44, roce: 29.71, eps: 161.32, dma50: 1989.12, dma200: 2223.41, rsi: 30.08, mtf: 74.0, pledge: 89.11 },
    { name: "Marico", symbol: "MARICO", ltp: 11095.04, chg: -2.91, volume: "74,15,852", mcap: "410,556", pe: 28.31, industryPe: 36.45, high52: 12468.26, low52: 7327.93, ret1m: -4.66, ret3m: -7.94, ret1y: 56.95, ret3y: 65.83, ret5y: 76.78, pb: 3.22, divYield: 0.06, roe: 16.07, roce: 37.3, eps: 391.91, dma50: 11180.78, dma200: 9726.26, rsi: 46.14, mtf: 74.0, pledge: 85.88 },
    { name: "United Spirits", symbol: "MCDOWELL-N", ltp: 6812.34, chg: -0.24, volume: "7,63,294", mcap: "304,525", pe: 14.58, industryPe: 14.03, high52: 8885.8, low52: 4036.56, ret1m: -4.31, ret3m: -1.45, ret1y: 56.34, ret3y: 250.6, ret5y: 105.51, pb: 9.0, divYield: 3.33, roe: 19.42, roce: 27.07, eps: 467.24, dma50: 6750.0, dma200: 6991.55, rsi: 32.16, mtf: 73.0, pledge: 79.22 },
    { name: "Tata Consumer Products", symbol: "TATACONSUM", ltp: 4859.59, chg: 1.67, volume: "89,53,186", mcap: "274,800", pe: 31.96, industryPe: 33.74, high52: 5729.32, low52: 3894.19, ret1m: -5.17, ret3m: 13.65, ret1y: 24.15, ret3y: 48.06, ret5y: 60.21, pb: 5.09, divYield: 0.84, roe: 20.59, roce: 20.66, eps: 152.05, dma50: 4612.99, dma200: 5218.61, rsi: 36.43, mtf: 62.0, pledge: 90.1 },
    { name: "ITC", symbol: "ITC", ltp: 2895.55, chg: 0.69, volume: "58,81,329", mcap: "246,300", pe: 13.26, industryPe: 39.79, high52: 3200.93, low52: 1943.19, ret1m: -4.11, ret3m: 9.95, ret1y: -27.07, ret3y: -18.17, ret5y: 454.7, pb: 2.58, divYield: 1.4, roe: 16.16, roce: 27.22, eps: 218.37, dma50: 3026.61, dma200: 2943.72, rsi: 55.77, mtf: 62.0, pledge: 90.72 },
    { name: "Hindustan Unilever", symbol: "HINDUNILVR", ltp: 9716.35, chg: -0.54, volume: "5,57,842", mcap: "179,764", pe: 15.72, industryPe: 23.2, high52: 13380.27, low52: 8158.97, ret1m: 2.27, ret3m: -0.87, ret1y: -26.74, ret3y: 94.26, ret5y: 284.51, pb: 1.96, divYield: 0.53, roe: 32.59, roce: 38.01, eps: 618.09, dma50: 9539.39, dma200: 9195.98, rsi: 58.73, mtf: 77.0, pledge: 90.73 },
    { name: "Godrej Consumer Products", symbol: "GODREJCP", ltp: 3603.85, chg: 0.09, volume: "70,27,443", mcap: "164,863", pe: 11.49, industryPe: 18.46, high52: 5463.29, low52: 2893.81, ret1m: 4.7, ret3m: -10.12, ret1y: 2.66, ret3y: 50.59, ret5y: 294.78, pb: 5.97, divYield: 0.93, roe: 21.92, roce: 18.24, eps: 313.65, dma50: 3543.62, dma200: 3139.11, rsi: 70.68, mtf: 67.0, pledge: 87.74 },
    { name: "Nestle India", symbol: "NESTLEIND", ltp: 9788.89, chg: -2.41, volume: "55,23,743", mcap: "142,703", pe: 14.58, industryPe: 36.03, high52: 12916.03, low52: 6500.25, ret1m: 8.93, ret3m: -12.98, ret1y: -34.52, ret3y: 6.88, ret5y: 414.03, pb: 2.75, divYield: 0.01, roe: 15.83, roce: 29.64, eps: 671.39, dma50: 10350.12, dma200: 9526.88, rsi: 33.04, mtf: 76.0, pledge: 81.94 },
    { name: "Emami", symbol: "EMAMILTD", ltp: 3105.54, chg: -2.76, volume: "58,47,950", mcap: "117,898", pe: 39.13, industryPe: 29.01, high52: 4460.07, low52: 2694.17, ret1m: -1.51, ret3m: 1.36, ret1y: 23.26, ret3y: 36.49, ret5y: 71.93, pb: 5.32, divYield: 0.26, roe: 26.61, roce: 15.24, eps: 79.36, dma50: 3256.83, dma200: 2779.1, rsi: 48.69, mtf: 60.0, pledge: 79.92 },
    { name: "Varun Beverages", symbol: "VBL", ltp: 935.55, chg: 2.52, volume: "79,37,659", mcap: "64,982", pe: 38.02, industryPe: 24.05, high52: 1320.33, low52: 636.49, ret1m: -0.1, ret3m: -13.87, ret1y: 87.85, ret3y: 33.1, ret5y: 138.37, pb: 8.46, divYield: 2.11, roe: 31.83, roce: 27.34, eps: 24.61, dma50: 984.49, dma200: 952.08, rsi: 52.43, mtf: 74.0, pledge: 75.07 },
    { name: "Dabur India", symbol: "DABUR", ltp: 3104.98, chg: -1.41, volume: "35,90,348", mcap: "60,869", pe: 32.89, industryPe: 15.98, high52: 3832.43, low52: 2143.39, ret1m: 11.31, ret3m: 0.57, ret1y: 46.51, ret3y: 25.6, ret5y: 33.3, pb: 8.91, divYield: 2.49, roe: 24.71, roce: 29.38, eps: 94.4, dma50: 3137.55, dma200: 2787.86, rsi: 69.63, mtf: 59.0, pledge: 81.71 },
    { name: "Britannia Industries", symbol: "BRITANNIA", ltp: 6206.8, chg: 1.85, volume: "93,89,733", mcap: "20,681", pe: 11.48, industryPe: 12.71, high52: 9206.16, low52: 4158.67, ret1m: 0.9, ret3m: 9.63, ret1y: -5.56, ret3y: 220.54, ret5y: 427.73, pb: 1.31, divYield: 2.62, roe: 35.51, roce: 12.54, eps: 540.66, dma50: 6136.66, dma200: 6298.2, rsi: 65.97, mtf: 78.0, pledge: 82.62 },
  ],
}

export default function FmcgStocksPage() {
  return <StockListPage data={DATA} />
}
