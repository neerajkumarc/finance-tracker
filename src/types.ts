  export interface TransactionData {
    id: number;
    type: "expense" | "income";
    amount: number;
    description: string;
    created_at: string;
  }
  
  export interface Totals {
    balance: number;
    expenses: number;
    income: number;
  }