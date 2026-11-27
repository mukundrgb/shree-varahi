'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { formatCurrency } from '@/lib/calculators/formatters';

export default function MarginCalculator() {
  const [cost, setCost] = useState(5000);
  const [revenue, setRevenue] = useState(8000);

  const { profit, marginPct, markupPct } = useMemo(() => {
    const p = revenue - cost;
    const margin = revenue > 0 ? (p / revenue) * 100 : 0;
    const markup = cost > 0 ? (p / cost) * 100 : 0;
    return { profit: p, marginPct: margin, markupPct: markup };
  }, [cost, revenue]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Cost Price" value={cost} min={1} max={10000000} step={100} prefix="₹" onChange={setCost} />
        <SliderInput label="Selling Price" value={revenue} min={1} max={20000000} step={100} prefix="₹" onChange={setRevenue} />
        <div className="mt-2 p-3 rounded-xl text-xs space-y-1" style={{ background: 'rgba(217,178,124,0.15)', color: 'var(--text-secondary)' }}>
          <p>Profit Margin = (Profit / Revenue) × 100</p>
          <p>Markup = (Profit / Cost) × 100</p>
        </div>
        <div className="mt-4">
          <ResultCard results={[
            { label: 'Cost Price', value: cost, formatFn: v => formatCurrency(v, 2) },
            { label: 'Selling Price', value: revenue, formatFn: v => formatCurrency(v, 2) },
            { label: 'Profit / Loss', value: profit, formatFn: v => `${v >= 0 ? '+' : ''}${formatCurrency(v, 2)}` },
            { label: 'Profit Margin', value: marginPct, highlight: true, formatFn: v => `${v.toFixed(2)}%` },
            { label: 'Markup %', value: markupPct, formatFn: v => `${v.toFixed(2)}%` },
          ]} />
        </div>
      </div>
    </div>
  );
}
