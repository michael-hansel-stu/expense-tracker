"use client";
import TransactionForm from "@/components/transaction/TransactionForm";
import { TransactionService } from "@/services/TransactionService";
import {
  TransactionApiResponse,
  TransactionFormValues,
  TransactionType,
} from "@/types/Transaction";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateTransactionPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const [initialValues, setInitialValues] = useState<TransactionFormValues>({
    description: "",
    amount: "",
    date: "",
    type: TransactionType.INCOME,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTransaction = async () => {
        try {
          const transactionService = new TransactionService();
          const transaction: TransactionApiResponse =
            await transactionService.fetchTransactionById(Number(id));
          setInitialValues({
            id: transaction.id,
            description: transaction.description,
            amount: transaction.amount.toString(),
            date: transaction.date.split("T")[0],
            type: transaction.type,
          });
        } catch (error: unknown) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load transaction."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchTransaction();
    }
  }, [id]);

  const updateTransaction = async (formData: TransactionFormValues) => {
    const transactionService = new TransactionService();
    await transactionService.updateTransaction(formData);
    router.push("/");
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="relative top-24">
      <h1 className="max-w-md mx-auto text-2xl font-bold mb-5">
        Update Transaction
      </h1>
      <TransactionForm
        initialValues={initialValues}
        onSubmit={updateTransaction}
        buttonText="Update Transaction"
      />
    </div>
  );
};

export default UpdateTransactionPage;
