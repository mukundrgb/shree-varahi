'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import DonutChart from '@/components/calculators/ui/DonutChart';
import ResultCard from '@/components/calculators/ui/ResultCard';

export default function GratuityCalculator() {
  const [salary, setSalary] = useState(60000);
  const [years, setYears] = useState(20);

  const { gratuity, exempted, taxable } = useMemo(() => {
    // Formula: G = n * b * 15 / 26
    const calculated = Math.round((years * salary * 15) / 26);
    // The maximum tax-exempt gratuity amount cannot go beyond Rs 20 lakh
    const exemptAmount = Math.min(calculated, 2000000);
    const taxAmount = Math.max(0, calculated - 2000000);
    return { gratuity: calculated, exempted: exemptAmount, taxable: taxAmount };
  }, [salary, years]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        <SliderInput 
          label="Monthly salary (Basic + DA)" 
          value={salary} 
          min={10000} 
          max={10000000} 
          step={5000} 
          prefix="₹" 
          onChange={setSalary} 
        />
        <SliderInput 
          label="Years of service" 
          value={years} 
          min={5} 
          max={50} 
          step={1} 
          suffix=" Yr" 
          onChange={setYears} 
        />
        
        <div className="mt-8">
          <ResultCard results={[
            { label: 'Exempted Gratuity (Max 20L)', value: exempted, prefix: '₹' },
            { label: 'Taxable Gratuity', value: taxable, prefix: '₹' },
            { label: 'Total Gratuity payable', value: gratuity, prefix: '₹', highlight: true },
          ]} />
        </div>
      </div>
      
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Exempted', value: exempted, color: 'var(--gold)' },
            { label: 'Taxable', value: taxable, color: 'var(--burgundy)' },
          ]}
          total={gratuity}
          centerLabel="Total Gratuity"
          centerValue={`₹${(gratuity > 100000 ? (gratuity/100000).toFixed(2) + 'L' : gratuity.toLocaleString('en-IN'))}`}
        />
      </div>
    </div>
  );
}
