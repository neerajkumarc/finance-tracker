import React from 'react'
import { Card } from './ui/card'

const Metrics = ({ balance, expenses, income }: { balance: number, expenses: number, income: number }) => {
  return (
    <div className='space-y-4'>
      {/* Balance Card */}
      <Card className="p-4 rounded-xl space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-semibold">₹{balance.toFixed(2)}</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-1">total</div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 rounded-2xl space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex justify-center items-center h-8 w-8 rounded-full bg-red-400/30">↗</span>
          </div>
          <span className="text-2xl font-semibold">₹{expenses.toFixed(2)}</span>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">expenses</span>
          </div>
        </Card>

        <Card className="p-4 rounded-2xl space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex justify-center items-center h-8 w-8 rounded-full bg-green-400/30">↙</span>
          </div>
          <span className="text-2xl font-semibold">₹{income.toFixed(2)}</span>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">income</span>
          </div>
        </Card>
      </div>

    </div>
  )
}

export default Metrics