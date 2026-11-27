// ═══════════════════════════════════════════
// All TypeScript Types & Interfaces
// ═══════════════════════════════════════════

import type { ElementType } from 'react';

export type CalculatorId =
  // Investment
  | 'sip' | 'lumpsum' | 'swp' | 'mf-returns'
  | 'cagr' | 'xirr' | 'roi' | 'stock-average' | 'inflation' | 'brokerage'
  | 'goal-sip' | 'dividend-yield' | 'net-worth'
  // Savings
  | 'ppf' | 'epf' | 'fd' | 'rd' | 'nsc' | 'ssy' | 'nps' | 'scss-calculator' | 'po-mis'
  | 'emergency-fund'
  // Loans
  | 'emi-calculator' | 'car-loan-emi-calculator' | 'home-loan-emi-calculator' | 'flat-vs-reducing-rate-calculator' | 'loan-prepayment'
  // Tax & Salary
  | 'income-tax-calculator' | 'hra-calculator' | 'gratuity-calculator' | 'tds-calculator' | 'salary-calculator'
  // Other
  | 'simple-interest' | 'compound-interest' | 'gst' | 'apy' | 'margin' | 'retirement';

export interface CalculatorMeta {
  id: CalculatorId;
  name: string;
  category: string;
  icon: ElementType;
  description: string;
  hidden?: boolean;
}

export interface CalculatorCategory {
  name: string;
  icon: ElementType;
  calculators: CalculatorMeta[];
}

// ── Shared result types ──
export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

// ── Yearly growth table ──
export interface YearlyRow {
  year: number;
  invested: number;
  returns: number;
  total: number;
}
