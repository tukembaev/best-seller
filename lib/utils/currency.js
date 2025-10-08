// Simple currency helpers for KGS primary display and tooltip conversions

export function formatKGS(value) {
  if (value == null || isNaN(value)) return '';
  return `${Number(value).toLocaleString('ru-KG')} сом`;
}

// Static fallback rates; can be wired to live rates later
const DEFAULT_RATES = {
  USD: 0.0115, // 1 KGS ≈ 0.0115 USD (example)
  INR: 0.98,   // 1 KGS ≈ 0.98 INR  (example)
};

export function convertFromKgs(valueKgs, target = 'USD', rates = DEFAULT_RATES) {
  if (valueKgs == null || isNaN(valueKgs)) return 0;
  const rate = rates[target] ?? DEFAULT_RATES[target] ?? 0;
  return Number(valueKgs) * rate;
}

export function formatUSD(value) {
  if (value == null || isNaN(value)) return '';
  return `$ ${Math.ceil(Number(value))}`;
}

export function formatINR(value) {
  if (value == null || isNaN(value)) return '';
  // INR format with symbol
  return `₹ ${Math.ceil(Number(value))}`;
}

export function getTooltip(valueKgs, rates) {
  const usd = convertFromKgs(valueKgs, 'USD', rates);
  const inr = convertFromKgs(valueKgs, 'INR', rates);
  return `${formatUSD(usd)} | ${formatINR(inr)}`;
}


