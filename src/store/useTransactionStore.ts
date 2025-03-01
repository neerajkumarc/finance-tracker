import { create } from "zustand";
import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
} from "@/lib/indexedDB";
import { TransactionData } from "@/types";

interface TransactionStore {
  transactions: TransactionData[];
  isLoading: boolean;
  loadTransactions: () => Promise<void>;
  addNewTransaction: (
    transaction: Omit<TransactionData, "id" | "created_at">
  ) => Promise<void>;
  removeTransaction: (id: number) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  isLoading: true,
  loadTransactions: async () => {
    set({ isLoading: true });
    try {
      const data = await getAllTransactions();
      // Filter out any transactions with undefined id
      const validData = data.filter(
        (transaction): transaction is TransactionData =>
          transaction.id !== undefined
      );
      const sortedData = validData.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      set({ transactions: sortedData });
    } catch (error) {
      console.error("Failed to load transactions:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  addNewTransaction: async (transaction) => {
    await addTransaction(transaction);
    get().loadTransactions();
  },
  removeTransaction: async (id) => {
    await deleteTransaction(id);
    get().loadTransactions();
  },
}));
