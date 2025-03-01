import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface Transaction {
  id?: number;
  type: 'expense' | 'income';
  amount: number;
  description: string;
  created_at: string;
}

interface MyDB extends DBSchema {
  transactions: {
    key: number;
    value: Transaction;
  };
}

const dbName = 'FinanceTrackerDB';
const storeName = 'transactions';

let db: IDBPDatabase<MyDB> | undefined;

async function initDB() {
  if (!db) {
    db = await openDB<MyDB>(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      },
    });
  }
  return db;
}

export async function addTransaction(item: Omit<Transaction, 'id' | 'created_at'>) {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const created_at = new Date().toISOString();
  await store.add({ ...item, created_at });
  await tx.done;
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  return store.getAll();
}

export async function clearTransactions() {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  await tx.done;
}

export async function deleteTransaction(id: number) {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.delete(id);
  await tx.done;
}

export async function editTransaction(id: number, transaction: Partial<Transaction>) {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const existingTransaction = await store.get(id);
  if (!existingTransaction) {
    throw new Error('Transaction not found');
  }
  await store.put({
    ...existingTransaction,
    ...transaction,
  });
  await tx.done;
}

export async function exportTransactions() {
  const transactions = await getAllTransactions();
  const csvContent = "data:text/csv;charset=utf-8," + 
    "Type,Amount,Description,Date\n" +
    transactions.map(t => 
      `${t.type},${t.amount},"${t.description}",${new Date(t.created_at).toLocaleDateString()}`
    ).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `transactions-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}