"use client";
import React, { Suspense, useEffect, useState } from "react";
import FinanceChart from "./FinanceChart ";
import { AlertCircle } from "lucide-react";
import { getAllTransactions } from "@/lib/indexedDB";

const LoadingState = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="animate-pulse">Loading transactions...</div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="w-full max-w-2xl">
    <div className="p-6">
      <div className="text-red-500 flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <p>{message}</p>
      </div>
    </div>
  </div>
);

const Page = () => {
  const [transactionData, setTransactionData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactionData(data);
      } catch (error) {
        setError("Error fetching transaction data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (error) {
    return <ErrorState message={error} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!transactionData) {
    return <ErrorState message="No transaction data available" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Financial Overview</h2>
        </div>
        <div>
          {transactionData.length > 0 ? (
            <Suspense fallback={<LoadingState />}>
              <FinanceChart data={transactionData} />
            </Suspense>
          ) : (
            <ErrorState message="no data available, add some transactions to get started" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
