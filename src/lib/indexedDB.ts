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

export async function importTransactions(csv: string) {
  try {
    // Validate if CSV is not empty
    if (!csv.trim()) {
      throw new Error('CSV file is empty');
    }

    const lines = csv.split('\n');
    
    // Validate header
    const header = lines[0].toLowerCase();
    if (!header.includes('type') || !header.includes('amount') || 
        !header.includes('description') || !header.includes('date')) {
      throw new Error('Invalid CSV format: Missing required columns');
    }

    const data = lines.slice(1).map((line, index) => {
      const values = line.split(',');
      
      // Validate row data
      if (values.length < 4) {
        throw new Error(`Invalid data format in row ${index + 2}`);
      }

      const type = values[0].trim().toLowerCase();
      if (type !== 'expense' && type !== 'income') {
        throw new Error(`Invalid transaction type in row ${index + 2}: ${type}`);
      }

      const amount = parseFloat(values[1]);
      if (isNaN(amount) || amount <= 0) {
        throw new Error(`Invalid amount in row ${index + 2}: ${values[1]}`);
      }

      const description = values[2].trim().replace(/['"]/g, '');
      if (!description) {
        throw new Error(`Missing description in row ${index + 2}`);
      }

      const date = new Date(values[3]);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format in row ${index + 2}: ${values[3]}`);
      }

      return {
        type: type as Transaction['type'],
        amount,
        description,
        created_at: date.toISOString(),
      };
    });

    await clearTransactions();
    for (const transaction of data) {
      await addTransaction(transaction);
    }
    
    alert('Transactions imported successfully');
  } catch (error:any) {
    alert(`Error importing transactions: ${error.message}`);
    throw error; // Re-throw for handling in calling code if needed
  }
}
