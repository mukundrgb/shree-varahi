"use client"

import { StockListPage, type StockListPageData } from "@/components/stock-list-page"

const DATA: StockListPageData = {
  slug: "auto-stocks",
  crumbCategory: "Sector",
  title: "Auto Stocks",
  lastUpdated: "13 Jul 2026 at 12:21",
  description: "Auto stocks cover India\'s automobile manufacturers and auto ancillary companies, spanning passenger vehicles, commercial vehicles, two-wheelers, and component makers. The sector\'s performance reflects consumer spending trends, rural demand, and export competitiveness.",
  stocks: [
    { name: "Balkrishna Industries", symbol: "BALKRISIND", ltp: 4069.03, chg: -0.58, volume: "6,10,727", mcap: "396,849", pe: 38.74, industryPe: 14.16, high52: 5407.9, low52: 3139.29, ret1m: 10.45, ret3m: -4.48, ret1y: -21.06, ret3y: 200.91, ret5y: 47.22, pb: 5.17, divYield: 0.94, roe: 8.73, roce: 37.08, eps: 105.03, dma50: 4175.3, dma200: 3690.32, rsi: 36.26, mtf: 57.0, pledge: 83.21 },
    { name: "TVS Motor Company", symbol: "TVSMOTOR", ltp: 8359.3, chg: 1.92, volume: "31,99,277", mcap: "374,646", pe: 32.37, industryPe: 13.4, high52: 12366.35, low52: 7206.83, ret1m: -1.41, ret3m: 9.02, ret1y: 81.51, ret3y: 47.23, ret5y: 365.88, pb: 8.4, divYield: 0.26, roe: 5.2, roce: 36.86, eps: 258.24, dma50: 8392.87, dma200: 8896.04, rsi: 53.11, mtf: 57.0, pledge: 84.4 },
    { name: "Mahindra & Mahindra", symbol: "M&M", ltp: 11695.46, chg: 2.26, volume: "5,50,296", mcap: "356,809", pe: 38.41, industryPe: 20.83, high52: 13871.41, low52: 7528.74, ret1m: 11.23, ret3m: -3.37, ret1y: 76.14, ret3y: 96.78, ret5y: 1.58, pb: 6.91, divYield: 0.58, roe: 6.25, roce: 25.28, eps: 304.49, dma50: 11932.81, dma200: 10951.33, rsi: 34.68, mtf: 69.0, pledge: 87.39 },
    { name: "Bharat Forge", symbol: "BHARATFORG", ltp: 8658.42, chg: 1.39, volume: "49,15,830", mcap: "334,787", pe: 36.94, industryPe: 18.08, high52: 11976.23, low52: 5345.74, ret1m: 2.34, ret3m: -4.51, ret1y: 33.75, ret3y: -9.37, ret5y: 131.31, pb: 8.03, divYield: 2.07, roe: 34.87, roce: 21.91, eps: 234.39, dma50: 8398.66, dma200: 8492.07, rsi: 65.51, mtf: 62.0, pledge: 86.62 },
    { name: "Suprajit Engineering", symbol: "SUPRAJIT", ltp: 890.71, chg: -3.15, volume: "52,37,984", mcap: "287,658", pe: 22.63, industryPe: 21.61, high52: 1031.93, low52: 796.0, ret1m: -7.46, ret3m: -12.78, ret1y: -6.35, ret3y: 180.31, ret5y: 185.0, pb: 3.37, divYield: 1.73, roe: 20.09, roce: 34.28, eps: 39.36, dma50: 902.63, dma200: 984.82, rsi: 32.59, mtf: 76.0, pledge: 90.39 },
    { name: "Eicher Motors", symbol: "EICHERMOT", ltp: 11030.21, chg: 1.68, volume: "12,66,428", mcap: "257,898", pe: 38.93, industryPe: 35.95, high52: 15366.09, low52: 6688.44, ret1m: 1.36, ret3m: -7.19, ret1y: 35.21, ret3y: 175.29, ret5y: 547.81, pb: 5.12, divYield: 0.84, roe: 25.31, roce: 30.81, eps: 283.33, dma50: 10914.7, dma200: 10453.89, rsi: 45.21, mtf: 67.0, pledge: 86.68 },
    { name: "Ashok Leyland", symbol: "ASHOKLEY", ltp: 7466.39, chg: -0.54, volume: "23,37,580", mcap: "170,412", pe: 18.46, industryPe: 24.17, high52: 8206.46, low52: 6297.67, ret1m: 0.69, ret3m: 0.88, ret1y: 69.58, ret3y: 34.12, ret5y: 549.53, pb: 1.3, divYield: 0.72, roe: 18.72, roce: 25.06, eps: 404.46, dma50: 7152.99, dma200: 7165.11, rsi: 56.84, mtf: 59.0, pledge: 87.66 },
    { name: "MRF", symbol: "MRF", ltp: 9100.44, chg: 2.19, volume: "29,76,759", mcap: "134,705", pe: 44.2, industryPe: 10.62, high52: 10162.06, low52: 6824.23, ret1m: 0.75, ret3m: 8.97, ret1y: 63.68, ret3y: 146.73, ret5y: 155.81, pb: 5.5, divYield: 1.36, roe: 22.25, roce: 15.9, eps: 205.89, dma50: 8834.48, dma200: 9765.22, rsi: 37.57, mtf: 73.0, pledge: 78.99 },
    { name: "Bajaj Auto", symbol: "BAJAJ-AUTO", ltp: 8617.06, chg: 2.89, volume: "44,99,883", mcap: "111,750", pe: 20.57, industryPe: 17.88, high52: 10833.67, low52: 5683.58, ret1m: -2.36, ret3m: 10.31, ret1y: 82.72, ret3y: -15.41, ret5y: 400.53, pb: 2.19, divYield: 2.23, roe: 28.19, roce: 24.09, eps: 418.91, dma50: 8878.71, dma200: 9852.2, rsi: 68.45, mtf: 72.0, pledge: 77.06 },
    { name: "Tata Motors", symbol: "TATAMOTORS", ltp: 4061.5, chg: 1.55, volume: "66,33,150", mcap: "91,224", pe: 44.9, industryPe: 34.25, high52: 4748.32, low52: 2252.21, ret1m: -5.01, ret3m: 3.71, ret1y: 50.0, ret3y: 49.38, ret5y: 188.62, pb: 4.85, divYield: 2.61, roe: 24.62, roce: 35.4, eps: 90.46, dma50: 4202.3, dma200: 3944.66, rsi: 37.13, mtf: 65.0, pledge: 80.44 },
    { name: "Maruti Suzuki", symbol: "MARUTI", ltp: 8135.98, chg: 0.54, volume: "18,75,771", mcap: "49,104", pe: 12.22, industryPe: 24.43, high52: 12144.72, low52: 6737.47, ret1m: -1.23, ret3m: -9.86, ret1y: 82.33, ret3y: 192.55, ret5y: 355.27, pb: 6.7, divYield: 0.53, roe: 35.17, roce: 5.74, eps: 665.79, dma50: 8189.69, dma200: 8315.8, rsi: 70.57, mtf: 75.0, pledge: 78.87 },
    { name: "Hero MotoCorp", symbol: "HEROMOTOCO", ltp: 4928.08, chg: 0.22, volume: "51,10,121", mcap: "15,969", pe: 33.16, industryPe: 26.49, high52: 7485.14, low52: 3335.06, ret1m: 9.73, ret3m: 2.28, ret1y: 53.17, ret3y: 131.93, ret5y: 439.68, pb: 5.72, divYield: 0.1, roe: 18.6, roce: 22.43, eps: 148.62, dma50: 5205.75, dma200: 4515.52, rsi: 39.52, mtf: 57.0, pledge: 90.63 },
  ],
}

export default function AutoStocksPage() {
  return <StockListPage data={DATA} />
}
