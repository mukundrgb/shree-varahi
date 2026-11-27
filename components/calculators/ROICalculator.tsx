'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import DonutChart from '@/components/calculators/ui/DonutChart';
import { abbreviate } from '@/lib/calculators/formatters';

export default function ROICalculator() {
  const [investment, setInvestment] = useState(50000);
  const [revenue, setRevenue] = useState(80000);
  const [years, setYears] = useState(5);

  const { roi, netProfit, annualROI } = useMemo(() => {
    const net = revenue - investment;
    const r = investment > 0 ? (net / investment) * 100 : 0;
    let ann = 0;
    if (investment > 0 && revenue > 0 && years > 0) {
      ann = (Math.pow(revenue / investment, 1 / years) - 1) * 100;
    } else if (investment > 0 && years > 0) {
      ann = r / years; // For zero/negative final value, use simple annualization
    }
    return { roi: r, netProfit: net, annualROI: ann };
  }, [investment, revenue, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput label="Amount invested" value={investment} min={1000} max={10000000} step={1000} prefix="₹" onChange={setInvestment} />
        <SliderInput label="Amount returned" value={revenue} min={1000} max={50000000} step={1000} prefix="₹" onChange={setRevenue} />
        <SliderInput label="Time period" value={years} min={1} max={40} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Investment gain', value: netProfit },
          { label: 'ROI', value: roi, formatFn: v => `${v.toFixed(2)}%` },
          { label: 'Annualized ROI', value: annualROI, highlight: true, formatFn: v => `${v.toFixed(2)}%` },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Amount invested', value: investment, color: 'var(--background-accent-secondary-subtle, var(--gold))' },
            { label: 'Investment gain', value: Math.max(0, netProfit), color: 'var(--content-accent-secondary, var(--burgundy))' },
          ]}
          total={investment + Math.max(0, netProfit)}
          centerLabel="Investment gain"
          centerValue={abbreviate(netProfit)}
        />
      </div>
    </div>
  );
}
