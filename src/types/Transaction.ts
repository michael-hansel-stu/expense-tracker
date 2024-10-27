export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type Transaction = {
  id: number;
  description: string;
  amount: string;
  date: string;
  type: TransactionType;
};

export type TransactionApiResponse = {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  createdAt: string;
};

export type TransactionApiRequest = {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: TransactionType;
  createdAt: string;
};

export interface TransactionFormValues {
  id?: number;
  description: string;
  amount: string;
  date: string;
  type: TransactionType;
}

export interface TransactionFormProps {
  initialValues: TransactionFormValues;
  onSubmit: (formData: TransactionFormValues) => Promise<void>;
  buttonText: string;
}

export interface useTransactionFormProps {
  initialValues: TransactionFormValues;
  onSubmit: (values: TransactionFormValues) => Promise<void>;
}

export interface ITransactionService {
  fetchTransactions(): Promise<TransactionApiResponse[]>;
  addTransaction(
    formData: TransactionFormValues
  ): Promise<TransactionApiResponse>;
  updateTransaction(
    formData: TransactionFormValues
  ): Promise<TransactionApiResponse>;
  fetchTransactionById(id: number): Promise<TransactionApiResponse>;
  deleteTransactionById(id: number): Promise<TransactionApiResponse>;
}

export interface ITransactionList {
  transactions: Transaction[];
}
