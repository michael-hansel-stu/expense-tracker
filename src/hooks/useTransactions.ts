import { useState, useEffect } from "react";
import { fetchTransactions } from "@/services/TransactionService";
import { Transaction, TransactionApiResponse } from "@/types/Transaction";

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const apiResponse = await fetchTransactions();
        console.log(apiResponse);
        const apiTransactions = apiResponse ?? [];
        if (!Array.isArray(apiTransactions)) {
          throw new Error("Unexpected API response format");
        }
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
