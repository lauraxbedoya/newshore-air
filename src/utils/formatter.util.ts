export const formatCurrency = (value?: string) => {
  if (!value) return '';
  const formatter = Intl.NumberFormat();
  return formatter.format(Number(Number(value).toFixed()));
};