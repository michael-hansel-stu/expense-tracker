import { TransactionFormValues } from "@/types/Transaction";

export const validateTransactionForm = (formData: TransactionFormValues) => {
  const newError: { [key: string]: string } = {};

  if (!formData.description) newError.description = "Description is required";
  if (!formData.amount) newError.amount = "Amount is required";
  if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0)
    newError.amount = "Amount must be a positive number";
  if (!formData.date) newError.date = "Date is required";
  if (isNaN(new Date(formData.date).getTime()))
    newError.date = "Invalid date format";
  if (new Date(formData.date) > new Date())
    newError.date = "Date cannot be in the future";

  return newError;
};
