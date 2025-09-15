export type Transaction = {
  id: number;
  item: string;
  amount: number;
  date: string;
};

export interface TransactionList {
  transactions: Transaction[];
  totalCount: number;
  totalAmount: number;
}

export type TransactionsHooks = {
  transactionList: TransactionList | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};
