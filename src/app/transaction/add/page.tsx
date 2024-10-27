"use client";
import TransactionForm from "@/components/transaction/TransactionForm";
import { TransactionService } from "@/services/TransactionService";
import { TransactionFormValues, TransactionType } from "@/types/Transaction";
import { useRouter } from "next/navigation";
import React from "react";

const CreateTransactionPage = () => {
  const router = useRouter();
  const transactionService = new TransactionService();

  const initialValues: TransactionFormValues = {
    description: "",
    amount: "",
    date: "",
    type: TransactionType.INCOME,
  };

  const addTransaction = async (formData: TransactionFormValues) => {
    await transactionService.addTransaction(formData);
    router.push("/")
  };

  return (
    <div className="relative top-24">
      <h1 className="max-w-md mx-auto text-2xl font-bold mb-5">
        Add Transaction
      </h1>
      <TransactionForm
        initialValues={initialValues}
        onSubmit={addTransaction}
        buttonText="Add Transaction"
      />
    </div>
  );
};

export default CreateTransactionPage;
