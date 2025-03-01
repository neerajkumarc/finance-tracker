"use client";
import React, { useState, useEffect } from "react";
import { TransactionData } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "./ui/skeleton";
import { useAddingStore } from "@/store/useAddingStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useRouter } from "next/navigation";

interface Props {
  transactions: TransactionData[];
  isLoading: boolean;
}

const Transactions = ({ transactions: initialTransactions, isLoading }: Props) => {
  const { removeTransaction, transactions: storeTransactions } = useTransactionStore();
  const router = useRouter();
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [localTransactions, setLocalTransactions] = useState(initialTransactions);

  const { isAdding } = useAddingStore();

  useEffect(() => {
    setLocalTransactions(storeTransactions);
  }, [storeTransactions]);

  const handleDelete = async (id: number) => {
    await removeTransaction(id);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center border-b border-neutral-700">
        <h2 className="text-base text-muted-foreground">transactions</h2>
      </div>
      <ScrollArea className="h-[300px]">
        <div
          className={`${
            localTransactions.length != 0 && "divide-y divide-neutral-700"
          }`}
        >
          {isAdding && (
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-[160px] " />
              </div>
              <Skeleton className="h-4 w-[100px]" />
            </div>
          )}
          {localTransactions.map((transaction: TransactionData, index: number) => (
            <div key={transaction.id || index}>
              <ContextMenu>
                <ContextMenuTrigger>
                  <div className="p-4 flex items-center justify-between select-none">
                    <div className="flex items-center gap-3">
                      <span>{transaction.description}</span>
                    </div>
                    <span
                      className={
                        transaction.type === "expense"
                          ? "text-red-400"
                          : "text-green-400"
                      }
                    >
                      {transaction.type === "expense" ? "-" : "+"}₹
                      {transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    onSelect={() => {
                      setSelectedTransaction(transaction);
                      setShowDeleteDialog(true);
                    }}
                  >
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
          ))}
          {isLoading ? (
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-[160px] " />
              </div>
              <Skeleton className="h-4 w-[100px]" />
            </div>
          ) : (
            <>
              {localTransactions.length === 0 && (
                <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-20 w-full">
                  <div className="p-4 text-center text-gray-500">
                    No transactions yet
                  </div>
                  <p className="text-muted-foreground text-xs text-center">
                    Click the plus button to add a transaction{" "}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(selectedTransaction?.id!)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Transactions;
