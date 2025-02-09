"use client";
import React, { useState } from 'react'
import { Transaction } from '@/types'
import { ScrollArea } from "@/components/ui/scroll-area"
import { deleteTransaction, editTransaction } from '@/utils/supabase/queries'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from './ui/skeleton';
import { useAddingStore } from '@/store/useAddingStore';

type Props = {
  transactions: Transaction[]
}

const Transactions = ({ transactions }: Props) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { isAdding } = useAddingStore()

  const handleDelete = async () => {
    if (selectedTransaction) {
      await deleteTransaction(selectedTransaction)
      setShowDeleteDialog(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center border-b">
        <h2 className="text-base text-muted-foreground">transactions</h2>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="divide-y divide-gray-100">
          {isAdding && (
            <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-4 w-[100px]" />
          </div>
          )}
          {transactions.map(transaction => (
            <div key={transaction.id}>
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="p-4 flex items-center justify-between ">
                  <div className="flex items-center gap-3">
                    <span>{transaction.description}</span>
                  </div>
                  <span className={transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'}>
                    {transaction.type === 'expense' ? '-' : '+'}₹{transaction.amount.toFixed(2)}
                  </span>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onSelect={() => {
                  setSelectedTransaction(transaction)
                  setShowDeleteDialog(true)
                }}>
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="p-4 text-center text-gray-500">No transactions yet</div>
          )}
        </div>
      </ScrollArea>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Transactions