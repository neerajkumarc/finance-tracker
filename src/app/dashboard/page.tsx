import Metrics from "@/components/Metrics";
import ProfileDropdown from "@/components/ProfileDropdown";
import Transactions from "@/components/Transactions";
import { Totals, Transaction } from "@/types";
import { fetchTransactions } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import AddDataWithMic from "./AddDataWithMic";

const dashboard = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let transactions: Transaction[] = [];
  if (user) {
    transactions = await fetchTransactions(user.id);
  }
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
    <div className="pt-4 px-2 space-y-4 h-full relative md:p-4 md:py-8">
      <div className="flex items-center justify-between">
        <h1 className="lowercase text-2xl font-medium">
          hello,<span className=""> {user?.user_metadata.full_name.split(" ")[0]}</span>
        </h1>
        <ProfileDropdown user={user} />
      </div>
      <Metrics balance={balance} expenses={expenses} income={income} />
      <Transactions transactions={transactions} />
      <div className=" absolute right-0 md:right-4 md:bottom-4 bottom-0">
      <AddDataWithMic/>
      </div>
    </div>
  );
};

export default dashboard;
