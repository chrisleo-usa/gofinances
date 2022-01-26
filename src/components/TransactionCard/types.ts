export interface TransactionCardData {
  type: 'positive' | 'negative'
  name: string;
  amount: string;
  category: string;
  date: string;
}