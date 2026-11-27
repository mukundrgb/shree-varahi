'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

const MONTHS_OPTIONS = [3, 6, 9, 12];

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [selectedMonths, setSelectedMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlySavings, setMonthlySavings] = useState(10000);

  const { targetFund, deficit, monthsToGoal } = useMemo(() => {
    const target = monthlyExpenses * selectedMonths;
    const def = Math.max(0, target - currentSavings);
    const months = monthlySavings > 0 ? Math.ceil(def / monthlySavings) : 0;
    return { targetFund: target, deficit: def, monthsToGoal: months };
  }, [monthlyExpenses, selectedMonths, currentSavings, monthlySavings]);

  const progressPct = Math.min(100, (currentSavings / targetFund) * 100);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full space-y-1">
        <SliderInput label="Monthly Expenses" value={monthlyExpenses} min={5000} max={500000} step={5000} prefix="₹" onChange={setMonthlyExpenses} formatDisplay={v => abbreviate(v)} />
        
        {/* Months selector */}
        <div className="mb-5">
          <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Months of Cover</label>
          <div className="flex gap-2 mt-2">
            {MONTHS_OPTIONS.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMonths(m)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: selectedMonths === m ? 'var(--grad-accent)' : 'var(--bg-surface)',
                  color: selectedMonths === m ? 'white' : 'var(--text-muted)',
                  border: `1px solid ${selectedMonths === m ? 'transparent' : 'var(--border)'}`,
                  boxShadow: selectedMonths === m ? 'var(--shadow-accent)' : 'none',
                }}>
                {m} months
              </button>
            ))}
          </div>
        </div>

        <SliderInput label="Current Savings" value={currentSavings} min={0} max={5000000} step={10000} prefix="₹" onChange={setCurrentSavings} formatDisplay={v => abbreviate(v)} accentColor="var(--positive)" />
        <SliderInput label="Monthly Savings Contribution" value={monthlySavings} min={500} max={100000} step={500} prefix="₹" onChange={setMonthlySavings} />

        <ResultCard results={[
          { label: 'Target Emergency Fund', value: targetFund, prefix: '₹' },
          { label: 'Current Savings', value: currentSavings, prefix: '₹' },
          { label: 'Shortfall', value: deficit, prefix: '₹' },
          { label: 'Months to Goal', value: monthsToGoal, highlight: true, formatFn: v => deficit === 0 ? '✓ Achieved!' : `${v} months` },
        ]} />
      </div>

      {/* Progress visual */}
      <div className="w-full lg:w-52 flex-shrink-0 flex flex-col items-center gap-4 mt-4 lg:mt-0">
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke={progressPct >= 100 ? 'var(--positive)' : 'var(--accent)'}
              strokeWidth="8"
              strokeDasharray={`${progressPct * 2.513} 251.3`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: progressPct >= 100 ? 'var(--positive)' : 'var(--accent)' }}>
              {Math.round(progressPct)}%
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 600 }}>FUNDED</p>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', lineHeight: 1.55 }}>
          {deficit === 0 ? '🎉 You\'ve fully funded your emergency fund!' : `${abbreviate(deficit)} more needed`}
        </p>
      </div>
    </div>
  );
}
