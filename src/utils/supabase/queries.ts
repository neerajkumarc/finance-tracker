"use server";
import { createClient } from '@/utils/supabase/server';
import { Transaction, Profile } from '@/types';
import { revalidatePath } from 'next/cache';

export async function fetchTransactions(userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Transaction[];
 }

 export async function addTransaction({type, amount, description, user_id}: Omit<Transaction, "id" | "created_at">) {
const supabase = await createClient();
const { data, error } = await supabase
  .from('transactions')
  .insert({type, amount, description, user_id})
  .select()
  .single();
  if(data){
    revalidatePath('/dashboard');
    return {"message": "Transaction added successfully"};
  }
  if (error){
    return {"message": "Error adding transaction"};
  };
 }

 export async function deleteTransaction(transaction: Transaction) {
const supabase = await createClient();
const { status, statusText } = await supabase
  .from('transactions')
  .delete()
  .eq('id', transaction.id)
  .select()
  if(status === 200){
    revalidatePath('/dashboard');
    return {"message": "Transaction deleted successfully"};
  }
else{
  return {"message": "Error deleting transaction"};
}
 }

 export async function editTransaction(transaction: Transaction) {
const supabase = await createClient();
const { status, statusText } = await supabase
  .from('transactions')
  .update({type: transaction.type, amount: transaction.amount, description: transaction.description})
  .eq('id', transaction.id)
  .select()
  if(status === 200){
    revalidatePath('/dashboard');
    return {"message": "Transaction edited successfully"};
  }
else{
  return {"message": "Error editing transaction"};
}
 }