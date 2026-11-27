'use client';
import { useState } from 'react';
import ResultCard from '@/components/calculators/ui/ResultCard';

interface CashFlow { date: string; amount: string | number; }

export default function XIRRCalculator() {
  const [cashflows, setCashflows] = useState<CashFlow[]>([
    { date: '2020-01-01', amount: -100000 },
    { date: '2021-01-01', amount: -50000 },
    { date: '2023-01-01', amount: 200000 },
  ]);

  // Newton-Raphson XIRR
  const calcXIRR = () => {
    const valid = cashflows.filter(c => c.date && !isNaN(parseFloat(c.amount as string)));
    if (valid.length < 2) return 0;
    
    let hasPos = false, hasNeg = false;
    valid.forEach(c => {
      const v = parseFloat(c.amount as string);
      if (v > 0) hasPos = true;
      if (v < 0) hasNeg = true;
    });
    
    if (!hasPos || !hasNeg) return 0; // XIRR needs both positive and negative cashflows

    const dates = valid.map(c => new Date(c.date).getTime());
    const base = dates[0];
    let rate = 0.1;
    for (let iter = 0; iter < 100; iter++) {
      let f = 0, df = 0;
      for (let i = 0; i < valid.length; i++) {
        const t = (dates[i] - base) / (365 * 24 * 60 * 60 * 1000);
        const amt = parseFloat(valid[i].amount as string);
        const powBase = 1 + rate;
        
        // Avoid complex numbers / NaN
        if (powBase <= 0) break;
        
        const v = amt / Math.pow(powBase, t);
        f += v;
        df -= t * amt / Math.pow(powBase, t + 1);
      }
      if (df === 0) break;
      const delta = f / df;
      rate -= delta;
      if (rate <= -0.99999) rate = -0.99999; // Cap rate at -99.999% to avoid negative base in pow
      if (Math.abs(delta) < 1e-7) break;
    }
    return rate * 100;
  };

  let xirr = 0;
  try {
    const result = calcXIRR();
    xirr = isFinite(result) ? result : 0;
  } catch {}

  const addRow = () => setCashflows([...cashflows, { date: new Date().toISOString().split('T')[0], amount: '' }]);
  const removeRow = (i: number) => setCashflows(cashflows.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof CashFlow, val: string) => {
    const updated = [...cashflows];
    updated[i][field] = val;
    setCashflows(updated);
  };

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Date</th>
              <th className="text-left py-2 px-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Amount (−ve = investment, +ve = return)</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {cashflows.map((cf, i) => (
              <tr key={i}>
                <td className="py-1.5 px-3">
                  <input type="date" value={cf.date} onChange={e => update(i, 'date', e.target.value)}
                    className="border rounded-lg px-2 py-1.5 text-xs outline-none w-36"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                </td>
                <td className="py-1.5 px-3">
                  <input type="number" value={cf.amount} onChange={e => update(i, 'amount', e.target.value)}
                    onFocus={e => e.target.select()}
                    className="border rounded-lg px-2 py-1.5 text-xs outline-none w-32"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                </td>
                <td>
                  <button onClick={() => removeRow(i)} className="text-red-400 hover:text-red-600 px-1 cursor-pointer">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} className="mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
          style={{ background: 'rgba(139,13,25,0.08)', color: 'var(--burgundy)' }}>
          + Add Cash Flow
        </button>
      </div>
      <ResultCard results={[
        { label: 'XIRR', value: xirr, highlight: true, formatFn: v => `${v.toFixed(2)}%` },
      ]} />
    </div>
  );
}
