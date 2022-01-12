interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardData {
  type: 'positive' | 'negative'
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}