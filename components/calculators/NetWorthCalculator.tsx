'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

const ASSET_CATEGORIES = [
  { key: 'cash', label: 'Cash & Bank Savings', default: 200000 },
  { key: 'investments', label: 'Stocks & Mutual Funds', default: 500000 },
  { key: 'property', label: 'Real Estate Value', default: 3000000 },
  { key: 'gold', label: 'Gold & Jewellery', default: 200000 },
];

const LIABILITY_CATEGORIES = [
  { key: 'homeloan', label: 'Home Loan Outstanding', default: 1500000 },
  { key: 'carloan', label: 'Car / Personal Loan', default: 200000 },
  { key: 'creditcard', label: 'Credit Card Dues', default: 50000 },
];

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<Record<string, number>>({
    cash: 200000, investments: 500000, property: 3000000, gold: 200000,
  });
  const [liabilities, setLiabilities] = useState<Record<string, number>>({
    homeloan: 1500000, carloan: 200000, creditcard: 50000,
  });

  const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
    const ta = Object.values(assets).reduce((a, b) => a + b, 0);
    const tl = Object.values(liabilities).reduce((a, b) => a + b, 0);
    return { totalAssets: ta, totalLiabilities: tl, netWorth: ta - tl };
  }, [assets, liabilities]);

  const isPositive = netWorth >= 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Assets */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--positive)', marginBottom: 16 }}>
            ✓ Assets
          </h3>
          {ASSET_CATEGORIES.map(cat => (
            <SliderInput
              key={cat.key}
              label={cat.label}
              value={assets[cat.key]}
              min={0}
              max={10000000}
              step={50000}
              prefix="₹"
              onChange={v => setAssets(prev => ({ ...prev, [cat.key]: v }))}
              formatDisplay={v => abbreviate(v)}
              accentColor="var(--positive)"
            />
          ))}
          <div className="mt-2 p-3 rounded-xl" style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Total Assets:</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--positive)', fontSize: 18, marginLeft: 12 }}>
              {abbreviate(totalAssets)}
            </span>
          </div>
        </div>

        {/* Liabilities */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 16 }}>
            − Liabilities
          </h3>
          {LIABILITY_CATEGORIES.map(cat => (
            <SliderInput
              key={cat.key}
              label={cat.label}
              value={liabilities[cat.key]}
              min={0}
              max={5000000}
              step={50000}
              prefix="₹"
              onChange={v => setLiabilities(prev => ({ ...prev, [cat.key]: v }))}
              formatDisplay={v => abbreviate(v)}
              accentColor="#DC2626"
            />
          ))}
          <div className="mt-2 p-3 rounded-xl" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Total Liabilities:</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)', fontSize: 18, marginLeft: 12 }}>
              {abbreviate(totalLiabilities)}
            </span>
          </div>
        </div>
      </div>

      {/* Net Worth Result */}
      <div className="mt-2 p-5 rounded-2xl text-center"
        style={{
          background: isPositive ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)',
          border: `1.5px solid ${isPositive ? 'rgba(5,150,105,0.3)' : 'rgba(220,38,38,0.3)'}`,
        }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 4 }}>Your Net Worth</p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: isPositive ? 'var(--positive)' : 'var(--accent)', letterSpacing: '-0.02em' }}>
          {isPositive ? '' : '−'}{abbreviate(Math.abs(netWorth))}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>
          {isPositive ? 'You have a healthy positive net worth 🎉' : 'Focus on paying off debts to build wealth'}
        </p>
      </div>
    </div>
  );
}
