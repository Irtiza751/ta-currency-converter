export interface IConversion {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  date: string;
}
