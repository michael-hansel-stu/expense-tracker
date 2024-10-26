"use client";
import React, { useState } from "react";
import TabOptions from "@/components/Home/TabOptions";
import SortOptions from "@/components/Home/SortOptions";
import TransactionTable from "@/components/Home/TransactionTable";
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

const Home = () => {
  const [currentTab, setCurrentTab] = useState<string>("ALL");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortOption, setSortOption] = useState<string>("date-desc");

  const {loading, error, transactions} = useTransactions();

  if(loading) return <div>Loading.....</div>
  if(error) return <div>{error}</div>

  return (
    <div className="max-w-screen-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Transaction List</h1>

      {/* Filter Options */}
      <TabOptions
        options={tabOptions}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      {/* Sort Options */}
      <SortOptions onSortChange={setSortOption} />

      {/* Transactions Table */}
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Home;
