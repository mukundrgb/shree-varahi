'use client';
import { useState, useMemo } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import CalculatorTabs from '@/components/calculators/ui/CalculatorTabs';
import DonutChart from '@/components/calculators/ui/DonutChart';

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState(600000);
  const [bonusType, setBonusType] = useState('percentage');
  const [bonusValue, setBonusValue] = useState(15);
  
  const [profTax, setProfTax] = useState(200);
  const [employerPf, setEmployerPf] = useState(1800);
  const [employeePf, setEmployeePf] = useState(1800);
  const [additionalDeduction, setAdditionalDeduction] = useState(0);

  const {
    bonusAmount,
    annualGross,
    monthlyGross,
    totalMonthlyDeductions,
    totalAnnualDeductions,
    takeHomeMonthly,
    takeHomeAnnual
  } = useMemo(() => {
    const bonusAmt = bonusType === 'percentage' ? (ctc * bonusValue) / 100 : bonusValue;
    const grossAnnual = Math.max(0, ctc - bonusAmt);
    const grossMonthly = grossAnnual / 12;

    const monthlyDeductions = profTax + employerPf + employeePf + additionalDeduction;
    const annualDeductions = monthlyDeductions * 12;

    const monthlyTakeHome = Math.max(0, grossMonthly - monthlyDeductions);
    const annualTakeHome = Math.max(0, grossAnnual - annualDeductions);

    return {
      bonusAmount: bonusAmt,
      annualGross: grossAnnual,
      monthlyGross: grossMonthly,
      totalMonthlyDeductions: monthlyDeductions,
      totalAnnualDeductions: annualDeductions,
      takeHomeMonthly: monthlyTakeHome,
      takeHomeAnnual: annualTakeHome
    };
  }, [ctc, bonusType, bonusValue, profTax, employerPf, employeePf, additionalDeduction]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        
        <SliderInput 
          label="Cost to Company (CTC)" 
          value={ctc} 
          min={50000} 
          max={10000000} 
          step={10000} 
          prefix="₹" 
          onChange={setCtc} 
        />

        <div className="mt-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-foreground">Bonus Included in CTC</label>
            <div className="w-48">
              <CalculatorTabs 
                activeId={bonusType} 
                onChange={setBonusType}
                tabs={[
                  { id: 'percentage', label: 'Percentage' },
                  { id: 'amount', label: 'Amount' }
                ]} 
              />
            </div>
          </div>
          <SliderInput 
            label=""
            value={bonusValue} 
            min={0} 
            max={bonusType === 'percentage' ? 100 : ctc} 
            step={bonusType === 'percentage' ? 1 : 1000} 
            prefix={bonusType === 'amount' ? '₹' : ''} 
            suffix={bonusType === 'percentage' ? '%' : ''} 
            onChange={setBonusValue} 
          />
        </div>

        <SliderInput 
          label="Monthly Professional Tax" 
          value={profTax} 
          min={0} 
          max={5000} 
          step={50} 
          prefix="₹" 
          onChange={setProfTax} 
        />

        <SliderInput 
          label="Monthly Employer PF" 
          value={employerPf} 
          min={0} 
          max={20000} 
          step={100} 
          prefix="₹" 
          onChange={setEmployerPf} 
        />

        <SliderInput 
          label="Monthly Employee PF" 
          value={employeePf} 
          min={0} 
          max={20000} 
          step={100} 
          prefix="₹" 
          onChange={setEmployeePf} 
        />

        <SliderInput 
          label="Monthly Additional Deduction (Optional)" 
          value={additionalDeduction} 
          min={0} 
          max={50000} 
          step={100} 
          prefix="₹" 
          onChange={setAdditionalDeduction} 
        />
        
        <div className="mt-8">
          <ResultCard results={[
            { label: 'Total Monthly Deductions', value: totalMonthlyDeductions, prefix: '₹' },
            { label: 'Total Annual Deductions', value: totalAnnualDeductions, prefix: '₹' },
            { label: 'Take Home Monthly Salary', value: Math.round(takeHomeMonthly), prefix: '₹' },
            { label: 'Take Home Annual Salary', value: Math.round(takeHomeAnnual), prefix: '₹', highlight: true },
          ]} />
        </div>
      </div>
      
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Take Home Salary', value: takeHomeAnnual, color: 'var(--emerald)' },
            { label: 'Annual Deductions', value: totalAnnualDeductions, color: 'var(--burgundy)' },
            { label: 'Bonus', value: bonusAmount, color: 'var(--amber)' },
          ]}
          total={ctc}
          centerLabel="CTC"
          centerValue={`₹${(ctc / 100000).toFixed(2)}L`}
        />
      </div>
    </div>
  );
}
