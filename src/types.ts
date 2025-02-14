export interface Transaction {
    id: number;
    user_id: string;
    type: 'expense' | 'income';
    amount: number;
    description: string;
    created_at: string;
  }

  export interface TransactionData {
    type: "expense" | "income";
    amount: number;
    description: string;
  }
  
  export interface Profile {
    id: string;
    full_name: string;
    avatar_url: string;
  }

  export interface Totals {
    balance: number;
    expenses: number;
    income: number;
  }