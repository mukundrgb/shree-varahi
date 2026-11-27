import { CalculatorDetailData } from '../GenericDetails';
import { investmentData } from './investmentData';
import { savingsData } from './savingsData';
import { loansData } from './loansData';
import { taxSalaryData } from './taxSalaryData';
import { otherData } from './otherData';

export const allCalculatorDetailsData: Record<string, CalculatorDetailData> = {
  ...investmentData,
  ...savingsData,
  ...loansData,
  ...taxSalaryData,
  ...otherData,
};
