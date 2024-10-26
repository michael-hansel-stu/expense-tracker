import { Transaction } from "@/types/Transaction";
import React from "react";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
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
          {transactions.map((value, key) => {
            return (
              <tr key={key}>
                <th className="px-6 py-4 font-medium text-gray-900">
                  {value.description}
                </th>
                <td className="px-6 py-4">{value.amount}</td>
                <td className="px-6 py-4">{value.date}</td>
                <td className="px-6 py-4">{value.type}</td>
                <td className="px-6 py-4">
                  <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </a>
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
