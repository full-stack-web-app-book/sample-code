import type { Transaction } from "@/utils/transactionUtils";

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
