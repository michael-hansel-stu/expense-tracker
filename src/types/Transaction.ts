export type Transaction = {
  id: number;
  description: string;
  amount: string;
  date: string;
  type: string;
};

export type TransactionApiResponse = {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: string;
  userId: number;
  createdAt: string;
};
