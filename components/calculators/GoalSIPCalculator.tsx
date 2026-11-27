'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import { abbreviate } from '@/lib/calculators/formatters';

export default function GoalSIPCalculator() {
  const [goal, setGoal] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { sip, invested, returns } = useMemo(() => {
    // Groww uses (1 + R/100)^(1/12) - 1 for monthly return (CAGR equivalent)
    const r = Math.pow(1 + rate / 100, 1 / 12) - 1;
    const n = years * 12;
    let sipAmt: number;
    if (r === 0) {
      sipAmt = goal / n; // No growth, just divide goal by months
    } else {
      // Correct formula: PMT = FV * r / ((1+r)^n - 1)
      sipAmt = goal * r / (Math.pow(1 + r, n) - 1);
    }
    const inv = sipAmt * n;
    return {
      sip: Math.ceil(sipAmt),
      invested: Math.round(inv),
      returns: Math.max(0, Math.round(goal - inv)),
    };
  }, [goal, rate, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput
          label="Goal Amount"
          value={goal}
          min={100000}
          max={10000000}
          step={50000}
          prefix="₹"
          onChange={setGoal}
          formatDisplay={v => abbreviate(v)}
          accentColor="var(--accent)"
        />
        <SliderInput label="Expected Return Rate (p.a)" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} formatDisplay={v => v.toFixed(1)} />
        <SliderInput label="Time Period" value={years} min={1} max={40} suffix=" Yr" onChange={setYears} />
        <ResultCard results={[
          { label: 'Required Monthly SIP', value: sip, prefix: '₹' },
          { label: 'Total Investment', value: invested, prefix: '₹' },
          { label: 'Returns Earned', value: returns, prefix: '₹' },
          { label: 'Goal Amount', value: goal, highlight: true, prefix: '₹' },
        ]} />
      </div>

      {/* Visual */}
      <div className="w-full lg:w-52 flex-shrink-0 flex flex-col items-center justify-center mt-4 lg:mt-0 gap-3">
        <div className="w-36 h-36 rounded-full flex flex-col items-center justify-center"
          style={{ background: 'rgba(220,38,38,0.06)', border: '3px solid rgba(220,38,38,0.2)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Monthly SIP</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--accent)', marginTop: 2 }}>
            {abbreviate(sip)}
          </p>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', lineHeight: 1.5 }}>
          Invest {abbreviate(sip)}/month to reach {abbreviate(goal)} in {years} years
        </p>
      </div>
    </div>
  );
}
