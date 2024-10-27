"use client";
import React from "react";
import FormInput from "../ui/FormInput";
import { TransactionFormProps, TransactionType } from "@/types/Transaction";
import { useTransactionForm } from "@/hooks/useTransactionForm";

const TransactionForm: React.FC<TransactionFormProps> = ({
  initialValues,
  onSubmit,
  buttonText,
}) => {
  const { formData, errors, loading, success, handleChange, handleSubmit } =
    useTransactionForm(onSubmit, initialValues);

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      {formData.id && (
        <input type="hidden" id="id" value={formData.id} readOnly />
      )}

      <FormInput
        id="description"
        label="Description"
        type="text"
        value={formData.description}
        onChange={handleChange}
        required
      />
      {errors.description && (
        <p className="text-red-500">{errors.description}</p>
      )}

      <FormInput
        id="amount"
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      {errors.amount && <p className="text-red-500">{errors.amount}</p>}

      <FormInput
        id="date"
        label="Date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      {errors.date && <p className="text-red-500">{errors.date}</p>}

      <FormInput
        id="type"
        label="Type"
        type="select"
        value={formData.type}
        onChange={handleChange}
        options={[
          { label: "Income", value: TransactionType.INCOME },
          { label: "Expense", value: TransactionType.EXPENSE },
        ]}
      />
      {errors.global && <p className="text-red-500">{errors.global}</p>}
      {success && <p className="text-green-500">Successful!</p>}

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={loading}
      >
        {loading ? (formData.id ? "Updating..." : "Adding...") : buttonText}
      </button>
    </form>
  );
};

export default TransactionForm;