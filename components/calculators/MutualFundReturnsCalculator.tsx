'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function MutualFundReturnsCalculator() {
  const [invested, setInvested] = useState(100000);
  const [currentValue, setCurrentValue] = useState(150000);
  const [years, setYears] = useState(3);

  const { profit, cagr, absReturn } = useMemo(() => {
    const p = currentValue - invested;
    let c = 0;
    if (invested > 0 && currentValue > 0 && years > 0) {
      c = (Math.pow(currentValue / invested, 1 / years) - 1) * 100;
    }
    const a = invested > 0 ? ((currentValue - invested) / invested) * 100 : 0;
    return { profit: p, cagr: c, absReturn: a };
  }, [invested, currentValue, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Amount Invested" value={invested} min={1000} max={10000000} step={1000} prefix="₹" onChange={setInvested} />
        <SliderInput label="Current Value" value={currentValue} min={1000} max={20000000} step={1000} prefix="₹" onChange={setCurrentValue} />
        <SliderInput label="Duration (Years)" value={years} min={1} max={30} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Amount Invested', value: invested },
          { label: 'Profit / Loss', value: profit },
          { label: 'Absolute Returns', value: absReturn, formatFn: v => `${v.toFixed(2)}%` },
          { label: 'CAGR', value: cagr, highlight: true, formatFn: v => `${v.toFixed(2)}%` },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Invested', value: invested, color: 'var(--gold)' },
            { label: 'Returns', value: Math.max(0, profit), color: 'var(--burgundy)' },
          ]}
          total={currentValue}
          centerLabel="Current Value"
          centerValue={abbreviate(currentValue)}
        />
      </div>
    </div>
  );
}
