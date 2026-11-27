import React from 'react';
import type { CalculatorId } from '@/lib/calculators/types';
import dynamic from 'next/dynamic';
import GenericDetails from './GenericDetails';
import { allCalculatorDetailsData } from './data';

// Keep the fully custom ones we wrote earlier
const customContentMap: Partial<Record<CalculatorId, React.ComponentType>> = {
  'sip': dynamic(() => import('./content/SIPDetails')),
  'emi-calculator': dynamic(() => import('./content/EMIDetails')),
  'fd': dynamic(() => import('./content/FDDetails')),
  'ppf': dynamic(() => import('./content/PPFDetails')),
};

export default function CalculatorDetails({ id }: { id: CalculatorId }) {
  const CustomComponent = customContentMap[id];
  const genericData = allCalculatorDetailsData[id as string];

  if (!CustomComponent && !genericData) {
    return null;
  }

  return (
    <div
      className="mt-6 rounded-2xl p-6 md:p-8"
      style={{
        background: 'white',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {CustomComponent ? (
        <CustomComponent />
      ) : (
        <GenericDetails data={genericData} />
      )}
    </div>
  );
}
