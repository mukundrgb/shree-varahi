'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import SliderInput from '@/components/calculators/ui/SliderInput';
import ResultCard from '@/components/calculators/ui/ResultCard';
import CalculatorTabs from '@/components/calculators/ui/CalculatorTabs';
import DonutChart from '@/components/calculators/ui/DonutChart';

const tdsRules = [
  { id: '192A', label: '192A - Premature withdrawal from EPF', ind: 10, oth: 10, threshold: 50000, noPan: 20 },
  { id: '193', label: '193 - Interest on securities', ind: 10, oth: 10, threshold: 10000, noPan: 20 },
  { id: '194', label: '194 - Dividend', ind: 10, oth: 10, threshold: 5000, noPan: 20 },
  { id: '194A_1', label: '194A - Interest other than banks', ind: 10, oth: 10, threshold: 5000, noPan: 20 },
  { id: '194A_2', label: '194A - Interest from banks', ind: 10, oth: 10, threshold: 40000, noPan: 20 },
  { id: '194B', label: '194B - Income from lottery winnings', ind: 30, oth: 30, threshold: 10000, noPan: 30 },
  { id: '194BB', label: '194BB - Income from horse race winnings', ind: 30, oth: 30, threshold: 10000, noPan: 30 },
  { id: '194C_1', label: '194C - Single Payment to Contractor', ind: 1, oth: 2, threshold: 30000, noPan: 20 },
  { id: '194C_2', label: '194C - FY Payment to Contractor', ind: 1, oth: 2, threshold: 100000, noPan: 20 },
  { id: '194D', label: '194D - TDS on insurance commission', ind: 5, oth: 10, threshold: 15000, noPan: 20 },
  { id: '194H', label: '194H - Commission or brokerage', ind: 5, oth: 5, threshold: 15000, noPan: 20 },
  { id: '194IA_1', label: '194I(A) - Rent on plant and machinery', ind: 2, oth: 2, threshold: 240000, noPan: 20 },
  { id: '194IB_1', label: '194I(B) - Rent on land & building', ind: 10, oth: 10, threshold: 240000, noPan: 20 },
  { id: '194IA_2', label: '194IA - Transfer of immovable property', ind: 1, oth: 1, threshold: 5000000, noPan: 20 },
  { id: '194IB_2', label: '194IB - Rent payment to landlord', ind: 5, oth: 5, threshold: 50000, noPan: 20 },
  { id: '194J_1', label: '194J - Fees for professional service', ind: 10, oth: 10, threshold: 30000, noPan: 20 },
  { id: '194J_2', label: '194J - Fees for technical service', ind: 2, oth: 2, threshold: 30000, noPan: 20 },
  { id: '194K', label: '194K - Mutual fund dividend', ind: 10, oth: 10, threshold: 5000, noPan: 20 },
  { id: '194O', label: '194O - E-commerce operator', ind: 1, oth: 1, threshold: 500000, noPan: 5 },
];

export default function TDSCalculator() {
  const [recipient, setRecipient] = useState('individual');
  const [hasPan, setHasPan] = useState('yes');
  const [ruleId, setRuleId] = useState(tdsRules[0].id);
  const [amount, setAmount] = useState(100000);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rule = useMemo(() => tdsRules.find(r => r.id === ruleId) || tdsRules[0], [ruleId]);

  const { tdsAmount, rateApplied, amountAfterTds } = useMemo(() => {
    let rate = 0;
    
    if (amount > rule.threshold) {
      if (hasPan === 'no') {
        rate = rule.noPan;
      } else {
        rate = recipient === 'individual' ? rule.ind : rule.oth;
      }
    }

    const tds = Math.round(amount * (rate / 100));
    return { tdsAmount: tds, rateApplied: rate, amountAfterTds: amount - tds };
  }, [amount, hasPan, recipient, rule]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full">
        
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-3 block">Recipient</label>
          <CalculatorTabs 
            activeId={recipient} 
            onChange={setRecipient}
            tabs={[
              { id: 'individual', label: 'Individual/HUF/Sole Proprietor' },
              { id: 'others', label: 'Others' }
            ]} 
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-3 block">PAN of recipient is available</label>
          <CalculatorTabs 
            activeId={hasPan} 
            onChange={setHasPan}
            tabs={[
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' }
            ]} 
          />
        </div>

        <div className="mb-8" ref={dropdownRef}>
          <label className="text-sm font-medium text-foreground mb-3 block">Nature of payment</label>
          <div className="relative w-full z-50">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-foreground font-medium cursor-pointer flex justify-between items-center hover:border-[#FF0000]/50 transition-colors"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <span className="truncate pr-4">{rule.label}</span>
              <span className={`text-muted-foreground text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 border border-border rounded-2xl shadow-2xl z-50 max-h-[300px] overflow-y-auto p-1.5 scrollbar-hide" style={{ background: 'var(--bg-base)' }}>
                {tdsRules.map(r => {
                  const isSelected = r.id === ruleId;
                  return (
                    <div 
                      key={r.id} 
                      onClick={() => { setRuleId(r.id); setIsDropdownOpen(false); }}
                      className={`px-4 py-3 rounded-xl cursor-pointer text-[13px] font-semibold transition-all duration-200 ${isSelected ? 'bg-[rgba(255,0,0,0.08)]' : 'hover:bg-muted/70'}`}
                      style={{ color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}
                    >
                      {r.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <SliderInput 
          label="Amount of payment" 
          value={amount} 
          min={1000} 
          max={10000000} 
          step={1000} 
          prefix="₹" 
          onChange={setAmount} 
        />
        
        <div className="mt-8">
          <ResultCard results={[
            { label: 'Applicable TDS Rate', value: rateApplied, suffix: '%' },
            { label: 'Amount after TDS', value: amountAfterTds, prefix: '₹' },
            { label: 'Total TDS Amount', value: tdsAmount, prefix: '₹', highlight: true },
          ]} />
        </div>
      </div>
      
      <div className="w-full lg:w-52 flex justify-center mt-6 lg:mt-0 flex-shrink-0">
        <DonutChart
          segments={[
            { label: 'Amount Received', value: amountAfterTds, color: 'var(--emerald)' },
            { label: 'TDS Deducted', value: tdsAmount, color: 'var(--burgundy)' },
          ]}
          total={amount}
          centerLabel="Total TDS"
          centerValue={`₹${tdsAmount.toLocaleString('en-IN')}`}
        />
      </div>
    </div>
  );
}
