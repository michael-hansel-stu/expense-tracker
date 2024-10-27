"use client";
import Link from "next/link";
import React, { useState } from "react";
import SortOptions from "./SortOptions";
import TabOptions from "./TabOptions";
import TransactionTable from "./TransactionTable";
import useTransactions from "@/hooks/useTransactions";

const tabOptions = [
  {
    name: "All",
    value: "ALL",
  },
  {
    name: "Income",
    value: "INCOME",
  },
  {
    name: "Expense",
    value: "EXPENSE",
  },
];

const TransactionList = () => {
  const [currentTab, setCurrentTab] = useState<string>("ALL");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortOption, setSortOption] = useState<string>("date-desc");
  const { transactions, loading, error } = useTransactions();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Link href={"/transaction/add"}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Add Transaction
        </button>
      </Link>
      {/* Transactions Table */}
      {loading ? (
        <div>Loading transactions...</div>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </>
  );
};

export default TransactionList;
