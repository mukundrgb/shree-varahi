'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CalculatorId } from '@/lib/calculators/types';
import { OPEN_ACCOUNT_URL } from '@/lib/external-links';
import { ALL_CALCULATORS, CALCULATOR_CATEGORIES } from '@/lib/calculators/constants';
import CalculatorDetails from '@/components/calculators/details/CalculatorDetails';

import { MdArrowBack, MdTrendingUp, MdArrowForward, MdOpenInNew } from 'react-icons/md';

// Lazy-load all calculators
const calculatorMap: Record<CalculatorId, React.ComponentType> = {
  'sip':               dynamic(() => import('@/components/calculators/SIPCalculator')),
  'lumpsum':           dynamic(() => import('@/components/calculators/LumpsumCalculator')),
  'swp':               dynamic(() => import('@/components/calculators/SWPCalculator')),
  'mf-returns':        dynamic(() => import('@/components/calculators/MutualFundReturnsCalculator')),
  'cagr':              dynamic(() => import('@/components/calculators/CAGRCalculator')),
  'xirr':              dynamic(() => import('@/components/calculators/XIRRCalculator')),
  'roi':               dynamic(() => import('@/components/calculators/ROICalculator')),
  'stock-average':     dynamic(() => import('@/components/calculators/StockAverageCalculator')),
  'inflation':         dynamic(() => import('@/components/calculators/InflationCalculator')),
  'brokerage':         dynamic(() => import('@/components/calculators/BrokerageCalculator')),
  'goal-sip':          dynamic(() => import('@/components/calculators/GoalSIPCalculator')),
  'dividend-yield':    dynamic(() => import('@/components/calculators/DividendYieldCalculator')),
  'net-worth':         dynamic(() => import('@/components/calculators/NetWorthCalculator')),
  'ppf':               dynamic(() => import('@/components/calculators/PPFCalculator')),
  'epf':               dynamic(() => import('@/components/calculators/EPFCalculator')),
  'fd':                dynamic(() => import('@/components/calculators/FDCalculator')),
  'rd':                dynamic(() => import('@/components/calculators/RDCalculator')),
  'nsc':               dynamic(() => import('@/components/calculators/NSCCalculator')),
  'ssy':               dynamic(() => import('@/components/calculators/SSYCalculator')),
  'nps':               dynamic(() => import('@/components/calculators/NPSCalculator')),
  'scss-calculator':   dynamic(() => import('@/components/calculators/SCSSCalculator')),
  'po-mis':            dynamic(() => import('@/components/calculators/PostOfficeMISCalculator')),
  'emergency-fund':    dynamic(() => import('@/components/calculators/EmergencyFundCalculator')),
  'emi-calculator':               dynamic(() => import('@/components/calculators/EMICalculator')),
  'car-loan-emi-calculator':          dynamic(() => import('@/components/calculators/CarLoanEMICalculator')),
  'home-loan-emi-calculator':         dynamic(() => import('@/components/calculators/HomeLoanEMICalculator')),
  'flat-vs-reducing-rate-calculator':  dynamic(() => import('@/components/calculators/FlatVsReducingRateCalculator')),
  'loan-prepayment':   dynamic(() => import('@/components/calculators/LoanPrepaymentCalculator')),
  'income-tax-calculator':        dynamic(() => import('@/components/calculators/IncomeTaxCalculator')),
  'hra-calculator':               dynamic(() => import('@/components/calculators/HRACalculator')),
  'gratuity-calculator':          dynamic(() => import('@/components/calculators/GratuityCalculator')),
  'tds-calculator':               dynamic(() => import('@/components/calculators/TDSCalculator')),
  'salary-calculator':            dynamic(() => import('@/components/calculators/SalaryCalculator')),
  'simple-interest':   dynamic(() => import('@/components/calculators/SimpleInterestCalculator')),
  'compound-interest': dynamic(() => import('@/components/calculators/CompoundInterestCalculator')),
  'gst':               dynamic(() => import('@/components/calculators/GSTCalculator')),
  'apy':               dynamic(() => import('@/components/calculators/APYCalculator')),
  'margin':            dynamic(() => import('@/components/calculators/MarginCalculator')),
  'retirement':        dynamic(() => import('@/components/calculators/RetirementCalculator')),
};

const CATEGORY_ACCENT: Record<string, { accent: string; bg: string; glow: string }> = {
  'Investment':   { accent: '#C8102E', bg: 'rgba(200,16,46,0.07)',   glow: 'rgba(200,16,46,0.12)'  },
  'Savings':      { accent: '#059669', bg: 'rgba(5,150,105,0.07)',   glow: 'rgba(5,150,105,0.12)'  },
  'Loans':        { accent: '#D97706', bg: 'rgba(217,119,6,0.07)',   glow: 'rgba(217,119,6,0.12)'  },
  'Tax & Salary': { accent: '#7C3AED', bg: 'rgba(124,58,237,0.07)',  glow: 'rgba(124,58,237,0.12)' },
  'Other':        { accent: '#0369A1', bg: 'rgba(3,105,161,0.07)',   glow: 'rgba(3,105,161,0.12)'  },
};

