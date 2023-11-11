export const formatCurrencies = (value: number) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "MYR",
    style: "currency",
  });
  return CURRENCY_FORMATTER.format(value);
};
