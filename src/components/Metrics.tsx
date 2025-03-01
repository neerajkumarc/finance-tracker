import React from 'react'
import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { NumberTicker } from './NumberTicker'

const Metrics = ({ 
  balance, 
  expenses, 
  income, 
  isLoading 
}: { 
  balance: number, 
  expenses: number, 
  income: number,
  isLoading: boolean 
}) => {
  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Card className="p-4 rounded-xl space-y-1 border-2 border-neutral-700">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-16" />
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 rounded-2xl space-y-1 border-2 border-neutral-700">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </Card>
          <Card className="p-4 rounded-2xl space-y-1 border-2 border-neutral-700">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {/* Balance Card */}
      <Card className="p-4 rounded-xl space-y-1 border-2 border-neutral-700">
        <div className="flex justify-between items-center">
          <p className="text-2xl">
          ₹<NumberTicker value={balance} />
          </p>
        </div>
        <div className="text-muted-foreground flex items-center gap-1">total</div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 rounded-2xl space-y-1 border-2 border-neutral-700">
          <div className="flex items-center gap-2">
            <span className="flex justify-center items-center h-8 w-8 rounded-full bg-red-400/30">↗</span>
          </div>
          <span className="text-2xl">₹<NumberTicker value={expenses} /></span>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">expenses</span>
          </div>
        </Card>

        <Card className="p-4 rounded-2xl space-y-1 border-2 border-neutral-700">
          <div className="flex items-center gap-2">
            <span className="flex justify-center items-center h-8 w-8 rounded-full bg-green-400/30">↙</span>
          </div>
          <p className="text-2xl">₹<NumberTicker value={income} /></p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">income</span>
          </div>
        </Card>
      </div>

    </div>
  )
}

export default Metrics