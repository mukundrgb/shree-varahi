'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);

  const { futureValue, costIncrease } = useMemo(() => {
    const fv = amount * Math.pow(1 + rate / 100, years);
    return { futureValue: Math.round(fv), costIncrease: Math.round(fv - amount) };
  }, [amount, rate, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Current Cost" value={amount} min={1000} max={10000000} step={1000} prefix="₹" onChange={setAmount} />
        <SliderInput label="Rate of inflation (p.a)" value={rate} min={1} max={50} step={0.5} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time period" value={years} min={1} max={30} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Current Cost', value: amount },
          { label: 'Cost Increase', value: costIncrease },
          { label: 'Future Cost', value: futureValue, highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0 pt-4">
        <div className="w-full rounded-2xl p-5 text-center" style={{ background: 'linear-gradient(135deg,var(--burgundy-deep),var(--burgundy))' }}>
          <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Value needed in {years} yrs</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--gold-champagne)' }}>{abbreviate(futureValue)}</p>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>to match today's {abbreviate(amount)}</p>
        </div>
      </div>
    </div>
  );
}
