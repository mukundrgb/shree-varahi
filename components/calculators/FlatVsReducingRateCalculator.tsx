'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import { abbreviate } from '@/lib/calculators/formatters';

export default function FlatVsReducingRateCalculator() {
  const [loan, setLoan] = useState(100000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(12);
  const [tenureType, setTenureType] = useState<'Years' | 'Months'>('Years');

  const {
    flatEmi, flatInterest, flatTotal,
    reducingEmi, reducingInterest, reducingTotal,
    difference
  } = useMemo(() => {
    const P = loan;
    const rAnnual = rate;
    const tMonths = tenureType === 'Years' ? tenure * 12 : tenure;
    const tYears = tMonths / 12;

    // Flat Interest
    const flatInterestVal = (P * rAnnual * tYears) / 100;
    const flatTotalVal = P + flatInterestVal;
    const flatEmiVal = tMonths > 0 ? flatTotalVal / tMonths : 0;

    // Reducing Balance
    const rMonthly = rAnnual / 12 / 100;
    let reducingEmiVal = 0;
    if (rMonthly === 0) {
      reducingEmiVal = tMonths > 0 ? P / tMonths : 0;
    } else {
      reducingEmiVal = tMonths > 0 ? P * rMonthly * Math.pow(1 + rMonthly, tMonths) / (Math.pow(1 + rMonthly, tMonths) - 1) : 0;
    }
    const reducingTotalVal = reducingEmiVal * tMonths;
    const reducingInterestVal = Math.max(0, reducingTotalVal - P);

    return {
      flatEmi: Math.round(flatEmiVal),
      flatInterest: Math.round(flatInterestVal),
      flatTotal: Math.round(flatTotalVal),
      reducingEmi: Math.round(reducingEmiVal),
      reducingInterest: Math.round(reducingInterestVal),
      reducingTotal: Math.round(reducingTotalVal),
      difference: Math.round(flatTotalVal - reducingTotalVal)
    };
  }, [loan, rate, tenure, tenureType]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex-1 w-full">
        <SliderInput label="Loan amount" value={loan} min={1000} max={10000000} step={1000} prefix="₹" onChange={setLoan} />
        <SliderInput label="Rate of interest (per annum)" value={rate} min={1} max={50} step={0.1} suffix="%" onChange={setRate} formatDisplay={v => v.toString()} />
        
        <div className="flex flex-col mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-foreground">Loan tenure</span>
            <div className="flex bg-muted rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${tenureType === 'Years' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                onClick={() => {
                  if (tenureType !== 'Years') {
                    setTenureType('Years');
                    setTenure(Math.max(1, Math.round(tenure / 12)));
                  }
                }}
              >
                Years
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${tenureType === 'Months' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                onClick={() => {
                  if (tenureType !== 'Months') {
                    setTenureType('Months');
                    setTenure(tenure * 12);
                  }
                }}
              >
                Months
              </button>
            </div>
          </div>
          <SliderInput 
            label="" 
            value={tenure} 
            min={1} 
            max={tenureType === 'Years' ? 50 : 600} 
            suffix={tenureType === 'Years' ? ' Yr' : ' Mo'} 
            onChange={setTenure} 
          />
        </div>

        {/* Output Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm text-left text-foreground">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium"></th>
                <th className="px-6 py-4 font-medium text-right">Flat interest rate</th>
                <th className="px-6 py-4 font-medium text-right">Reducing balance interest rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="bg-card hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium text-muted-foreground">Monthly EMI</td>
                <td className="px-6 py-4 text-right font-semibold">₹{flatEmi.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 text-right font-semibold">₹{reducingEmi.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="bg-card hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium text-muted-foreground">Total interest</td>
                <td className="px-6 py-4 text-right font-semibold">₹{flatInterest.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 text-right font-semibold">₹{reducingInterest.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="bg-card hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium text-muted-foreground">Total amount</td>
                <td className="px-6 py-4 text-right font-semibold">₹{flatTotal.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 text-right font-semibold">₹{reducingTotal.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <div className="bg-[rgba(255,0,0,0.08)] text-[#FF0000] px-6 py-3 rounded-full font-bold shadow-sm">
            Save ₹{difference.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 justify-center mt-6 w-full">
        <div className="flex flex-col items-center w-full sm:w-1/2 max-w-[250px] mx-auto">
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--burgundy)' }}></span>
              Interest amount
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--gold)' }}></span>
              Principal amount
            </div>
          </div>
          <DonutChart
            segments={[
              { label: 'Principal', value: loan, color: 'var(--gold)' },
              { label: 'Interest', value: flatInterest, color: 'var(--burgundy)' },
            ]}
            total={flatTotal}
            centerLabel="Flat"
            centerValue=""
          />
        </div>
        
        <div className="flex flex-col items-center w-full sm:w-1/2 max-w-[250px] mx-auto">
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--burgundy)' }}></span>
              Interest amount
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--gold)' }}></span>
              Principal amount
            </div>
          </div>
          <DonutChart
            segments={[
              { label: 'Principal', value: loan, color: 'var(--gold)' },
              { label: 'Interest', value: reducingInterest, color: 'var(--burgundy)' },
            ]}
            total={reducingTotal}
            centerLabel="Reducing"
            centerValue=""
          />
        </div>
      </div>
    </div>
  );
}
