'use client';
import { useState, useMemo } from 'react';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { formatCurrency, abbreviate } from '@/lib/calculators/formatters';

interface Purchase { qty: number | string; price: number | string; }

export default function StockAverageCalculator() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { qty: 100, price: 250 },
    { qty: 50, price: 300 },
  ]);

  const { avgPrice, totalQty, totalInvested } = useMemo(() => {
    const totalQ = purchases.reduce((s, p) => s + (Number(p.qty) || 0), 0);
    const totalI = purchases.reduce((s, p) => s + (Number(p.qty) || 0) * (Number(p.price) || 0), 0);
    return { avgPrice: totalQ > 0 ? totalI / totalQ : 0, totalQty: totalQ, totalInvested: totalI };
  }, [purchases]);

  const add = () => setPurchases([...purchases, { qty: 10, price: 100 }]);
  const remove = (i: number) => setPurchases(purchases.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof Purchase, val: string) => {
    const p = [...purchases];
    p[i] = { ...p[i], [field]: val };
    setPurchases(p);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-2 px-1">
          <span className="text-xs font-semibold w-24" style={{ color: 'var(--text-muted)' }}>Quantity</span>
          <span className="text-xs font-semibold w-32" style={{ color: 'var(--text-muted)' }}>Buy Price (₹)</span>
          <span className="text-xs font-semibold flex-1" style={{ color: 'var(--text-muted)' }}>Investment</span>
          <span className="w-8"></span>
        </div>
        {purchases.map((p, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <input type="number" value={p.qty} onChange={e => update(i, 'qty', e.target.value)}
              className="w-24 border rounded-lg px-3 py-2 text-sm outline-none"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <input type="number" value={p.price} onChange={e => update(i, 'price', e.target.value)}
              className="w-32 border rounded-lg px-3 py-2 text-sm outline-none"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <span className="flex-1 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {formatCurrency((Number(p.qty) || 0) * (Number(p.price) || 0))}
            </span>
            <button onClick={() => remove(i)} className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 cursor-pointer">✕</button>
          </div>
        ))}
        <button onClick={add} className="mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
          style={{ background: 'rgba(139,13,25,0.08)', color: 'var(--burgundy)' }}>
          + Add Purchase
        </button>
      </div>
      <ResultCard results={[
        { label: 'Total Quantity', value: totalQty, formatFn: v => `${v} shares` },
        { label: 'Total Invested', value: totalInvested },
        { label: 'Average Buy Price', value: avgPrice, highlight: true, formatFn: v => formatCurrency(v, 2) },
      ]} />
    </div>
  );
}
