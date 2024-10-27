import { TransactionService } from "@/services/TransactionService";
import { Transaction } from "@/types/Transaction";
import { TransactionType } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const router = useRouter();
  const handleDelete = async (transactionId: number) => {
    const confirmed = confirm("apakah anda yakin untuk menghapus?");
    if (confirmed) {
      try {
        const response = await new TransactionService().deleteTransactionById(
          transactionId
        );
        if (response) {
          alert("Transaksi berhasil dihapus");
          router.refresh();
        } else {
          alert("Gagal menghapus transaksi");
        }
      } catch (error) {
        alert("Terjadi kesalahan!");
        console.log(error);
      }
    }
  };
  return (
    <div className="shadow-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              description
            </th>
            <th scope="col" className="px-6 py-3">
              amount
            </th>
            <th scope="col" className="px-6 py-3">
              date time
            </th>
            <th scope="col" className="px-6 py-3">
              type
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, key) => {
            return (
              <tr key={key}>
                <th className="px-6 py-4 font-medium text-gray-900">
                  {transaction.description}
                </th>
                <td className="px-6 py-4">{transaction.amount}</td>
                <td className="px-6 py-4">{transaction.date}</td>
                <td
                  className={clsx(
                    "px-6 py-4",
                    {
                      "text-red-500": transaction.type == TransactionType.EXPENSE,
                    },
                    {
                      "text-green-500":
                        transaction.type == TransactionType.INCOME,
                    }
                  )}
                >
                  {transaction.type}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    href={`/transaction/update/${transaction.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
