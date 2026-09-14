"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PieChart,
  TrendingUp,
  Landmark,
  RotateCcw,
  Target,
  Layers,
  Box,
  BarChart2,
  Zap,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchPopup } from "./search-popup"
import Link from "next/link"
import Image from "next/image"


type MenuItem = {
  title: string
  desc: string
  icon: React.ReactNode
  href: string
}

// ── Menu data ─────────────────────────────────────────────────────────────

const TRADE_INVEST: MenuItem[] = [
  { title: "Stocks",    desc: "NSE & BSE equities, ₹0 delivery",   icon: <TrendingUp className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/stocks" },
  { title: "F&O",       desc: "Futures & options, ₹17 flat",        icon: <PieChart   className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/futures-options" },
  { title: "ETF",       desc: "Exchange traded funds",               icon: <Layers     className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/etf" },
  { title: "IPO",       desc: "Apply for upcoming IPOs free",        icon: <Target     className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/ipo" },
  { title: "Commodity", desc: "MCX gold, silver & crude oil",        icon: <Box        className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/commodity" },
  { title: "MTF",       desc: "4× margin buying power on stocks",   icon: <Zap        className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mtf" },
]

const MF_SIP: MenuItem[] = [
  { title: "Mutual Funds",   desc: "5,000+ direct funds, 0% commission", icon: <Landmark  className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mutual-funds" },
  { title: "SIP Calculator", desc: "Plan your monthly SIP goal",          icon: <RotateCcw className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "/mutual-funds" },
  { title: "NFO",            desc: "New fund offers — invest early",      icon: "🆕",                                                              href: "/nfo" },
]

const PRODUCTS: MenuItem[] = [
  { title: "Shree Varahi Web",         desc: "Trade from any browser",         icon: "💻",                                                                href: "/web-trading-platform" },
  { title: "Shree Varahi Mobile App",  desc: "iOS & Android trading app",      icon: "📱",                                                                href: "#" },
  { title: "Shree Varahi Desktop App", desc: "Professional desktop platform",  icon: <BarChart2 className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />,   href: "#" },
]

const LEARN_NEWS: MenuItem[] = [
  { title: "Knowledge Panel", desc: "Courses, guides & tutorials",  icon: <BookOpen className="h-5 w-5 text-[#8B0D19]" strokeWidth={2.2} />, href: "#" },
  { title: "Blog",            desc: "Market insights & analysis",   icon: "📝",                                                             href: "#" },
  { title: "News",            desc: "Live market news & updates",   icon: "📰",                                                             href: "#" },
]

// ── Markets mega-menu ─────────────────────────────────────────────────────

type MktExchange = "NSE" | "BSE" | "MCX" | "GLOBAL"
type MarketItem  = { name: string; href: string; exchange?: MktExchange }

const MARKETS_TABS = ["Indices", "Stocks", "F&O", "Mutual Funds", "ETFs", "Gold & Silver", "Tools"] as const

const MARKETS_SUBS: Record<string, string[]> = {
  "Indices":       ["Major Indices", "Global Indices"],
  "Stocks":        ["US Stocks", "Market Movers", "Top Nifty 50 Stocks", "Top Nifty Bank Stocks", "Nifty Stocks", "Sensex Stocks", "Stocks by Sector", "Stocks by Group", "Stocks by MarketCap", "Popular Stocks"],
  "F&O":           ["Index Option Chain", "Index F&O", "Stock Option Chain", "Stock Futures", "Stock Options", "Commodity Option Chain", "Commodity Futures"],
  "Mutual Funds":  ["Equity Funds", "Debt Funds", "Hybrid Funds", "Index Funds", "Mutual Funds AMCs", "Popular Mutual Funds", "Popular Schemes"],
  "ETFs":          ["Index ETFs", "Commodity ETFs", "Popular ETFs", "ETF AMCs"],
  "Gold & Silver": ["Gold Prices", "Silver Prices"],
  "Tools":         ["Calculators", "Screeners"],
}

const MARKETS_DATA: Record<string, Record<string, MarketItem[]>> = {
  "Indices": {
    "Major Indices": [
      { name: "Nifty 50",           href: "/markets/indices/nifty-50",           exchange: "NSE" },
      { name: "Sensex",             href: "/markets/indices/sensex",             exchange: "BSE" },
      { name: "Nifty Bank",         href: "/markets/indices/nifty-bank",         exchange: "NSE" },
      { name: "BSE Small Cap",      href: "/markets/indices/bse-small-cap",      exchange: "BSE" },
      { name: "Finnifty",           href: "/markets/indices/finnifty",           exchange: "NSE" },
      { name: "BSE Mid Cap",        href: "/markets/indices/bse-mid-cap",        exchange: "BSE" },
      { name: "Nifty Next 50",      href: "/markets/indices/nifty-next-50",      exchange: "NSE" },
      { name: "BSE Bankex",         href: "/markets/indices/bse-bankex",         exchange: "BSE" },
      { name: "Nifty Small Cap 50", href: "/markets/indices/nifty-small-cap-50", exchange: "NSE" },
      { name: "Nifty Mid Cap 50",   href: "/markets/indices/nifty-mid-cap-50",   exchange: "NSE" },
    ],
    "Global Indices": [
      { name: "US Tech 100", href: "/markets/indices/nasdaq",         exchange: "GLOBAL" },
      { name: "Dow Jones",   href: "/markets/indices/dow-jones",      exchange: "GLOBAL" },
      { name: "S&P",         href: "/markets/indices/sp-500",         exchange: "GLOBAL" },
      { name: "FTSE",        href: "/markets/indices/ftse-100",       exchange: "GLOBAL" },
      { name: "Dax",         href: "/markets/indices/dax",            exchange: "GLOBAL" },
      { name: "CAC",         href: "/markets/indices/cac-40",         exchange: "GLOBAL" },
      { name: "Nikkei 225",  href: "/markets/indices/nikkei-225",     exchange: "GLOBAL" },
      { name: "Hang Seng",   href: "/markets/indices/hang-seng",      exchange: "GLOBAL" },
      { name: "SSE Composite", href: "/markets/indices/sse-composite", exchange: "GLOBAL" },
      { name: "TAIEX",       href: "/markets/indices/taiex",          exchange: "GLOBAL" },
      { name: "KOSPI",       href: "/markets/indices/kospi",          exchange: "GLOBAL" },
      { name: "Gift Nifty",  href: "/markets/indices/gift-nifty",     exchange: "GLOBAL" },
    ],
  },
  "Stocks": {
    "US Stocks": [
      { name: "Apple",       href: "/us-stocks/aapl-apple-inc-share-price" },
      { name: "Microsoft",   href: "/us-stocks/msft-microsoft-corp-share-price" },
      { name: "NVIDIA",      href: "/us-stocks/nvda-nvidia-corp-share-price" },
      { name: "Alphabet",    href: "/us-stocks/googl-alphabet-inc-share-price" },
      { name: "Amazon",      href: "/us-stocks/amzn-amazon-com-inc-share-price" },
      { name: "Meta Platforms", href: "/us-stocks/meta-meta-platforms-inc-share-price" },
      { name: "Tesla",       href: "/us-stocks/tsla-tesla-inc-share-price" },
      { name: "Netflix",     href: "/us-stocks/nflx-netflix-inc-share-price" },
    ],
    "Market Movers": [
      { name: "Top Gainers",           href: "/stock-market-live/top-gainers-today",       exchange: "NSE" },
      { name: "Top Losers",            href: "/stock-market-live/top-losers-today",        exchange: "NSE" },
      { name: "52W High",              href: "/stock-market-live/52-week-high-stocks" },
      { name: "52W Low",               href: "/stock-market-live/52-week-low-stocks" },
      { name: "Most Active by Value",  href: "/stock-market-live/most-active-by-value" },
      { name: "Most Active by Volume", href: "/stock-market-live/most-active-by-volume" },
    ],
    "Top Nifty 50 Stocks": [
      { name: "Reliance Industries", href: "/stocks/reliance-industries-ltd-share-price" },
      { name: "TCS",                 href: "/stocks/tcs-tata-consultancy-services-ltd-share-price" },
      { name: "HDFC Bank",           href: "/stocks/hdfc-bank-ltd-share-price" },
      { name: "ICICI Bank",          href: "/stocks/icici-bank-ltd-share-price" },
      { name: "Bharti Airtel",       href: "/stocks/bharti-airtel-ltd-share-price" },
      { name: "State Bank of India", href: "/stocks/state-bank-of-india-ltd-share-price" },
      { name: "Infosys",             href: "/stocks/infosys-ltd-share-price" },
      { name: "ITC",                 href: "/stocks/itc-ltd-share-price" },
    ],
    "Top Nifty Bank Stocks": [
      { name: "HDFC Bank",             href: "/stocks/hdfc-bank-ltd-share-price",             exchange: "NSE" },
      { name: "ICICI Bank",            href: "/stocks/icici-bank-ltd-share-price",            exchange: "NSE" },
      { name: "Axis Bank",             href: "/stocks/axis-bank-ltd-share-price",             exchange: "NSE" },
      { name: "Kotak Mahindra Bank",   href: "/stocks/kotak-mahindra-bank-ltd-share-price",   exchange: "NSE" },
      { name: "State Bank of India",   href: "/stocks/state-bank-of-india-ltd-share-price",   exchange: "NSE" },
      { name: "IndusInd Bank",         href: "/stocks/indusind-bank-ltd-share-price",         exchange: "NSE" },
      { name: "Bank of Baroda",        href: "/stocks/bank-of-baroda-ltd-share-price",        exchange: "NSE" },
    ],
    "Nifty Stocks": [
      { name: "Nifty 50",       href: "/nifty-stocks-list/nifty-50",       exchange: "NSE" },
      { name: "Nifty Next 50",  href: "/nifty-stocks-list/nifty-next-50",  exchange: "NSE" },
      { name: "Nifty Bank",     href: "/nifty-stocks-list/nifty-bank",     exchange: "NSE" },
      { name: "Finnifty",       href: "/nifty-stocks-list/nifty-fin-services", exchange: "NSE" },
      { name: "Nifty IT",       href: "/nifty-stocks-list/nifty-it",       exchange: "NSE" },
      { name: "Nifty Auto",     href: "/nifty-stocks-list/nifty-auto",     exchange: "NSE" },
      { name: "Nifty FMCG",     href: "/nifty-stocks-list/nifty-fmcg",     exchange: "NSE" },
      { name: "Nifty Pharma",   href: "/nifty-stocks-list/nifty-pharma",   exchange: "NSE" },
      { name: "Nifty Metal",    href: "/nifty-stocks-list/nifty-metal",    exchange: "NSE" },
      { name: "Nifty Energy",   href: "/nifty-stocks-list/nifty-energy",   exchange: "NSE" },
      { name: "Nifty Realty",   href: "/nifty-stocks-list/nifty-realty",   exchange: "NSE" },
    ],
    "Sensex Stocks": [
      { name: "BSE Sensex",     href: "/bse-stocks-list/bse-sensex",     exchange: "BSE" },
      { name: "BSE PSU",        href: "/bse-stocks-list/bse-psu",        exchange: "BSE" },
      { name: "BSE Healthcare", href: "/bse-stocks-list/bse-healthcare", exchange: "BSE" },
      { name: "BSE Bankex",     href: "/bse-stocks-list/bse-bankex",     exchange: "BSE" },
      { name: "BSE IT",         href: "/bse-stocks-list/bse-it",         exchange: "BSE" },
      { name: "BSE Large Cap",  href: "/bse-stocks-list/bse-large-cap",  exchange: "BSE" },
      { name: "BSE Mid Cap",    href: "/bse-stocks-list/bse-mid-cap",    exchange: "BSE" },
      { name: "BSE Small Cap",  href: "/bse-stocks-list/bse-small-cap",  exchange: "BSE" },
      { name: "BSE 100",        href: "/bse-stocks-list/bse-100",        exchange: "BSE" },
      { name: "BSE 500",        href: "/bse-stocks-list/bse-500",        exchange: "BSE" },
    ],
    "Stocks by Sector": [
      { name: "Bank Stocks",        href: "/stocks/sector/bank-stocks" },
      { name: "IT Stocks",          href: "/stocks/sector/it-software-stocks" },
      { name: "FMCG Stocks",        href: "/stocks/sector/fmcg-stocks" },
      { name: "Petroleum Stocks",   href: "/stocks/sector/refinery-stocks" },
      { name: "Engineering Stocks", href: "/stocks/sector/engineering-stocks" },
      { name: "Chemical Stocks",    href: "/stocks/sector/chemical-stocks" },
      { name: "Finance Stocks",     href: "/stocks/sector/finance-stocks" },
      { name: "Auto Stocks",        href: "/stocks/sector/automobile-stocks" },
      { name: "Pharma Stocks",      href: "/stocks/sector/pharmaceuticals-stocks" },
      { name: "Power Stocks",       href: "/stocks/sector/power-generation-stocks" },
      { name: "Cement Stocks",      href: "/stocks/sector/cement-stocks" },
    ],
    "Stocks by Group": [
      { name: "Tata Group Stocks",         href: "/stocks/market/tata-group-stocks" },
      { name: "Adani Group Stocks",        href: "/stocks/market/adani-group-stocks" },
      { name: "Mukesh Ambani Group Stocks",href: "/stocks/market/mukesh-ambani-group-stocks" },
      { name: "Anil Ambani Group Stocks",  href: "/stocks/market/anil-ambani-group-stocks" },
      { name: "Birla Group Stocks",        href: "/stocks/market/birla-group-stocks" },
      { name: "Bajaj Group Stocks",        href: "/stocks/market/bajaj-group-stocks" },
      { name: "HDFC Group Stocks",         href: "/stocks/market/hdfc-group-stocks" },
      { name: "ICICI Group Stocks",        href: "/stocks/market/icici-group-stocks" },
      { name: "Mahindra Group Stocks",     href: "/stocks/market/mahindra-group-stocks" },
    ],
    "Stocks by MarketCap": [
      { name: "Large Cap Stocks",       href: "/stocks/market/large-cap-stocks" },
      { name: "Mid Cap Stocks",         href: "/stocks/market/mid-cap-stocks" },
      { name: "Small Cap Stocks",       href: "/stocks/market/small-cap-stocks" },
      { name: "Micro Cap Stocks",       href: "/stocks/market/micro-cap-stocks" },
      { name: "Nano Cap Stocks",        href: "/stocks/market/nano-cap-stocks" },
      { name: "Top 100 Market Cap Stocks", href: "/stocks/market/top-100-market-cap-stocks" },
    ],
    "Popular Stocks": [
      { name: "Intraday Stocks",           href: "/stocks/market/intraday-stocks" },
      { name: "Penny Stocks",              href: "/stocks/market/penny-stocks" },
      { name: "Multibagger Stocks",        href: "/stocks/market/multibagger-stocks" },
      { name: "Dividend Stocks",           href: "/stocks/market/dividend-stocks" },
      { name: "High Return Stocks",        href: "/stocks/market/high-return-stocks" },
      { name: "High Growth Stocks",        href: "/stocks/market/high-growth-stocks" },
      { name: "All Time High Stocks",      href: "/stocks/market/all-time-high-stocks" },
      { name: "Undervalued Stocks",        href: "/stocks/market/undervalued-stocks" },
      { name: "Nifty 50 Gainers",          href: "/stocks/market/nifty-50-gainers" },
      { name: "Nifty 50 Losers",           href: "/stocks/market/nifty-50-losers" },
    ],
  },
  "F&O": {
    "Index Option Chain": [
      { name: "Nifty Bank Option Chain",           href: "/options/nifty-bank-option-chain",           exchange: "NSE" },
      { name: "Nifty 50 Option Chain",             href: "/options/nifty-50-option-chain",             exchange: "NSE" },
      { name: "Finnifty Option Chain",             href: "/options/finnifty-option-chain",             exchange: "NSE" },
      { name: "Nifty Midcap Select Option Chain",  href: "/options/nifty-midcap-select-option-chain",  exchange: "NSE" },
      { name: "Nifty Next 50 Option Chain",        href: "/options/nifty-next-50-option-chain",        exchange: "NSE" },
      { name: "Sensex Option Chain",               href: "/options/bse-sensex-option-chain",           exchange: "BSE" },
      { name: "Bankex Option Chain",               href: "/options/bse-bankex-option-chain",           exchange: "BSE" },
    ],
    "Index F&O": [
      { name: "Nifty Bank Options",             href: "/options/bank-nifty-options",              exchange: "NSE" },
      { name: "Nifty Bank Futures",             href: "/futures/bank-nifty-futures",              exchange: "NSE" },
      { name: "Finnifty Options",               href: "/options/finnifty-options",                exchange: "NSE" },
      { name: "Finnifty Futures",               href: "/futures/finnifty-futures",                exchange: "NSE" },
      { name: "Nifty Midcap Select Options",    href: "/options/nifty-midcap-select-options",     exchange: "NSE" },
      { name: "Nifty Midcap Select Futures",    href: "/futures/nifty-midcap-select-futures",     exchange: "NSE" },
      { name: "Nifty 50 Options",               href: "/options/nifty-50-options",                exchange: "NSE" },
      { name: "Nifty 50 Futures",               href: "/futures/nifty-50-futures",                exchange: "NSE" },
      { name: "Sensex Options",                 href: "/options/sensex-options",                  exchange: "BSE" },
      { name: "Sensex Futures",                 href: "/futures/sensex-futures",                  exchange: "BSE" },
      { name: "Bankex Options",                 href: "/options/bankex-options",                  exchange: "BSE" },
      { name: "Bankex Futures",                 href: "/futures/bankex-futures",                  exchange: "BSE" },
    ],
    "Stock Option Chain": [
      { name: "Reliance Option Chain",   href: "/options/reliance-industries-ltd-option-chain" },
      { name: "HDFC Option Chain",       href: "/options/hdfc-bank-ltd-option-chain" },
      { name: "TCS Option Chain",        href: "/options/tcs-tata-consultancy-services-ltd-option-chain" },
      { name: "ICICI Bank Option Chain", href: "/options/icici-bank-ltd-option-chain" },
      { name: "SBI Option Chain",        href: "/options/state-bank-of-india-ltd-option-chain" },
      { name: "Infosys Option Chain",    href: "/options/infosys-ltd-option-chain" },
      { name: "ITC Option Chain",        href: "/options/itc-ltd-option-chain" },
      { name: "Wipro Option Chain",      href: "/options/wipro-ltd-option-chain" },
    ],
    "Stock Futures": [
      { name: "Tata Motors Futures",  href: "/futures/tata-motors-ltd-futures-summary" },
      { name: "Reliance Futures",     href: "/futures/reliance-industries-ltd-futures-summary" },
      { name: "Tata Steel Futures",   href: "/futures/tata-steel-ltd-futures-summary" },
      { name: "SBI Futures",          href: "/futures/state-bank-of-india-ltd-futures-summary" },
      { name: "TCS Futures",          href: "/futures/tcs-tata-consultancy-services-ltd-futures-summary" },
      { name: "Infosys Futures",      href: "/futures/infosys-ltd-futures-summary" },
      { name: "ITC Futures",          href: "/futures/itc-ltd-futures-summary" },
      { name: "HDFC Futures",         href: "/futures/hdfc-bank-ltd-futures-summary" },
    ],
    "Stock Options": [
      { name: "HAL Options",          href: "/options/hal-hindustan-aeronautics-ltd-options-summary" },
      { name: "Tata Motors Options",  href: "/options/tata-motors-ltd-options-summary" },
      { name: "Reliance Options",     href: "/options/reliance-industries-ltd-options-summary" },
      { name: "SBI Options",          href: "/options/state-bank-of-india-ltd-options-summary" },
      { name: "Tata Steel Options",   href: "/options/tata-steel-ltd-options-summary" },
      { name: "Bajaj Finance Options",href: "/options/bajaj-finance-ltd-options-summary" },
      { name: "PNB Options",          href: "/options/punjab-national-bank-ltd-options-summary" },
    ],
    "Commodity Option Chain": [
      { name: "Crude Oil Options Chain",   href: "/commodity/options/crude-oil", exchange: "MCX" },
      { name: "Natural Gas Options Chain", href: "/commodity/options/natural-gas", exchange: "MCX" },
      { name: "Gold Options Chain",        href: "/commodity/options/gold", exchange: "MCX" },
      { name: "Silver Options Chain",      href: "/commodity/options/silver", exchange: "MCX" },
    ],
    "Commodity Futures": [
      { name: "Gold Futures",       href: "/commodity/futures/gold",         exchange: "MCX" },
      { name: "Natural Gas Futures",href: "/commodity/futures/natural-gas",  exchange: "MCX" },
      { name: "Crude Oil Futures",  href: "/commodity/futures/crude-oil",    exchange: "MCX" },
      { name: "Silver Futures",     href: "/commodity/futures/silver",       exchange: "MCX" },
      { name: "Copper Futures",     href: "/commodity/futures/copper",       exchange: "MCX" },
      { name: "Aluminium Futures",  href: "/commodity/futures/aluminium",    exchange: "MCX" },
      { name: "Zinc Futures",       href: "/commodity/futures/zinc",         exchange: "MCX" },
      { name: "Silver Mini Futures",href: "/commodity/futures/silver-mini",  exchange: "MCX" },
      { name: "Gold Mini Futures",  href: "/commodity/futures/gold-mini",    exchange: "MCX" },
    ],
  },
  "Mutual Funds": {
    "Equity Funds": [
      { name: "Large Cap Funds",     href: "/mutual-funds/equity-funds/large-cap-funds" },
      { name: "Bluechip Funds",      href: "/mutual-funds/equity-funds/bluechip-funds" },
      { name: "Mid Cap Funds",       href: "/mutual-funds/equity-funds/mid-cap-funds" },
      { name: "Focused Funds",       href: "/mutual-funds/equity-funds/focused-funds" },
      { name: "Small Cap Funds",     href: "/mutual-funds/equity-funds/small-cap-funds" },
      { name: "Sectoral Funds",      href: "/mutual-funds/equity-funds/sectoral-funds" },
      { name: "Flexi Cap Funds",     href: "/mutual-funds/equity-funds/flexi-cap-funds" },
      { name: "International Funds",href: "/mutual-funds/equity-funds/international-funds" },
      { name: "ELSS Funds",         href: "/mutual-funds/elss-funds" },
    ],
    "Debt Funds": [
      { name: "Liquid Funds",             href: "/mutual-funds/debt-funds/liquid-funds" },
      { name: "Credit Risk Funds",        href: "/mutual-funds/debt-funds/credit-risk-funds" },
      { name: "Banking & PSU Funds",      href: "/mutual-funds/debt-funds/banking-psu-funds" },
      { name: "Gilt Funds",               href: "/mutual-funds/debt-funds/gilt-funds" },
      { name: "Corporate Bond Funds",     href: "/mutual-funds/debt-funds/corporate-bond-funds" },
      { name: "Dynamic Bond Funds",       href: "/mutual-funds/debt-funds/dynamic-bond-funds" },
      { name: "Overnight Funds",          href: "/mutual-funds/debt-funds/overnight-funds" },
      { name: "Ultra Short Duration Funds", href: "/mutual-funds/debt-funds/ultra-short-duration-funds" },
    ],
    "Hybrid Funds": [
      { name: "Conservative Funds",          href: "/mutual-funds/hybrid-funds/conservative-funds" },
      { name: "Aggressive Funds",            href: "/mutual-funds/hybrid-funds/aggressive-funds" },
      { name: "Balanced Funds",              href: "/mutual-funds/hybrid-funds/balanced-funds" },
      { name: "Arbitrage Funds",             href: "/mutual-funds/hybrid-funds/arbitrage-funds" },
      { name: "Equity Savings Funds",        href: "/mutual-funds/hybrid-funds/equity-savings-funds" },
      { name: "Multi Asset Allocation Funds",href: "/mutual-funds/hybrid-funds/multi-asset-allocation-funds" },
    ],
    "Index Funds": [
      { name: "Nifty 50 Funds",      href: "/mutual-funds/index-funds/nifty-50-funds" },
      { name: "Nifty Next 50 Funds", href: "/mutual-funds/index-funds/nifty-next-50-funds" },
      { name: "Nifty Small Cap Funds", href: "/mutual-funds/index-funds/nifty-small-cap-funds" },
      { name: "Nifty Mid Cap Funds", href: "/mutual-funds/index-funds/nifty-mid-cap-funds" },
      { name: "Nifty Bank Funds",    href: "/mutual-funds/index-funds/nifty-bank-funds" },
      { name: "Sensex Funds",        href: "/mutual-funds/index-funds/sensex-funds" },
    ],
    "Mutual Funds AMCs": [
      { name: "SBI Mutual Funds",        href: "/mutual-funds/amc/sbi-mutual-fund" },
      { name: "ICICI Prudential Mutual Funds", href: "/mutual-funds/amc/icici-prudential-mutual-fund" },
      { name: "HDFC Mutual Funds",       href: "/mutual-funds/amc/hdfc-mutual-fund" },
      { name: "Nippon India Funds",      href: "/mutual-funds/amc/nippon-india-mutual-fund" },
      { name: "Kotak Mahindra Mutual Funds", href: "/mutual-funds/amc/kotak-mahindra-mutual-fund" },
      { name: "UTI Mutual Funds",        href: "/mutual-funds/amc/uti-mutual-fund" },
      { name: "Axis Mutual Funds",       href: "/mutual-funds/amc/axis-mutual-fund" },
      { name: "Mirae Asset Mutual Funds",href: "/mutual-funds/amc/mirae-asset-mutual-fund" },
    ],
    "Popular Mutual Funds": [
      { name: "SIP for Beginners",              href: "/mutual-funds/mf-to-invest/best-sip-for-beginners" },
      { name: "Mutual Funds in IT Sector",      href: "/mutual-funds/mf-to-invest/best-it-mutual-funds" },
      { name: "Mutual Funds for Long Term",     href: "/mutual-funds/mf-to-invest/best-long-term-mutual-funds" },
      { name: "Gold Mutual Funds",              href: "/mutual-funds/mf-to-invest/best-gold-mutual-funds" },
      { name: "Top Rated Mutual Funds",         href: "/mutual-funds/mf-to-invest/top-rated-mutual-funds" },
      { name: "Best SIP for 5 Years",           href: "/mutual-funds/mf-to-invest/best-sip-for-5-years" },
      { name: "Best Mutual Funds for SIP",      href: "/mutual-funds/mf-to-invest/best-mutual-funds-for-sip" },
      { name: "Best 80C Mutual Funds",          href: "/mutual-funds/mf-to-invest/best-80c-mutual-funds" },
    ],
    "Popular Schemes": [
      { name: "Motilal Oswal Midcap Fund",     href: "/mutual-funds/motilal-oswal-midcap-fund-direct-growth" },
      { name: "Quant Small Cap Fund",          href: "/mutual-funds/quant-small-cap-fund-direct-growth" },
      { name: "Nippon India Large Cap Fund",   href: "/mutual-funds/nippon-india-large-cap-fund-direct-growth" },
      { name: "Parag Parikh Flexi Cap Fund",   href: "/mutual-funds/parag-parikh-flexi-cap-fund-direct-growth" },
      { name: "ICICI Pru Bluechip Fund",       href: "/mutual-funds/icici-prudential-bluechip-fund-direct-growth" },
      { name: "Nippon India Small Cap Fund",   href: "/mutual-funds/nippon-india-small-cap-fund-direct-growth" },
      { name: "HDFC Mid Cap Fund",             href: "/mutual-funds/hdfc-midcap-opportunities-fund-direct-growth" },
    ],
  },
  "ETFs": {
    "Index ETFs": [
      { name: "Nifty 50 ETF",      href: "/etf/traded-funds/nifty-50-etfs",      exchange: "NSE" },
      { name: "Nifty Next 50 ETF", href: "/etf/traded-funds/nifty-next-50-etfs", exchange: "NSE" },
      { name: "Bank Nifty ETF",    href: "/etf/traded-funds/bank-nifty-etfs",    exchange: "NSE" },
      { name: "Nifty IT ETF",      href: "/etf/traded-funds/nifty-it-etfs",      exchange: "NSE" },
      { name: "Sensex ETF",        href: "/etf/traded-funds/sensex-etfs",        exchange: "BSE" },
    ],
    "Commodity ETFs": [
      { name: "Gold ETF",   href: "/etf/traded-funds/gold-etfs" },
      { name: "Silver ETF", href: "/etf/traded-funds/silver-etfs" },
    ],
    "Popular ETFs": [
      { name: "Best Index ETF",    href: "/etf/traded-funds/index-etfs" },
      { name: "International ETF", href: "/etf/traded-funds/international-etfs" },
      { name: "Commodity ETF",     href: "/etf/traded-funds/commodity-etfs" },
      { name: "Banking ETF",       href: "/etf/traded-funds/banking-etfs" },
      { name: "Defence ETF",       href: "/etf/traded-funds/defence-etfs" },
    ],
    "ETF AMCs": [
      { name: "Nippon ETFs",  href: "/etf/traded-funds/nippon-etf" },
      { name: "SBI ETFs",     href: "/etf/traded-funds/sbi-etf" },
      { name: "Tata ETFs",    href: "/etf/traded-funds/tata-etf" },
      { name: "Zerodha ETFs", href: "/etf/traded-funds/zerodha-etf" },
      { name: "ICICI ETFs",   href: "/etf/traded-funds/icici-etf" },
    ],
  },
  "Gold & Silver": {
    "Gold Prices": [
      { name: "Gold Rate in Mumbai",    href: "/gold-rates/gold-rate-today-in-mumbai" },
      { name: "Gold Rate in Delhi",     href: "/gold-rates/gold-rate-today-in-delhi" },
      { name: "Gold Rate in Chennai",   href: "/gold-rates/gold-rate-today-in-chennai" },
      { name: "Gold Rate in Kolkata",   href: "/gold-rates/gold-rate-today-in-kolkata" },
      { name: "Gold Rate in Bangalore", href: "/gold-rates/gold-rate-today-in-bangalore" },
      { name: "Gold Rate in Hyderabad", href: "/gold-rates/gold-rate-today-in-hyderabad" },
      { name: "Gold Rate in Ahmedabad", href: "/gold-rates/gold-rate-today-in-ahmedabad" },
      { name: "Gold Rate in Pune",      href: "/gold-rates/gold-rate-today-in-pune" },
    ],
    "Silver Prices": [
      { name: "Silver Rate in Mumbai",    href: "/silver-rates/silver-rate-today-in-mumbai" },
      { name: "Silver Rate in Delhi",     href: "/silver-rates/silver-rate-today-in-delhi" },
      { name: "Silver Rate in Chennai",   href: "/silver-rates/silver-rate-today-in-chennai" },
      { name: "Silver Rate in Kolkata",   href: "/silver-rates/silver-rate-today-in-kolkata" },
      { name: "Silver Rate in Bangalore", href: "/silver-rates/silver-rate-today-in-bangalore" },
      { name: "Silver Rate in Hyderabad", href: "/silver-rates/silver-rate-today-in-hyderabad" },
      { name: "Silver Rate in Ahmedabad", href: "/silver-rates/silver-rate-today-in-ahmedabad" },
      { name: "Silver Rate in Pune",      href: "/silver-rates/silver-rate-today-in-pune" },
    ],
  },
  "Tools": {
    "Calculators": [
      { name: "SIP Calculator",       href: "/mutual-funds" },
      { name: "Brokerage Calculator", href: "#" },
      { name: "MTF Calculator",       href: "/mtf" },
      { name: "CAGR Calculator",      href: "#" },
      { name: "Lumpsum Calculator",   href: "#" },
      { name: "Goal-based SIP",       href: "#" },
    ],
    "Screeners": [
      { name: "Stock Screener", href: "/stocks" },
      { name: "MF Screener",   href: "/mutual-funds" },
      { name: "Option Chain",  href: "/futures-options" },
      { name: "F&O Screener",  href: "/futures-options" },
      { name: "IPO Screener",  href: "/ipo" },
    ],
  },
}

function ExchangeBadge({ exchange }: { exchange: MktExchange }) {
  const styles: Record<MktExchange, string> = {
    NSE:    "bg-burgundy/10 text-burgundy",
    BSE:    "bg-blue-500/10 text-blue-600",
    MCX:    "bg-amber-500/10 text-amber-600",
    GLOBAL: "bg-slate-400/10 text-slate-500",
  }
  return (
    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-[3px] shrink-0 leading-none ${styles[exchange]}`}>
      {exchange}
    </span>
  )
}

// ── Standard nav sections (Support removed; Markets handled separately) ───

type NavSection = {
  id: string
  menu: MenuItem[]
  grid: boolean
  width: string
  rightAlign: boolean
  mobileGrid: boolean
}

const NAV_SECTIONS: NavSection[] = [
  { id: "Trade & Invest",     menu: TRADE_INVEST, grid: true,  width: "440px", rightAlign: false, mobileGrid: true  },
  { id: "Mutual Funds & SIP", menu: MF_SIP,       grid: false, width: "320px", rightAlign: false, mobileGrid: false },
  { id: "Products",           menu: PRODUCTS,     grid: false, width: "300px", rightAlign: false, mobileGrid: false },
  { id: "Learn & News",       menu: LEARN_NEWS,   grid: false, width: "280px", rightAlign: true,  mobileGrid: false },
]

const POPULAR_SEARCHES = [
  "Reliance", "HDFC Bank", "Tata Consultancy Services", "ICICI Bank", "Infosys", "Nifty 50 ETF",
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [marketsTab, setMarketsTab] = useState("Indices")
  const [marketsSub, setMarketsSub] = useState("Major Indices")
  const [mobileMktTab, setMobileMktTab] = useState("Indices")
  const [isMac, setIsMac] = useState<boolean | null>(null)
  const [searchIdx, setSearchIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSearchIdx((i) => (i + 1) % POPULAR_SEARCHES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent))
  }, [])

  const switchMarketsTab = (tab: string) => {
    setMarketsTab(tab)
    setMarketsSub(MARKETS_SUBS[tab][0])
  }

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section)
  }

  useEffect(() => {
    if (activeDropdown !== "Markets") {
      setMarketsTab("Indices")
      setMarketsSub("Major Indices")
    }
  }, [activeDropdown])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-background/80 backdrop-blur-sm"
        }`}
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/favicon.jpg"
                alt="Shree Varahi"
                width={40}
                height={40}
                className="rounded-[5px] object-contain"
                priority
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight">
                  Shree Varahi
                </span>
                <span className="text-[10px] text-gold-deep font-medium">by Lakshmishree</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">

              {/* Trade & Invest · Mutual Funds & SIP */}
              {NAV_SECTIONS.slice(0, 2).map((section) => (
                <div key={section.id} className="relative"
                  onMouseEnter={() => setActiveDropdown(section.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-foreground hover:text-burgundy transition-colors whitespace-nowrap">
                    {section.id}
                    <ChevronDown className="h-3 w-3 shrink-0" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === section.id && (
                      <motion.div key="dropdown" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                        style={{ width: section.width }}
                        className={`absolute top-full mt-2 rounded-[5px] bg-background border border-border p-3 shadow-xl ${section.rightAlign ? "right-0" : "left-0"}`}
                      >
                        <div className={section.grid ? "grid grid-cols-2 gap-2" : "flex flex-col gap-0.5"}>
                          {section.menu.map((menuItem) => (
                            <Link key={menuItem.title} href={menuItem.href} className="flex items-start gap-3 rounded-[5px] p-2.5 hover:bg-secondary transition-colors">
                              <span className="text-xl flex items-center justify-center h-6 w-6 shrink-0">{menuItem.icon}</span>
                              <div>
                                <div className="font-semibold text-foreground text-sm leading-tight">{menuItem.title}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{menuItem.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Markets — mega dropdown */}
              <div className="relative"
                onMouseEnter={() => setActiveDropdown("Markets")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-foreground hover:text-burgundy transition-colors whitespace-nowrap">
                  Markets
                  <ChevronDown className="h-3 w-3 shrink-0" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "Markets" && (
                    <motion.div key="markets-mega" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-[700px] rounded-[8px] bg-background border border-border shadow-2xl overflow-hidden"
                    >
                      {/* Tab bar */}
                      <div className="flex border-b border-border overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                        {MARKETS_TABS.map((t) => (
                          <button key={t} onMouseEnter={() => switchMarketsTab(t)}
                            className={`px-4 py-2.5 text-[11px] font-bold whitespace-nowrap transition-all ${marketsTab === t ? "bg-burgundy text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}
                          >{t}</button>
                        ))}
                      </div>
                      {/* Body: sidebar + content */}
                      <div className="flex" style={{ height: 260 }}>
                        <div className="w-[160px] border-r border-border shrink-0 py-2" style={{ background: "var(--cream, #FAF8F5)" }}>
                          {MARKETS_SUBS[marketsTab].map((sub) => (
                            <button key={sub} onMouseEnter={() => setMarketsSub(sub)}
                              className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold flex items-center justify-between transition-all ${marketsSub === sub ? "text-burgundy" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"}`}
                            >
                              <span>{sub}</span>
                              {marketsSub === sub && <ChevronRight className="w-3 h-3 shrink-0 text-burgundy" />}
                            </button>
                          ))}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                            {(MARKETS_DATA[marketsTab]?.[marketsSub] ?? []).map((mkt) => (
                              <Link key={mkt.name} href={mkt.href} className="flex items-center gap-2 py-1.5 px-2 rounded-[4px] hover:bg-secondary/60 group transition-colors">
                                {mkt.exchange && <ExchangeBadge exchange={mkt.exchange} />}
                                <span className="text-[13px] font-medium text-foreground/80 group-hover:text-burgundy transition-colors truncate">{mkt.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Footer */}
                      <div className="border-t border-border px-5 py-2.5 flex items-center justify-between bg-secondary/30">
                        <span className="text-[11px] text-muted-foreground font-medium">Live market data powered by NSE &amp; BSE feeds</span>
                        <Link href="/stocks" className="text-[11px] font-bold text-burgundy hover:underline flex items-center gap-1">
                          View all markets <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products · Learn & News */}
              {NAV_SECTIONS.slice(2).map((section) => (
                <div key={section.id} className="relative"
                  onMouseEnter={() => setActiveDropdown(section.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-foreground hover:text-burgundy transition-colors whitespace-nowrap">
                    {section.id}
                    <ChevronDown className="h-3 w-3 shrink-0" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === section.id && (
                      <motion.div key="dropdown" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                        style={{ width: section.width }}
                        className={`absolute top-full mt-2 rounded-[5px] bg-background border border-border p-3 shadow-xl ${section.rightAlign ? "right-0" : "left-0"}`}
                      >
                        <div className={section.grid ? "grid grid-cols-2 gap-2" : "flex flex-col gap-0.5"}>
                          {section.menu.map((menuItem) => (
                            <Link key={menuItem.title} href={menuItem.href} className="flex items-start gap-3 rounded-[5px] p-2.5 hover:bg-secondary transition-colors">
                              <span className="text-xl flex items-center justify-center h-6 w-6 shrink-0">{menuItem.icon}</span>
                              <div>
                                <div className="font-semibold text-foreground text-sm leading-tight">{menuItem.title}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{menuItem.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-between w-[280px] xl:w-[340px] h-10 px-4 rounded-[6px] bg-cream border border-border hover:border-gold/40 hover:bg-beige/35 hover:shadow-[0_2px_8px_rgba(217,178,124,0.06)] transition-all text-xs text-slate-500 font-medium"
              >
                <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  <Search className="h-3.5 w-3.5 shrink-0" />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap shrink-0">Search</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={searchIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {POPULAR_SEARCHES[searchIdx]}...
                    </motion.span>
                  </AnimatePresence>
                </div>
                {isMac !== null && (
                  <kbd className="px-1.5 py-0.5 rounded-[3px] bg-background border border-border text-[9px] font-sans font-normal shrink-0">
                    {isMac ? "⌘K" : "Ctrl K"}
                  </kbd>
                )}
              </button>
              <Button variant="ghost" className="text-foreground hover:text-burgundy rounded-[5px]" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-burgundy hover:bg-burgundy-deep text-primary-foreground rounded-[5px]" asChild>
                <Link href="/signup/register">Open Free Account</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-[5px] hover:bg-secondary"
              >
                <Search className="h-5 w-5 text-foreground" />
              </button>
              <button
                className="p-2 rounded-[5px] hover:bg-secondary"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Popup */}
      <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Mobile Menu ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-[400px] bg-background z-[70] lg:hidden flex flex-col shadow-2xl"
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <Image
                    src="/favicon.jpg"
                    alt="Shree Varahi"
                    width={34}
                    height={34}
                    className="rounded-[5px] object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground leading-tight">Shree Varahi</span>
                    <span className="text-[9px] text-gold-deep font-medium">by Lakshmishree</span>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-[6px] hover:bg-secondary transition-colors"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* ── Search ── */}
              <div className="px-4 py-3 border-b border-border shrink-0">
                <button
                  onClick={() => { setSearchOpen(true); setMobileMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 h-10 px-4 rounded-[6px] bg-secondary border border-border text-xs text-muted-foreground font-medium text-left hover:border-burgundy/30 transition-colors"
                >
                  <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span>Search stocks, funds, IPOs…</span>
                </button>
              </div>

              {/* ── Scrollable body ── */}
              <div className="flex-1 overflow-y-auto overscroll-contain">

                {/* Quick access grid */}
                <div className="px-4 pt-4 pb-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Quick Access
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Stocks",       href: "/stocks",                    icon: <TrendingUp className="w-4 h-4" /> },
                      { label: "Mutual Funds", href: "/mutual-funds",              icon: <Landmark className="w-4 h-4" /> },
                      { label: "IPO",          href: "/ipo",                       icon: <Target className="w-4 h-4" /> },
                      { label: "F&O",          href: "/futures-options",           icon: <PieChart className="w-4 h-4" /> },
                      { label: "Nifty 50",     href: "/markets/indices/nifty-50",  icon: <BarChart2 className="w-4 h-4" /> },
                      { label: "ETF",          href: "/etf",                       icon: <Layers className="w-4 h-4" /> },
                      { label: "Commodity",    href: "/commodity",                 icon: <Box className="w-4 h-4" /> },
                    ].map((q) => (
                      <Link
                        key={q.label}
                        href={q.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-[7px] border border-border hover:border-burgundy/40 hover:bg-burgundy/[0.04] transition-all group"
                      >
                        <span className="text-[#8B0D19]">{q.icon}</span>
                        <span className="text-[10px] font-semibold text-foreground text-center leading-tight">{q.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border mx-4" />

                {/* ── Nav section accordions: Trade & Invest · Mutual Funds & SIP ── */}
                {NAV_SECTIONS.slice(0, 2).map((section) => (
                  <div key={section.id} className="border-b border-border">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            expandedSection === section.id ? "bg-burgundy" : "bg-border"
                          }`}
                        />
                        <span className={`text-sm font-semibold transition-colors ${expandedSection === section.id ? "text-burgundy" : "text-foreground"}`}>
                          {section.id}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedSection === section.id && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          {section.mobileGrid ? (
                            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                              {section.menu.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-2.5 p-2.5 rounded-[6px] border border-border/60 hover:border-burgundy/30 hover:bg-burgundy/[0.03] transition-all"
                                >
                                  <span className="text-base shrink-0 flex items-center justify-center w-5 h-5">{item.icon}</span>
                                  <div className="min-w-0">
                                    <div className="text-[11px] font-bold text-foreground truncate leading-tight">{item.title}</div>
                                    <div className="text-[9px] text-muted-foreground truncate mt-0.5">{item.desc}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="pb-2">
                              {section.menu.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center justify-between px-5 py-3 hover:bg-secondary/40 transition-colors group"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-base flex items-center justify-center w-5 h-5 shrink-0">{item.icon}</span>
                                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-burgundy transition-colors" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* ── Markets accordion ── */}
                <div className="border-b border-border">
                  <button onClick={() => toggleSection("Markets")}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${expandedSection === "Markets" ? "bg-burgundy" : "bg-border"}`} />
                      <span className={`text-sm font-semibold transition-colors ${expandedSection === "Markets" ? "text-burgundy" : "text-foreground"}`}>
                        Markets
                      </span>
                    </div>
                    <motion.div animate={{ rotate: expandedSection === "Markets" ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedSection === "Markets" && (
                      <motion.div key="markets-content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden"
                      >
                        {/* Tab pills */}
                        <div className="px-4 pt-1 pb-3">
                          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                            {MARKETS_TABS.map((t) => (
                              <button key={t} onClick={() => setMobileMktTab(t)}
                                className={`px-3 py-1.5 text-[11px] font-bold rounded-full whitespace-nowrap shrink-0 transition-all ${mobileMktTab === t ? "bg-burgundy text-white shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                              >{t}</button>
                            ))}
                          </div>
                        </div>
                        {/* Items grouped by sub-category */}
                        <div className="px-4 pb-4 space-y-3">
                          {Object.entries(MARKETS_DATA[mobileMktTab] ?? {}).map(([subName, items]) => (
                            <div key={subName}>
                              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 px-1 mb-1.5">{subName}</p>
                              <div className="grid grid-cols-2 gap-1">
                                {items.map((item) => (
                                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-[5px] hover:bg-secondary transition-colors group"
                                  >
                                    {item.exchange && (
                                      <span className={`text-[7px] font-black px-1 py-0.5 rounded-[2px] shrink-0 leading-none ${
                                        item.exchange === "NSE"    ? "bg-burgundy/10 text-burgundy" :
                                        item.exchange === "BSE"    ? "bg-blue-500/10 text-blue-600" :
                                        item.exchange === "MCX"    ? "bg-amber-500/10 text-amber-600" :
                                                                     "bg-slate-400/10 text-slate-500"
                                      }`}>{item.exchange}</span>
                                    )}
                                    <span className="text-[12px] font-medium text-foreground/80 group-hover:text-burgundy transition-colors truncate">{item.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Products · Learn & News ── */}
                {NAV_SECTIONS.slice(2).map((section) => (
                  <div key={section.id} className="border-b border-border">
                    <button onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${expandedSection === section.id ? "bg-burgundy" : "bg-border"}`} />
                        <span className={`text-sm font-semibold transition-colors ${expandedSection === section.id ? "text-burgundy" : "text-foreground"}`}>
                          {section.id}
                        </span>
                      </div>
                      <motion.div animate={{ rotate: expandedSection === section.id ? 180 : 0 }} transition={{ duration: 0.22 }}>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedSection === section.id && (
                        <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden"
                        >
                          <div className="pb-2">
                            {section.menu.map((item) => (
                              <Link key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 hover:bg-secondary/40 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-base flex items-center justify-center w-5 h-5 shrink-0">{item.icon}</span>
                                  <span className="text-sm font-medium text-foreground">{item.title}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-burgundy transition-colors" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Bottom spacer so content clears the fixed footer */}
                <div className="h-4" />
              </div>

              {/* ── Fixed footer CTA ── */}
              <div className="shrink-0 border-t border-border bg-background px-4 py-4 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="outline"
                    className="border-border text-foreground rounded-[5px] h-10 font-semibold"
                    asChild
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    className="bg-burgundy hover:bg-burgundy-deep text-white rounded-[5px] h-10 font-bold"
                    asChild
                  >
                    <Link href="/signup/register" onClick={() => setMobileMenuOpen(false)}>
                      Open Account
                    </Link>
                  </Button>
                </div>
                <p className="text-center text-[10px] text-muted-foreground">
                  ₹0 account opening · ₹0 AMC · SEBI registered
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
