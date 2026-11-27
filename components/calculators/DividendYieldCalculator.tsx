'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';

export default function DividendYieldCalculator() {
  const [annualDividend, setAnnualDividend] = useState(100);
  const [purchasePrice, setPurchasePrice] = useState(50);

  const { yieldPct } = useMemo(() => {
    const y = purchasePrice > 0 ? (annualDividend / purchasePrice) * 100 : 0;
    return { yieldPct: y };
  }, [purchasePrice, annualDividend]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Annual Dividend" value={annualDividend} min={1} max={5000} step={1} prefix="₹" onChange={setAnnualDividend} />
        <SliderInput label="Purchase Price" value={purchasePrice} min={10} max={100000} step={10} prefix="₹" onChange={setPurchasePrice} />
        
        <ResultCard results={[
          { label: 'Purchase Price', value: purchasePrice, prefix: '₹' },
          { label: 'Annual Dividend', value: annualDividend, prefix: '₹' },
          { label: 'Dividend Yield', value: yieldPct, highlight: true, formatFn: v => `${v.toFixed(2)}%` },
        ]} />
      </div>

      <div className="w-full lg:w-52 flex-shrink-0 flex flex-col items-center justify-center mt-4 lg:mt-0 gap-3 pt-4">
        <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center"
          style={{ background: 'rgba(5,150,105,0.06)', border: '3px solid rgba(5,150,105,0.2)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Div. Yield</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--positive)', marginTop: 2 }}>
            {yieldPct.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
