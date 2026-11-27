'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function NSCCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.7);
  const years = 5; // NSC is fixed 5 years

  const { maturity, interest } = useMemo(() => {
    // NSC compounds annually
    const fv = principal * Math.pow(1 + rate / 100, years);
    return { maturity: Math.round(fv), interest: Math.round(fv - principal) };
  }, [principal, rate]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <div className="mb-4 p-3 rounded-xl text-xs font-medium" style={{ background: 'rgba(217,178,124,0.15)', color: 'var(--gold-deep)' }}>
          📌 NSC interest rate: <strong>7.7% p.a.</strong> (compounded annually) | Lock-in: <strong>5 years</strong>
        </div>
        <SliderInput label="Amount invested" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} />
        <SliderInput label="Rate of interest (p.a)" value={rate} min={1} max={15} step={0.1} suffix="%" onChange={setRate} />
        
        <div className="mt-4 mb-2 flex justify-between items-center bg-gray-50/50 p-3 rounded-lg border border-gray-100">
          <div className="text-sm font-medium text-[var(--text-muted)]">Time Period</div>
          <div className="text-sm font-semibold text-[var(--text-primary)]">5 Yr</div>
        </div>

        <ResultCard results={[
          { label: 'Principal amount', value: principal, prefix: '₹' },
          { label: 'Total interest', value: interest, prefix: '₹' },
          { label: 'Total amount', value: maturity, prefix: '₹', highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Principal amount', value: principal, color: 'var(--gold)' },
            { label: 'Total interest', value: interest, color: 'var(--burgundy)' },
          ]}
          total={maturity}
          centerLabel="Total amount"
          centerValue={abbreviate(maturity)}
        />
      </div>
    </div>
  );
}
