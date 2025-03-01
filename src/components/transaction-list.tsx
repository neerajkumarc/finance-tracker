"use client"

import { Transaction } from "@/lib/indexedDB"
import { Skeleton } from "./ui/skeleton"
import { cn, formatDate } from "@/lib/utils"

interface TransactionListProps {
  transactions: Transaction[]
  isLoading: boolean
}

export function TransactionList({ transactions, isLoading }: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-lg border"
        >
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(new Date(transaction.created_at))}
            </p>
          </div>
          <p className={cn(
            "font-medium",
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          )}>
            {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
          </p>
        </div>
      ))}
    </div>
  )
}