"use server";

import { addTransaction, deleteTransaction } from "@/utils/supabase/queries";
import { getUserSession } from "./auth";
import {Transaction, TransactionData } from "@/types";

export async function addTransactionForCurrentUser(transaction:TransactionData) {
  const { user } = await getUserSession();
  if (!user) return;
  return addTransaction({
    type: transaction.type,
    amount: transaction.amount,
    description: transaction.description,
    user_id: user.id,
  });
}

export async function deleteTransactionForCurrentUser(transaction:Transaction) {
  const { user } = await getUserSession();
  if (!user) return;
  if(user.id !== transaction.user_id) return;
  return deleteTransaction(transaction);   
}
