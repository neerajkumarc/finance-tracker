"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { get } from "http";
import { getAllTransactions } from "@/lib/indexedDB";

export default function Home() {
  useEffect(() => {
    const redirectToDashboardIfTransactionsExist = async () => {
      const transactions = await getAllTransactions();
     if (transactions.length > 0) {
        redirect("/dashboard");
      }
    };
    redirectToDashboardIfTransactionsExist();
  }, []);
  return (
    <main className="flex flex-col gap-2 items-center justify-center p-4 h-full overflow-hidden">
      <div className="relative w-full max-w-md aspect-square">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src="home.png"
            alt="Mibu app illustration"
            className="w-48 h-48 object-contain dark:invert"
          />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -top-4">
          <CategoryPill label="balance" />
        </div>
        <div className="absolute left-0 top-1/4">
          <CategoryPill label="income" />
        </div>
        <div className="absolute right-0 top-1/4">
          <CategoryPill label="expenses" />
        </div>
        <div className="absolute right-0 top-2/4">
          <CategoryPill label="food" />
        </div>
        <div className="absolute right-0 bottom-10">
          <CategoryPill label="travel" />
        </div>
        <div className="absolute left-0 top-2/4">
          <CategoryPill label="fun" />
        </div>
        <div className="absolute left-0 bottom-10">
          <CategoryPill label="retire" />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-bold ">mift</h1>
        <p>your minimal finance tracker app</p>
      </div>
      <div className="mt-8 w-full">
        <Link href="/dashboard">
          <Button className="w-full rounded-full">Get Started</Button>
        </Link>
      </div>
    </main>
  );
}

function CategoryPill({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2   rounded-full border border-neutral-600 shadow-sm">
      <span className="text-sm">{label}</span>
    </div>
  );
}
