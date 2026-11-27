'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import CalculatorTabs from '@/components/calculators/ui/CalculatorTabs';
import { abbreviate } from '@/lib/calculators/formatters';

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(25000);
  const [stepUp, setStepUp] = useState(0); // Added stepUp
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { invested, returns, total } = useMemo(() => {
    // Groww uses (1 + R/100)^(1/12) - 1 for monthly return (CAGR equivalent)
    const r = Math.pow(1 + rate / 100, 1 / 12) - 1;
    
    // If Step-up is 0, we can use the standard formula. But the loop works perfectly for both.
    // Loop is required for step-up to accurately apply annual increments to the monthly SIP.
    let corpus = 0;
    let totalInvested = 0;
    let currentSIP = monthly;
    
    if (r === 0) {
      for (let y = 0; y < years; y++) {
        totalInvested += currentSIP * 12;
        corpus += currentSIP * 12;
        currentSIP = currentSIP * (1 + stepUp / 100);
      }
    } else {
      for (let y = 0; y < years; y++) {
        for (let m = 0; m < 12; m++) {
          corpus = (corpus + currentSIP) * (1 + r);
          totalInvested += currentSIP;
        }
        currentSIP = currentSIP * (1 + stepUp / 100);
      }
    }

    return { 
      invested: Math.round(totalInvested), 
      returns: Math.round(Math.max(0, corpus - totalInvested)), 
      total: Math.round(Math.max(corpus, totalInvested)) 
    };
  }, [monthly, stepUp, rate, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <CalculatorTabs 
          activeId="sip" 
          tabs={[
            { id: 'sip', label: 'SIP', href: '/calculators/sip' },
            { id: 'lumpsum', label: 'Lumpsum', href: '/calculators/lumpsum' }
          ]} 
        />
        <SliderInput label="Monthly investment" value={monthly} min={100} max={1000000} step={500} prefix="₹" onChange={setMonthly} />
        <SliderInput label="Annual Step-Up (Optional)" value={stepUp} min={0} max={50} step={1} suffix="%" onChange={setStepUp} />
        <SliderInput label="Expected return rate (p.a)" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time period" value={years} min={1} max={40} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Invested amount', value: invested },
          { label: 'Est. returns', value: returns },
          { label: 'Total value', value: total, highlight: true },
        ]} />
      </div>
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Invested amount', value: invested, color: 'var(--gold)' },
            { label: 'Est. returns', value: returns, color: 'var(--burgundy)' },
          ]}
          total={total}
          centerLabel="Total value"
          centerValue={abbreviate(total)}
        />
      </div>
    </div>
  );
}
