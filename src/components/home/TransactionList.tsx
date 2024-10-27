"use client";
import Link from "next/link";
import React from "react";
import TransactionTable from "./TransactionTable";
import useTransactions from "@/hooks/useTransactions";

const TransactionList = () => {
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