export default function CalculatorView({ id }: { id: string }) {
  const activeId = id as CalculatorId;
  const meta = ALL_CALCULATORS.find(c => c.id === activeId);
  const ActiveCalculator = calculatorMap[activeId];

  if (!meta || !ActiveCalculator) notFound();

  const catColor = CATEGORY_ACCENT[meta.category] ?? CATEGORY_ACCENT['Investment'];

  // Sidebar calculators
  const popularIds = ['sip', 'lumpsum', 'emi-calculator', 'fd', 'income-tax-calculator', 'ppf'];
  const sidebarCalcs = ALL_CALCULATORS
    .filter(c => popularIds.includes(c.id) && c.id !== activeId && !c.hidden)
    .slice(0, 5);

  // Related same-category
  const sameCat = CALCULATOR_CATEGORIES.find(c => c.name === meta.category);
  const relatedCalcs = (sameCat?.calculators ?? [])
    .filter(c => c.id !== activeId && !c.hidden)
    .slice(0, 4);

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>

      {/* ── Top Nav Bar ── */}
      <div
        className="sticky top-16 z-30"
        style={{
          background: 'rgba(250,248,245,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-3">
          <Link
            href="/calculators"
            className="flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:text-accent"
            style={{ color: 'var(--text-muted)' }}
          >
            <MdArrowBack style={{ fontSize: 16 }} />
            <span>Calculators</span>
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>›</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>{meta.name}</span>

          <div className="ml-auto">
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
              style={{ background: catColor.bg, color: catColor.accent, border: `1px solid ${catColor.accent}30` }}
            >
              {meta.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Page Header ── */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl text-xl flex-shrink-0"
              style={{
                background: catColor.bg,
                color: catColor.accent,
                border: `1.5px solid ${catColor.accent}25`,
                boxShadow: `0 4px 16px ${catColor.glow}`,
              }}
            >
              <meta.icon />
            </div>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  color: 'var(--text-primary)',
                }}
              >
                {meta.name}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 3 }}>{meta.description}</p>
            </div>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left: Calculator + Details */}
          <div className="flex-1 w-full min-w-0">
            {/* Calculator Card */}
            <div
              className="animate-fade-up rounded-[5px] p-5 md:p-6 mb-6"
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              }}
            >
              <ActiveCalculator />
            </div>

            {/* Educational Content */}
            <CalculatorDetails id={activeId} />
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-5 animate-slide-right">

            {/* CTA Card */}
            <div
              className="rounded-[5px] p-5 relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,0,0,0.04), rgba(255,0,0,0.01))',
                border: '1px solid rgba(255,0,0,0.15)',
              }}
            >
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.08), transparent)' }} />
              <div className="relative">
                <div className="w-10 h-10 rounded-[5px] flex items-center justify-center mb-3"
                  style={{ background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.15)' }}>
                  <MdTrendingUp style={{ color: '#FF0000', fontSize: 20 }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Start Investing Today
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
                  Turn your calculations into real wealth. Start a SIP with as little as ₹500/month.
                </p>
                <a
                  href={OPEN_ACCOUNT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-[5px] text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-colors hover:brightness-95"
                  style={{ background: '#FF0000', color: 'white', fontWeight: 600, boxShadow: '0 2px 8px rgba(255,0,0,0.2)' }}
                >
                  <span>Invest Now</span>
                  <MdOpenInNew style={{ fontSize: 15 }} />
                </a>
              </div>
            </div>

            {/* Popular Calculators */}
            <div
              className="rounded-[5px] overflow-hidden"
              style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
            >
              <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--border)', background: '#FAF8F5' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Popular Calculators
                </h3>
              </div>
              <div className="flex flex-col">
                {sidebarCalcs.map((calc, idx) => {
                  const cc = CATEGORY_ACCENT[calc.category] ?? CATEGORY_ACCENT['Investment'];
                  return (
                    <Link
                      key={calc.id}
                      href={`/calculators/${calc.id}`}
                      className="group flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#FAF8F5]"
                      style={{ borderBottom: idx !== sidebarCalcs.length - 1 ? '1px solid var(--border)' : 'none' }}
                    >
                      <div className="w-7 h-7 rounded-[4px] flex items-center justify-center flex-shrink-0 text-sm transition-transform group-hover:scale-110"
                        style={{ background: cc.bg, color: cc.accent }}>
                        <calc.icon />
                      </div>
                      <span className="text-[13px] font-medium flex-1 transition-colors group-hover:text-[#FF0000]"
                        style={{ color: 'var(--text-secondary)' }}>
                        {calc.name}
                      </span>
                      <MdArrowForward className="opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                        style={{ color: 'var(--text-muted)' }} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Related same-category */}
            {relatedCalcs.length > 0 && (
              <div
                className="rounded-[5px] overflow-hidden"
                style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
              >
                <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--border)', background: '#FAF8F5' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Related · {meta.category}
                  </h3>
                </div>
                <div className="flex flex-col">
                  {relatedCalcs.map((calc, idx) => (
                    <Link
                      key={calc.id}
                      href={`/calculators/${calc.id}`}
                      className="group flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#FAF8F5]"
                      style={{ borderBottom: idx !== relatedCalcs.length - 1 ? '1px solid var(--border)' : 'none' }}
                    >
                      <div className="w-7 h-7 rounded-[4px] flex items-center justify-center flex-shrink-0 text-sm transition-transform group-hover:scale-110"
                        style={{ background: catColor.bg, color: catColor.accent }}>
                        <calc.icon />
                      </div>
                      <span className="text-[13px] font-medium flex-1 transition-colors group-hover:text-[#FF0000]"
                        style={{ color: 'var(--text-secondary)' }}>
                        {calc.name}
                      </span>
                      <MdArrowForward className="opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                        style={{ color: 'var(--text-muted)' }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
