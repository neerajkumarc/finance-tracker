"use client";
import React, { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TransactionData } from "@/types";

interface Transaction {
  id: number;
  user_id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  created_at: string;
}

interface ProcessedData {
  date: string;
  displayDate: string;
  expenses: number;
  income: number;
  expenseItems: string[];
  incomeItems: string[];
}

const FinanceChart: React.FC<{ data: TransactionData[] }> = ({ data }) => {
  const [timeFrame, setTimeFrame] = useState<"week" | "month" | "year">("week");

  const processData = (
    transactions: TransactionData[],
    frame: typeof timeFrame
  ): ProcessedData[] => {
    const now = new Date();
    let startDate = new Date();

    switch (frame) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return transactions
      .filter((transaction) => new Date(transaction.created_at) >= startDate)
      .reduce((acc: ProcessedData[], curr) => {
        const transactionDate = new Date(curr.created_at);
        let groupKey: string;
        let displayDate: string;

        if (frame === "year") {
          groupKey = `${transactionDate.getFullYear()}-${(
            transactionDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}`;
          displayDate = transactionDate.toLocaleString("default", {
            month: "short",
          });
        } else if (frame === "month") {
          // Get the start and end dates of the week containing the transaction
          const firstDayOfMonth = new Date(
            transactionDate.getFullYear(),
            transactionDate.getMonth(),
            1
          );
          const dayOffset = firstDayOfMonth.getDay();
          const weekNumber = Math.ceil(
            (transactionDate.getDate() + dayOffset) / 7
          );

          groupKey = `Week${weekNumber}`;
          displayDate = `Week ${weekNumber}`;
        } else {
          groupKey = transactionDate.toISOString().split("T")[0];
          displayDate = transactionDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          });
        }

        const existing = acc.find((item) => item.date === groupKey);

        if (existing) {
          if (curr.type === "expense") {
            existing.expenses += curr.amount;
            existing.expenseItems.push(curr.description);
          } else {
            existing.income += curr.amount;
            existing.incomeItems.push(curr.description);
          }
        } else {
          acc.push({
            date: groupKey,
            displayDate,
            expenses: curr.type === "expense" ? curr.amount : 0,
            income: curr.type === "income" ? curr.amount : 0,
            expenseItems: curr.type === "expense" ? [curr.description] : [],
            incomeItems: curr.type === "income" ? [curr.description] : [],
          });
        }
        return acc;
      }, [])
      .sort((a, b) => {
        if (frame === "month") {
          return (
            parseInt(a.date.replace("Week", "")) -
            parseInt(b.date.replace("Week", ""))
          );
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  };

  const processedData = useMemo(
    () => processData(data, timeFrame),
    [data, timeFrame]
  );

  const formatXAxis = (date: string): string => {
    return processedData.find((d) => d.date === date)?.displayDate || date;
  };

  interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (!active || !payload || !label) return null;

    const data = processedData.find((d) => d.date === label);
    if (!data) return null;

    return (
      <div className="bg-background p-3 rounded-lg shadow-md border">
        <p className="font-semibold text-sm">{data.displayDate}</p>
        <div className="text-xs space-y-1 mt-1">
          <p className="text-green-600">Income: ₹{data.income}</p>
          {data.incomeItems.length > 0 && (
            <p className="text-muted-foreground">
              {data.incomeItems.join(", ")}
            </p>
          )}
          <p className="text-red-600">Expenses: ₹{data.expenses}</p>
          {data.expenseItems.length > 0 && (
            <p className="text-muted-foreground">
              {data.expenseItems.join(", ")}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full border-none">
      <div className="flex flex-col space-y-0 mb-8">
        <h4 className="text-md ">Income vs Expenses</h4>
        <Select
          value={timeFrame}
          onValueChange={(value: typeof timeFrame) => setTimeFrame(value)}
        >
          <SelectTrigger className="w-28 h-8">
            <SelectValue placeholder="Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickFormatter={formatXAxis}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                label={{
                  value: "Amount (₹)",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 10,
                  fill: "#6b7280",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;
