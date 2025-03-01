"use client";
import Metrics from "@/components/Metrics";
import Transactions from "@/components/Transactions";
import { Totals } from "@/types";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { transactions, isLoading, loadTransactions } = useTransactionStore();

  useEffect(() => {
    loadTransactions();
  }, []);

  const calculateTotals = (): Totals => {
    return transactions.reduce(
      (acc: Totals, transaction) => {
        if (transaction.type === "expense") {
          acc.expenses += transaction.amount;
        } else {
          acc.income += transaction.amount;
        }
        acc.balance = acc.income - acc.expenses;
        return acc;
      },
      { balance: 0, expenses: 0, income: 0 }
    );
  };

  const { balance, expenses, income } = calculateTotals();

  return (
    <div className="px-4 space-y-2">
      <Metrics
        balance={balance}
        expenses={expenses}
        income={income}
        isLoading={isLoading}
      />
      <Transactions transactions={transactions} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
