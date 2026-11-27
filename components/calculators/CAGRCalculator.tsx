'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';

export default function CAGRCalculator() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(200000);
  const [years, setYears] = useState(5);

  const { cagr, absoluteReturn, totalGain } = useMemo(() => {
    const totalGain = final - initial;
    const absoluteReturn = initial > 0 ? ((final - initial) / initial) * 100 : 0;
    let cagr = 0;
    if (initial > 0 && final > 0 && years > 0) {
      cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
    }
    return { cagr, absoluteReturn, totalGain };
  }, [initial, final, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Initial Value" value={initial} min={1000} max={10000000} step={1000} prefix="₹" onChange={setInitial} />
        <SliderInput label="Final Value" value={final} min={1000} max={50000000} step={1000} prefix="₹" onChange={setFinal} />
        <SliderInput label="Duration (Years)" value={years} min={1} max={40} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Initial Investment', value: initial },
          { label: 'Final Value', value: final },
          { label: 'Total Gain', value: totalGain },
          { label: 'Absolute Returns', value: absoluteReturn, formatFn: v => `${v.toFixed(2)}%` },
          { label: 'CAGR', value: cagr, highlight: true, formatFn: v => `${v.toFixed(2)}% p.a` },
        ]} />
      </div>
      <div className="flex-shrink-0 w-52 flex flex-col gap-4 pt-4">
        <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg,var(--burgundy-deep),var(--burgundy))' }}>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>CAGR</p>
          <p className="text-3xl font-bold" style={{ color: 'var(--gold-champagne)' }}>{cagr.toFixed(2)}%</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>per annum</p>
        </div>
      </div>
    </div>
  );
}
