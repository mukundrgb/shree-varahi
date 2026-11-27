'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';
import CalculatorTabs from '@/components/calculators/ui/CalculatorTabs';
import { abbreviate } from '@/lib/calculators/formatters';

export default function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState(540000);
  const [da, setDa] = useState(0);
  const [hraReceived, setHraReceived] = useState(100000);
  const [rentPaid, setRentPaid] = useState(300000);
  const [isMetro, setIsMetro] = useState<'yes' | 'no'>('yes');

  const { exemption, taxableHRA } = useMemo(() => {
    const rule1 = hraReceived;
    const rule2 = (isMetro === 'yes' ? 0.5 : 0.4) * (basicSalary + da);
    const rule3 = Math.max(0, rentPaid - 0.1 * (basicSalary + da));

    const exemp = Math.min(rule1, rule2, rule3);
    const tax = Math.max(0, hraReceived - exemp);
    
    return { exemption: exemp, taxableHRA: tax };
  }, [basicSalary, da, hraReceived, rentPaid, isMetro]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        
        <SliderInput label="Basic salary (p.a)" value={basicSalary} min={10000} max={2500000} step={5000} prefix="₹" onChange={setBasicSalary} />
        <SliderInput label="Dearness allowance (p.a)" value={da} min={0} max={2500000} step={1000} prefix="₹" onChange={setDa} />
        <SliderInput label="HRA received (p.a)" value={hraReceived} min={1000} max={2500000} step={1000} prefix="₹" onChange={setHraReceived} />
        <SliderInput label="Total rent paid (p.a)" value={rentPaid} min={1000} max={2500000} step={1000} prefix="₹" onChange={setRentPaid} />
        
        <div className="mt-2 mb-8">
          <label className="text-sm font-medium text-foreground mb-3 block">Are you working in a metro city?</label>
          <CalculatorTabs 
            activeId={isMetro} 
            onChange={(id) => setIsMetro(id as 'yes' | 'no')}
            tabs={[
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' }
            ]} 
          />
        </div>

        <ResultCard results={[
          { label: 'Exempted HRA', value: exemption, prefix: '₹' },
          { label: 'Taxable HRA', value: taxableHRA, prefix: '₹', highlight: true },
        ]} />
        
        <div className="text-center mt-6 mb-2">
           <p className="text-[13px] text-muted-foreground leading-relaxed">
             Invest in <span className="text-accent font-semibold cursor-pointer hover:underline">ELSS Mutual funds</span> and save tax upto ₹46,800 under 80C as per old tax regime.
           </p>
        </div>

      </div>
      
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Exempted HRA', value: exemption, color: 'var(--gold)' },
            { label: 'Taxable HRA', value: taxableHRA, color: 'var(--burgundy)' },
          ]}
          total={hraReceived}
          centerLabel="HRA Received"
          centerValue={`₹${(hraReceived/100000).toFixed(1)}L`}
        />
      </div>
    </div>
  );
}
