"use client";
import { useState, useEffect } from "react";
import { Transaction, TransactionApiResponse } from "@/types/Transaction";
import { TransactionService } from "@/services/TransactionService";

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const transactionService = new TransactionService();
        const apiResponse = await transactionService.fetchTransactions();
        const apiTransactions = apiResponse;
        const formattedTransactions = apiTransactions
          ? apiTransactions.map(
              (transaction: TransactionApiResponse): Transaction => ({
                id: transaction.id,
                description: transaction.description,
                amount: `Rp.${Intl.NumberFormat().format(transaction.amount)}`,
                date: new Date(transaction.date).toLocaleDateString(),
                type: transaction.type,
              })
            )
          : [];

        setTransactions(formattedTransactions);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  return { loading, error, transactions };
};

export default useTransactions;
