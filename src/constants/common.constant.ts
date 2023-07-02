export interface Currency {
  currency: string;
  fromUSD: number;
}

export const currencyList: Currency[] = [
  { currency: 'COP', fromUSD: 4168 },
  { currency: 'USD', fromUSD: 1 },
  { currency: 'EUR', fromUSD: 0.92 },
  { currency: 'AUD', fromUSD: 1.5 },
];