// ════════════════════════════════
// Utility / Formatting Helpers
// ════════════════════════════════

/** Format number as Indian currency: ₹1,23,456 */
export const formatCurrency = (amount: number, decimals = 0): string => {
  if (!isFinite(amount) || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(amount);
};

/** Format as Indian number with commas */
export const formatNumber = (value: number, decimals = 0): string => {
  if (!isFinite(value) || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
};

/** Format percentage */
export const formatPercent = (value: number, decimals = 2): string =>
  `${value.toFixed(decimals)}%`;

/** Clamp a value between min and max */
export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/** Abbreviate large numbers: 1.2 Cr, 45 L */
export const abbreviate = (n: number): string => {
  if (!isFinite(n) || isNaN(n)) return '₹0';
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(2)} K`;
  return formatCurrency(n);
};
